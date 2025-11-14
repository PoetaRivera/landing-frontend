/**
 * Página de Gestión de Clientes del Panel de Admin
 */

import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAdminAuth } from '../../context/AdminAuthContext'
import { getClientes } from '../../services/adminAPI'
import SEO from '../../components/common/SEO'
import Card from '../../components/common/Card'
import Button from '../../components/common/Button'
import { showError } from '../../utils/toastConfig'

function AdminClientes() {
  const { logout } = useAdminAuth()
  const [clientes, setClientes] = useState([])
  const [loading, setLoading] = useState(true)
  const [filtros, setFiltros] = useState({
    estado: '',
    plan: ''
  })

  useEffect(() => {
    loadClientes()
  }, [filtros])

  const loadClientes = async () => {
    try {
      setLoading(true)
      const data = await getClientes(filtros)
      setClientes(data.clientes)
    } catch (error) {
      console.error('Error al cargar clientes:', error)
      showError('Error al cargar clientes')
    } finally {
      setLoading(false)
    }
  }

  const getEstadoBadge = (estado) => {
    const badges = {
      activo: 'bg-green-100 text-green-800',
      suspendido: 'bg-yellow-100 text-yellow-800',
      cancelado: 'bg-red-100 text-red-800'
    }
    return badges[estado] || 'bg-gray-100 text-gray-800'
  }

  return (
    <>
      <SEO
        title="Gestión de Clientes - Admin"
        description="Panel de administración de clientes"
        url="https://misalons.com/admin/clientes"
      />

      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="bg-white shadow-sm border-b">
          <div className="container mx-auto px-4 py-4">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-2xl font-bold text-gray-800">Gestión de Clientes</h1>
                <p className="text-sm text-gray-600 mt-1">
                  Administra todos los clientes del sistema
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
                className="px-4 py-2 bg-primary text-white rounded-lg font-semibold"
              >
                Clientes
              </Link>
              <Link
                to="/admin/solicitudes"
                className="px-4 py-2 bg-white text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
              >
                Solicitudes
              </Link>
            </nav>
          </div>

          {/* Filtros */}
          <Card padding="md" shadow className="mb-6">
            <div className="flex gap-4">
              <select
                value={filtros.estado}
                onChange={(e) => setFiltros({ ...filtros, estado: e.target.value })}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                <option value="">Todos los estados</option>
                <option value="activo">Activos</option>
                <option value="suspendido">Suspendidos</option>
                <option value="cancelado">Cancelados</option>
              </select>

              <select
                value={filtros.plan}
                onChange={(e) => setFiltros({ ...filtros, plan: e.target.value })}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                <option value="">Todos los planes</option>
                <option value="Plan Básico - $15/mes">Plan Básico</option>
                <option value="Plan Estándar - $30/mes">Plan Estándar</option>
                <option value="Plan Premium - $50/mes">Plan Premium</option>
              </select>

              <Button variant="primary" onClick={loadClientes}>
                Actualizar
              </Button>
            </div>
          </Card>

          {/* Tabla de Clientes */}
          <Card padding="none" shadow>
            {loading ? (
              <div className="p-12 text-center">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary mb-4"></div>
                <p className="text-gray-600">Cargando clientes...</p>
              </div>
            ) : clientes.length === 0 ? (
              <div className="p-12 text-center">
                <p className="text-gray-600">No hay clientes para mostrar</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">
                        Nombre
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">
                        Salón
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
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {clientes.map((cliente) => (
                      <tr key={cliente.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div>
                            <div className="font-semibold text-gray-800">
                              {cliente.nombreCompleto}
                            </div>
                            <div className="text-sm text-gray-500">{cliente.usuario}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                          {cliente.nombreSalon}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                          {cliente.email}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                          {cliente.planSeleccionado?.split(' - ')[0] || 'N/A'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`px-2 py-1 text-xs font-semibold rounded-full ${getEstadoBadge(cliente.estado)}`}
                          >
                            {cliente.estado}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {new Date(cliente.fechaCreacion).toLocaleDateString('es-ES')}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </Card>

          <div className="mt-4 text-sm text-gray-600">Total de clientes: {clientes.length}</div>
        </main>
      </div>
    </>
  )
}

export default AdminClientes
