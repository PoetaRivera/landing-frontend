/**
 * Página de Recuperación de Contraseña
 * Permite al admin solicitar un email para resetear su contraseña
 */

import { useState } from 'react'
import { Link } from 'react-router-dom'
import { forgotPassword } from '../../services/adminAPI'
import Button from '../../components/common/Button'
import Card from '../../components/common/Card'
import { showError, showSuccess } from '../../utils/toastConfig'
import { Mail, ArrowLeft, CheckCircle } from 'lucide-react'

function ForgotPassword() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [emailSent, setEmailSent] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!email || !email.includes('@')) {
      showError('Por favor ingresa un email válido')
      return
    }

    try {
      setLoading(true)
      await forgotPassword(email)
      setEmailSent(true)
      showSuccess('Revisa tu email para continuar con la recuperación')
    } catch (error) {
      console.error('Error al solicitar recuperación:', error)
      showError(error.message || 'Error al enviar email de recuperación')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo/Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">MultiSalon Admin</h1>
          <p className="text-gray-600">Panel de Administración</p>
        </div>

        <Card padding="lg" shadow>
          {!emailSent ? (
            <>
              {/* Header */}
              <div className="text-center mb-6">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
                  <Mail className="w-8 h-8 text-blue-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">¿Olvidaste tu contraseña?</h2>
                <p className="text-gray-600">
                  No te preocupes, te enviaremos instrucciones para recuperarla
                </p>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                    Email de administrador
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="admin@misalons.com"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
                    disabled={loading}
                  />
                </div>

                <Button type="submit" variant="primary" fullWidth disabled={loading}>
                  {loading ? (
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Enviando...
                    </div>
                  ) : (
                    'Enviar instrucciones'
                  )}
                </Button>
              </form>

              {/* Back to Login */}
              <div className="mt-6 text-center">
                <Link
                  to="/admin/login"
                  className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-primary transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Volver al inicio de sesión
                </Link>
              </div>
            </>
          ) : (
            <>
              {/* Success State */}
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                  <CheckCircle className="w-8 h-8 text-green-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">¡Email enviado!</h2>
                <p className="text-gray-600 mb-4">
                  Si el email <strong>{email}</strong> está registrado, recibirás un mensaje con
                  instrucciones para recuperar tu contraseña.
                </p>

                {/* Info box */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6 text-left">
                  <h3 className="font-semibold text-blue-800 mb-2">📧 Próximos pasos:</h3>
                  <ol className="text-sm text-blue-700 space-y-1 list-decimal list-inside">
                    <li>Revisa tu bandeja de entrada</li>
                    <li>Busca el email de &quot;MultiSalon - Panel Admin&quot;</li>
                    <li>Haz clic en el link de recuperación</li>
                    <li>Establece tu nueva contraseña</li>
                  </ol>
                </div>

                <p className="text-sm text-gray-500 mb-6">
                  ⏰ El link expirará en <strong>1 hora</strong> por seguridad
                </p>

                {/* Actions */}
                <div className="space-y-3">
                  <Button
                    variant="primary"
                    fullWidth
                    onClick={() => (window.location.href = '/admin/login')}
                  >
                    Ir al inicio de sesión
                  </Button>

                  <button
                    onClick={() => {
                      setEmailSent(false)
                      setEmail('')
                    }}
                    className="w-full px-4 py-2 text-sm text-gray-600 hover:text-primary transition-colors"
                  >
                    Solicitar otro email
                  </button>
                </div>
              </div>
            </>
          )}
        </Card>

        {/* Help text */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            ¿Necesitas ayuda?{' '}
            <a href="mailto:soporte@multisalon.com" className="text-primary hover:underline">
              Contacta a soporte
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}

export default ForgotPassword
