/**
 * Página de Tutoriales con Videos de YouTube
 *
 * CÓMO AGREGAR UN VIDEO:
 * 1. Sube tu video a YouTube
 * 2. Copia el ID del video (la parte después de "watch?v=" en la URL)
 * 3. Agrégalo al array de videos con youtubeId
 * 4. Cambia el estado a "Disponible"
 */

import { useState } from 'react'
import { Link } from 'react-router-dom'
import SEO from '../components/common/SEO'

function Tutoriales() {
  const [categoriaActiva, setCategoriaActiva] = useState('todos')
  const [videoSeleccionado, setVideoSeleccionado] = useState(null)

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
          estado: 'En Producción', // Cambiar a "Disponible" cuando subas el video
          youtubeId: '', // Agregar ID aquí: Ej. 'dQw4w9WgXcQ'
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
          youtubeId: '', // Agregar ID del video de YouTube
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
          youtubeId: '',
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
          youtubeId: '',
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
          youtubeId: '',
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
          youtubeId: '',
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
          youtubeId: '',
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
          youtubeId: '',
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
          youtubeId: '',
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
          youtubeId: '',
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
          youtubeId: '',
          icono: '⚡',
          contenido: ['Tutorial ultra rápido']
        },
        {
          titulo: 'Cambia Colores al Instante',
          descripcion: 'Personaliza tu salón en segundos',
          duracion: '1 min',
          prioridad: 'Media',
          estado: 'Planeado',
          youtubeId: '',
          icono: '🎨',
          contenido: ['Demo rápida']
        },
        {
          titulo: 'Gestión de Clientes Pro',
          descripcion: 'Tips para administrar clientes eficientemente',
          duracion: '1 min',
          prioridad: 'Media',
          estado: 'Planeado',
          youtubeId: '',
          icono: '👤',
          contenido: ['Trucos profesionales']
        },
        {
          titulo: 'Tu Salón en tu Teléfono',
          descripcion: 'Usa MiSalons desde cualquier dispositivo',
          duracion: '1 min',
          prioridad: 'Baja',
          estado: 'Planeado',
          youtubeId: '',
          icono: '📱',
          contenido: ['Demo móvil']
        },
        {
          titulo: 'De Caos a Organización',
          descripcion: 'Antes y después de usar MiSalons',
          duracion: '1 min',
          prioridad: 'Baja',
          estado: 'Planeado',
          youtubeId: '',
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

  // Contar videos disponibles
  const videosDisponibles = Object.values(videos)
    .flatMap(cat => cat.videos)
    .filter(v => v.estado === 'Disponible' && v.youtubeId).length

  const videosEnProduccion = Object.values(videos)
    .flatMap(cat => cat.videos)
    .filter(v => v.estado === 'En Producción').length

  return (
    <>
      <SEO
        title="Tutoriales en Video - MiSalons"
        description="Aprende a usar MiSalons con nuestros videotutoriales paso a paso"
        url="https://misalons.com/tutoriales"
      />

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
              <div className="text-3xl font-bold text-green-600 mb-2">{videosDisponibles}</div>
              <div className="text-gray-600">Videos Disponibles</div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">{videosEnProduccion}</div>
              <div className="text-gray-600">En Producción</div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow text-center">
              <div className="text-3xl font-bold text-primary mb-2">~90</div>
              <div className="text-gray-600">Minutos Total</div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow text-center">
              <div className="text-3xl font-bold text-primary mb-2">15</div>
              <div className="text-gray-600">Videos Planeados</div>
            </div>
          </div>

          {/* Banner de Estado */}
          {videosDisponibles === 0 ? (
            <div className="max-w-4xl mx-auto mb-12">
              <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg p-8 text-center">
                <div className="text-5xl mb-4">🎬</div>
                <h2 className="text-3xl font-bold mb-3">Producción en Proceso</h2>
                <p className="text-xl mb-2 opacity-90">
                  Estamos grabando videotutoriales profesionales para ti
                </p>
                <p className="text-sm opacity-75">
                  Los primeros videos estarán disponibles próximamente en YouTube
                </p>
              </div>
            </div>
          ) : (
            <div className="max-w-4xl mx-auto mb-12">
              <div className="bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg p-8 text-center">
                <div className="text-5xl mb-4">✅</div>
                <h2 className="text-3xl font-bold mb-3">¡Videos Disponibles!</h2>
                <p className="text-xl mb-2 opacity-90">
                  Ya hay {videosDisponibles} video{videosDisponibles > 1 ? 's' : ''} listo{videosDisponibles > 1 ? 's' : ''} para ver
                </p>
                <p className="text-sm opacity-75">
                  Haz clic en cualquier video para verlo
                </p>
              </div>
            </div>
          )}

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
                      {video.estado === 'Disponible' && video.youtubeId ? (
                        <button
                          onClick={() => setVideoSeleccionado(video)}
                          className="flex-1 bg-primary text-white text-center py-2 rounded-lg text-sm font-semibold hover:bg-primary-dark transition"
                        >
                          ▶️ Ver Video
                        </button>
                      ) : (
                        <button
                          disabled
                          className="flex-1 bg-gray-300 text-gray-600 text-center py-2 rounded-lg text-sm font-semibold cursor-not-allowed"
                          title="Próximamente"
                        >
                          {video.estado === 'En Producción' ? '🎬 En Producción' : '📋 Planeado'}
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Modal de Video */}
          {videoSeleccionado && (
            <div
              className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
              onClick={() => setVideoSeleccionado(null)}
            >
              <div
                className="bg-white rounded-lg max-w-4xl w-full overflow-hidden"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="p-4 border-b flex justify-between items-center">
                  <h3 className="text-xl font-bold">{videoSeleccionado.titulo}</h3>
                  <button
                    onClick={() => setVideoSeleccionado(null)}
                    className="text-gray-500 hover:text-gray-700 text-2xl"
                  >
                    ×
                  </button>
                </div>
                <div className="relative" style={{ paddingBottom: '56.25%' }}>
                  <iframe
                    className="absolute top-0 left-0 w-full h-full"
                    src={`https://www.youtube.com/embed/${videoSeleccionado.youtubeId}`}
                    title={videoSeleccionado.titulo}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
                <div className="p-4">
                  <p className="text-gray-600 mb-4">{videoSeleccionado.descripcion}</p>
                  <a
                    href={`https://www.youtube.com/watch?v=${videoSeleccionado.youtubeId}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline text-sm"
                  >
                    Ver en YouTube →
                  </a>
                </div>
              </div>
            </div>
          )}

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
        </div>
      </div>
    </>
  )
}

export default Tutoriales
