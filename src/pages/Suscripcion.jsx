import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { suscripcionResolver } from '../utils/validation'
import { suscripcionesAPI } from '../services/api'

function Suscripcion() {
  const [enviando, setEnviando] = useState(false)
  const [enviado, setEnviado] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm({
    resolver: suscripcionResolver,
    defaultValues: {
      nombreSalon: '',
      nombrePropietario: '',
      email: '',
      telefono: '',
      plan: 'Plan Básico - $15/mes',
      mensaje: ''
    }
  })

  const onSubmit = async (datos) => {
    setEnviando(true)

    try {
      const resultado = await suscripcionesAPI.crearSolicitud(datos)

      if (resultado.success) {
        toast.success('¡Solicitud enviada exitosamente! Te contactaremos pronto.', {
          position: 'top-center',
          autoClose: 5000
        })

        setEnviado(true)
        reset()

        // Scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' })
      }
    } catch (error) {
      console.error('Error al enviar solicitud:', error)

      toast.error(error.message || 'Error al enviar la solicitud. Por favor, intenta nuevamente.', {
        position: 'top-center',
        autoClose: 5000
      })
    } finally {
      setEnviando(false)
    }
  }

  if (enviado) {
    return (
      <div className="min-h-screen bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-8 text-center">
            <div className="text-6xl mb-6">✅</div>
            <h1 className="text-4xl font-bold mb-4 text-green-600">¡Solicitud Enviada!</h1>
            <p className="text-xl text-gray-600 mb-6">
              Gracias por tu interés en MiSalons
            </p>
            <div className="bg-blue-50 border-l-4 border-primary p-6 mb-6 text-left">
              <h3 className="font-semibold text-lg mb-2">Próximos Pasos:</h3>
              <ol className="list-decimal list-inside space-y-2 text-gray-700">
                <li>Revisaremos tu solicitud en las próximas 24-48 horas</li>
                <li>Te contactaremos vía email o teléfono</li>
                <li>Coordinaremos los detalles del montaje</li>
                <li>Te enviaremos el formulario de onboarding completo</li>
              </ol>
            </div>
            <p className="text-gray-600 mb-6">
              Hemos enviado un email de confirmación a tu correo electrónico.
            </p>
            <button
              onClick={() => setEnviado(false)}
              className="bg-primary text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary-dark transition"
            >
              Enviar Otra Solicitud
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-4xl font-bold mb-4 text-center">Suscríbete a MiSalons</h1>
          <p className="text-center text-gray-600 mb-8">
            Completa el formulario y nos pondremos en contacto contigo
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Información del Salón */}
            <div>
              <h2 className="text-2xl font-semibold mb-4">Información del Salón</h2>

              <div className="space-y-4">
                {/* Nombre del Salón */}
                <div>
                  <label className="block text-sm font-medium mb-2">Nombre del Salón *</label>
                  <input
                    type="text"
                    {...register('nombreSalon')}
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent ${
                      errors.nombreSalon ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Ej: Bella Estética"
                    disabled={enviando}
                  />
                  {errors.nombreSalon && (
                    <p className="text-red-500 text-sm mt-1">{errors.nombreSalon.message}</p>
                  )}
                </div>

                {/* Nombre del Propietario */}
                <div>
                  <label className="block text-sm font-medium mb-2">Nombre del Propietario *</label>
                  <input
                    type="text"
                    {...register('nombrePropietario')}
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent ${
                      errors.nombrePropietario ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Tu nombre completo"
                    disabled={enviando}
                  />
                  {errors.nombrePropietario && (
                    <p className="text-red-500 text-sm mt-1">{errors.nombrePropietario.message}</p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium mb-2">Email *</label>
                  <input
                    type="email"
                    {...register('email')}
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent ${
                      errors.email ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="tu@email.com"
                    disabled={enviando}
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                  )}
                </div>

                {/* Teléfono */}
                <div>
                  <label className="block text-sm font-medium mb-2">Teléfono *</label>
                  <input
                    type="tel"
                    {...register('telefono')}
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent ${
                      errors.telefono ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="+503 1234-5678"
                    disabled={enviando}
                  />
                  {errors.telefono && (
                    <p className="text-red-500 text-sm mt-1">{errors.telefono.message}</p>
                  )}
                </div>

                {/* Plan */}
                <div>
                  <label className="block text-sm font-medium mb-2">Plan Seleccionado *</label>
                  <select
                    {...register('plan')}
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent ${
                      errors.plan ? 'border-red-500' : 'border-gray-300'
                    }`}
                    disabled={enviando}
                  >
                    <option value="Plan Básico - $15/mes">Plan Básico - $15/mes</option>
                    <option value="Plan Premium" disabled>Plan Premium - Próximamente</option>
                    <option value="Plan Enterprise" disabled>Plan Enterprise - Próximamente</option>
                  </select>
                  {errors.plan && (
                    <p className="text-red-500 text-sm mt-1">{errors.plan.message}</p>
                  )}
                </div>

                {/* Mensaje */}
                <div>
                  <label className="block text-sm font-medium mb-2">Mensaje (Opcional)</label>
                  <textarea
                    {...register('mensaje')}
                    rows="4"
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent ${
                      errors.mensaje ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Cuéntanos sobre tu salón..."
                    disabled={enviando}
                  />
                  {errors.mensaje && (
                    <p className="text-red-500 text-sm mt-1">{errors.mensaje.message}</p>
                  )}
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={enviando}
              className={`w-full py-3 rounded-lg font-semibold transition ${
                enviando
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-primary text-white hover:bg-primary-dark'
              }`}
            >
              {enviando ? 'Enviando...' : 'Enviar Solicitud'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Suscripcion
