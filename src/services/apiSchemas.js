import { z } from 'zod'

/**
 * Schemas de validación para respuestas de la API
 * Aseguran que los datos recibidos del backend tienen el formato esperado
 */

/**
 * Schema para respuesta de creación de solicitud (SIN Stripe)
 */
export const crearSolicitudResponseSchema = z.object({
  success: z.boolean(),
  mensaje: z.string(),
  data: z.object({
    solicitudId: z.string()
  })
})

/**
 * Schema para una solicitud individual
 */
export const solicitudSchema = z.object({
  id: z.string(),
  nombreSalon: z.string(),
  nombrePropietario: z.string(),
  email: z.string().email(),
  telefono: z.string(),
  plan: z.string(),
  mensaje: z.string().optional(),
  estado: z.enum(['pendiente', 'contactado', 'procesado', 'rechazado']),
  fechaCreacion: z.string(), // ISO date string
  fechaActualizacion: z.string().optional(),
  notas: z.string().optional()
})

/**
 * Schema para respuesta de lista de solicitudes
 */
export const getSolicitudesResponseSchema = z.object({
  success: z.boolean(),
  total: z.number(),
  solicitudes: z.array(solicitudSchema)
})

/**
 * Schema para respuesta de estadísticas
 */
export const getEstadisticasResponseSchema = z.object({
  success: z.boolean(),
  estadisticas: z.object({
    total: z.number(),
    porEstado: z.object({
      pendiente: z.number(),
      contactado: z.number(),
      procesado: z.number(),
      rechazado: z.number()
    }),
    porPlan: z.record(z.string(), z.number())
  })
})

/**
 * Schema para respuesta de actualización de estado
 */
export const actualizarEstadoResponseSchema = z.object({
  success: z.boolean(),
  mensaje: z.string()
})

/**
 * Schema para respuesta de health check
 */
export const healthCheckResponseSchema = z.object({
  status: z.string(),
  timestamp: z.string()
})

/**
 * Schema para errores de la API
 */
export const apiErrorResponseSchema = z.object({
  success: z.boolean(),
  error: z.string(),
  mensaje: z.string().optional(),
  errores: z
    .array(
      z.object({
        campo: z.string(),
        mensaje: z.string()
      })
    )
    .optional()
})

/**
 * Validar respuesta con schema
 * @param {any} data - Datos a validar
 * @param {z.ZodSchema} schema - Schema de Zod
 * @returns {any} Datos validados
 * @throws {Error} Si la validación falla
 */
export function validateResponse(data, schema) {
  try {
    return schema.parse(data)
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error('❌ Error de validación de respuesta:', error.errors)
      throw new Error('Respuesta inválida del servidor. Por favor, contacta a soporte.')
    }
    throw error
  }
}

/**
 * Validar respuesta de forma segura (no lanza error)
 * @param {any} data - Datos a validar
 * @param {z.ZodSchema} schema - Schema de Zod
 * @returns {{success: boolean, data?: any, error?: Error}} Resultado de validación
 */
export function safeValidateResponse(data, schema) {
  const result = schema.safeParse(data)

  if (result.success) {
    return { success: true, data: result.data }
  }

  console.error('❌ Error de validación de respuesta:', result.error.errors)
  return {
    success: false,
    error: new Error('Respuesta inválida del servidor')
  }
}
