/**
 * Componente PrivateRoute
 * Protege rutas que requieren autenticación de cliente
 */

import { Navigate } from 'react-router-dom'
import { useClienteAuth } from '../context/ClienteAuthContext'

const PrivateRoute = ({ children }) => {
  const { isAuthenticated, loading } = useClienteAuth()

  // Mostrar loading mientras verifica autenticación
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-gray-600">Verificando autenticación...</p>
        </div>
      </div>
    )
  }

  // Si no está autenticado, redirigir a login
  if (!isAuthenticated) {
    return <Navigate to="/cliente/login" replace />
  }

  // Si está autenticado, renderizar el componente
  return children
}

export default PrivateRoute
