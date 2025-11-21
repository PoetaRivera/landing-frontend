/**
 * Paso 9: Configuración General
 * Horarios, redes sociales, ubicación en Google Maps
 */

import { useState, useEffect } from 'react'
import { Clock, MapPin, Facebook, Instagram, MessageCircle } from 'lucide-react'
import Input from '../common/Input'

const dias = ['lunes', 'martes', 'miercoles', 'jueves', 'viernes', 'sabado', 'domingo']

const Paso9Configuracion = ({ formData, onUpdateData }) => {
  const [localData, setLocalData] = useState({
    horarios: formData.horarios || {
      lunes: { abierto: true, inicio: '09:00', fin: '18:00' },
      martes: { abierto: true, inicio: '09:00', fin: '18:00' },
      miercoles: { abierto: true, inicio: '09:00', fin: '18:00' },
      jueves: { abierto: true, inicio: '09:00', fin: '18:00' },
      viernes: { abierto: true, inicio: '09:00', fin: '18:00' },
      sabado: { abierto: true, inicio: '09:00', fin: '14:00' },
      domingo: { abierto: false, inicio: '', fin: '' }
    },
    ubicacionMaps: formData.ubicacionMaps || '',
    facebook: formData.facebook || '',
    instagram: formData.instagram || '',
    whatsapp: formData.whatsapp || formData.telefono || '',
    mensaje: formData.mensaje || ''
  })

  useEffect(() => {
    onUpdateData(localData)
  }, [localData, onUpdateData])

  const toggleDia = (dia) => {
    setLocalData((prev) => ({
      ...prev,
      horarios: {
        ...prev.horarios,
        [dia]: {
          ...prev.horarios[dia],
          abierto: !prev.horarios[dia].abierto
        }
      }
    }))
  }

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <Clock className="w-12 h-12 text-primary mx-auto mb-3" />
        <p className="text-gray-600">Configura los horarios y datos de contacto</p>
      </div>

      {/* Horarios */}
      <div>
        <h3 className="font-semibold text-gray-800 mb-4">Horarios de Atención</h3>
        <div className="space-y-2">
          {dias.map((dia) => (
            <div key={dia} className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
              <input
                type="checkbox"
                checked={localData.horarios[dia].abierto}
                onChange={() => toggleDia(dia)}
                className="w-5 h-5"
              />
              <span className="w-24 capitalize font-medium text-gray-700">{dia}</span>
              {localData.horarios[dia].abierto ? (
                <div className="flex gap-2 items-center flex-1">
                  <input
                    type="time"
                    value={localData.horarios[dia].inicio}
                    onChange={(e) =>
                      setLocalData((prev) => ({
                        ...prev,
                        horarios: {
                          ...prev.horarios,
                          [dia]: { ...prev.horarios[dia], inicio: e.target.value }
                        }
                      }))
                    }
                    className="px-3 py-2 border border-gray-300 rounded"
                  />
                  <span>-</span>
                  <input
                    type="time"
                    value={localData.horarios[dia].fin}
                    onChange={(e) =>
                      setLocalData((prev) => ({
                        ...prev,
                        horarios: {
                          ...prev.horarios,
                          [dia]: { ...prev.horarios[dia], fin: e.target.value }
                        }
                      }))
                    }
                    className="px-3 py-2 border border-gray-300 rounded"
                  />
                </div>
              ) : (
                <span className="text-gray-500">Cerrado</span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Google Maps */}
      <Input
        type="text"
        label="URL de Google Maps (Opcional)"
        placeholder="https://maps.google.com/..."
        value={localData.ubicacionMaps}
        onChange={(e) => setLocalData((prev) => ({ ...prev, ubicacionMaps: e.target.value }))}
        fullWidth
        icon={<MapPin className="w-5 h-5" />}
      />

      {/* Redes Sociales */}
      <div>
        <h3 className="font-semibold text-gray-800 mb-4">Redes Sociales (Opcional)</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            type="text"
            label="Facebook"
            placeholder="@tusalonOficial"
            value={localData.facebook}
            onChange={(e) => setLocalData((prev) => ({ ...prev, facebook: e.target.value }))}
            fullWidth
            icon={<Facebook className="w-5 h-5" />}
          />
          <Input
            type="text"
            label="Instagram"
            placeholder="@tusalonOficial"
            value={localData.instagram}
            onChange={(e) => setLocalData((prev) => ({ ...prev, instagram: e.target.value }))}
            fullWidth
            icon={<Instagram className="w-5 h-5" />}
          />
          <Input
            type="tel"
            label="WhatsApp Business"
            placeholder="7777-7777"
            value={localData.whatsapp}
            onChange={(e) => setLocalData((prev) => ({ ...prev, whatsapp: e.target.value }))}
            fullWidth
            icon={<MessageCircle className="w-5 h-5" />}
          />
        </div>
      </div>

      {/* Mensaje Adicional */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Mensaje o Notas Adicionales (Opcional)
        </label>
        <textarea
          value={localData.mensaje}
          onChange={(e) => setLocalData((prev) => ({ ...prev, mensaje: e.target.value }))}
          placeholder="Escribe cualquier información adicional que quieras que sepamos..."
          rows={4}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
        />
      </div>

      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
        <p className="text-sm text-green-800">
          <strong>✅ ¡Casi listo!</strong> Revisa todos los pasos y presiona &quot;Enviar
          Solicitud&quot; para finalizar.
        </p>
      </div>
    </div>
  )
}

export default Paso9Configuracion
