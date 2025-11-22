/**
 * Dashboard Principal del Panel de Administración
 */

import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAdminAuth } from '../../context/AdminAuthContext'
import { getEstadisticas } from '../../services/adminAPI'
import SEO from '../../components/common/SEO'
import Card from '../../components/common/Card'
import Button from '../../components/common/Button'
import { showError } from '../../utils/toastConfig'

function AdminDashboard() {
  const { logout } = useAdminAuth()
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadEstadisticas()
  }, [])

  const loadEstadisticas = async () => {
    try {
      const data = await getEstadisticas()
      setStats(data)
    } catch (error) {
      console.error('Error al cargar estadísticas:', error)
      showError('Error al cargar estadísticas')
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = () => {
    logout()
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary mb-4"></div>
          <p className="text-gray-600">Cargando estadísticas...</p>
        </div>
      </div>
    )
  }

  return (
    <>
      <SEO
        title="Dashboard Admin - MiSalons"
        description="Panel de administración de MiSalons"
        url="https://misalons.com/admin/dashboard"
      />

      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="bg-white shadow-sm border-b">
          <div className="container mx-auto px-4 py-4">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-2xl font-bold text-gray-800">Panel de Administración</h1>
                <p className="text-sm text-gray-600 mt-1">MiSalons - Gestión de Clientes</p>
              </div>
              <Button variant="outline" size="sm" onClick={handleLogout}>
                Cerrar Sesión
              </Button>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="container mx-auto px-4 py-8">
          {/* Navigation */}
          <div className="mb-8">
            <nav className="flex space-x-4">
              <Link
                to="/admin/dashboard"
                className="px-4 py-2 bg-primary text-white rounded-lg font-semibold"
              >
                Dashboard
              </Link>
              <Link
                to="/admin/clientes"
                className="px-4 py-2 bg-white text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
              >
                Clientes
              </Link>
              <Link
                to="/admin/solicitudes"
                className="px-4 py-2 bg-white text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
              >
                Solicitudes
              </Link>
              <Link
                to="/admin/onboarding"
                className="px-4 py-2 bg-white text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
              >
                Onboarding
              </Link>
            </nav>
          </div>

          {/* Estadísticas */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {/* Total Clientes */}
            <Card padding="lg" shadow>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 font-semibold">Total Clientes</p>
                  <p className="text-3xl font-bold text-gray-800 mt-2">
                    {stats?.clientes.total || 0}
                  </p>
                  <p className="text-sm text-green-600 mt-1">
                    {stats?.clientes.activos || 0} activos
                  </p>
                </div>
                <div className="bg-blue-100 p-3 rounded-full">
                  <svg
                    className="w-8 h-8 text-blue-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                </div>
              </div>
            </Card>

            {/* Suscripciones Activas */}
            <Card padding="lg" shadow>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 font-semibold">Suscripciones Activas</p>
                  <p className="text-3xl font-bold text-gray-800 mt-2">
                    {stats?.suscripciones.activas || 0}
                  </p>
                  <p className="text-sm text-gray-500 mt-1">
                    {stats?.suscripciones.canceladas || 0} canceladas
                  </p>
                </div>
                <div className="bg-green-100 p-3 rounded-full">
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
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
              </div>
            </Card>

            {/* Ingresos Mensuales */}
            <Card padding="lg" shadow>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 font-semibold">Ingresos Mensuales</p>
                  <p className="text-3xl font-bold text-gray-800 mt-2">
                    ${stats?.ingresos.mensual || 0}
                  </p>
                  <p className="text-sm text-gray-500 mt-1">MRR estimado</p>
                </div>
                <div className="bg-yellow-100 p-3 rounded-full">
                  <svg
                    className="w-8 h-8 text-yellow-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
              </div>
            </Card>

            {/* Solicitudes Pendientes */}
            <Card padding="lg" shadow>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 font-semibold">Solicitudes Pendientes</p>
                  <p className="text-3xl font-bold text-gray-800 mt-2">
                    {stats?.solicitudes.pendientes || 0}
                  </p>
                  <p className="text-sm text-gray-500 mt-1">
                    {stats?.solicitudes.total || 0} total
                  </p>
                </div>
                <div className="bg-orange-100 p-3 rounded-full">
                  <svg
                    className="w-8 h-8 text-orange-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                </div>
              </div>
            </Card>
          </div>

          {/* Distribución por Plan */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card padding="lg" shadow>
              <h3 className="text-lg font-bold text-gray-800 mb-4">Distribución por Plan</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm text-gray-600">Plan Básico</span>
                    <span className="text-sm font-semibold text-gray-800">
                      {stats?.planes.basico || 0}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-500 h-2 rounded-full"
                      style={{
                        width: `${(stats?.planes.basico / stats?.clientes.total) * 100 || 0}%`
                      }}
                    ></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm text-gray-600">Plan Estándar</span>
                    <span className="text-sm font-semibold text-gray-800">
                      {stats?.planes.estandar || 0}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-green-500 h-2 rounded-full"
                      style={{
                        width: `${(stats?.planes.estandar / stats?.clientes.total) * 100 || 0}%`
                      }}
                    ></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm text-gray-600">Plan Premium</span>
                    <span className="text-sm font-semibold text-gray-800">
                      {stats?.planes.premium || 0}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-yellow-500 h-2 rounded-full"
                      style={{
                        width: `${(stats?.planes.premium / stats?.clientes.total) * 100 || 0}%`
                      }}
                    ></div>
                  </div>
                </div>
              </div>
            </Card>

            <Card padding="lg" shadow>
              <h3 className="text-lg font-bold text-gray-800 mb-4">Estado de Clientes</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                  <span className="text-sm font-semibold text-green-800">Activos</span>
                  <span className="text-lg font-bold text-green-800">
                    {stats?.clientes.activos || 0}
                  </span>
                </div>
                <div className="flex justify-between items-center p-3 bg-yellow-50 rounded-lg">
                  <span className="text-sm font-semibold text-yellow-800">Suspendidos</span>
                  <span className="text-lg font-bold text-yellow-800">
                    {stats?.clientes.suspendidos || 0}
                  </span>
                </div>
                <div className="flex justify-between items-center p-3 bg-red-50 rounded-lg">
                  <span className="text-sm font-semibold text-red-800">Cancelados</span>
                  <span className="text-lg font-bold text-red-800">
                    {stats?.clientes.cancelados || 0}
                  </span>
                </div>
              </div>
            </Card>
          </div>

          {/* Actions */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link to="/admin/clientes">
              <Card
                padding="lg"
                shadow
                className="hover:shadow-lg transition-shadow cursor-pointer"
              >
                <div className="text-center">
                  <svg
                    className="w-12 h-12 text-primary mx-auto mb-3"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                  <h4 className="font-bold text-gray-800">Gestionar Clientes</h4>
                  <p className="text-sm text-gray-600 mt-1">Ver y administrar todos los clientes</p>
                </div>
              </Card>
            </Link>

            <Link to="/admin/solicitudes">
              <Card
                padding="lg"
                shadow
                className="hover:shadow-lg transition-shadow cursor-pointer"
              >
                <div className="text-center">
                  <svg
                    className="w-12 h-12 text-primary mx-auto mb-3"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                  <h4 className="font-bold text-gray-800">Ver Solicitudes</h4>
                  <p className="text-sm text-gray-600 mt-1">Revisar solicitudes de suscripción</p>
                </div>
              </Card>
            </Link>

            <Link to="/admin/onboarding">
              <Card
                padding="lg"
                shadow
                className="hover:shadow-lg transition-shadow cursor-pointer"
              >
                <div className="text-center">
                  <svg
                    className="w-12 h-12 text-primary mx-auto mb-3"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                    />
                  </svg>
                  <h4 className="font-bold text-gray-800">Onboarding</h4>
                  <p className="text-sm text-gray-600 mt-1">Gestionar formularios completos</p>
                </div>
              </Card>
            </Link>

            <Card
              padding="lg"
              shadow
              className="hover:shadow-lg transition-shadow cursor-pointer"
              onClick={loadEstadisticas}
            >
              <div className="text-center">
                <svg
                  className="w-12 h-12 text-primary mx-auto mb-3"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                  />
                </svg>
                <h4 className="font-bold text-gray-800">Actualizar Datos</h4>
                <p className="text-sm text-gray-600 mt-1">Recargar estadísticas</p>
              </div>
            </Card>
          </div>
        </main>
      </div>
    </>
  )
}

export default AdminDashboard
