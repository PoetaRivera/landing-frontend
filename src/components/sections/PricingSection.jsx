import Card from '../common/Card'
import Button from '../common/Button'
import { MESSAGES } from '../../utils/messages'

/**
 * PricingSection - Sección de planes y precios
 *
 * @param {Object} props
 * @param {string} props.title - Título de la sección
 * @param {string} props.subtitle - Subtítulo opcional
 * @param {Array} props.planes - Array de planes [{name, price, priceFrequency, initialInvestment, features, highlighted, available, buttonText, buttonTo}]
 */
function PricingSection({
  title = 'Planes y Precios',
  subtitle = 'Elige el plan que mejor se adapte a tu salón',
  planes = DEFAULT_PLANES
}) {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{title}</h1>
          {subtitle && (
            <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">{subtitle}</p>
          )}
        </div>

        {/* Planes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {planes.map((plan, index) => (
            <PricingCard key={index} plan={plan} />
          ))}
        </div>
      </div>
    </section>
  )
}

/**
 * PricingCard - Tarjeta individual de plan
 */
function PricingCard({ plan }) {
  const {
    name,
    price,
    priceFrequency = 'por mes',
    initialInvestment,
    features = [],
    highlighted = false,
    available = true,
    buttonText = 'Comenzar Ahora',
    buttonTo = '/suscripcion',
    comingSoon = false
  } = plan

  return (
    <Card
      shadow
      padding="lg"
      className={`
        relative h-full flex flex-col
        ${highlighted ? 'border-2 border-blue-600 ring-2 ring-blue-200' : ''}
        ${!available ? 'opacity-60' : ''}
      `}
    >
      {/* Badge de destacado */}
      {highlighted && (
        <div className="absolute top-0 right-0 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-bl-lg">
          Recomendado
        </div>
      )}

      {/* Header del plan */}
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">{name}</h2>

        {comingSoon ? (
          <div className="py-8">
            <div className="text-4xl font-bold text-gray-400 mb-2">TBD</div>
            <div className="text-gray-600">{priceFrequency}</div>
            <p className="text-gray-500 text-lg mt-4">{MESSAGES.PLANES.PROXIMAMENTE}</p>
          </div>
        ) : (
          <>
            <div className="text-4xl md:text-5xl font-bold text-blue-600 mb-2">{price}</div>
            <div className="text-gray-600">{priceFrequency}</div>

            {initialInvestment && (
              <div className="text-sm text-gray-500 mt-2">
                + {initialInvestment} inversión inicial
              </div>
            )}
          </>
        )}
      </div>

      {/* Features */}
      {!comingSoon && features.length > 0 && (
        <ul className="space-y-3 mb-8 flex-grow">
          {features.map((feature, idx) => (
            <li key={idx} className="flex items-start">
              <span className="text-green-500 mr-2 flex-shrink-0">✓</span>
              <span className="text-gray-700">{feature}</span>
            </li>
          ))}
        </ul>
      )}

      {/* Button */}
      {!comingSoon && (
        <Button
          variant={highlighted ? 'cta' : 'primary'}
          size="lg"
          fullWidth
          to={available ? buttonTo : undefined}
          disabled={!available}
        >
          {available ? buttonText : MESSAGES.PLANES.PROXIMAMENTE}
        </Button>
      )}
    </Card>
  )
}

// Planes por defecto
const DEFAULT_PLANES = [
  {
    name: 'Plan Básico',
    price: '$10',
    priceFrequency: 'por mes',
    initialInvestment: '$100',
    highlighted: true,
    available: true,
    features: [
      'Hasta 6 estilistas',
      '6 empleados con acceso',
      '300 usuarios(clientes + empleados) activos ',
      '40 servicios/productos',
      '50 imágenes estilistas/productos/servicios',
      'Reservas limitadas',
      'Precios no incluyen IVA'
    ]
  },
  {
    name: 'Plan Premium',
    price: '$15',
    priceFrequency: 'por mes',
    initialInvestment: '$150',
    highlighted: true,
    available: true,
    features: [
      'Hasta 12 estilistas',
      '12 empleados con acceso',
      '500 usuarios(clientes + empleados) activos ',
      '100 servicios/productos',
      '150 imágenes estilistas/productos/servicios',
      'Reservas ilimitadas',
      'Precios no incluyen IVA'
    ]
  },
  {
    name: 'Plan Enterprise',
    price: 'TBD',
    comingSoon: true,
    available: false
  }
]

export default PricingSection
