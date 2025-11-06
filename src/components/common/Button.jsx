import { Link } from 'react-router-dom'

/**
 * Componente Button reutilizable con múltiples variantes
 *
 * @param {Object} props
 * @param {'primary'|'secondary'|'outline'|'ghost'|'cta'|'danger'} props.variant - Estilo del botón
 * @param {'sm'|'md'|'lg'|'xl'} props.size - Tamaño del botón
 * @param {boolean} props.disabled - Si el botón está deshabilitado
 * @param {boolean} props.loading - Si el botón está en estado de carga
 * @param {boolean} props.fullWidth - Si el botón ocupa todo el ancho
 * @param {string} props.to - Ruta para Link (si es un link interno)
 * @param {string} props.href - URL para link externo
 * @param {Function} props.onClick - Handler de click
 * @param {React.ReactNode} props.children - Contenido del botón
 * @param {React.ReactNode} props.icon - Icono opcional
 * @param {'left'|'right'} props.iconPosition - Posición del icono
 */
function Button({
  children,
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  fullWidth = false,
  to,
  href,
  onClick,
  icon,
  iconPosition = 'left',
  type = 'button',
  className = '',
  ...rest
}) {
  // Clases base
  const baseClasses =
    'inline-flex items-center justify-center font-semibold rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed'

  // Clases por variante
  const variantClasses = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500 active:bg-blue-800',
    secondary:
      'bg-green-600 text-white hover:bg-green-700 focus:ring-green-500 active:bg-green-800',
    outline:
      'bg-transparent border-2 border-blue-600 text-blue-600 hover:bg-blue-50 focus:ring-blue-500',
    ghost: 'bg-transparent text-gray-700 hover:bg-gray-100 focus:ring-gray-500',
    cta: 'bg-amber-500 text-white hover:bg-amber-600 focus:ring-amber-500 active:bg-amber-700 shadow-lg hover:shadow-xl transform hover:scale-105',
    danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500 active:bg-red-800'
  }

  // Clases por tamaño
  const sizeClasses = {
    sm: 'text-sm px-3 py-1.5 gap-1.5',
    md: 'text-base px-4 py-2 gap-2',
    lg: 'text-lg px-6 py-3 gap-2',
    xl: 'text-xl px-8 py-4 gap-3'
  }

  // Clases adicionales
  const widthClass = fullWidth ? 'w-full' : ''

  // Combinar todas las clases
  const combinedClasses = `
    ${baseClasses}
    ${variantClasses[variant]}
    ${sizeClasses[size]}
    ${widthClass}
    ${className}
  `
    .trim()
    .replace(/\s+/g, ' ')

  // Contenido del botón
  const buttonContent = (
    <>
      {loading && (
        <svg
          className="animate-spin h-5 w-5"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      )}

      {!loading && icon && iconPosition === 'left' && <span className="flex-shrink-0">{icon}</span>}

      {children}

      {!loading && icon && iconPosition === 'right' && (
        <span className="flex-shrink-0">{icon}</span>
      )}
    </>
  )

  // Si es un link interno (React Router)
  if (to && !disabled) {
    return (
      <Link to={to} className={combinedClasses} {...rest}>
        {buttonContent}
      </Link>
    )
  }

  // Si es un link externo
  if (href && !disabled) {
    return (
      <a
        href={href}
        className={combinedClasses}
        target="_blank"
        rel="noopener noreferrer"
        {...rest}
      >
        {buttonContent}
      </a>
    )
  }

  // Si es un botón normal
  return (
    <button
      type={type}
      className={combinedClasses}
      disabled={disabled || loading}
      onClick={onClick}
      {...rest}
    >
      {buttonContent}
    </button>
  )
}

export default Button
