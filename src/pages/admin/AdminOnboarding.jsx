/**
 * Página de Gestión de Solicitudes Completas (Onboarding) del Panel de Admin
 */

import { useState, useEffect, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { useAdminAuth } from '../../context/AdminAuthContext'
import {
  getSolicitudesCompletas,
  updateSolicitudCompletaEstado,
  crearSalonDesdeSolicitud
} from '../../services/adminAPI'
import SEO from '../../components/common/SEO'
import Card from '../../components/common/Card'
import Button from '../../components/common/Button'
import OnboardingDetailModal from '../../components/admin/OnboardingDetailModal'
import { showError, showSuccess } from '../../utils/toastConfig'
import { Eye, Sparkles } from 'lucide-react'

function AdminOnboarding() {
  const { logout } = useAdminAuth()
  const [solicitudes, setSolicitudes] = useState([])
  const [loading, setLoading] = useState(true)
  const [filtroEstado, setFiltroEstado] = useState('')
  const [selectedSolicitud, setSelectedSolicitud] = useState(null)
  const [showModal, setShowModal] = useState(false)

  const loadSolicitudes = useCallback(async () => {
    try {
      setLoading(true)
      const data = await getSolicitudesCompletas({ estado: filtroEstado })
      setSolicitudes(data.solicitudes)
    } catch (error) {
      console.error('Error al cargar solicitudes:', error)
      showError('Error al cargar solicitudes de onboarding')
    } finally {
      setLoading(false)
    }
  }, [filtroEstado])

  useEffect(() => {
    loadSolicitudes()
  }, [loadSolicitudes])

  const handleVerDetalle = (solicitud) => {
    setSelectedSolicitud(solicitud)
    setShowModal(true)
  }

  const handleCloseModal = () => {
    setShowModal(false)
    setSelectedSolicitud(null)
  }

  const handleUpdateEstado = async (solicitudId, nuevoEstado, notas) => {
    try {
      await updateSolicitudCompletaEstado(solicitudId, nuevoEstado, notas)
      showSuccess(`Solicitud actualizada a estado: ${nuevoEstado}`)
      await loadSolicitudes() // Recargar lista
    } catch (error) {
      console.error('Error al actualizar solicitud:', error)
      showError(error.message || 'Error al actualizar solicitud')
      throw error // Re-throw para que el modal lo maneje
    }
  }

  const handleCrearSalon = async (solicitudId) => {
    try {
      const resultado = await crearSalonDesdeSolicitud(solicitudId)

      // Mostrar mensaje con credenciales generadas
      showSuccess(
        `¡Salón creado exitosamente! Usuario: ${resultado.data.usuario} | Password: ${resultado.data.passwordTemporal} (enviado por email)`
      )

      await loadSolicitudes() // Recargar lista
      handleCloseModal()
      return resultado
    } catch (error) {
      console.error('Error al crear salón:', error)
      showError(error.message || 'Error al crear salón')
      throw error
    }
  }

  const getEstadoBadge = (estado) => {
    const badges = {
      pendiente_revision: 'bg-yellow-100 text-yellow-800',
      aprobado: 'bg-blue-100 text-blue-800',
      completado: 'bg-green-100 text-green-800',
      rechazado: 'bg-red-100 text-red-800'
    }
    return badges[estado] || 'bg-gray-100 text-gray-800'
  }

  const getEstadoLabel = (estado) => {
    const labels = {
      pendiente_revision: 'Pendiente Revisión',
      aprobado: 'Aprobado',
      completado: 'Completado',
      rechazado: 'Rechazado'
    }
    return labels[estado] || estado
  }

  return (
    <>
      <SEO
        title="Onboarding - Admin"
        description="Panel de administración de solicitudes de onboarding"
        url="https://misalons.com/admin/onboarding"
      />

      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="bg-white shadow-sm border-b">
          <div className="container mx-auto px-4 py-4">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                  <Sparkles className="w-6 h-6 text-primary" />
                  Solicitudes de Onboarding
                </h1>
                <p className="text-sm text-gray-600 mt-1">
                  Formularios completos de nuevos salones
                </p>
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
                className="px-4 py-2 bg-white text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
              >
                Solicitudes Básicas
              </Link>
              <Link
                to="/admin/onboarding"
                className="px-4 py-2 bg-primary text-white rounded-lg font-semibold"
              >
                Onboarding
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
                <option value="pendiente_revision">Pendientes Revisión</option>
                <option value="aprobado">Aprobadas</option>
                <option value="completado">Completadas</option>
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
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">
                        Salón
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">
                        Propietario
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">
                        Email
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">
                        Plan
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">
                        Estado
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">
                        Fecha
                      </th>
                      <th className="px-6 py-3 text-center text-xs font-semibold text-gray-700 uppercase">
                        Acciones
                      </th>
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
                          {solicitud.plan || 'N/A'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`px-2 py-1 text-xs font-semibold rounded-full ${getEstadoBadge(solicitud.estado)}`}
                          >
                            {getEstadoLabel(solicitud.estado)}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {new Date(solicitud.fechaCreacion).toLocaleDateString('es-ES')}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-center">
                          <button
                            onClick={() => handleVerDetalle(solicitud)}
                            className="inline-flex items-center gap-1 px-3 py-1 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors text-sm font-semibold"
                            title="Ver detalle completo"
                          >
                            <Eye className="w-4 h-4" />
                            Ver Completo
                          </button>
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

        {/* Modal de Detalle */}
        {showModal && selectedSolicitud && (
          <OnboardingDetailModal
            solicitud={selectedSolicitud}
            onClose={handleCloseModal}
            onUpdateEstado={handleUpdateEstado}
            onCrearSalon={handleCrearSalon}
          />
        )}
      </div>
    </>
  )
}

export default AdminOnboarding
