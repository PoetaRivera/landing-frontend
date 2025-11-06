/**
 * Opciones centralizadas para componentes Select
 * Mantiene consistencia en toda la aplicación
 */

/**
 * Opciones de planes de suscripción
 */
export const PLANES_OPTIONS = [
  {
    value: 'Plan Básico - $15/mes',
    label: 'Plan Básico - $15/mes',
    description: 'Ideal para salones pequeños'
  },
  {
    value: 'Plan Premium',
    label: 'Plan Premium',
    description: 'Recomendado para salones medianos',
    disabled: true // Aún no disponible
  },
  {
    value: 'Plan Enterprise',
    label: 'Plan Enterprise',
    description: 'Para cadenas de salones',
    disabled: true // Aún no disponible
  }
]

/**
 * Opciones de tipo de servicio
 */
export const TIPOS_SERVICIO_OPTIONS = [
  {
    value: 'todo-incluido',
    label: 'Todo Incluido',
    description: 'Implementación completa con capacitación'
  },
  {
    value: 'auto-gestion',
    label: 'Auto Gestión',
    description: 'Tú configuras tu propio salón'
  }
]

/**
 * Opciones de estados de solicitud (para admin)
 */
export const ESTADOS_SOLICITUD_OPTIONS = [
  {
    value: 'pendiente',
    label: 'Pendiente',
    color: 'yellow'
  },
  {
    value: 'contactado',
    label: 'Contactado',
    color: 'blue'
  },
  {
    value: 'procesado',
    label: 'Procesado',
    color: 'green'
  },
  {
    value: 'rechazado',
    label: 'Rechazado',
    color: 'red'
  }
]

/**
 * Categorías de tutoriales
 */
export const CATEGORIAS_TUTORIALES = [
  { value: 'todos', label: 'Todos' },
  { value: 'primeros-pasos', label: 'Primeros Pasos' },
  { value: 'reservas', label: 'Gestión de Reservas' },
  { value: 'clientes', label: 'Gestión de Clientes' },
  { value: 'servicios', label: 'Servicios' },
  { value: 'reportes', label: 'Reportes' },
  { value: 'avanzado', label: 'Avanzado' }
]

/**
 * Opciones de filtro de planes (para estadísticas)
 */
export const FILTRO_PLANES = [
  { value: '', label: 'Todos los planes' },
  ...PLANES_OPTIONS.filter(p => !p.disabled)
]

/**
 * Helper: Obtener label de un valor
 */
export function getLabelByValue(options, value) {
  const option = options.find(opt => opt.value === value)
  return option ? option.label : value
}

/**
 * Helper: Obtener opciones habilitadas
 */
export function getEnabledOptions(options) {
  return options.filter(opt => !opt.disabled)
}

/**
 * Helper: Obtener opciones para React Hook Form select
 */
export function toSelectOptions(options) {
  return options.map(opt => ({
    value: opt.value,
    label: opt.label
  }))
}

export default {
  PLANES_OPTIONS,
  TIPOS_SERVICIO_OPTIONS,
  ESTADOS_SOLICITUD_OPTIONS,
  CATEGORIAS_TUTORIALES,
  FILTRO_PLANES,
  getLabelByValue,
  getEnabledOptions,
  toSelectOptions
}
