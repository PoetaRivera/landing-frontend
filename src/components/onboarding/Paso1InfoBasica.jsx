/**
 * Paso 1: Información Básica
 * Nombre del salón, propietario, contacto, ubicación
 */

import { useState, useEffect } from 'react'
import Input from '../common/Input'
import { Building2, User, Mail, Phone, MapPin, Globe } from 'lucide-react'

const Paso1InfoBasica = ({ formData, onUpdateData }) => {
  const [localData, setLocalData] = useState({
    nombreSalon: formData.nombreSalon || '',
    nombrePropietario: formData.nombrePropietario || '',
    email: formData.email || '',
    telefono: formData.telefono || '',
    direccion: formData.direccion || '',
    ciudad: formData.ciudad || '',
    pais: formData.pais || 'El Salvador'
  })

  // Actualizar padre cuando cambian los datos locales
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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Nombre del Salón */}
        <div className="md:col-span-2">
          <Input
            type="text"
            label="Nombre del Salón *"
            placeholder="Ej: Belleza Total Spa"
            value={localData.nombreSalon}
            onChange={(e) => handleChange('nombreSalon', e.target.value)}
            required
            fullWidth
            icon={<Building2 className="w-5 h-5" />}
          />
          <p className="text-xs text-gray-500 mt-1">
            Este será el nombre visible de tu salón en el sistema
          </p>
        </div>

        {/* Nombre del Propietario */}
        <Input
          type="text"
          label="Nombre del Propietario *"
          placeholder="Ej: María García"
          value={localData.nombrePropietario}
          onChange={(e) => handleChange('nombrePropietario', e.target.value)}
          required
          fullWidth
          icon={<User className="w-5 h-5" />}
        />

        {/* Email */}
        <Input
          type="email"
          label="Email de Contacto *"
          placeholder="correo@ejemplo.com"
          value={localData.email}
          onChange={(e) => handleChange('email', e.target.value)}
          required
          fullWidth
          icon={<Mail className="w-5 h-5" />}
        />

        {/* Teléfono */}
        <Input
          type="tel"
          label="Teléfono *"
          placeholder="2222-2222 o 7777-7777"
          value={localData.telefono}
          onChange={(e) => handleChange('telefono', e.target.value)}
          required
          fullWidth
          icon={<Phone className="w-5 h-5" />}
        />

        {/* País */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            <Globe className="inline w-4 h-4 mr-1" />
            País *
          </label>
          <select
            value={localData.pais}
            onChange={(e) => handleChange('pais', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
            required
          >
            <option value="El Salvador">El Salvador</option>
            <option value="Guatemala">Guatemala</option>
            <option value="Honduras">Honduras</option>
            <option value="Nicaragua">Nicaragua</option>
            <option value="Costa Rica">Costa Rica</option>
            <option value="Panamá">Panamá</option>
            <option value="México">México</option>
            <option value="Colombia">Colombia</option>
            <option value="Otro">Otro</option>
          </select>
        </div>

        {/* Dirección */}
        <div className="md:col-span-2">
          <Input
            type="text"
            label="Dirección Completa"
            placeholder="Ej: Calle Principal #123, Colonia Centro"
            value={localData.direccion}
            onChange={(e) => handleChange('direccion', e.target.value)}
            fullWidth
            icon={<MapPin className="w-5 h-5" />}
          />
          <p className="text-xs text-gray-500 mt-1">
            Esta información aparecerá en tu sitio web y ayudará a tus clientes a encontrarte
          </p>
        </div>

        {/* Ciudad */}
        <Input
          type="text"
          label="Ciudad"
          placeholder="Ej: San Salvador"
          value={localData.ciudad}
          onChange={(e) => handleChange('ciudad', e.target.value)}
          fullWidth
          icon={<MapPin className="w-5 h-5" />}
        />
      </div>

      {/* Info Box */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <p className="text-sm text-blue-800">
          <strong>💡 Nota:</strong> Esta información será utilizada para crear tu cuenta de
          administrador y para que tus clientes puedan contactarte.
        </p>
      </div>
    </div>
  )
}

export default Paso1InfoBasica
