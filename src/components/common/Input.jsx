import { forwardRef } from 'react'

/**
 * Componente Input reutilizable con estilos de validación
 *
 * @param {Object} props
 * @param {string} props.label - Etiqueta del input
 * @param {string} props.type - Tipo de input (text, email, password, etc.)
 * @param {string} props.placeholder - Placeholder
 * @param {string} props.error - Mensaje de error
 * @param {string} props.helperText - Texto de ayuda
 * @param {boolean} props.required - Si el campo es requerido
 * @param {boolean} props.disabled - Si el campo está deshabilitado
 * @param {boolean} props.fullWidth - Si ocupa todo el ancho
 * @param {React.ReactNode} props.icon - Icono opcional (izquierda)
 * @param {React.ReactNode} props.rightIcon - Icono opcional (derecha)
 * @param {'sm'|'md'|'lg'} props.size - Tamaño del input
 */
const Input = forwardRef(
  (
    {
      label,
      type = 'text',
      placeholder,
      error,
      helperText,
      required = false,
      disabled = false,
      fullWidth = false,
      icon,
      rightIcon,
      size = 'md',
      className = '',
      id,
      name,
      ...rest
    },
    ref
  ) => {
    // Generar ID único si no se proporciona
    const inputId = id || name || `input-${Math.random().toString(36).substr(2, 9)}`

    // Clases base del input
    const baseInputClasses =
      'block w-full rounded-lg border transition-colors duration-200 focus:outline-none focus:ring-2 disabled:opacity-50 disabled:cursor-not-allowed'

    // Clases por tamaño
    const sizeClasses = {
      sm: 'text-sm px-3 py-1.5',
      md: 'text-base px-4 py-2',
      lg: 'text-lg px-5 py-3'
    }

    // Clases por estado de validación
    const validationClasses = error
      ? 'border-red-500 focus:border-red-500 focus:ring-red-500 bg-red-50'
      : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500 bg-white'

    // Ajustar padding si hay iconos
    const iconClasses = icon ? 'pl-10' : ''
    const rightIconClasses = rightIcon ? 'pr-10' : ''

    // Clases combinadas del input
    const inputClasses = `
    ${baseInputClasses}
    ${sizeClasses[size]}
    ${validationClasses}
    ${iconClasses}
    ${rightIconClasses}
    ${className}
  `
      .trim()
      .replace(/\s+/g, ' ')

    return (
      <div className={`${fullWidth ? 'w-full' : ''}`}>
        {/* Label */}
        {label && (
          <label htmlFor={inputId} className="block text-sm font-medium text-gray-700 mb-1">
            {label}
            {required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}

        {/* Input container (para posicionar iconos) */}
        <div className="relative">
          {/* Icono izquierdo */}
          {icon && (
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
              {icon}
            </div>
          )}

          {/* Input */}
          <input
            ref={ref}
            id={inputId}
            name={name}
            type={type}
            placeholder={placeholder}
            disabled={disabled}
            required={required}
            className={inputClasses}
            aria-invalid={error ? 'true' : 'false'}
            aria-describedby={
              error ? `${inputId}-error` : helperText ? `${inputId}-helper` : undefined
            }
            {...rest}
          />

          {/* Icono derecho */}
          {rightIcon && (
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-gray-400">
              {rightIcon}
            </div>
          )}
        </div>

        {/* Mensaje de error */}
        {error && (
          <p id={`${inputId}-error`} className="mt-1 text-sm text-red-600 flex items-center gap-1">
            <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
            {error}
          </p>
        )}

        {/* Texto de ayuda */}
        {!error && helperText && (
          <p id={`${inputId}-helper`} className="mt-1 text-sm text-gray-500">
            {helperText}
          </p>
        )}
      </div>
    )
  }
)

Input.displayName = 'Input'

export default Input
