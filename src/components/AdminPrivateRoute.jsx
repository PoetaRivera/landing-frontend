/**
 * Componente de Ruta Protegida para Administradores
 * Redirige al login si el admin no está autenticado
 */

import { Navigate } from 'react-router-dom'
import { useAdminAuth } from '../context/AdminAuthContext'

function AdminPrivateRoute({ children }) {
  const { isAuthenticated, loading } = useAdminAuth()

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary mb-4"></div>
          <p className="text-gray-600">Verificando acceso...</p>
        </div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />
  }

  return children
}

export default AdminPrivateRoute
