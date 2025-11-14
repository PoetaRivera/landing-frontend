import { Link, useLocation } from 'react-router-dom'
import { Home, ArrowLeft } from 'lucide-react'

/**
 * Página 404 - Not Found
 * Se muestra cuando el usuario intenta acceder a una ruta que no existe
 */
function NotFound() {
  const location = useLocation()

  // Determinar si estamos en portal admin o cliente
  const isAdminPortal = location.pathname.startsWith('/admin')
  const isClientePortal = location.pathname.startsWith('/cliente')

  // Ruta de regreso apropiada
  const homeRoute = isAdminPortal
    ? '/admin/dashboard'
    : isClientePortal
      ? '/cliente/dashboard'
      : '/'
  const homeLabel = isAdminPortal ? 'Panel Admin' : isClientePortal ? 'Portal Cliente' : 'Inicio'

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 via-white to-accent/5 px-4">
      <div className="max-w-2xl w-full text-center">
        {/* Número 404 grande */}
        <div className="mb-8">
          <h1 className="text-[150px] md:text-[200px] font-bold text-primary/20 leading-none">
            404
          </h1>
        </div>

        {/* Mensaje de error */}
        <div className="mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Página No Encontrada
          </h2>
          <p className="text-gray-600 text-lg mb-2">Lo sentimos, la página que buscas no existe.</p>
          <p className="text-gray-500 text-sm">
            Ruta:{' '}
            <code className="bg-gray-100 px-2 py-1 rounded text-primary">{location.pathname}</code>
          </p>
        </div>

        {/* Botones de acción */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to={homeRoute}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors font-medium"
          >
            <Home size={20} />
            Ir a {homeLabel}
          </Link>

          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium"
          >
            <ArrowLeft size={20} />
            Volver Atrás
          </button>
        </div>

        {/* Sugerencias de navegación */}
        {!isAdminPortal && !isClientePortal && (
          <div className="mt-12 pt-8 border-t border-gray-200">
            <p className="text-gray-600 mb-4">Tal vez estés buscando:</p>
            <div className="flex flex-wrap gap-3 justify-center">
              <Link to="/planes" className="text-primary hover:text-primary-dark hover:underline">
                Planes y Precios
              </Link>
              <span className="text-gray-300">|</span>
              <Link
                to="/suscripcion"
                className="text-primary hover:text-primary-dark hover:underline"
              >
                Suscribirme
              </Link>
              <span className="text-gray-300">|</span>
              <Link
                to="/tutoriales"
                className="text-primary hover:text-primary-dark hover:underline"
              >
                Tutoriales
              </Link>
              <span className="text-gray-300">|</span>
              <Link
                to="/documentacion"
                className="text-primary hover:text-primary-dark hover:underline"
              >
                Documentación
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default NotFound
