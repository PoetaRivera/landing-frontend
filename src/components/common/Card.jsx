/**
 * Componente Card reutilizable para contenedores visuales
 *
 * @param {Object} props
 * @param {React.ReactNode} props.children - Contenido de la card
 * @param {string} props.title - Título de la card
 * @param {string} props.subtitle - Subtítulo de la card
 * @param {React.ReactNode} props.header - Contenido personalizado del header
 * @param {React.ReactNode} props.footer - Contenido del footer
 * @param {boolean} props.hoverable - Si tiene efecto hover
 * @param {boolean} props.clickable - Si es clickeable
 * @param {Function} props.onClick - Handler de click
 * @param {'sm'|'md'|'lg'|'none'} props.padding - Tamaño del padding
 * @param {boolean} props.shadow - Si tiene sombra
 * @param {boolean} props.border - Si tiene borde
 * @param {string} props.className - Clases adicionales
 */
function Card({
  children,
  title,
  subtitle,
  header,
  footer,
  hoverable = false,
  clickable = false,
  onClick,
  padding = 'md',
  shadow = true,
  border = true,
  className = ''
}) {
  // Clases base
  const baseClasses = 'bg-white rounded-lg transition-all duration-200'

  // Clases de padding
  const paddingClasses = {
    none: '',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8'
  }

  // Clases de sombra
  const shadowClasses = shadow ? 'shadow-md' : ''

  // Clases de borde
  const borderClasses = border ? 'border border-gray-200' : ''

  // Clases de hover
  const hoverClasses = hoverable ? 'hover:shadow-xl hover:-translate-y-1' : ''

  // Clases de clickable
  const clickableClasses = clickable || onClick ? 'cursor-pointer' : ''

  // Combinar clases
  const cardClasses = `
    ${baseClasses}
    ${paddingClasses[padding]}
    ${shadowClasses}
    ${borderClasses}
    ${hoverClasses}
    ${clickableClasses}
    ${className}
  `
    .trim()
    .replace(/\s+/g, ' ')

  return (
    <div
      className={cardClasses}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={(e) => {
        if (onClick && (e.key === 'Enter' || e.key === ' ')) {
          e.preventDefault()
          onClick(e)
        }
      }}
    >
      {/* Header personalizado o default con título/subtítulo */}
      {(header || title || subtitle) && (
        <div className="mb-4">
          {header || (
            <>
              {title && <h3 className="text-xl font-bold text-gray-900 mb-1">{title}</h3>}
              {subtitle && <p className="text-sm text-gray-600">{subtitle}</p>}
            </>
          )}
        </div>
      )}

      {/* Contenido */}
      <div className="flex-grow">{children}</div>

      {/* Footer */}
      {footer && <div className="mt-4 pt-4 border-t border-gray-200">{footer}</div>}
    </div>
  )
}

/**
 * CardHeader - Componente auxiliar para el header de una card
 */
Card.Header = function CardHeader({ children, className = '' }) {
  return <div className={`mb-4 ${className}`}>{children}</div>
}

/**
 * CardBody - Componente auxiliar para el body de una card
 */
Card.Body = function CardBody({ children, className = '' }) {
  return <div className={`flex-grow ${className}`}>{children}</div>
}

/**
 * CardFooter - Componente auxiliar para el footer de una card
 */
Card.Footer = function CardFooter({ children, className = '' }) {
  return <div className={`mt-4 pt-4 border-t border-gray-200 ${className}`}>{children}</div>
}

export default Card
