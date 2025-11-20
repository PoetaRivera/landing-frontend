/**
 * Página de Reseteo de Contraseña
 * Permite al admin establecer una nueva contraseña usando el token del email
 */

import { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { resetPassword } from '../../services/adminAPI'
import Button from '../../components/common/Button'
import Card from '../../components/common/Card'
import { showError, showSuccess } from '../../utils/toastConfig'
import { Lock, CheckCircle, AlertCircle, Eye, EyeOff } from 'lucide-react'

function ResetPassword() {
  const { token } = useParams()
  const navigate = useNavigate()
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [passwordStrength, setPasswordStrength] = useState({ score: 0, message: '' })

  useEffect(() => {
    // Verificar que haya un token
    if (!token) {
      showError('Token de recuperación no encontrado')
      navigate('/admin/login')
    }
  }, [token, navigate])

  // Evaluar fortaleza de contraseña
  useEffect(() => {
    if (!newPassword) {
      setPasswordStrength({ score: 0, message: '' })
      return
    }

    let score = 0
    let message = ''

    if (newPassword.length >= 8) score++
    if (newPassword.length >= 12) score++
    if (/[a-z]/.test(newPassword) && /[A-Z]/.test(newPassword)) score++
    if (/\d/.test(newPassword)) score++
    if (/[^a-zA-Z0-9]/.test(newPassword)) score++

    if (score <= 1) message = 'Muy débil'
    else if (score === 2) message = 'Débil'
    else if (score === 3) message = 'Aceptable'
    else if (score === 4) message = 'Fuerte'
    else message = 'Muy fuerte'

    setPasswordStrength({ score, message })
  }, [newPassword])

  const handleSubmit = async (e) => {
    e.preventDefault()

    // Validaciones
    if (!newPassword || newPassword.length < 8) {
      showError('La contraseña debe tener al menos 8 caracteres')
      return
    }

    if (newPassword !== confirmPassword) {
      showError('Las contraseñas no coinciden')
      return
    }

    if (passwordStrength.score < 2) {
      showError('Por favor usa una contraseña más segura')
      return
    }

    try {
      setLoading(true)
      await resetPassword(token, newPassword)
      setSuccess(true)
      showSuccess('¡Contraseña actualizada exitosamente!')

      // Redirigir al login después de 3 segundos
      setTimeout(() => {
        navigate('/admin/login')
      }, 3000)
    } catch (error) {
      console.error('Error al resetear contraseña:', error)
      showError(error.message || 'Error al resetear contraseña')
    } finally {
      setLoading(false)
    }
  }

  const getStrengthColor = () => {
    if (passwordStrength.score <= 1) return 'bg-red-500'
    if (passwordStrength.score === 2) return 'bg-orange-500'
    if (passwordStrength.score === 3) return 'bg-yellow-500'
    if (passwordStrength.score === 4) return 'bg-blue-500'
    return 'bg-green-500'
  }

  const getStrengthWidth = () => {
    return `${(passwordStrength.score / 5) * 100}%`
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
          {!success ? (
            <>
              {/* Header */}
              <div className="text-center mb-6">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
                  <Lock className="w-8 h-8 text-blue-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">
                  Establece tu nueva contraseña
                </h2>
                <p className="text-gray-600">
                  Elige una contraseña segura que no hayas usado antes
                </p>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Nueva contraseña */}
                <div>
                  <label
                    htmlFor="newPassword"
                    className="block text-sm font-semibold text-gray-700 mb-2"
                  >
                    Nueva contraseña
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      id="newPassword"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="Mínimo 8 caracteres"
                      required
                      minLength={8}
                      className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
                      disabled={loading}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>

                  {/* Password strength indicator */}
                  {newPassword && (
                    <div className="mt-2">
                      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className={`h-full ${getStrengthColor()} transition-all duration-300`}
                          style={{ width: getStrengthWidth() }}
                        ></div>
                      </div>
                      <p
                        className={`text-xs mt-1 font-semibold ${
                          passwordStrength.score <= 1
                            ? 'text-red-600'
                            : passwordStrength.score === 2
                              ? 'text-orange-600'
                              : passwordStrength.score === 3
                                ? 'text-yellow-600'
                                : passwordStrength.score === 4
                                  ? 'text-blue-600'
                                  : 'text-green-600'
                        }`}
                      >
                        Fortaleza: {passwordStrength.message}
                      </p>
                    </div>
                  )}
                </div>

                {/* Confirmar contraseña */}
                <div>
                  <label
                    htmlFor="confirmPassword"
                    className="block text-sm font-semibold text-gray-700 mb-2"
                  >
                    Confirmar contraseña
                  </label>
                  <div className="relative">
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      id="confirmPassword"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Repite tu contraseña"
                      required
                      className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
                      disabled={loading}
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="w-5 h-5" />
                      ) : (
                        <Eye className="w-5 h-5" />
                      )}
                    </button>
                  </div>

                  {/* Match indicator */}
                  {confirmPassword && (
                    <p
                      className={`text-xs mt-1 font-semibold ${
                        newPassword === confirmPassword ? 'text-green-600' : 'text-red-600'
                      }`}
                    >
                      {newPassword === confirmPassword
                        ? '✓ Las contraseñas coinciden'
                        : '✗ Las contraseñas no coinciden'}
                    </p>
                  )}
                </div>

                {/* Password requirements */}
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
                  <p className="text-xs font-semibold text-gray-700 mb-2">
                    Requisitos de contraseña:
                  </p>
                  <ul className="text-xs text-gray-600 space-y-1">
                    <li className={newPassword.length >= 8 ? 'text-green-600 font-semibold' : ''}>
                      • Al menos 8 caracteres
                    </li>
                    <li
                      className={
                        /[A-Z]/.test(newPassword) && /[a-z]/.test(newPassword)
                          ? 'text-green-600 font-semibold'
                          : ''
                      }
                    >
                      • Mayúsculas y minúsculas
                    </li>
                    <li className={/\d/.test(newPassword) ? 'text-green-600 font-semibold' : ''}>
                      • Al menos un número
                    </li>
                    <li
                      className={
                        /[^a-zA-Z0-9]/.test(newPassword) ? 'text-green-600 font-semibold' : ''
                      }
                    >
                      • Carácter especial (recomendado)
                    </li>
                  </ul>
                </div>

                <Button
                  type="submit"
                  variant="primary"
                  fullWidth
                  disabled={loading || passwordStrength.score < 2}
                >
                  {loading ? (
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Actualizando...
                    </div>
                  ) : (
                    'Actualizar contraseña'
                  )}
                </Button>
              </form>
            </>
          ) : (
            <>
              {/* Success State */}
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                  <CheckCircle className="w-8 h-8 text-green-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">¡Contraseña actualizada!</h2>
                <p className="text-gray-600 mb-6">
                  Tu contraseña ha sido cambiada exitosamente. Ya puedes iniciar sesión con tu nueva
                  contraseña.
                </p>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                  <p className="text-sm text-blue-700">
                    Serás redirigido al inicio de sesión en unos segundos...
                  </p>
                </div>

                <Button variant="primary" fullWidth onClick={() => navigate('/admin/login')}>
                  Ir al inicio de sesión ahora
                </Button>
              </div>
            </>
          )}
        </Card>

        {/* Warning about expired token */}
        {!success && (
          <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
              <div className="text-sm">
                <p className="font-semibold text-yellow-800 mb-1">Token temporal</p>
                <p className="text-yellow-700">
                  Este link expira en <strong>1 hora</strong>. Si ha expirado,{' '}
                  <Link to="/admin/forgot-password" className="underline hover:text-yellow-900">
                    solicita uno nuevo aquí
                  </Link>
                  .
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default ResetPassword
