/**
 * Página de Login para Administradores
 */

import { useState } from 'react'
import { useNavigate, Navigate } from 'react-router-dom'
import { useAdminAuth } from '../../context/AdminAuthContext'
import { login as apiLogin } from '../../services/adminAPI'
import SEO from '../../components/common/SEO'
import Card from '../../components/common/Card'
import Input from '../../components/common/Input'
import Button from '../../components/common/Button'
import { showSuccess, showError } from '../../utils/toastConfig'

function AdminLogin() {
  const navigate = useNavigate()
  const { login, isAuthenticated } = useAdminAuth()

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState({})

  // Si ya está autenticado, redirigir al dashboard
  if (isAuthenticated) {
    return <Navigate to="/admin/dashboard" replace />
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

    if (!formData.email.trim()) {
      newErrors.email = 'El email es requerido'
    }

    if (!formData.password) {
      newErrors.password = 'La contraseña es requerida'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!validate()) {
      return
    }

    setLoading(true)

    try {
      await apiLogin(formData.email, formData.password)

      // Actualizar contexto
      login()

      showSuccess('¡Bienvenido al panel de administración!')

      // Redirigir al dashboard
      navigate('/admin/dashboard')
    } catch (error) {
      console.error('Error en login de admin:', error)
      showError(error.message || 'Error al iniciar sesión')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <SEO
        title="Login Administrador - MiSalons"
        description="Panel de administración de MiSalons"
        url="https://misalons.com/admin/login"
      />

      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 py-16 px-4">
        <div className="container mx-auto max-w-md">
          <div className="text-center mb-8">
            <div className="inline-block bg-primary/10 p-4 rounded-full mb-4">
              <svg
                className="w-12 h-12 text-primary"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
            </div>
            <h2 className="text-3xl font-bold text-white">Panel de Administración</h2>
            <p className="text-gray-400 mt-2">Ingresa tus credenciales de administrador</p>
          </div>

          <Card padding="lg" shadow>
            <form onSubmit={handleSubmit} className="space-y-6">
              <Input
                type="email"
                name="email"
                label="Email"
                placeholder="admin@multisalon.com"
                value={formData.email}
                onChange={handleChange}
                error={errors.email}
                required
                fullWidth
                disabled={loading}
                autoComplete="username"
              />

              <Input
                type="password"
                name="password"
                label="Contraseña"
                placeholder="Tu contraseña"
                value={formData.password}
                onChange={handleChange}
                error={errors.password}
                required
                fullWidth
                disabled={loading}
                autoComplete="current-password"
              />

              <Button
                type="submit"
                variant="primary"
                size="lg"
                fullWidth
                disabled={loading}
                loading={loading}
              >
                {loading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
              </Button>

              {/* Advertencia de seguridad */}
              <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <p className="text-sm text-yellow-800">
                  <strong>🔒 Acceso Restringido:</strong> Este panel es solo para administradores
                  autorizados. Todos los accesos son registrados.
                </p>
              </div>
            </form>
          </Card>

          {/* Link para volver */}
          <div className="mt-6 text-center">
            <a href="/" className="text-sm text-gray-400 hover:text-gray-300 transition-colors">
              ← Volver a la página principal
            </a>
          </div>
        </div>
      </div>
    </>
  )
}

export default AdminLogin
