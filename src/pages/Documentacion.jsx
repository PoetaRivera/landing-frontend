import { useState } from 'react'
import { Link } from 'react-router-dom'

function Documentacion() {
  const [categoriaActiva, setCategoriaActiva] = useState('todos')

  const documentos = {
    inicio: {
      titulo: '🚀 Inicio Rápido',
      docs: [
        {
          titulo: 'Manual de Usuario General',
          descripcion: 'Guía completa para empezar a usar MiSalons desde cero',
          nivel: 'Básico',
          tiempo: '20 min',
          archivo: 'MANUAL-USUARIO-GENERAL.md',
          icono: '📖',
          audiencia: 'Todos'
        }
      ]
    },
    guias: {
      titulo: '📘 Guías por Módulo',
      docs: [
        {
          titulo: 'Sistema de Reservas',
          descripcion: 'Gestión completa de citas, calendario y pre-reservas',
          nivel: 'Intermedio',
          tiempo: '25 min',
          archivo: 'GUIA-RESERVAS.md',
          icono: '📅',
          audiencia: 'Empleados y Admin'
        },
        {
          titulo: 'Gestión de Clientes',
          descripcion: 'Crear, editar y administrar tu base de datos de clientes',
          nivel: 'Básico',
          tiempo: '20 min',
          archivo: 'GUIA-CLIENTES.md',
          icono: '👥',
          audiencia: 'Empleados y Admin'
        },
        {
          titulo: 'Servicios y Productos',
          descripcion: 'Configurar catálogo, precios y control de inventario',
          nivel: 'Admin',
          tiempo: '15 min',
          archivo: 'GUIA-SERVICIOS.md',
          icono: '📦',
          audiencia: 'Solo Admin'
        },
        {
          titulo: 'Personalización',
          descripcion: 'Cambiar colores, logo y apariencia del salón',
          nivel: 'Admin',
          tiempo: '10 min',
          archivo: 'GUIA-PERSONALIZACION.md',
          icono: '🎨',
          audiencia: 'Solo Admin'
        },
        {
          titulo: 'Panel de Administración',
          descripcion: 'Gestión de usuarios, estilistas y configuración avanzada',
          nivel: 'Admin',
          tiempo: '15 min',
          archivo: 'GUIA-ADMINISTRACION.md',
          icono: '⚙️',
          audiencia: 'Solo Admin'
        }
      ]
    },
    soporte: {
      titulo: '🆘 Ayuda y Soporte',
      docs: [
        {
          titulo: 'Preguntas Frecuentes (FAQ)',
          descripcion: '50+ preguntas comunes con respuestas detalladas',
          nivel: 'Todos',
          tiempo: '10 min',
          archivo: 'FAQ.md',
          icono: '❓',
          audiencia: 'Todos'
        },
        {
          titulo: 'Solución de Problemas',
          descripcion: 'Guía paso a paso para resolver errores comunes',
          nivel: 'Todos',
          tiempo: '15 min',
          archivo: 'TROUBLESHOOTING.md',
          icono: '🔧',
          audiencia: 'Todos'
        },
        {
          titulo: 'Contacto y Soporte',
          descripcion: 'Canales de comunicación y horarios de atención',
          nivel: 'Todos',
          tiempo: '3 min',
          archivo: 'CONTACTO.md',
          icono: '📞',
          audiencia: 'Todos'
        }
      ]
    }
  }

  const categorias = [
    { id: 'todos', label: 'Todos', icono: '📚' },
    { id: 'inicio', label: 'Inicio', icono: '🚀' },
    { id: 'guias', label: 'Guías', icono: '📘' },
    { id: 'soporte', label: 'Soporte', icono: '🆘' }
  ]

  const nivelColor = {
    'Básico': 'bg-green-100 text-green-800',
    'Intermedio': 'bg-blue-100 text-blue-800',
    'Admin': 'bg-purple-100 text-purple-800',
    'Todos': 'bg-gray-100 text-gray-800'
  }

  const obtenerDocsFiltrados = () => {
    if (categoriaActiva === 'todos') {
      return Object.values(documentos).flatMap(cat => cat.docs)
    }
    return documentos[categoriaActiva]?.docs || []
  }

  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Centro de Documentación</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Todo lo que necesitas saber para aprovechar MiSalons al máximo
          </p>
        </div>

        {/* Estadísticas rápidas */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-5xl mx-auto mb-12">
          <div className="bg-white p-6 rounded-lg shadow text-center">
            <div className="text-3xl font-bold text-primary mb-2">10</div>
            <div className="text-gray-600">Documentos</div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow text-center">
            <div className="text-3xl font-bold text-primary mb-2">120+</div>
            <div className="text-gray-600">Páginas</div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow text-center">
            <div className="text-3xl font-bold text-primary mb-2">50+</div>
            <div className="text-gray-600">FAQs</div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow text-center">
            <div className="text-3xl font-bold text-primary mb-2">25+</div>
            <div className="text-gray-600">Soluciones</div>
          </div>
        </div>

        {/* Filtros de categoría */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categorias.map(cat => (
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

        {/* Grid de documentos */}
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {obtenerDocsFiltrados().map((doc, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-lg hover:shadow-xl transition overflow-hidden"
              >
                <div className="p-6">
                  <div className="text-5xl mb-4">{doc.icono}</div>

                  <h3 className="text-xl font-semibold mb-2">{doc.titulo}</h3>

                  <p className="text-gray-600 mb-4 text-sm">
                    {doc.descripcion}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className={`text-xs px-3 py-1 rounded-full ${nivelColor[doc.nivel]}`}>
                      {doc.nivel}
                    </span>
                    <span className="text-xs px-3 py-1 rounded-full bg-gray-100 text-gray-700">
                      ⏱️ {doc.tiempo}
                    </span>
                  </div>

                  <div className="text-xs text-gray-500 mb-4">
                    👤 Para: {doc.audiencia}
                  </div>

                  <div className="flex gap-2">
                    <Link
                      to={`/documentacion/${doc.archivo}`}
                      className="flex-1 bg-primary text-white text-center py-2 rounded-lg hover:bg-primary-dark transition text-sm font-semibold"
                    >
                      Leer Guía
                    </Link>
                    <a
                      href={`/documentacion/${doc.archivo}`}
                      download
                      className="px-4 py-2 border-2 border-primary text-primary rounded-lg hover:bg-primary hover:text-white transition"
                      title="Descargar MD"
                    >
                      📥
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="max-w-4xl mx-auto mt-16">
          <div className="bg-gradient-to-r from-primary to-primary-dark text-white rounded-lg p-8 text-center">
            <h2 className="text-3xl font-bold mb-4">¿Prefieres aprender viendo?</h2>
            <p className="text-xl mb-6 opacity-90">
              Tenemos videotutoriales paso a paso de cada funcionalidad
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <Link
                to="/tutoriales"
                className="bg-white text-primary px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
              >
                Ver Tutoriales en Video
              </Link>
              <Link
                to="/demo"
                className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-primary transition"
              >
                Ver Demo del Sistema
              </Link>
            </div>
          </div>
        </div>

        {/* Recursos adicionales */}
        <div className="max-w-6xl mx-auto mt-12">
          <h2 className="text-2xl font-bold text-center mb-8">Recursos Adicionales</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow text-center">
              <div className="text-4xl mb-3">💡</div>
              <h3 className="font-semibold mb-2">Tips y Trucos</h3>
              <p className="text-sm text-gray-600 mb-4">
                30+ atajos de productividad
              </p>
              <button className="text-primary hover:underline text-sm font-semibold">
                Próximamente
              </button>
            </div>

            <div className="bg-white p-6 rounded-lg shadow text-center">
              <div className="text-4xl mb-3">📖</div>
              <h3 className="font-semibold mb-2">Glosario</h3>
              <p className="text-sm text-gray-600 mb-4">
                Términos técnicos explicados
              </p>
              <button className="text-primary hover:underline text-sm font-semibold">
                Próximamente
              </button>
            </div>

            <div className="bg-white p-6 rounded-lg shadow text-center">
              <div className="text-4xl mb-3">🎓</div>
              <h3 className="font-semibold mb-2">Webinars</h3>
              <p className="text-sm text-gray-600 mb-4">
                Capacitación mensual gratuita
              </p>
              <button className="text-primary hover:underline text-sm font-semibold">
                Próximamente
              </button>
            </div>
          </div>
        </div>

        {/* Nota sobre acceso */}
        <div className="max-w-4xl mx-auto mt-12 bg-blue-50 border-l-4 border-primary p-6 rounded">
          <h3 className="font-semibold mb-2">📝 Nota sobre el acceso</h3>
          <p className="text-sm text-gray-700">
            Esta documentación está disponible para todos. Los archivos markdown originales se encuentran en el
            repositorio del proyecto. Próximamente estarán disponibles en versión PDF y online directamente desde esta página.
          </p>
        </div>
      </div>
    </div>
  )
}

export default Documentacion
