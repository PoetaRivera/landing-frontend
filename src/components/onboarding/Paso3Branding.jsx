/**
 * Paso 3: Logo y Branding
 * Logo, nombre de empresa, slogan
 */

import { useState, useEffect } from 'react'
import Input from '../common/Input'
import { Upload, Image, Type, MessageSquare, X, CheckCircle, Loader } from 'lucide-react'
import { uploadImage, getImagePreview } from '../../services/uploadAPI'
import { showSuccess, showError } from '../../utils/toastConfig'

const Paso3Branding = ({ formData, onUpdateData }) => {
  const [localData, setLocalData] = useState({
    logo: formData.logo || null,
    nombreEmpresa: formData.nombreEmpresa || formData.nombreSalon || '',
    slogan: formData.slogan || ''
  })

  const [uploading, setUploading] = useState(false)
  const [logoPreview, setLogoPreview] = useState(formData.logo || null)

  useEffect(() => {
    onUpdateData(localData)
  }, [localData, onUpdateData])

  const handleChange = (field, value) => {
    setLocalData((prev) => ({
      ...prev,
      [field]: value
    }))
  }

  const handleLogoUpload = async (e) => {
    const file = e.target.files[0]
    if (!file) return

    // Validar que exista salonId
    if (!formData.salonId) {
      showError('Error: No se ha generado el ID del salón. Por favor, recarga la página.')
      return
    }

    try {
      setUploading(true)

      // Mostrar vista previa inmediata
      const preview = await getImagePreview(file)
      setLogoPreview(preview)

      // Subir a Cloudinary con salonId
      const url = await uploadImage(file, 'logos', formData.salonId)

      // Guardar URL en formData
      handleChange('logo', url)

      showSuccess('Logo subido exitosamente')
    } catch (error) {
      console.error('Error subiendo logo:', error)
      showError(error.message || 'Error al subir logo')

      // Limpiar preview si falla
      setLogoPreview(localData.logo)
    } finally {
      setUploading(false)
    }
  }

  const handleRemoveLogo = () => {
    setLogoPreview(null)
    handleChange('logo', null)
    showSuccess('Logo eliminado')
  }

  return (
    <div className="space-y-6">
      {/* Logo Upload */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          <Image className="inline w-4 h-4 mr-1" />
          Logo del Salón
        </label>

        {logoPreview ? (
          // Preview del logo
          <div className="border-2 border-gray-300 rounded-lg p-4 relative">
            <img
              src={logoPreview}
              alt="Logo preview"
              className="max-w-full max-h-48 mx-auto object-contain"
            />

            {/* Badge de estado */}
            <div className="absolute top-2 right-2 flex items-center gap-2">
              {uploading ? (
                <span className="inline-flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-800 text-xs font-semibold rounded-full">
                  <Loader className="w-3 h-3 animate-spin" />
                  Subiendo...
                </span>
              ) : localData.logo ? (
                <span className="inline-flex items-center gap-1 px-2 py-1 bg-green-100 text-green-800 text-xs font-semibold rounded-full">
                  <CheckCircle className="w-3 h-3" />
                  Subido
                </span>
              ) : null}

              <button
                onClick={handleRemoveLogo}
                disabled={uploading}
                className="p-1 bg-red-100 text-red-600 rounded-full hover:bg-red-200 transition-colors disabled:opacity-50"
                title="Eliminar logo"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Botón para cambiar */}
            <div className="text-center mt-4">
              <label
                htmlFor="logo-upload"
                className={`inline-block px-4 py-2 bg-gray-100 text-gray-700 rounded-lg cursor-pointer hover:bg-gray-200 transition-colors ${uploading ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                Cambiar Logo
              </label>
              <input
                type="file"
                accept="image/*"
                className="hidden"
                id="logo-upload"
                onChange={handleLogoUpload}
                disabled={uploading}
              />
            </div>
          </div>
        ) : (
          // Zona de upload inicial
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-primary transition-colors">
            <Upload className="w-12 h-12 text-gray-400 mx-auto mb-3" />
            <p className="text-sm text-gray-600 mb-2">
              {uploading ? 'Subiendo logo...' : 'Sube tu logo en formato PNG, JPG o WebP'}
            </p>
            <p className="text-xs text-gray-500 mb-4">Tamaño máximo: 5MB</p>
            <input
              type="file"
              accept="image/*"
              className="hidden"
              id="logo-upload"
              onChange={handleLogoUpload}
              disabled={uploading}
            />
            <label
              htmlFor="logo-upload"
              className={`inline-block px-4 py-2 bg-primary text-white rounded-lg cursor-pointer hover:bg-primary-dark transition-colors ${uploading ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {uploading ? (
                <span className="inline-flex items-center gap-2">
                  <Loader className="w-4 h-4 animate-spin" />
                  Subiendo...
                </span>
              ) : (
                'Seleccionar Archivo'
              )}
            </label>
          </div>
        )}

        <p className="text-xs text-gray-500 mt-2">
          💡 El logo se redimensionará automáticamente a 600x600px
        </p>
      </div>

      {/* Nombre Empresa */}
      <Input
        type="text"
        label="Nombre de la Empresa"
        placeholder="Ej: Belleza Total Spa & Salon"
        value={localData.nombreEmpresa}
        onChange={(e) => handleChange('nombreEmpresa', e.target.value)}
        fullWidth
        icon={<Type className="w-5 h-5" />}
      />

      {/* Slogan */}
      <Input
        type="text"
        label="Slogan (Opcional)"
        placeholder="Ej: Tu belleza, nuestra pasión"
        value={localData.slogan}
        onChange={(e) => handleChange('slogan', e.target.value)}
        fullWidth
        icon={<MessageSquare className="w-5 h-5" />}
      />

      <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
        <p className="text-sm text-purple-800">
          <strong>💡 Tip:</strong> El nombre de empresa y slogan aparecerán en tu sitio web y
          materiales de marketing. El logo se guardará en Cloudinary de forma segura.
        </p>
      </div>
    </div>
  )
}

export default Paso3Branding
