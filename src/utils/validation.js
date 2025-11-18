import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

/**
 * Schema de validación para el formulario de suscripción
 * Debe coincidir con el backend
 */
export const suscripcionSchema = z.object({
  nombreSalon: z
    .string()
    .min(2, 'El nombre del salón debe tener al menos 2 caracteres')
    .max(100, 'El nombre del salón no puede exceder 100 caracteres')
    .trim()
    .nonempty('El nombre del salón es requerido'),

  nombrePropietario: z
    .string()
    .min(2, 'El nombre debe tener al menos 2 caracteres')
    .max(100, 'El nombre no puede exceder 100 caracteres')
    .trim()
    .nonempty('El nombre del propietario es requerido'),

  email: z
    .string()
    .email('Debe ser un email válido')
    .toLowerCase()
    .trim()
    .nonempty('El email es requerido'),

  telefono: z
    .string()
    .min(8, 'El teléfono debe tener al menos 8 dígitos')
    .max(20, 'El teléfono no puede exceder 20 caracteres')
    .regex(
      /^[\d\s\-+()]+$/,
      'El teléfono solo puede contener números, espacios, guiones, paréntesis y signo +'
    )
    .trim()
    .nonempty('El teléfono es requerido'),

  plan: z.enum(['Plan Básico', 'Plan Premium', 'Plan Enterprise'], {
    required_error: 'Debes seleccionar un plan',
    invalid_type_error: 'Plan inválido'
  }),

  mensaje: z.string().max(1000, 'El mensaje no puede exceder 1000 caracteres').trim().optional()
})

/**
 * Resolver de Zod para React Hook Form
 */
export const suscripcionResolver = zodResolver(suscripcionSchema)

/**
 * Validación manual de un campo específico
 */
export const validarCampo = (campo, valor) => {
  try {
    suscripcionSchema.pick({ [campo]: true }).parse({ [campo]: valor })
    return { valido: true, error: null }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        valido: false,
        error: error.errors[0]?.message || 'Error de validación'
      }
    }
    return { valido: false, error: 'Error desconocido' }
  }
}

/**
 * Formatea los errores de validación para mostrarlos
 */
export const formatearErrores = (errors) => {
  if (!errors) return {}

  const erroresFormateados = {}
  Object.keys(errors).forEach((key) => {
    erroresFormateados[key] = errors[key]?.message || 'Campo inválido'
  })

  return erroresFormateados
}

export default {
  suscripcionSchema,
  suscripcionResolver,
  validarCampo,
  formatearErrores
}
