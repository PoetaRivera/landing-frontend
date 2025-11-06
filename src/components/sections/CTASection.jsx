import Button from '../common/Button'
import { MESSAGES } from '../../utils/messages'

/**
 * CTASection - Call To Action section
 * Sección de llamada a la acción reutilizable
 *
 * @param {Object} props
 * @param {string} props.title - Título de la sección
 * @param {string} props.subtitle - Subtítulo/descripción
 * @param {string} props.buttonText - Texto del botón
 * @param {string} props.buttonTo - Ruta del botón (React Router)
 * @param {string} props.buttonHref - URL externa del botón
 * @param {Function} props.onButtonClick - Handler del botón
 * @param {string} props.bgColor - Color de fondo (clase Tailwind)
 * @param {string} props.textColor - Color de texto (clase Tailwind)
 * @param {'sm'|'md'|'lg'} props.size - Tamaño de la sección
 */
function CTASection({
  title = '¿Listo para transformar tu salón?',
  subtitle = 'Únete a cientos de salones que ya confían en MultiSalón',
  buttonText = MESSAGES.LANDING.CTA_VER_PLANES,
  buttonTo,
  buttonHref,
  onButtonClick,
  bgColor = 'bg-green-600',
  textColor = 'text-white',
  size = 'md'
}) {
  // Clases de padding por tamaño
  const sizeClasses = {
    sm: 'py-12',
    md: 'py-16',
    lg: 'py-20'
  }

  return (
    <section className={`${bgColor} ${textColor} ${sizeClasses[size]}`}>
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4">{title}</h2>

        {subtitle && (
          <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto opacity-90">{subtitle}</p>
        )}

        <Button
          variant="cta"
          size="lg"
          to={buttonTo}
          href={buttonHref}
          onClick={onButtonClick}
          className="bg-white text-gray-900 hover:bg-gray-100 shadow-xl"
        >
          {buttonText}
        </Button>
      </div>
    </section>
  )
}

export default CTASection
