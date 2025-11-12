/**
 * Dashboard del Cliente
 * Panel principal donde el cliente puede ver su información y gestionar su cuenta
 */

import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useClienteAuth } from '../../context/ClienteAuthContext'
import { getProfile, changePassword as apiChangePassword } from '../../services/clienteAPI'
import SEO from '../../components/common/SEO'
import Card from '../../components/common/Card'
import Button from '../../components/common/Button'
import Input from '../../components/common/Input'
import { showSuccess, showError } from '../../utils/toastConfig'

function ClienteDashboard() {
  const navigate = useNavigate()
  const { cliente, logout, updateCliente } = useClienteAuth()

  const [perfil, setPerfil] = useState(null)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('perfil') // 'perfil', 'password', 'suscripcion'

  // Estado del formulario de cambio de contraseña
  const [passwordForm, setPasswordForm] = useState({
    passwordActual: '',
    passwordNueva: '',
    passwordConfirm: ''
  })
  const [changingPassword, setChangingPassword] = useState(false)
  const [passwordErrors, setPasswordErrors] = useState({})

  useEffect(() => {
    loadProfile()
  }, [])

  const loadProfile = async () => {
    try {
      setLoading(true)
      const perfilData = await getProfile()
      setPerfil(perfilData)
      updateCliente(perfilData)
    } catch (error) {
      console.error('Error al cargar perfil:', error)
      showError(error.message || 'Error al cargar tu perfil')
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = () => {
    logout()
    showSuccess('Sesión cerrada correctamente')
    navigate('/cliente/login')
  }

  const handlePasswordChange = (e) => {
    const { name, value } = e.target
    setPasswordForm(prev => ({
      ...prev,
      [name]: value
    }))
    // Limpiar errores
    if (passwordErrors[name]) {
      setPasswordErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  const validatePasswordForm = () => {
    const errors = {}

    if (!passwordForm.passwordActual) {
      errors.passwordActual = 'La contraseña actual es requerida'
    }

    if (!passwordForm.passwordNueva) {
      errors.passwordNueva = 'La contraseña nueva es requerida'
    } else if (passwordForm.passwordNueva.length < 8) {
      errors.passwordNueva = 'La contraseña debe tener al menos 8 caracteres'
    }

    if (!passwordForm.passwordConfirm) {
      errors.passwordConfirm = 'Confirma tu nueva contraseña'
    } else if (passwordForm.passwordNueva !== passwordForm.passwordConfirm) {
      errors.passwordConfirm = 'Las contraseñas no coinciden'
    }

    setPasswordErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handlePasswordSubmit = async (e) => {
    e.preventDefault()

    if (!validatePasswordForm()) {
      return
    }

    setChangingPassword(true)

    try {
      await apiChangePassword(passwordForm.passwordActual, passwordForm.passwordNueva)

      showSuccess('¡Contraseña cambiada exitosamente!')

      // Limpiar formulario
      setPasswordForm({
        passwordActual: '',
        passwordNueva: '',
        passwordConfirm: ''
      })
    } catch (error) {
      console.error('Error al cambiar contraseña:', error)
      showError(error.message || 'Error al cambiar contraseña')
    } finally {
      setChangingPassword(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-gray-600">Cargando tu información...</p>
        </div>
      </div>
    )
  }

  return (
    <>
      <SEO
        title="Mi Dashboard - Portal del Cliente"
        description="Gestiona tu cuenta y suscripción de MiSalons"
        url="https://misalons.com/cliente/dashboard"
      />

      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-white shadow">
          <div className="container mx-auto px-4 py-4">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-2xl font-bold text-gray-800">MiSalons</h1>
                <p className="text-sm text-gray-600">Portal del Cliente</p>
              </div>
              <Button variant="outline" size="sm" onClick={handleLogout}>
                Cerrar Sesión
              </Button>
            </div>
          </div>
        </div>

        {/* Bienvenida */}
        <div className="bg-gradient-to-r from-primary to-blue-600 text-white py-8">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold">¡Hola, {perfil?.nombreCompleto}!</h2>
            <p className="mt-2 text-blue-100">Bienvenido a tu portal de cliente</p>
          </div>
        </div>

        {/* Contenido Principal */}
        <div className="container mx-auto px-4 py-8">
          {/* Tabs */}
          <div className="mb-6 border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              <button
                onClick={() => setActiveTab('perfil')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'perfil'
                    ? 'border-primary text-primary'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Mi Perfil
              </button>
              <button
                onClick={() => setActiveTab('password')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'password'
                    ? 'border-primary text-primary'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Cambiar Contraseña
              </button>
              <button
                onClick={() => setActiveTab('suscripcion')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'suscripcion'
                    ? 'border-primary text-primary'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Suscripción
              </button>
            </nav>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Contenido Principal */}
            <div className="lg:col-span-2">
              {/* Tab: Perfil */}
              {activeTab === 'perfil' && (
                <Card padding="lg" shadow>
                  <h3 className="text-2xl font-bold mb-6">Información del Perfil</h3>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Nombre Completo
                      </label>
                      <p className="text-lg text-gray-900">{perfil?.nombreCompleto}</p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Usuario
                      </label>
                      <p className="text-lg text-gray-900 font-mono bg-gray-50 px-3 py-2 rounded">
                        {perfil?.usuario}
                      </p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Email
                      </label>
                      <p className="text-lg text-gray-900">{perfil?.email}</p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Teléfono
                      </label>
                      <p className="text-lg text-gray-900">{perfil?.telefono}</p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Nombre del Salón
                      </label>
                      <p className="text-lg text-gray-900 font-semibold">{perfil?.nombreSalon}</p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Estado de la Cuenta
                      </label>
                      <span
                        className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${
                          perfil?.estado === 'activo'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {perfil?.estado === 'activo' ? 'Activa' : 'Inactiva'}
                      </span>
                    </div>
                  </div>
                </Card>
              )}

              {/* Tab: Cambiar Contraseña */}
              {activeTab === 'password' && (
                <Card padding="lg" shadow>
                  <h3 className="text-2xl font-bold mb-6">Cambiar Contraseña</h3>

                  <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <p className="text-sm text-yellow-800">
                      <strong>Recomendación:</strong> Si aún usas la contraseña temporal que
                      recibiste por email, te recomendamos cambiarla por una contraseña segura y
                      personal.
                    </p>
                  </div>

                  <form onSubmit={handlePasswordSubmit} className="space-y-6">
                    <Input
                      type="password"
                      name="passwordActual"
                      label="Contraseña Actual"
                      placeholder="Tu contraseña actual"
                      value={passwordForm.passwordActual}
                      onChange={handlePasswordChange}
                      error={passwordErrors.passwordActual}
                      required
                      fullWidth
                      disabled={changingPassword}
                    />

                    <Input
                      type="password"
                      name="passwordNueva"
                      label="Nueva Contraseña"
                      placeholder="Mínimo 8 caracteres"
                      value={passwordForm.passwordNueva}
                      onChange={handlePasswordChange}
                      error={passwordErrors.passwordNueva}
                      required
                      fullWidth
                      disabled={changingPassword}
                    />

                    <Input
                      type="password"
                      name="passwordConfirm"
                      label="Confirmar Nueva Contraseña"
                      placeholder="Repite tu nueva contraseña"
                      value={passwordForm.passwordConfirm}
                      onChange={handlePasswordChange}
                      error={passwordErrors.passwordConfirm}
                      required
                      fullWidth
                      disabled={changingPassword}
                    />

                    <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                      <p className="text-sm text-blue-800">
                        <strong>Requisitos de contraseña:</strong>
                      </p>
                      <ul className="mt-2 text-sm text-blue-700 list-disc list-inside">
                        <li>Mínimo 8 caracteres</li>
                        <li>Al menos 1 mayúscula</li>
                        <li>Al menos 1 minúscula</li>
                        <li>Al menos 1 número</li>
                      </ul>
                    </div>

                    <Button
                      type="submit"
                      variant="primary"
                      size="lg"
                      fullWidth
                      disabled={changingPassword}
                      loading={changingPassword}
                    >
                      {changingPassword ? 'Cambiando contraseña...' : 'Cambiar Contraseña'}
                    </Button>
                  </form>
                </Card>
              )}

              {/* Tab: Suscripción */}
              {activeTab === 'suscripcion' && (
                <Card padding="lg" shadow>
                  <h3 className="text-2xl font-bold mb-6">Estado de Suscripción</h3>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Plan Seleccionado
                      </label>
                      <p className="text-lg text-gray-900 font-semibold">
                        {perfil?.planSeleccionado}
                      </p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Estado de Suscripción
                      </label>
                      <span
                        className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${
                          perfil?.estadoSuscripcion === 'activa'
                            ? 'bg-green-100 text-green-800'
                            : perfil?.estadoSuscripcion === 'pendiente'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {perfil?.estadoSuscripcion === 'activa'
                          ? 'Activa'
                          : perfil?.estadoSuscripcion === 'pendiente'
                          ? 'Pendiente'
                          : 'Cancelada'}
                      </span>
                    </div>

                    {perfil?.estadoSuscripcion === 'pendiente' && (
                      <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                        <h4 className="font-semibold text-yellow-800 mb-2">Suscripción Pendiente</h4>
                        <p className="text-sm text-yellow-700">
                          Tu solicitud está siendo procesada. Nuestro equipo te contactará pronto
                          para coordinar los detalles del montaje y procesar tu primer pago.
                        </p>
                      </div>
                    )}

                    {perfil?.estadoSuscripcion === 'activa' && (
                      <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                        <h4 className="font-semibold text-green-800 mb-2">Suscripción Activa</h4>
                        <p className="text-sm text-green-700">
                          Tu suscripción está activa y tu salón está configurado correctamente.
                        </p>
                        <div className="mt-4">
                          <Button variant="outline" size="sm">
                            Ver Historial de Pagos
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                </Card>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Card de Estado */}
              <Card padding="md" shadow>
                <h4 className="font-semibold text-gray-800 mb-3">Estado de tu Solicitud</h4>
                <div className="space-y-3 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Solicitud:</span>
                    <span className="font-semibold text-green-600">Recibida</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Cuenta:</span>
                    <span className="font-semibold text-green-600">Activa</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Salón:</span>
                    <span className="font-semibold text-yellow-600">
                      {perfil?.salonId ? 'Configurado' : 'Pendiente'}
                    </span>
                  </div>
                </div>
              </Card>

              {/* Card de Ayuda */}
              <Card padding="md" shadow>
                <h4 className="font-semibold text-gray-800 mb-3">¿Necesitas Ayuda?</h4>
                <p className="text-sm text-gray-600 mb-4">
                  Si tienes alguna pregunta o necesitas asistencia, no dudes en contactarnos.
                </p>
                <Button variant="outline" size="sm" fullWidth>
                  Contactar Soporte
                </Button>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ClienteDashboard
