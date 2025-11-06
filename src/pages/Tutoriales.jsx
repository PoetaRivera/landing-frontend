import { useState } from 'react'
import { Link } from 'react-router-dom'

function Tutoriales() {
  const [categoriaActiva, setCategoriaActiva] = useState('todos')

  const videos = {
    principales: {
      titulo: '🎥 Videos Principales - Demo',
      descripcion: 'Videos completos para entender todo el sistema',
      videos: [
        {
          titulo: 'Tour Completo del Sistema',
          descripcion: 'Visión general completa de MiSalons desde login hasta configuración',
          duracion: '10-15 min',
          prioridad: 'Alta',
          estado: 'En Producción',
          icono: '🌟',
          contenido: [
            'Dashboard general',
            'Crear reservas',
            'Gestión de clientes',
            'Configurar servicios',
            'Personalizar colores'
          ]
        },
        {
          titulo: 'Sistema de Reservas',
          descripcion: 'Aprende a gestionar el calendario y crear citas paso a paso',
          duracion: '8 min',
          prioridad: 'Alta',
          estado: 'En Producción',
          icono: '📅',
          contenido: [
            'Vista del calendario',
            'Crear nueva reserva',
            'Asignar estilista',
            'Pre-reservas',
            'Editar y cancelar'
          ]
        },
        {
          titulo: 'Gestión de Clientes',
          descripcion: 'Administra tu base de datos de clientes como un profesional',
          duracion: '6 min',
          prioridad: 'Alta',
          estado: 'En Producción',
          icono: '👥',
          contenido: [
            'Lista de clientes',
            'Crear nuevo cliente',
            'Historial de servicios',
            'Búsqueda rápida',
            'Exportar datos'
          ]
        },
        {
          titulo: 'Servicios y Productos',
          descripcion: 'Configura tu catálogo completo con precios e inventario',
          duracion: '7 min',
          prioridad: 'Media',
          estado: 'En Producción',
          icono: '📦',
          contenido: [
            'Crear servicios',
            'Configurar precios',
            'Gestión de inventario',
            'Categorías',
            'Imágenes'
          ]
        },
        {
          titulo: 'Personalización de Marca',
          descripcion: 'Customiza colores, logo y apariencia de tu salón',
          duracion: '5 min',
          prioridad: 'Media',
          estado: 'En Producción',
          icono: '🎨',
          contenido: [
            '16 paletas de colores',
            'Subir logo',
            'Carousel de imágenes',
            'Editar textos',
            'Preview en tiempo real'
          ]
        },
        {
          titulo: 'Panel de Administración',
          descripcion: 'Configuración avanzada de usuarios, estilistas y horarios',
          duracion: '9 min',
          prioridad: 'Media',
          estado: 'En Producción',
          icono: '⚙️',
          contenido: [
            'Gestionar estilistas',
            'Crear usuarios',
            'Roles y permisos',
            'Configuración general',
            'Horarios'
          ]
        }
      ]
    },
    tutoriales: {
      titulo: '📚 Tutoriales Paso a Paso',
      descripcion: 'Guías prácticas para situaciones específicas',
      videos: [
        {
          titulo: 'Primeros Pasos - Setup Inicial',
          descripcion: 'Configuración completa desde cero para nuevos usuarios',
          duracion: '12 min',
          prioridad: 'Alta',
          estado: 'Planeado',
          icono: '🚀',
          contenido: [
            'Primer login',
            'Configurar salón',
            'Subir logo',
            'Crear primer servicio',
            'Primera reserva'
          ]
        },
        {
          titulo: 'Gestión Diaria del Salón',
          descripcion: 'Rutina diaria desde apertura hasta cierre',
          duracion: '10 min',
          prioridad: 'Alta',
          estado: 'Planeado',
          icono: '☀️',
          contenido: [
            'Revisar citas del día',
            'Atender llamadas',
            'Walk-ins',
            'Modificar citas',
            'Cierre del día'
          ]
        },
        {
          titulo: 'Casos de Uso Especiales',
          descripcion: 'Situaciones avanzadas y escenarios complejos',
          duracion: '8 min',
          prioridad: 'Media',
          estado: 'Planeado',
          icono: '⭐',
          contenido: [
            'Paquetes de servicios',
            'Descuentos',
            'Reservas grupales',
            'Eventos especiales',
            'Bloquear horarios'
          ]
        },
        {
          titulo: 'Solución de Problemas Comunes',
          descripcion: 'Respuestas rápidas a errores frecuentes',
          duracion: '7 min',
          prioridad: 'Media',
          estado: 'Planeado',
          icono: '🔧',
          contenido: [
            'Olvidé mi contraseña',
            'Error al crear reserva',
            'Problemas con imágenes',
            'Cliente no aparece',
            'Cambiar plan'
          ]
        }
      ]
    },
    cortos: {
      titulo: '⚡ Videos Cortos - Redes Sociales',
      descripcion: 'Clips de 60 segundos para aprender rápido',
      videos: [
        {
          titulo: 'Crear Reserva en 30 Segundos',
          descripcion: 'El proceso más rápido para agendar una cita',
          duracion: '1 min',
          prioridad: 'Alta',
          estado: 'Planeado',
          icono: '⚡',
          contenido: ['Tutorial ultra rápido']
        },
        {
          titulo: 'Cambia Colores al Instante',
          descripcion: 'Personaliza tu salón en segundos',
          duracion: '1 min',
          prioridad: 'Media',
          estado: 'Planeado',
          icono: '🎨',
          contenido: ['Demo rápida']
        },
        {
          titulo: 'Gestión de Clientes Pro',
          descripcion: 'Tips para administrar clientes eficientemente',
          duracion: '1 min',
          prioridad: 'Media',
          estado: 'Planeado',
          icono: '👤',
          contenido: ['Trucos profesionales']
        },
        {
          titulo: 'Tu Salón en tu Teléfono',
          descripcion: 'Usa MiSalons desde cualquier dispositivo',
          duracion: '1 min',
          prioridad: 'Baja',
          estado: 'Planeado',
          icono: '📱',
          contenido: ['Demo móvil']
        },
        {
          titulo: 'De Caos a Organización',
          descripcion: 'Antes y después de usar MiSalons',
          duracion: '1 min',
          prioridad: 'Baja',
          estado: 'Planeado',
          icono: '✨',
          contenido: ['Caso de éxito']
        }
      ]
    }
  }

  const categorias = [
    { id: 'todos', label: 'Todos', icono: '🎬' },
    { id: 'principales', label: 'Principales', icono: '🎥' },
    { id: 'tutoriales', label: 'Tutoriales', icono: '📚' },
    { id: 'cortos', label: 'Cortos', icono: '⚡' }
  ]

  const prioridadColor = {
    Alta: 'bg-red-100 text-red-800',
    Media: 'bg-yellow-100 text-yellow-800',
    Baja: 'bg-green-100 text-green-800'
  }

  const estadoColor = {
    'En Producción': 'bg-blue-100 text-blue-800',
    Planeado: 'bg-gray-100 text-gray-800',
    Disponible: 'bg-green-100 text-green-800'
  }

  const obtenerVideosFiltrados = () => {
    if (categoriaActiva === 'todos') {
      return Object.values(videos).flatMap((cat) =>
        cat.videos.map((v) => ({ ...v, categoria: cat.titulo }))
      )
    }
    return (
      videos[categoriaActiva]?.videos.map((v) => ({
        ...v,
        categoria: videos[categoriaActiva].titulo
      })) || []
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Tutoriales en Video</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Aprende a usar MiSalons con nuestros videotutoriales paso a paso
          </p>
        </div>

        {/* Estadísticas */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-5xl mx-auto mb-12">
          <div className="bg-white p-6 rounded-lg shadow text-center">
            <div className="text-3xl font-bold text-primary mb-2">15</div>
            <div className="text-gray-600">Videos Planeados</div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow text-center">
            <div className="text-3xl font-bold text-primary mb-2">~90</div>
            <div className="text-gray-600">Minutos Total</div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow text-center">
            <div className="text-3xl font-bold text-primary mb-2">6</div>
            <div className="text-gray-600">Videos Demo</div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow text-center">
            <div className="text-3xl font-bold text-primary mb-2">5</div>
            <div className="text-gray-600">Clips Cortos</div>
          </div>
        </div>

        {/* Banner de Estado */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg p-8 text-center">
            <div className="text-5xl mb-4">🎬</div>
            <h2 className="text-3xl font-bold mb-3">Producción en Proceso</h2>
            <p className="text-xl mb-2 opacity-90">
              Estamos grabando videotutoriales profesionales para ti
            </p>
            <p className="text-sm opacity-75">
              Tiempo estimado: 3-4 semanas • Disponibles próximamente en YouTube
            </p>
          </div>
        </div>

        {/* Filtros de categoría */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categorias.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setCategoriaActiva(cat.id)}
              className={`px-6 py-3 rounded-lg font-semibold transition ${
                categoriaActiva === cat.id
                  ? 'bg-primary text-white shadow-lg'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              <span className="mr-2">{cat.icono}</span>
              {cat.label}
            </button>
          ))}
        </div>

        {/* Grid de videos */}
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {obtenerVideosFiltrados().map((video, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-lg hover:shadow-xl transition overflow-hidden"
              >
                <div className="p-6">
                  <div className="text-5xl mb-4">{video.icono}</div>

                  <h3 className="text-xl font-semibold mb-2">{video.titulo}</h3>

                  <p className="text-gray-600 mb-4 text-sm">{video.descripcion}</p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className={`text-xs px-3 py-1 rounded-full ${estadoColor[video.estado]}`}>
                      {video.estado}
                    </span>
                    <span
                      className={`text-xs px-3 py-1 rounded-full ${prioridadColor[video.prioridad]}`}
                    >
                      {video.prioridad}
                    </span>
                    <span className="text-xs px-3 py-1 rounded-full bg-gray-100 text-gray-700">
                      ⏱️ {video.duracion}
                    </span>
                  </div>

                  {/* Contenido del video */}
                  {video.contenido && video.contenido.length > 0 && (
                    <div className="mb-4">
                      <div className="text-xs font-semibold text-gray-500 mb-2">Contenido:</div>
                      <ul className="text-xs text-gray-600 space-y-1">
                        {video.contenido.slice(0, 3).map((item, i) => (
                          <li key={i} className="flex items-start">
                            <span className="mr-2">•</span>
                            <span>{item}</span>
                          </li>
                        ))}
                        {video.contenido.length > 3 && (
                          <li className="text-gray-400 italic">
                            +{video.contenido.length - 3} más...
                          </li>
                        )}
                      </ul>
                    </div>
                  )}

                  {/* Botones de acción */}
                  <div className="flex gap-2">
                    <button
                      disabled
                      className="flex-1 bg-gray-300 text-gray-600 text-center py-2 rounded-lg text-sm font-semibold cursor-not-allowed"
                      title="Próximamente"
                    >
                      {video.estado === 'En Producción' ? '🎬 En Producción' : '📋 Planeado'}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="max-w-4xl mx-auto mt-16">
          <div className="bg-gradient-to-r from-primary to-primary-dark text-white rounded-lg p-8 text-center">
            <h2 className="text-3xl font-bold mb-4">¿Prefieres leer documentación?</h2>
            <p className="text-xl mb-6 opacity-90">
              Tenemos guías escritas completas de cada funcionalidad
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <Link
                to="/documentacion"
                className="bg-white text-primary px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
              >
                Ver Documentación
              </Link>
              <Link
                to="/demo"
                className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-primary transition"
              >
                Ver Demo Interactiva
              </Link>
            </div>
          </div>
        </div>

        {/* Plan de producción */}
        <div className="max-w-6xl mx-auto mt-12">
          <h2 className="text-2xl font-bold text-center mb-8">Plan de Producción</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow">
              <div className="text-3xl mb-3 text-center">📅</div>
              <h3 className="font-semibold mb-2 text-center">Semana 1-2</h3>
              <p className="text-sm text-gray-600 text-center mb-3">Videos Principales Demo</p>
              <ul className="text-xs text-gray-600 space-y-1">
                <li>• Tour Completo</li>
                <li>• Sistema de Reservas</li>
                <li>• Gestión de Clientes</li>
                <li>• Servicios y Productos</li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-lg shadow">
              <div className="text-3xl mb-3 text-center">🎓</div>
              <h3 className="font-semibold mb-2 text-center">Semana 3</h3>
              <p className="text-sm text-gray-600 text-center mb-3">Tutoriales Avanzados</p>
              <ul className="text-xs text-gray-600 space-y-1">
                <li>• Primeros Pasos</li>
                <li>• Gestión Diaria</li>
                <li>• Casos Especiales</li>
                <li>• Troubleshooting</li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-lg shadow">
              <div className="text-3xl mb-3 text-center">⚡</div>
              <h3 className="font-semibold mb-2 text-center">Semana 4</h3>
              <p className="text-sm text-gray-600 text-center mb-3">Contenido Social</p>
              <ul className="text-xs text-gray-600 space-y-1">
                <li>• 5 clips de 60 segundos</li>
                <li>• Optimizados para redes</li>
                <li>• Instagram, TikTok, FB</li>
                <li>• Publicación masiva</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Nota informativa */}
        <div className="max-w-4xl mx-auto mt-12 bg-blue-50 border-l-4 border-primary p-6 rounded">
          <h3 className="font-semibold mb-2">📢 Mantente Informado</h3>
          <p className="text-sm text-gray-700 mb-3">
            Estos videos están en proceso de producción. Una vez listos, estarán disponibles:
          </p>
          <ul className="text-sm text-gray-700 space-y-1">
            <li>✅ En esta página (embebidos desde YouTube)</li>
            <li>✅ En nuestro canal de YouTube</li>
            <li>✅ En el proceso de onboarding para nuevos clientes</li>
            <li>✅ En redes sociales (versiones cortas)</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Tutoriales
