import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { suscripcionResolver } from '../utils/validation'
import { suscripcionesAPI } from '../services/api'
import Input from '../components/common/Input'
import Select from '../components/common/Select'
import Button from '../components/common/Button'
import Card from '../components/common/Card'
import SEO from '../components/common/SEO'
import { PLANES_OPTIONS } from '../utils/selectOptions'
import { showSuccess, showError } from '../utils/toastConfig'

/**
 * Valida que la URL de checkout sea de Stripe
 * @param {string} url - URL a validar
 * @returns {boolean} - true si la URL es válida
 */
function isValidStripeUrl(url) {
  if (!url || typeof url !== 'string') return false

  // Lista de dominios válidos de Stripe
  const validStripeDomains = ['https://checkout.stripe.com', 'https://billing.stripe.com']

  try {
    const urlObj = new URL(url)
    const origin = `${urlObj.protocol}//${urlObj.hostname}`

    return validStripeDomains.some((domain) => origin === domain)
  } catch (error) {
    console.error('Error validando URL de Stripe:', error)
    return false
  }
}

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
      plan: 'Plan Básico',
      mensaje: ''
    }
  })

  const onSubmit = async (datos) => {
    setEnviando(true)

    try {
      const resultado = await suscripcionesAPI.crearSolicitud(datos)

      if (resultado.success) {
        // Si hay checkoutUrl, validar y redirigir a Stripe
        if (resultado.data?.checkoutUrl) {
          const checkoutUrl = resultado.data.checkoutUrl

          // 🔒 VALIDAR QUE SEA UN URL DE STRIPE LEGÍTIMO
          if (!isValidStripeUrl(checkoutUrl)) {
            console.error('❌ URL de checkout inválida:', checkoutUrl)
            showError('Error de seguridad: URL de pago inválida. Por favor contacta a soporte.')
            setEnviando(false)
            return
          }

          showSuccess('¡Redirigiendo al checkout seguro de Stripe...')

          // Esperar un momento para que el usuario vea el mensaje
          setTimeout(() => {
            window.location.href = checkoutUrl
          }, 1000)
        } else {
          // Flujo antiguo (sin Stripe)
          showSuccess('¡Solicitud enviada exitosamente! Te contactaremos pronto.')
          setEnviado(true)
          reset()
          window.scrollTo({ top: 0, behavior: 'smooth' })
        }
      }
    } catch (error) {
      console.error('Error al enviar solicitud:', error)
      showError(error.message || 'Error al enviar la solicitud. Por favor, intenta nuevamente.')
      setEnviando(false)
    }
    // No ponemos setEnviando(false) aquí porque si hay redirección, la página se va a recargar
  }

  if (enviado) {
    return (
      <>
        <SEO
          title="¡Solicitud Enviada!"
          description="Gracias por tu interés en MiSalons. Te contactaremos pronto para coordinar los detalles."
          url="https://misalons.com/suscripcion"
        />
        <div className="min-h-screen bg-gray-50 py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto">
              <Card padding="lg" shadow>
                <div className="text-center">
                  <div className="text-6xl mb-6">✅</div>
                  <h1 className="text-4xl font-bold mb-4 text-green-600">¡Solicitud Enviada!</h1>
                  <p className="text-xl text-gray-600 mb-6">Gracias por tu interés en MiSalons</p>

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

                  <Button variant="primary" size="lg" onClick={() => setEnviado(false)}>
                    Enviar Otra Solicitud
                  </Button>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </>
    )
  }

  return (
    <>
      <SEO
        title="Suscripción"
        description="Únete a MiSalons y comienza a gestionar tu salón de belleza de manera profesional. Completa el formulario y te contactaremos en 24-48 horas."
        keywords="suscripción misalons, registro salón belleza, comenzar con misalons"
        url="https://misalons.com/suscripcion"
      />
      <div className="min-h-screen bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <Card padding="lg" shadow>
              <h1 className="text-4xl font-bold mb-4 text-center">Suscríbete a MiSalons</h1>
              <p className="text-center text-gray-600 mb-8">
                Completa el formulario y nos pondremos en contacto contigo
              </p>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* Información del Salón */}
                <div>
                  <h2 className="text-2xl font-semibold mb-4">Información del Salón</h2>

                  <div className="space-y-4">
                    <Input
                      label="Nombre del Salón"
                      placeholder="Ej: Bella Estética"
                      required
                      fullWidth
                      disabled={enviando}
                      error={errors.nombreSalon?.message}
                      {...register('nombreSalon')}
                    />

                    <Input
                      label="Nombre del Propietario"
                      placeholder="Tu nombre completo"
                      required
                      fullWidth
                      disabled={enviando}
                      error={errors.nombrePropietario?.message}
                      {...register('nombrePropietario')}
                    />

                    <Input
                      type="email"
                      label="Email"
                      placeholder="tu@email.com"
                      required
                      fullWidth
                      disabled={enviando}
                      error={errors.email?.message}
                      {...register('email')}
                    />

                    <Input
                      type="tel"
                      label="Teléfono"
                      placeholder="+503 1234-5678"
                      required
                      fullWidth
                      disabled={enviando}
                      error={errors.telefono?.message}
                      {...register('telefono')}
                    />

                    <Select
                      label="Plan Seleccionado"
                      options={PLANES_OPTIONS}
                      required
                      fullWidth
                      disabled={enviando}
                      error={errors.plan?.message}
                      {...register('plan')}
                    />

                    <div className="w-full">
                      <label
                        htmlFor="mensaje"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Mensaje (Opcional)
                      </label>
                      <textarea
                        id="mensaje"
                        rows="4"
                        className="block w-full rounded-lg border border-gray-300 px-4 py-2 transition-colors duration-200 focus:outline-none focus:ring-2 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                        placeholder="Cuéntanos sobre tu salón..."
                        disabled={enviando}
                        {...register('mensaje')}
                      />
                      {errors.mensaje && (
                        <p className="mt-1 text-sm text-red-600">{errors.mensaje.message}</p>
                      )}
                    </div>
                  </div>
                </div>

                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  fullWidth
                  disabled={enviando}
                  loading={enviando}
                >
                  {enviando ? 'Enviando...' : 'Enviar Solicitud'}
                </Button>
              </form>
            </Card>
          </div>
        </div>
      </div>
    </>
  )
}

export default Suscripcion
