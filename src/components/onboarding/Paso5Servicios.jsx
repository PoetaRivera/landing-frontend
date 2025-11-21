/**
 * Paso 5: Servicios
 * Lista de servicios que ofrece el salón
 */

import { useState, useEffect } from 'react'
import { Scissors, Plus, Trash2 } from 'lucide-react'
import Input from '../common/Input'
import Button from '../common/Button'

const Paso5Servicios = ({ formData, onUpdateData }) => {
  const [servicios, setServicios] = useState(formData.servicios || [])

  useEffect(() => {
    onUpdateData({ servicios })
  }, [servicios, onUpdateData])

  const agregarServicio = () => {
    setServicios([
      ...servicios,
      { nombre: '', descripcion: '', precio: '', duracion: '01:00', activo: true }
    ])
  }

  const eliminarServicio = (index) => {
    setServicios(servicios.filter((_, i) => i !== index))
  }

  const actualizarServicio = (index, field, value) => {
    const nuevosServicios = [...servicios]
    nuevosServicios[index][field] = value
    setServicios(nuevosServicios)
  }

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <Scissors className="w-12 h-12 text-primary mx-auto mb-3" />
        <p className="text-gray-600">Agrega los servicios que ofrece tu salón</p>
      </div>

      {servicios.map((servicio, index) => (
        <div key={index} className="bg-gray-50 p-4 rounded-lg border border-gray-200 relative">
          <button
            onClick={() => eliminarServicio(index)}
            className="absolute top-2 right-2 text-red-500 hover:text-red-700"
          >
            <Trash2 className="w-5 h-5" />
          </button>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Nombre del Servicio"
              placeholder="Ej: Corte de Cabello"
              value={servicio.nombre}
              onChange={(e) => actualizarServicio(index, 'nombre', e.target.value)}
              fullWidth
            />
            <Input
              label="Precio (USD)"
              placeholder="15.00"
              value={servicio.precio}
              onChange={(e) => actualizarServicio(index, 'precio', e.target.value)}
              fullWidth
            />
            <Input
              label="Duración (HH:MM)"
              placeholder="01:00"
              value={servicio.duracion}
              onChange={(e) => actualizarServicio(index, 'duracion', e.target.value)}
              fullWidth
            />
            <div className="md:col-span-2">
              <Input
                label="Descripción"
                placeholder="Breve descripción del servicio"
                value={servicio.descripcion}
                onChange={(e) => actualizarServicio(index, 'descripcion', e.target.value)}
                fullWidth
              />
            </div>
          </div>
        </div>
      ))}

      <Button
        variant="outline"
        onClick={agregarServicio}
        className="w-full flex items-center justify-center gap-2"
      >
        <Plus className="w-5 h-5" />
        Agregar Servicio
      </Button>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <p className="text-sm text-blue-800">
          <strong>💡 Tip:</strong> Puedes agregar más servicios después. Solo incluye los
          principales ahora.
        </p>
      </div>
    </div>
  )
}

export default Paso5Servicios
