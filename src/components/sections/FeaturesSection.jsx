import Card from '../common/Card'

/**
 * FeaturesSection - Sección de características/features del producto
 *
 * @param {Object} props
 * @param {string} props.title - Título de la sección
 * @param {string} props.subtitle - Subtítulo opcional
 * @param {Array} props.features - Array de features [{icon, title, description}]
 */
function FeaturesSection({
  title = '¿Por qué elegir MultiSalón?',
  subtitle,
  features = DEFAULT_FEATURES
}) {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{title}</h2>
          {subtitle && <p className="text-lg text-gray-600 max-w-2xl mx-auto">{subtitle}</p>}
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} hoverable shadow padding="lg" className="h-full">
              <div className="text-center">
                {/* Icon */}
                <div className="text-6xl mb-4 flex justify-center">{feature.icon}</div>

                {/* Title */}
                <h3 className="text-xl md:text-2xl font-semibold text-gray-900 mb-3">
                  {feature.title}
                </h3>

                {/* Description */}
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

// Features por defecto
const DEFAULT_FEATURES = [
  {
    icon: '📅',
    title: 'Sistema de Reservas',
    description:
      'De la agenda al crecimiento: ¡Llene su salón y tome el control de su negocio! Descubra con datos reales qué servicios venden más, qué estilistas generan más ganancias y quiénes son sus clientas recurrentes.'
  },
  {
    icon: '👥',
    title: 'Empleados y Clientes',
    description:
      'Administre a su equipo y a sus clientes de forma eficiente. Acceda a sus datos e historiales al instante, usando el buscador inteligente para encontrar información, incluso con datos incompletos.'
  },
  {
    icon: '📦',
    title: 'Catálago de Productos',
    description:
      'Tienda Virtual al Alcance. Lleve su catálogo directamente a sus clientes para impulsar la venta de productos. Destaque ofertas y lanzamientos para facilitar la compra con filtros intuitivos.'
  },
  {
    icon: '💰',
    title: 'Su salón bajo su mando, 24/7.',
    description:
      'Administre su web sin diseñadores: Cree o edite al instante productos, servicios y estilistas (con sus fotos y datos). Cambie los colores del salon, títulos, fotos del carrusel y actualice horarios o redes sociales con total sencillez. Si necesita ayuda, use nuestros tutoriales y material escrito.'
  },
  {
    icon: '📊',
    title: 'Reportes y Análisis',
    description:
      'Visualiza el rendimiento de tu negocio con reportes detallados y gráficos en tiempo real.'
  },
  {
    icon: '🔒',
    title: 'Seguro y Confiable',
    description:
      'Seguridad de Google Cloud: Sus datos están protegidos con encriptación de grado empresarial, la misma tecnología que usan las grandes compañías'
  }
]

export default FeaturesSection
