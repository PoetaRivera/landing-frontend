/**
 * Paso 8: Imágenes del Salón
 * Carrusel de imágenes del salón
 */

import { useState, useEffect } from 'react'
import { Camera, Upload, X, CheckCircle, Loader, AlertCircle } from 'lucide-react'
import { uploadMultipleImages, getImagePreview } from '../../services/uploadAPI'
import { showSuccess, showError, showWarning } from '../../utils/toastConfig'

const Paso8Imagenes = ({ formData, onUpdateData }) => {
  const [localData, setLocalData] = useState({
    imagenesCarrusel: formData.imagenesCarrusel || [],
    imagenPrincipal: formData.imagenPrincipal || null
  })

  const [uploading, setUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [previews, setPreviews] = useState([])

  useEffect(() => {
    // Inicializar previews con imágenes existentes
    if (localData.imagenesCarrusel.length > 0) {
      setPreviews(localData.imagenesCarrusel.map((url) => ({ url, uploaded: true })))
    }
  }, [])

  useEffect(() => {
    onUpdateData(localData)
  }, [localData, onUpdateData])

  const handleChange = (field, value) => {
    setLocalData((prev) => ({
      ...prev,
      [field]: value
    }))
  }

  const handleImagesUpload = async (e) => {
    const files = Array.from(e.target.files)
    if (files.length === 0) return

    // Validar que exista salonId
    if (!formData.salonId) {
      showError('Error: No se ha generado el ID del salón. Por favor, recarga la página.')
      return
    }

    // Validar que no exceda el límite (máximo 4 imágenes en total)
    const totalImages = localData.imagenesCarrusel.length + files.length
    if (totalImages > 4) {
      showError(`Máximo 4 imágenes permitidas. Tienes ${localData.imagenesCarrusel.length}, intentas agregar ${files.length}`)
      return
    }

    try {
      setUploading(true)
      setUploadProgress(0)

      // Generar previews inmediatas
      const newPreviews = []
      for (const file of files) {
        const preview = await getImagePreview(file)
        newPreviews.push({ url: preview, uploaded: false })
      }
      setPreviews((prev) => [...prev, ...newPreviews])

      // Subir todas las imágenes con salonId
      const urls = await uploadMultipleImages(files, 'carrusel', formData.salonId, (progress) => {
        setUploadProgress(progress)
      })

      // Actualizar con URLs reales
      const updatedImages = [...localData.imagenesCarrusel, ...urls]
      handleChange('imagenesCarrusel', updatedImages)

      // Actualizar previews con URLs reales
      setPreviews((prev) => {
        const updated = [...prev]
        // Reemplazar las últimas N previews con las URLs subidas
        for (let i = 0; i < urls.length; i++) {
          updated[updated.length - urls.length + i] = { url: urls[i], uploaded: true }
        }
        return updated
      })

      showSuccess(`${urls.length} imágenes subidas exitosamente`)
    } catch (error) {
      console.error('Error subiendo imágenes:', error)
      showError(error.message || 'Error al subir imágenes')

      // Eliminar previews que fallaron (las que no se subieron)
      setPreviews((prev) => prev.filter((p) => p.uploaded))
    } finally {
      setUploading(false)
      setUploadProgress(0)
    }
  }

  const handleRemoveImage = (index) => {
    const updatedImages = localData.imagenesCarrusel.filter((_, i) => i !== index)
    handleChange('imagenesCarrusel', updatedImages)

    const updatedPreviews = previews.filter((_, i) => i !== index)
    setPreviews(updatedPreviews)

    showSuccess('Imagen eliminada')
  }

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <Camera className="w-12 h-12 text-primary mx-auto mb-3" />
        <p className="text-gray-600">Agrega hasta 4 imágenes de tu salón para el carrusel</p>
        <p className="text-sm text-gray-500 mt-1">
          Fotos de instalaciones, servicios, ambiente, etc.
        </p>
      </div>

      {/* Zona de Upload */}
      {localData.imagenesCarrusel.length < 4 && (
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-primary transition-colors">
          <Upload className="w-12 h-12 text-gray-400 mx-auto mb-3" />
          <p className="text-sm text-gray-600 mb-2">
            {uploading
              ? `Subiendo imágenes... ${uploadProgress}%`
              : 'Selecciona una o más imágenes (máx 4)'}
          </p>
          <p className="text-xs text-gray-500 mb-4">
            Formatos: JPG, PNG, WebP | Tamaño máximo por imagen: 5MB
          </p>

          {uploading && (
            <div className="mb-4">
              <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                <div
                  className="bg-primary h-2 transition-all duration-300"
                  style={{ width: `${uploadProgress}%` }}
                ></div>
              </div>
            </div>
          )}

          <input
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            id="images-upload"
            onChange={handleImagesUpload}
            disabled={uploading}
          />
          <label
            htmlFor="images-upload"
            className={`inline-block px-4 py-2 bg-primary text-white rounded-lg cursor-pointer hover:bg-primary-dark transition-colors ${uploading ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {uploading ? (
              <span className="inline-flex items-center gap-2">
                <Loader className="w-4 h-4 animate-spin" />
                Subiendo {uploadProgress}%
              </span>
            ) : (
              'Seleccionar Imágenes'
            )}
          </label>
        </div>
      )}

      {/* Grid de Previews */}
      {previews.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-3">
            <p className="text-sm font-semibold text-gray-700">
              Imágenes del Carrusel ({previews.length}/4)
            </p>
            {localData.imagenesCarrusel.length === 4 && (
              <span className="text-xs text-amber-600 flex items-center gap-1">
                <AlertCircle className="w-3 h-3" />
                Límite alcanzado
              </span>
            )}
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {previews.map((preview, index) => (
              <div key={index} className="relative group border-2 border-gray-200 rounded-lg overflow-hidden">
                <img
                  src={preview.url}
                  alt={`Preview ${index + 1}`}
                  className="w-full h-32 object-cover"
                />

                {/* Badge de estado */}
                <div className="absolute top-2 left-2">
                  {!preview.uploaded ? (
                    <span className="inline-flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-800 text-xs font-semibold rounded-full">
                      <Loader className="w-3 h-3 animate-spin" />
                      Subiendo...
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 px-2 py-1 bg-green-100 text-green-800 text-xs font-semibold rounded-full">
                      <CheckCircle className="w-3 h-3" />
                      Subido
                    </span>
                  )}
                </div>

                {/* Botón eliminar */}
                <button
                  onClick={() => handleRemoveImage(index)}
                  disabled={!preview.uploaded}
                  className="absolute top-2 right-2 p-1 bg-red-100 text-red-600 rounded-full hover:bg-red-200 transition-colors opacity-0 group-hover:opacity-100 disabled:opacity-0"
                  title="Eliminar imagen"
                >
                  <X className="w-4 h-4" />
                </button>

                {/* Número de imagen */}
                <div className="absolute bottom-2 right-2 px-2 py-0.5 bg-black bg-opacity-50 text-white text-xs rounded">
                  {index + 1}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Info y Tips */}
      <div className="space-y-3">
        {localData.imagenesCarrusel.length === 0 && (
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
            <p className="text-sm text-amber-800">
              <strong>📸 Recomendación:</strong> Sube 4 imágenes de alta calidad de tu salón para el carrusel. Las imágenes ayudan a atraer más clientes.
            </p>
          </div>
        )}

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-sm text-blue-800">
            <strong>💡 Tip:</strong> Las imágenes se optimizarán automáticamente para web (máx
            1920px de ancho). Se guardarán en Cloudinary de forma segura.
          </p>
        </div>

        {localData.imagenesCarrusel.length > 0 && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <p className="text-sm text-green-800">
              <strong>✅ Perfecto:</strong> Tienes {localData.imagenesCarrusel.length} imágenes
              listas. Estas aparecerán en el carrusel de tu sitio web.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Paso8Imagenes
