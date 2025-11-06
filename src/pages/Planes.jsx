import { Link } from 'react-router-dom'

function Planes() {
  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Planes y Precios</h1>
          <p className="text-xl text-gray-600">
            Elige el plan que mejor se adapte a tu salón
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Plan Básico */}
          <div className="bg-white rounded-lg shadow-lg p-8 border-2 border-primary">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold mb-2">Plan Básico</h2>
              <div className="text-4xl font-bold text-primary mb-2">$15</div>
              <div className="text-gray-600">por mes</div>
              <div className="text-sm text-gray-500 mt-2">+ $100 inversión inicial</div>
            </div>

            <ul className="space-y-3 mb-8">
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <span>Hasta 6 estilistas</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <span>10 empleados con acceso</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <span>300 clientes activos</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <span>40 servicios/productos</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <span>50 imágenes</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <span>Reservas ilimitadas</span>
              </li>
            </ul>

            <Link
              to="/suscripcion"
              className="block w-full bg-primary text-white text-center py-3 rounded-lg font-semibold hover:bg-primary-dark transition"
            >
              Comenzar Ahora
            </Link>
          </div>

          {/* Plan Premium - Próximamente */}
          <div className="bg-white rounded-lg shadow-lg p-8 opacity-60">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold mb-2">Plan Premium</h2>
              <div className="text-4xl font-bold text-gray-400 mb-2">TBD</div>
              <div className="text-gray-600">por mes</div>
            </div>

            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">Próximamente</p>
            </div>
          </div>

          {/* Plan Enterprise - Próximamente */}
          <div className="bg-white rounded-lg shadow-lg p-8 opacity-60">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold mb-2">Plan Enterprise</h2>
              <div className="text-4xl font-bold text-gray-400 mb-2">TBD</div>
              <div className="text-gray-600">por mes</div>
            </div>

            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">Próximamente</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Planes
