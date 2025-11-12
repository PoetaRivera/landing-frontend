/**
 * Página de Recuperación de Contraseña
 */

import { useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { useClienteAuth } from '../../context/ClienteAuthContext'
import { forgotPassword } from '../../services/clienteAPI'
import SEO from '../../components/common/SEO'
import Card from '../../components/common/Card'
import Input from '../../components/common/Input'
import Button from '../../components/common/Button'
import { showSuccess, showError } from '../../utils/toastConfig'

function ForgotPassword() {
  const { isAuthenticated } = useClienteAuth()

  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')

  // Si ya está autenticado, redirigir al dashboard
  if (isAuthenticated) {
    return <Navigate to="/cliente/dashboard" replace />
  }

  const validate = () => {
    if (!email.trim()) {
      setError('El email es requerido')
      return false
    }

    // Validación básica de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      setError('Ingresa un email válido')
      return false
    }

    return true
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!validate()) {
      return
    }

    setLoading(true)
    setError('')

    try {
      const result = await forgotPassword(email)

      showSuccess('¡Email enviado! Revisa tu bandeja de entrada.')
      setSubmitted(true)
    } catch (error) {
      console.error('Error en forgot password:', error)
      showError(error.message || 'Error al solicitar recuperación')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <SEO
        title="Recuperar Contraseña - Portal del Cliente"
        description="Recupera tu contraseña del portal de cliente de MiSalons"
        url="https://misalons.com/cliente/forgot-password"
      />

      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-16 px-4">
        <div className="container mx-auto max-w-md">
          <div className="text-center mb-8">
            <Link to="/" className="inline-block mb-4">
              <h1 className="text-3xl font-bold text-primary">MiSalons</h1>
            </Link>
            <h2 className="text-2xl font-bold text-gray-800">Recuperar Contraseña</h2>
            <p className="text-gray-600 mt-2">
              {submitted
                ? 'Revisa tu email'
                : 'Te enviaremos un enlace para restablecer tu contraseña'
              }
            </p>
          </div>

          <Card padding="lg" shadow>
            {submitted ? (
              // Estado después de enviar el email
              <div className="space-y-6">
                <div className="text-center py-6">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">
                    ¡Email Enviado!
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Si existe una cuenta con el email <strong>{email}</strong>, recibirás un enlace para restablecer tu contraseña.
                  </p>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <p className="text-sm text-blue-800">
                    <strong>Importante:</strong>
                  </p>
                  <ul className="text-sm text-blue-800 mt-2 space-y-1 list-disc list-inside">
                    <li>El enlace expira en 1 hora</li>
                    <li>Revisa tu carpeta de spam si no lo ves</li>
                    <li>Puedes cerrar esta ventana</li>
                  </ul>
                </div>

                <div className="text-center space-y-3">
                  <Link
                    to="/cliente/login"
                    className="block text-primary hover:text-primary-dark transition-colors font-semibold"
                  >
                    ← Volver al Login
                  </Link>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="text-sm text-gray-600 hover:text-gray-800 transition-colors"
                  >
                    ¿No recibiste el email? Reintentar
                  </button>
                </div>
              </div>
            ) : (
              // Formulario para ingresar email
              <form onSubmit={handleSubmit} className="space-y-6">
                <Input
                  type="email"
                  name="email"
                  label="Email"
                  placeholder="maria@ejemplo.com"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value)
                    setError('')
                  }}
                  error={error}
                  required
                  fullWidth
                  disabled={loading}
                  autoComplete="email"
                />

                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  fullWidth
                  disabled={loading}
                  loading={loading}
                >
                  {loading ? 'Enviando...' : 'Enviar Enlace de Recuperación'}
                </Button>

                {/* Mensaje informativo */}
                <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <p className="text-sm text-blue-800">
                    Ingresa el email asociado a tu cuenta y te enviaremos un enlace
                    seguro para restablecer tu contraseña.
                  </p>
                </div>

                {/* Links de navegación */}
                <div className="space-y-3">
                  <div className="text-center">
                    <Link
                      to="/cliente/login"
                      className="text-sm text-primary hover:text-primary-dark transition-colors"
                    >
                      ← Volver al Login
                    </Link>
                  </div>
                  <div className="text-center">
                    <Link
                      to="/"
                      className="text-sm text-gray-600 hover:text-gray-800 transition-colors"
                    >
                      Ir a la página principal
                    </Link>
                  </div>
                </div>
              </form>
            )}
          </Card>
        </div>
      </div>
    </>
  )
}

export default ForgotPassword
