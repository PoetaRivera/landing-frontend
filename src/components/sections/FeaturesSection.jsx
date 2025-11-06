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
      'Gestiona citas de forma eficiente con nuestro calendario inteligente. Notificaciones automáticas y recordatorios.'
  },
  {
    icon: '👥',
    title: 'Gestión de Clientes',
    description:
      'Base de datos completa con historial de servicios y preferencias. Fideliza a tus clientes.'
  },
  {
    icon: '📦',
    title: 'Control de Inventario',
    description: 'Mantén el control de productos y servicios en tiempo real. Alertas de stock bajo.'
  },
  {
    icon: '💰',
    title: 'Facturación y Pagos',
    description:
      'Sistema completo de facturación electrónica. Múltiples métodos de pago integrados.'
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
      'Tus datos están protegidos con encriptación de grado empresarial. Backups automáticos diarios.'
  }
]

export default FeaturesSection
