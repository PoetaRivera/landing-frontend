/**
 * Paso 3: Logo y Branding
 * Logo, nombre de empresa, slogan
 */

import { useState, useEffect } from 'react'
import Input from '../common/Input'
import { Upload, Image, Type, MessageSquare } from 'lucide-react'

const Paso3Branding = ({ formData, onUpdateData }) => {
  const [localData, setLocalData] = useState({
    logo: formData.logo || null,
    nombreEmpresa: formData.nombreEmpresa || formData.nombreSalon || '',
    slogan: formData.slogan || ''
  })

  useEffect(() => {
    onUpdateData(localData)
  }, [localData, onUpdateData])

  const handleChange = (field, value) => {
    setLocalData((prev) => ({
      ...prev,
      [field]: value
    }))
  }

  return (
    <div className="space-y-6">
      {/* Logo Upload */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          <Image className="inline w-4 h-4 mr-1" />
          Logo del Salón (Opcional)
        </label>
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-primary transition-colors">
          <Upload className="w-12 h-12 text-gray-400 mx-auto mb-3" />
          <p className="text-sm text-gray-600 mb-2">Sube tu logo en formato PNG, JPG o SVG</p>
          <p className="text-xs text-gray-500 mb-4">(Cloudinary integration - Coming soon)</p>
          <input type="file" accept="image/*" className="hidden" id="logo-upload" disabled />
          <label
            htmlFor="logo-upload"
            className="inline-block px-4 py-2 bg-gray-200 text-gray-500 rounded-lg cursor-not-allowed"
          >
            Seleccionar Archivo
          </label>
        </div>
        <p className="text-xs text-gray-500 mt-2">
          Por ahora, puedes enviarnos tu logo por email después de completar el formulario
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
          materiales de marketing.
        </p>
      </div>
    </div>
  )
}

export default Paso3Branding
