/**
 * Página de Resetear Contraseña con Token
 */

import { useState, useEffect } from 'react'
import { Link, Navigate, useNavigate, useSearchParams } from 'react-router-dom'
import { useClienteAuth } from '../../context/ClienteAuthContext'
import { resetPassword } from '../../services/clienteAPI'
import SEO from '../../components/common/SEO'
import Card from '../../components/common/Card'
import Input from '../../components/common/Input'
import Button from '../../components/common/Button'
import { showSuccess, showError } from '../../utils/toastConfig'

function ResetPassword() {
  const navigate = useNavigate()
  const { isAuthenticated } = useClienteAuth()
  const [searchParams] = useSearchParams()

  const [formData, setFormData] = useState({
    passwordNueva: '',
    passwordConfirm: ''
  })
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState({})
  const [token, setToken] = useState(null)
  const [success, setSuccess] = useState(false)

  // Obtener token de la URL (DEBE estar antes del early return)
  useEffect(() => {
    const tokenParam = searchParams.get('token')
    if (!tokenParam) {
      showError('Token de recuperación no encontrado')
    }
    setToken(tokenParam)
  }, [searchParams])

  // Si ya está autenticado, redirigir al dashboard
  if (isAuthenticated) {
    return <Navigate to="/cliente/dashboard" replace />
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }))
    // Limpiar error del campo
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  const validate = () => {
    const newErrors = {}

    if (!formData.passwordNueva) {
      newErrors.passwordNueva = 'La contraseña es requerida'
    } else if (formData.passwordNueva.length < 8) {
      newErrors.passwordNueva = 'La contraseña debe tener al menos 8 caracteres'
    } else if (!/(?=.*[a-z])/.test(formData.passwordNueva)) {
      newErrors.passwordNueva = 'Debe contener al menos una letra minúscula'
    } else if (!/(?=.*[A-Z])/.test(formData.passwordNueva)) {
      newErrors.passwordNueva = 'Debe contener al menos una letra mayúscula'
    } else if (!/(?=.*\d)/.test(formData.passwordNueva)) {
      newErrors.passwordNueva = 'Debe contener al menos un número'
    }

    if (!formData.passwordConfirm) {
      newErrors.passwordConfirm = 'Debes confirmar la contraseña'
    } else if (formData.passwordNueva !== formData.passwordConfirm) {
      newErrors.passwordConfirm = 'Las contraseñas no coinciden'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!token) {
      showError('Token de recuperación no válido')
      return
    }

    if (!validate()) {
      return
    }

    setLoading(true)

    try {
      const result = await resetPassword(token, formData.passwordNueva)

      showSuccess('¡Contraseña restablecida exitosamente!')
      setSuccess(true)

      // Redirigir al login después de 2 segundos
      setTimeout(() => {
        navigate('/cliente/login')
      }, 2000)
    } catch (error) {
      console.error('Error en reset password:', error)
      showError(error.message || 'Error al restablecer contraseña')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <SEO
        title="Restablecer Contraseña - Portal del Cliente"
        description="Restablece tu contraseña del portal de cliente de MiSalons"
        url="https://misalons.com/cliente/reset-password"
      />

      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-16 px-4">
        <div className="container mx-auto max-w-md">
          <div className="text-center mb-8">
            <Link to="/" className="inline-block mb-4">
              <h1 className="text-3xl font-bold text-primary">MiSalons</h1>
            </Link>
            <h2 className="text-2xl font-bold text-gray-800">
              {success ? '¡Contraseña Restablecida!' : 'Restablecer Contraseña'}
            </h2>
            <p className="text-gray-600 mt-2">
              {success
                ? 'Ya puedes iniciar sesión con tu nueva contraseña'
                : 'Ingresa tu nueva contraseña'}
            </p>
          </div>

          <Card padding="lg" shadow>
            {success ? (
              // Estado de éxito
              <div className="space-y-6">
                <div className="text-center py-6">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg
                      className="w-8 h-8 text-green-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">
                    ¡Contraseña Restablecida!
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Tu contraseña ha sido actualizada exitosamente.
                  </p>
                  <p className="text-sm text-gray-500">
                    Serás redirigido al login en un momento...
                  </p>
                </div>

                <div className="text-center">
                  <Link
                    to="/cliente/login"
                    className="inline-block text-primary hover:text-primary-dark transition-colors font-semibold"
                  >
                    Ir al Login ahora →
                  </Link>
                </div>
              </div>
            ) : !token ? (
              // Token inválido o no presente
              <div className="space-y-6">
                <div className="text-center py-6">
                  <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg
                      className="w-8 h-8 text-red-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">Enlace Inválido</h3>
                  <p className="text-gray-600 mb-4">
                    El enlace de recuperación es inválido o ha expirado.
                  </p>
                </div>

                <div className="text-center space-y-3">
                  <Link
                    to="/cliente/forgot-password"
                    className="block text-primary hover:text-primary-dark transition-colors font-semibold"
                  >
                    Solicitar nuevo enlace →
                  </Link>
                  <Link
                    to="/cliente/login"
                    className="block text-sm text-gray-600 hover:text-gray-800 transition-colors"
                  >
                    ← Volver al Login
                  </Link>
                </div>
              </div>
            ) : (
              // Formulario para nueva contraseña
              <form onSubmit={handleSubmit} className="space-y-6">
                <Input
                  type="password"
                  name="passwordNueva"
                  label="Nueva Contraseña"
                  placeholder="Mínimo 8 caracteres"
                  value={formData.passwordNueva}
                  onChange={handleChange}
                  error={errors.passwordNueva}
                  required
                  fullWidth
                  disabled={loading}
                  autoComplete="new-password"
                />

                <Input
                  type="password"
                  name="passwordConfirm"
                  label="Confirmar Contraseña"
                  placeholder="Repite tu nueva contraseña"
                  value={formData.passwordConfirm}
                  onChange={handleChange}
                  error={errors.passwordConfirm}
                  required
                  fullWidth
                  disabled={loading}
                  autoComplete="new-password"
                />

                {/* Requisitos de contraseña */}
                <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <p className="text-sm font-semibold text-blue-800 mb-2">
                    Requisitos de contraseña:
                  </p>
                  <ul className="text-sm text-blue-800 space-y-1 list-disc list-inside">
                    <li>Mínimo 8 caracteres</li>
                    <li>Al menos una letra mayúscula</li>
                    <li>Al menos una letra minúscula</li>
                    <li>Al menos un número</li>
                  </ul>
                </div>

                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  fullWidth
                  disabled={loading}
                  loading={loading}
                >
                  {loading ? 'Restableciendo...' : 'Restablecer Contraseña'}
                </Button>

                {/* Links de navegación */}
                <div className="space-y-3">
                  <div className="text-center">
                    <Link
                      to="/cliente/login"
                      className="text-sm text-gray-600 hover:text-gray-800 transition-colors"
                    >
                      ← Volver al Login
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

export default ResetPassword
