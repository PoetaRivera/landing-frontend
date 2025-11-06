import { forwardRef } from 'react'

/**
 * Componente Select reutilizable con estilos de validación
 *
 * @param {Object} props
 * @param {string} props.label - Etiqueta del select
 * @param {Array} props.options - Opciones [{value, label, disabled}]
 * @param {string} props.placeholder - Placeholder (opción vacía)
 * @param {string} props.error - Mensaje de error
 * @param {string} props.helperText - Texto de ayuda
 * @param {boolean} props.required - Si el campo es requerido
 * @param {boolean} props.disabled - Si el campo está deshabilitado
 * @param {boolean} props.fullWidth - Si ocupa todo el ancho
 * @param {'sm'|'md'|'lg'} props.size - Tamaño del select
 */
const Select = forwardRef(({
  label,
  options = [],
  placeholder,
  error,
  helperText,
  required = false,
  disabled = false,
  fullWidth = false,
  size = 'md',
  className = '',
  id,
  name,
  ...rest
}, ref) => {
  // Generar ID único si no se proporciona
  const selectId = id || name || `select-${Math.random().toString(36).substr(2, 9)}`

  // Clases base del select
  const baseSelectClasses = 'block w-full rounded-lg border transition-colors duration-200 focus:outline-none focus:ring-2 disabled:opacity-50 disabled:cursor-not-allowed appearance-none bg-white'

  // Clases por tamaño
  const sizeClasses = {
    sm: 'text-sm px-3 py-1.5 pr-8',
    md: 'text-base px-4 py-2 pr-10',
    lg: 'text-lg px-5 py-3 pr-12'
  }

  // Clases por estado de validación
  const validationClasses = error
    ? 'border-red-500 focus:border-red-500 focus:ring-red-500 bg-red-50'
    : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500'

  // Clases combinadas del select
  const selectClasses = `
    ${baseSelectClasses}
    ${sizeClasses[size]}
    ${validationClasses}
    ${className}
  `.trim().replace(/\s+/g, ' ')

  return (
    <div className={`${fullWidth ? 'w-full' : ''}`}>
      {/* Label */}
      {label && (
        <label
          htmlFor={selectId}
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}

      {/* Select container (para el icono de flecha) */}
      <div className="relative">
        {/* Select */}
        <select
          ref={ref}
          id={selectId}
          name={name}
          disabled={disabled}
          required={required}
          className={selectClasses}
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={
            error ? `${selectId}-error` : helperText ? `${selectId}-helper` : undefined
          }
          {...rest}
        >
          {/* Opción placeholder */}
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}

          {/* Opciones */}
          {options.map((option, index) => {
            // Soportar tanto objetos {value, label} como strings simples
            const value = typeof option === 'string' ? option : option.value
            const label = typeof option === 'string' ? option : option.label
            const isDisabled = typeof option === 'object' ? option.disabled : false

            return (
              <option
                key={`${value}-${index}`}
                value={value}
                disabled={isDisabled}
              >
                {label}
              </option>
            )
          })}
        </select>

        {/* Icono de flecha */}
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400">
          <svg
            className="h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      </div>

      {/* Mensaje de error */}
      {error && (
        <p
          id={`${selectId}-error`}
          className="mt-1 text-sm text-red-600 flex items-center gap-1"
        >
          <svg
            className="w-4 h-4 flex-shrink-0"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
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
        <p
          id={`${selectId}-helper`}
          className="mt-1 text-sm text-gray-500"
        >
          {helperText}
        </p>
      )}
    </div>
  )
})

Select.displayName = 'Select'

export default Select
