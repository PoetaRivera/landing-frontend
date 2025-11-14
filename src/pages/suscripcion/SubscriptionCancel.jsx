/**
 * Página de Cancelación de pago de Stripe
 */

import { Link, useSearchParams } from 'react-router-dom'
import SEO from '../../components/common/SEO'
import Card from '../../components/common/Card'
import Button from '../../components/common/Button'

function SubscriptionCancel() {
  const [searchParams] = useSearchParams()
  const solicitudId = searchParams.get('solicitud_id')

  return (
    <>
      <SEO
        title="Pago Cancelado"
        description="El proceso de pago fue cancelado"
        url="https://misalons.com/suscripcion/cancel"
      />
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-yellow-50 py-16 px-4">
        <div className="container mx-auto max-w-2xl">
          <Card padding="lg" shadow>
            <div className="text-center">
              {/* Icono de información */}
              <div className="w-24 h-24 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg
                  className="w-12 h-12 text-orange-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
              </div>

              <h1 className="text-4xl font-bold mb-4 text-orange-600">Pago Cancelado</h1>
              <p className="text-xl text-gray-700 mb-8">El proceso de pago fue cancelado</p>

              {/* Mensaje informativo */}
              <div className="bg-blue-50 border-l-4 border-primary p-6 mb-8 text-left rounded-lg">
                <h3 className="font-semibold text-lg mb-3 text-gray-800">¿Qué pasó?</h3>
                <p className="text-gray-700 mb-4">
                  Cancelaste el proceso de pago antes de completarlo. No te preocupes, tu solicitud
                  sigue guardada y puedes intentar nuevamente cuando estés listo.
                </p>
                <h3 className="font-semibold text-lg mb-3 text-gray-800">
                  ¿Qué puedo hacer ahora?
                </h3>
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                  <li>Volver a intentar el pago cuando estés listo</li>
                  <li>Contactar a soporte si tienes alguna pregunta</li>
                  <li>Revisar nuestros planes y características</li>
                </ul>
              </div>

              {/* Razones comunes */}
              <div className="bg-gray-50 rounded-lg p-6 mb-8 text-left">
                <h3 className="font-semibold text-lg mb-3 text-gray-800">
                  Razones comunes para cancelar:
                </h3>
                <ul className="space-y-2 text-gray-600 text-sm">
                  <li>✓ Necesitas revisar los detalles del plan</li>
                  <li>✓ Quieres comparar con otras opciones</li>
                  <li>✓ Tienes dudas sobre el servicio</li>
                  <li>✓ Problemas técnicos con el pago</li>
                </ul>
                <p className="mt-4 text-sm text-gray-600">
                  Si tuviste problemas técnicos o tienes preguntas, no dudes en contactarnos.
                </p>
              </div>

              {/* Botones de acción */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
                <Link to="/suscripcion">
                  <Button variant="primary" size="lg" fullWidth>
                    Intentar Nuevamente
                  </Button>
                </Link>
                <Link to="/planes">
                  <Button variant="outline" size="lg" fullWidth>
                    Ver Planes
                  </Button>
                </Link>
              </div>

              <Link to="/" className="text-primary hover:text-primary-dark transition-colors">
                ← Volver al Inicio
              </Link>
            </div>
          </Card>

          {/* Información de contacto */}
          <div className="mt-8 text-center">
            <Card padding="md">
              <h3 className="font-semibold text-lg mb-3 text-gray-800">¿Necesitas Ayuda?</h3>
              <p className="text-gray-600 mb-3">
                Nuestro equipo de soporte está disponible para ayudarte
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center text-sm">
                <a
                  href="mailto:soporte@multisalon.com"
                  className="text-primary hover:underline flex items-center justify-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                  soporte@multisalon.com
                </a>
                <span className="text-gray-400 hidden sm:inline">|</span>
                <a
                  href="tel:+503-1234-5678"
                  className="text-primary hover:underline flex items-center justify-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                  +503-1234-5678
                </a>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </>
  )
}

export default SubscriptionCancel
