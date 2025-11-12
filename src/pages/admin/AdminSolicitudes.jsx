/**
 * Página de Gestión de Solicitudes del Panel de Admin
 */

import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAdminAuth } from '../../context/AdminAuthContext'
import { getSolicitudes } from '../../services/adminAPI'
import SEO from '../../components/common/SEO'
import Card from '../../components/common/Card'
import Button from '../../components/common/Button'
import { showError } from '../../utils/toastConfig'

function AdminSolicitudes() {
  const { logout } = useAdminAuth()
  const [solicitudes, setSolicitudes] = useState([])
  const [loading, setLoading] = useState(true)
  const [filtroEstado, setFiltroEstado] = useState('')

  useEffect(() => {
    loadSolicitudes()
  }, [filtroEstado])

  const loadSolicitudes = async () => {
    try {
      setLoading(true)
      const data = await getSolicitudes({ estado: filtroEstado })
      setSolicitudes(data.solicitudes)
    } catch (error) {
      console.error('Error al cargar solicitudes:', error)
      showError('Error al cargar solicitudes')
    } finally {
      setLoading(false)
    }
  }

  const getEstadoBadge = (estado) => {
    const badges = {
      pendiente: 'bg-yellow-100 text-yellow-800',
      procesado: 'bg-green-100 text-green-800',
      rechazado: 'bg-red-100 text-red-800'
    }
    return badges[estado] || 'bg-gray-100 text-gray-800'
  }

  return (
    <>
      <SEO
        title="Gestión de Solicitudes - Admin"
        description="Panel de administración de solicitudes"
        url="https://misalons.com/admin/solicitudes"
      />

      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="bg-white shadow-sm border-b">
          <div className="container mx-auto px-4 py-4">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-2xl font-bold text-gray-800">Gestión de Solicitudes</h1>
                <p className="text-sm text-gray-600 mt-1">Todas las solicitudes de suscripción</p>
              </div>
              <Button variant="outline" size="sm" onClick={logout}>
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
                className="px-4 py-2 bg-white text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
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
                className="px-4 py-2 bg-primary text-white rounded-lg font-semibold"
              >
                Solicitudes
              </Link>
            </nav>
          </div>

          {/* Filtros */}
          <Card padding="md" shadow className="mb-6">
            <div className="flex gap-4">
              <select
                value={filtroEstado}
                onChange={(e) => setFiltroEstado(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                <option value="">Todos los estados</option>
                <option value="pendiente">Pendientes</option>
                <option value="procesado">Procesadas</option>
                <option value="rechazado">Rechazadas</option>
              </select>

              <Button variant="primary" onClick={loadSolicitudes}>
                Actualizar
              </Button>
            </div>
          </Card>

          {/* Tabla de Solicitudes */}
          <Card padding="none" shadow>
            {loading ? (
              <div className="p-12 text-center">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary mb-4"></div>
                <p className="text-gray-600">Cargando solicitudes...</p>
              </div>
            ) : solicitudes.length === 0 ? (
              <div className="p-12 text-center">
                <p className="text-gray-600">No hay solicitudes para mostrar</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Salón</th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Propietario</th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Email</th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Plan</th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Estado</th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Fecha</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {solicitudes.map((solicitud) => (
                      <tr key={solicitud.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap font-semibold text-gray-800">
                          {solicitud.nombreSalon}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                          {solicitud.nombrePropietario}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                          {solicitud.email}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                          {solicitud.plan?.split(' - ')[0] || 'N/A'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getEstadoBadge(solicitud.estado)}`}>
                            {solicitud.estado}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {new Date(solicitud.fechaSolicitud).toLocaleDateString('es-ES')}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </Card>

          <div className="mt-4 text-sm text-gray-600">
            Total de solicitudes: {solicitudes.length}
          </div>
        </main>
      </div>
    </>
  )
}

export default AdminSolicitudes
