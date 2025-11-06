import Button from '../common/Button'
import { MESSAGES } from '../../utils/messages'

/**
 * HeroSection - Sección principal de hero/banner
 *
 * @param {Object} props
 * @param {string} props.title - Título principal
 * @param {string} props.subtitle - Subtítulo/descripción
 * @param {string} props.primaryButtonText - Texto del botón principal
 * @param {string} props.primaryButtonTo - Ruta del botón principal
 * @param {string} props.secondaryButtonText - Texto del botón secundario
 * @param {string} props.secondaryButtonTo - Ruta del botón secundario
 * @param {string} props.bgGradient - Clases de gradiente (opcional)
 */
function HeroSection({
  title = MESSAGES.LANDING.HERO_TITLE,
  subtitle = MESSAGES.LANDING.HERO_SUBTITLE,
  primaryButtonText = MESSAGES.LANDING.CTA_PRIMARY,
  primaryButtonTo = '/suscripcion',
  secondaryButtonText = MESSAGES.LANDING.CTA_SECONDARY,
  secondaryButtonTo = '/demo',
  bgGradient = 'from-blue-600 to-blue-800'
}) {
  return (
    <section className={`bg-gradient-to-r ${bgGradient} text-white py-20`}>
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 animate-fadeIn">{title}</h1>

        <p className="text-lg md:text-xl lg:text-2xl mb-8 max-w-3xl mx-auto animate-slideUp">
          {subtitle}
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            variant="cta"
            size="lg"
            to={primaryButtonTo}
            className="bg-white text-blue-600 hover:bg-gray-100"
          >
            {primaryButtonText}
          </Button>

          {secondaryButtonText && (
            <Button
              variant="outline"
              size="lg"
              to={secondaryButtonTo}
              className="border-2 border-white text-white hover:bg-white hover:text-blue-600"
            >
              {secondaryButtonText}
            </Button>
          )}
        </div>
      </div>
    </section>
  )
}

export default HeroSection
