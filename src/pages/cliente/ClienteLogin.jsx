/**
 * Página de Login para Clientes
 */

import { useState } from 'react'
import { useNavigate, Navigate, Link } from 'react-router-dom'
import { useClienteAuth } from '../../context/ClienteAuthContext'
import { login as apiLogin } from '../../services/clienteAPI'
import SEO from '../../components/common/SEO'
import Card from '../../components/common/Card'
import Input from '../../components/common/Input'
import Button from '../../components/common/Button'
import { showSuccess, showError } from '../../utils/toastConfig'

function ClienteLogin() {
  const navigate = useNavigate()
  const { login, isAuthenticated } = useClienteAuth()

  const [formData, setFormData] = useState({
    identifier: '',
    password: ''
  })
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState({})

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

    if (!formData.identifier.trim()) {
      newErrors.identifier = 'El usuario o email es requerido'
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
      const { cliente } = await apiLogin(formData.identifier, formData.password)

      // Actualizar contexto
      login(cliente)

      showSuccess('¡Bienvenido de vuelta!')

      // Redirigir según el estado del cliente
      if (cliente.estado === 'pendiente_onboarding') {
        // Cliente necesita completar onboarding
        showSuccess('Por favor, completa el formulario de configuración de tu salón')
        navigate('/cliente/onboarding')
      } else {
        // Cliente ya completó onboarding
        navigate('/cliente/dashboard')
      }
    } catch (error) {
      console.error('Error en login:', error)
      showError(error.message || 'Error al iniciar sesión')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <SEO
        title="Portal del Cliente - Login"
        description="Accede a tu portal de cliente de MiSalons para gestionar tu suscripción y ver el estado de tu salón."
        url="https://misalons.com/cliente/login"
      />

      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-16 px-4">
        <div className="container mx-auto max-w-md">
          <div className="text-center mb-8">
            <Link to="/" className="inline-block mb-4">
              <h1 className="text-3xl font-bold text-primary">MiSalons</h1>
            </Link>
            <h2 className="text-2xl font-bold text-gray-800">Portal del Cliente</h2>
            <p className="text-gray-600 mt-2">Accede a tu cuenta para gestionar tu suscripción</p>
          </div>

          <Card padding="lg" shadow>
            <form onSubmit={handleSubmit} className="space-y-6">
              <Input
                type="text"
                name="identifier"
                label="Usuario o Email"
                placeholder="maria.garcia o maria@ejemplo.com"
                value={formData.identifier}
                onChange={handleChange}
                error={errors.identifier}
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

              {/* Mensaje de ayuda */}
              <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-sm text-blue-800">
                  <strong>¿Primera vez?</strong> Revisa tu email donde te enviamos tus credenciales
                  de acceso después de completar el formulario de suscripción.
                </p>
              </div>

              {/* Link para recuperar contraseña */}
              <div className="text-center text-sm text-gray-600">
                <p>
                  ¿Olvidaste tu contraseña?{' '}
                  <Link
                    to="/cliente/forgot-password"
                    className="text-primary hover:text-primary-dark font-semibold"
                  >
                    Recupérala aquí
                  </Link>
                </p>
              </div>

              {/* Link para volver */}
              <div className="text-center">
                <Link
                  to="/"
                  className="text-sm text-primary hover:text-primary-dark transition-colors"
                >
                  ← Volver a la página principal
                </Link>
              </div>
            </form>
          </Card>

          {/* Información adicional */}
          <div className="mt-8 text-center">
            <p className="text-sm text-gray-600">
              ¿Aún no tienes cuenta?{' '}
              <Link
                to="/suscripcion"
                className="text-primary hover:text-primary-dark font-semibold"
              >
                Regístrate aquí
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  )
}

export default ClienteLogin
