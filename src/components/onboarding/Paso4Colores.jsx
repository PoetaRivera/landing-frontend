/**
 * Paso 4: Paleta de Colores
 * Selección de paleta predefinida o colores personalizados
 */

import { useState, useEffect } from 'react'
import { Palette, Check } from 'lucide-react'

const paletas = [
  { id: 'paleta1', nombre: 'Elegante', primario: '#3B82F6', secundario: '#10B981' },
  { id: 'paleta2', nombre: 'Rosa Chic', primario: '#EC4899', secundario: '#F59E0B' },
  { id: 'paleta3', nombre: 'Moderno', primario: '#8B5CF6', secundario: '#06B6D4' },
  { id: 'paleta4', nombre: 'Natural', primario: '#10B981', secundario: '#F59E0B' },
  { id: 'paleta5', nombre: 'Clásico', primario: '#1F2937', secundario: '#EF4444' },
  { id: 'paleta6', nombre: 'Vibrante', primario: '#F59E0B', secundario: '#EC4899' }
]

const Paso4Colores = ({ formData, onUpdateData }) => {
  const [paletaSeleccionada, setPaletaSeleccionada] = useState(formData.paletaId || 'paleta1')

  useEffect(() => {
    onUpdateData({ paletaId: paletaSeleccionada })
  }, [paletaSeleccionada, onUpdateData])

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <Palette className="w-12 h-12 text-primary mx-auto mb-3" />
        <p className="text-gray-600">Selecciona una paleta de colores para tu sitio web</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {paletas.map((paleta) => (
          <button
            key={paleta.id}
            onClick={() => setPaletaSeleccionada(paleta.id)}
            className={`relative p-4 rounded-lg border-2 transition-all ${
              paletaSeleccionada === paleta.id
                ? 'border-primary shadow-lg ring-2 ring-primary ring-opacity-50'
                : 'border-gray-200 hover:border-primary hover:shadow'
            }`}
          >
            {paletaSeleccionada === paleta.id && (
              <div className="absolute top-2 right-2">
                <Check className="w-5 h-5 text-primary" />
              </div>
            )}
            <div className="flex gap-2 mb-2">
              <div
                className="w-full h-12 rounded"
                style={{ backgroundColor: paleta.primario }}
              ></div>
              <div
                className="w-full h-12 rounded"
                style={{ backgroundColor: paleta.secundario }}
              ></div>
            </div>
            <p className="text-sm font-semibold text-gray-700">{paleta.nombre}</p>
          </button>
        ))}
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <p className="text-sm text-blue-800">
          <strong>💡 Nota:</strong> Podrás personalizar colores específicos después del setup
          inicial.
        </p>
      </div>
    </div>
  )
}

export default Paso4Colores
