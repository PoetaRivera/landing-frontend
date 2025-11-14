/**
 * Página de Éxito después del pago de Stripe
 */

import { useState, useEffect } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import SEO from '../../components/common/SEO'
import Card from '../../components/common/Card'
import Button from '../../components/common/Button'

function SubscriptionSuccess() {
  const [searchParams] = useSearchParams()
  const sessionId = searchParams.get('session_id')
  const solicitudId = searchParams.get('solicitud_id')

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    // Simulamos una verificación (en producción podrías llamar al backend)
    const timer = setTimeout(() => {
      setLoading(false)
    }, 1500)

    return () => clearTimeout(timer)
  }, [sessionId])

  if (loading) {
    return (
      <>
        <SEO
          title="Procesando Pago..."
          description="Verificando tu pago"
          url="https://misalons.com/suscripcion/success"
        />
        <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 py-16 px-4">
          <div className="container mx-auto max-w-2xl">
            <Card padding="lg" shadow>
              <div className="text-center py-12">
                <div className="inline-block animate-spin rounded-full h-16 w-16 border-b-4 border-primary mb-6"></div>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Verificando tu pago...</h2>
                <p className="text-gray-600">Por favor espera un momento</p>
              </div>
            </Card>
          </div>
        </div>
      </>
    )
  }

  if (error) {
    return (
      <>
        <SEO
          title="Error al Procesar Pago"
          description="Hubo un problema al verificar tu pago"
          url="https://misalons.com/suscripcion/success"
        />
        <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50 py-16 px-4">
          <div className="container mx-auto max-w-2xl">
            <Card padding="lg" shadow>
              <div className="text-center py-8">
                <div className="text-6xl mb-6">❌</div>
                <h1 className="text-3xl font-bold mb-4 text-red-600">Error al Procesar</h1>
                <p className="text-gray-600 mb-6">{error}</p>
                <Link to="/suscripcion">
                  <Button variant="primary" size="lg">
                    Volver a Intentar
                  </Button>
                </Link>
              </div>
            </Card>
          </div>
        </div>
      </>
    )
  }

  return (
    <>
      <SEO
        title="¡Pago Exitoso!"
        description="Tu suscripción ha sido activada exitosamente"
        url="https://misalons.com/suscripcion/success"
      />
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 py-16 px-4">
        <div className="container mx-auto max-w-3xl">
          <Card padding="lg" shadow>
            <div className="text-center">
              {/* Icono de éxito */}
              <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg
                  className="w-12 h-12 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={3}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>

              <h1 className="text-4xl font-bold mb-4 text-green-600">¡Pago Exitoso!</h1>
              <p className="text-xl text-gray-700 mb-8">
                Tu suscripción ha sido activada exitosamente
              </p>

              {/* Información */}
              <div className="bg-blue-50 border-l-4 border-primary p-6 mb-8 text-left rounded-lg">
                <h3 className="font-semibold text-lg mb-4 text-gray-800">✅ ¿Qué sigue ahora?</h3>
                <ol className="list-decimal list-inside space-y-3 text-gray-700">
                  <li className="leading-relaxed">
                    <strong>Revisa tu email:</strong> Te hemos enviado un correo con tus
                    credenciales de acceso al portal de clientes
                  </li>
                  <li className="leading-relaxed">
                    <strong>Accede al portal:</strong> Usa el usuario y contraseña que te enviamos
                    para iniciar sesión
                  </li>
                  <li className="leading-relaxed">
                    <strong>Configura tu salón:</strong> Completa la información de tu salón y
                    empieza a usar el sistema
                  </li>
                  <li className="leading-relaxed">
                    <strong>Soporte:</strong> Si tienes alguna duda, nuestro equipo está listo para
                    ayudarte
                  </li>
                </ol>
              </div>

              {/* Mensaje importante */}
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-8">
                <p className="text-sm text-yellow-800">
                  <strong>Importante:</strong> Revisa también tu carpeta de spam si no ves el email
                  en tu bandeja principal. El correo fue enviado desde{' '}
                  <strong>no-reply@multisalon.com</strong>
                </p>
              </div>

              {/* Información de la sesión (para debug) */}
              {sessionId && (
                <div className="text-sm text-gray-500 mb-6">
                  ID de Sesión: {sessionId.substring(0, 20)}...
                </div>
              )}

              {/* Botones de acción */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/cliente/login">
                  <Button variant="primary" size="lg" fullWidth>
                    Ir al Portal de Clientes
                  </Button>
                </Link>
                <Link to="/">
                  <Button variant="outline" size="lg" fullWidth>
                    Volver al Inicio
                  </Button>
                </Link>
              </div>
            </div>
          </Card>

          {/* Información adicional */}
          <div className="mt-8 text-center text-gray-600 text-sm">
            <p>
              ¿Necesitas ayuda? Contáctanos en{' '}
              <a href="mailto:soporte@multisalon.com" className="text-primary hover:underline">
                soporte@multisalon.com
              </a>
            </p>
          </div>
        </div>
      </div>
    </>
  )
}

export default SubscriptionSuccess
