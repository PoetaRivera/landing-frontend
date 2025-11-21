/**
 * Paso 7: Estilistas
 * Lista de estilistas que trabajan en el salón
 */

import { useState, useEffect } from 'react'
import { Users, Plus, Trash2 } from 'lucide-react'
import Input from '../common/Input'
import Button from '../common/Button'

const Paso7Estilistas = ({ formData, onUpdateData }) => {
  const [estilistas, setEstilistas] = useState(formData.estilistas || [])

  useEffect(() => {
    onUpdateData({ estilistas })
  }, [estilistas, onUpdateData])

  const agregarEstilista = () => {
    setEstilistas([...estilistas, { nombre: '', especialidad: '', activo: true }])
  }

  const eliminarEstilista = (index) => {
    setEstilistas(estilistas.filter((_, i) => i !== index))
  }

  const actualizarEstilista = (index, field, value) => {
    const nuevosEstilistas = [...estilistas]
    nuevosEstilistas[index][field] = value
    setEstilistas(nuevosEstilistas)
  }

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <Users className="w-12 h-12 text-primary mx-auto mb-3" />
        <p className="text-gray-600">Agrega los estilistas de tu salón</p>
      </div>

      {estilistas.map((estilista, index) => (
        <div key={index} className="bg-gray-50 p-4 rounded-lg border border-gray-200 relative">
          <button
            onClick={() => eliminarEstilista(index)}
            className="absolute top-2 right-2 text-red-500 hover:text-red-700"
          >
            <Trash2 className="w-5 h-5" />
          </button>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Nombre del Estilista"
              placeholder="Ej: Ana Martínez"
              value={estilista.nombre}
              onChange={(e) => actualizarEstilista(index, 'nombre', e.target.value)}
              fullWidth
            />
            <Input
              label="Especialidad"
              placeholder="Ej: Coloración, Cortes, Uñas"
              value={estilista.especialidad}
              onChange={(e) => actualizarEstilista(index, 'especialidad', e.target.value)}
              fullWidth
            />
          </div>
        </div>
      ))}

      <Button
        variant="outline"
        onClick={agregarEstilista}
        className="w-full flex items-center justify-center gap-2"
      >
        <Plus className="w-5 h-5" />
        Agregar Estilista
      </Button>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <p className="text-sm text-blue-800">
          <strong>💡 Tip:</strong> Puedes agregar fotos y más detalles de cada estilista desde el
          panel de administración.
        </p>
      </div>
    </div>
  )
}

export default Paso7Estilistas
