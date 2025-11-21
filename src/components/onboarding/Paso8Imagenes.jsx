/**
 * Paso 8: Imágenes del Salón
 * Carrusel de imágenes del salón
 */

import { useState, useEffect } from 'react'
import { Camera, Upload } from 'lucide-react'

const Paso8Imagenes = ({ formData, onUpdateData }) => {
  useEffect(() => {
    // Mantener datos vacíos por ahora (Cloudinary integration pendiente)
    onUpdateData({ imagenesCarrusel: [], imagenPrincipal: null })
  }, [onUpdateData])

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <Camera className="w-12 h-12 text-primary mx-auto mb-3" />
        <p className="text-gray-600">Agrega imágenes de tu salón para el sitio web</p>
      </div>

      <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center">
        <Upload className="w-16 h-16 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-gray-700 mb-2">
          Carga de Imágenes (Próximamente)
        </h3>
        <p className="text-gray-600 mb-4">La integración con Cloudinary está en desarrollo</p>
        <p className="text-sm text-gray-500">
          Por ahora, puedes enviarnos tus imágenes por email después de completar el formulario
        </p>
      </div>

      <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
        <p className="text-sm text-amber-800">
          <strong>📸 Recomendación:</strong> Prepara 3-5 imágenes de alta calidad de tu salón
          (instalaciones, servicios, ambiente). Te contactaremos para recibirlas.
        </p>
      </div>
    </div>
  )
}

export default Paso8Imagenes
