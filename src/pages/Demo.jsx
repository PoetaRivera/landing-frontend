import { Link } from 'react-router-dom'

function Demo() {
  const videosDemo = [
    {
      id: 1,
      titulo: 'Tour Completo del Sistema',
      descripcion: 'Recorrido general por todas las funcionalidades de MiSalons',
      duracion: '10 min',
      thumbnail: '🎥',
      url: null // Pendiente
    },
    {
      id: 2,
      titulo: 'Sistema de Reservas',
      descripcion: 'Cómo gestionar citas y calendario de estilistas',
      duracion: '8 min',
      thumbnail: '📅',
      url: null
    },
    {
      id: 3,
      titulo: 'Gestión de Clientes',
      descripcion: 'Crear, editar y administrar base de datos de clientes',
      duracion: '6 min',
      thumbnail: '👥',
      url: null
    },
    {
      id: 4,
      titulo: 'Servicios y Productos',
      descripcion: 'Configurar catálogo de servicios y control de inventario',
      duracion: '7 min',
      thumbnail: '📦',
      url: null
    },
    {
      id: 5,
      titulo: 'Personalización de Marca',
      descripcion: 'Cambiar colores, logo y apariencia del salón',
      duracion: '5 min',
      thumbnail: '🎨',
      url: null
    },
    {
      id: 6,
      titulo: 'Panel de Administración',
      descripcion: 'Gestión de estilistas, permisos y configuración',
      duracion: '9 min',
      thumbnail: '⚙️',
      url: null
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Demo en Video</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Descubre todas las funcionalidades de MiSalons a través de nuestros videos tutoriales
            guiados paso a paso
          </p>
        </div>

        {/* Video Principal */}
        <div className="max-w-5xl mx-auto mb-16">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="aspect-video bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center">
              <div className="text-center text-white">
                <div className="text-8xl mb-4">🎬</div>
                <h2 className="text-3xl font-bold mb-2">Tour Completo del Sistema</h2>
                <p className="text-xl opacity-90 mb-6">Video disponible próximamente</p>
                <div className="text-sm opacity-75">Duración estimada: 10-15 minutos</div>
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-2xl font-semibold mb-3">¿Qué verás en este video?</h3>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>Navegación completa por el dashboard</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>Crear una reserva desde cero</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>Gestionar clientes y su historial</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>Configurar servicios y productos</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>Personalizar la apariencia de tu salón</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Lista de Videos Tutoriales */}
        <div className="max-w-6xl mx-auto mb-12">
          <h2 className="text-3xl font-bold text-center mb-8">Tutoriales por Módulo</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {videosDemo.map((video) => (
              <div
                key={video.id}
                className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition"
              >
                <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                  <span className="text-6xl">{video.thumbnail}</span>
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-xl font-semibold">{video.titulo}</h3>
                    <span className="text-sm text-gray-500">{video.duracion}</span>
                  </div>
                  <p className="text-gray-600 mb-4">{video.descripcion}</p>
                  <button
                    disabled
                    className="w-full bg-gray-300 text-gray-600 py-2 rounded-lg cursor-not-allowed"
                  >
                    Próximamente
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-r from-primary to-primary-dark text-white rounded-lg p-8 text-center">
            <h2 className="text-3xl font-bold mb-4">¿Listo para empezar?</h2>
            <p className="text-xl mb-6 opacity-90">
              Si los videos te convencieron, suscríbete ahora y comienza a transformar tu salón
            </p>
            <div className="flex gap-4 justify-center">
              <Link
                to="/suscripcion"
                className="bg-white text-primary px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
              >
                Suscribirme Ahora
              </Link>
              <Link
                to="/tutoriales"
                className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-primary transition"
              >
                Ver Más Tutoriales
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Demo
