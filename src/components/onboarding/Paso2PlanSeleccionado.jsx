/**
 * Paso 2: Selección de Plan
 * Elige entre Plan Básico, Estándar o Premium
 */

import { useState, useEffect } from 'react'
import { Check } from 'lucide-react'

const planes = [
  {
    id: 'basico',
    nombre: 'Plan Básico',
    precio: '$15',
    periodo: '/mes',
    descripcion: 'Perfecto para salones pequeños que están comenzando',
    caracteristicas: [
      'Sistema de reservas online',
      'Catálogo de servicios ilimitados',
      '1 estilista',
      'Panel de administración básico',
      'Soporte por email',
      '5GB de almacenamiento'
    ],
    destacado: false,
    color: 'blue'
  },
  {
    id: 'estandar',
    nombre: 'Plan Estándar',
    precio: '$30',
    periodo: '/mes',
    descripcion: 'Ideal para salones en crecimiento',
    caracteristicas: [
      'Todo del Plan Básico',
      'Hasta 5 estilistas',
      'Reportes y estadísticas',
      'Gestión de productos',
      'Soporte prioritario',
      '20GB de almacenamiento',
      'Personalización avanzada'
    ],
    destacado: true,
    color: 'purple'
  },
  {
    id: 'premium',
    nombre: 'Plan Premium',
    precio: '$50',
    periodo: '/mes',
    descripcion: 'Para salones establecidos que buscan lo mejor',
    caracteristicas: [
      'Todo del Plan Estándar',
      'Estilistas ilimitados',
      'Reportes avanzados con IA',
      'Integraciones personalizadas',
      'Soporte 24/7',
      'Almacenamiento ilimitado',
      'Dominio personalizado',
      'Capacitación dedicada'
    ],
    destacado: false,
    color: 'amber'
  }
]

const Paso2PlanSeleccionado = ({ formData, onUpdateData }) => {
  const [planSeleccionado, setPlanSeleccionado] = useState(formData.plan || 'Plan Básico')

  useEffect(() => {
    onUpdateData({ plan: planSeleccionado })
  }, [planSeleccionado, onUpdateData])

  const handleSelectPlan = (nombrePlan) => {
    setPlanSeleccionado(nombrePlan)
  }

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <p className="text-gray-600">
          Selecciona el plan que mejor se adapte a las necesidades de tu salón.
          <br />
          Podrás cambiarlo más adelante si es necesario.
        </p>
      </div>

      {/* Cards de Planes */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {planes.map((plan) => (
          <button
            key={plan.id}
            onClick={() => handleSelectPlan(plan.nombre)}
            className={`relative text-left rounded-xl p-6 transition-all duration-200 transform hover:scale-105 ${
              planSeleccionado === plan.nombre
                ? 'bg-primary text-white shadow-2xl ring-4 ring-primary ring-opacity-50'
                : 'bg-white border-2 border-gray-200 hover:border-primary hover:shadow-lg'
            }`}
          >
            {/* Badge de Destacado */}
            {plan.destacado && (
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <span className="bg-amber-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                  MÁS POPULAR
                </span>
              </div>
            )}

            {/* Checkmark */}
            {planSeleccionado === plan.nombre && (
              <div className="absolute top-4 right-4">
                <div className="bg-white rounded-full p-1">
                  <Check className="w-5 h-5 text-primary" />
                </div>
              </div>
            )}

            {/* Nombre del Plan */}
            <h3
              className={`text-2xl font-bold mb-2 ${
                planSeleccionado === plan.nombre ? 'text-white' : 'text-gray-800'
              }`}
            >
              {plan.nombre}
            </h3>

            {/* Descripción */}
            <p
              className={`text-sm mb-4 ${
                planSeleccionado === plan.nombre ? 'text-gray-100' : 'text-gray-600'
              }`}
            >
              {plan.descripcion}
            </p>

            {/* Precio */}
            <div className="mb-6">
              <div className="flex items-baseline">
                <span
                  className={`text-4xl font-extrabold ${
                    planSeleccionado === plan.nombre ? 'text-white' : 'text-gray-900'
                  }`}
                >
                  {plan.precio}
                </span>
                <span
                  className={`ml-2 text-sm ${
                    planSeleccionado === plan.nombre ? 'text-gray-100' : 'text-gray-500'
                  }`}
                >
                  {plan.periodo}
                </span>
              </div>
            </div>

            {/* Características */}
            <ul className="space-y-3">
              {plan.caracteristicas.map((caracteristica, index) => (
                <li key={index} className="flex items-start gap-2">
                  <Check
                    className={`w-5 h-5 flex-shrink-0 mt-0.5 ${
                      planSeleccionado === plan.nombre ? 'text-white' : 'text-green-500'
                    }`}
                  />
                  <span
                    className={`text-sm ${
                      planSeleccionado === plan.nombre ? 'text-gray-100' : 'text-gray-700'
                    }`}
                  >
                    {caracteristica}
                  </span>
                </li>
              ))}
            </ul>
          </button>
        ))}
      </div>

      {/* Info Box */}
      <div className="bg-green-50 border border-green-200 rounded-lg p-4 mt-6">
        <p className="text-sm text-green-800">
          <strong>✅ Garantía de Satisfacción:</strong> Todos nuestros planes incluyen 30 días de
          prueba gratis. Si no estás satisfecho, te devolvemos tu dinero, sin preguntas.
        </p>
      </div>
    </div>
  )
}

export default Paso2PlanSeleccionado
