import axios from 'axios'
import {
  crearSolicitudResponseSchema,
  getSolicitudesResponseSchema,
  getEstadisticasResponseSchema,
  actualizarEstadoResponseSchema,
  healthCheckResponseSchema,
  validateResponse
} from './apiSchemas'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4001'

/**
 * Tipos de error personalizados
 */
export class APIError extends Error {
  constructor(message, statusCode, originalError) {
    super(message)
    this.name = 'APIError'
    this.statusCode = statusCode
    this.originalError = originalError
  }
}

export class ValidationError extends Error {
  constructor(message, errors) {
    super(message)
    this.name = 'ValidationError'
    this.errors = errors
  }
}

export class TimeoutError extends Error {
  constructor(message) {
    super(message)
    this.name = 'TimeoutError'
  }
}

export class NetworkError extends Error {
  constructor(message) {
    super(message)
    this.name = 'NetworkError'
  }
}

/**
 * Cliente Axios configurado para la API del landing
 */
const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  },
  timeout: 15000 // 15 segundos
})

/**
 * Interceptor para logging de requests (solo en desarrollo)
 */
apiClient.interceptors.request.use(
  (config) => {
    if (import.meta.env.DEV) {
      // eslint-disable-next-line no-console
      console.log('🚀 Request:', config.method.toUpperCase(), config.url)
    }
    return config
  },
  (error) => {
    console.error('❌ Request Error:', error)
    return Promise.reject(error)
  }
)

/**
 * Interceptor para manejar errores y validar respuestas
 */
apiClient.interceptors.response.use(
  (response) => {
    if (import.meta.env.DEV) {
      // eslint-disable-next-line no-console
      console.log('✅ Response:', response.status, response.config.url)
    }
    return response
  },
  (error) => {
    // Clasificar el tipo de error
    if (error.code === 'ECONNABORTED') {
      console.error('⏱️ Timeout Error:', error.config?.url)
      return Promise.reject(
        new TimeoutError('La solicitud tardó demasiado. Por favor, verifica tu conexión.')
      )
    }

    if (error.code === 'ERR_NETWORK' || !error.response) {
      console.error('🌐 Network Error:', error.message)
      return Promise.reject(
        new NetworkError('No se pudo conectar al servidor. Verifica tu conexión a internet.')
      )
    }

    // Error del servidor con respuesta
    const statusCode = error.response?.status
    const errorData = error.response?.data

    console.error('❌ Response Error:', statusCode, errorData)

    // Crear error personalizado basado en el código de estado
    let errorMessage = 'Error al procesar la solicitud'

    if (statusCode >= 400 && statusCode < 500) {
      // Errores del cliente
      errorMessage = errorData?.mensaje || errorData?.error || 'Solicitud inválida'
    } else if (statusCode >= 500) {
      // Errores del servidor
      errorMessage = 'Error del servidor. Por favor, intenta más tarde.'
    }

    return Promise.reject(new APIError(errorMessage, statusCode, error))
  }
)

/**
 * Función helper para manejar llamadas API con validación
 */
async function apiCall(requestFn, schema) {
  try {
    const response = await requestFn()

    // Validar respuesta con schema
    if (schema) {
      const validatedData = validateResponse(response.data, schema)
      return validatedData
    }

    return response.data
  } catch (error) {
    // Re-lanzar errores personalizados
    if (
      error instanceof APIError ||
      error instanceof TimeoutError ||
      error instanceof NetworkError ||
      error instanceof ValidationError
    ) {
      throw error
    }

    // Errores no esperados
    console.error('❌ Unexpected Error:', error)
    throw new Error('Error inesperado. Por favor, intenta nuevamente.')
  }
}

/**
 * Servicio de Suscripciones
 */
export const suscripcionesAPI = {
  /**
   * Crear una nueva solicitud de suscripción
   * @param {Object} datos - Datos de la solicitud
   * @returns {Promise<Object>} Respuesta del servidor
   */
  crearSolicitud: async (datos) => {
    return apiCall(() => apiClient.post('/api/suscripciones', datos), crearSolicitudResponseSchema)
  },

  /**
   * Obtener todas las solicitudes (uso interno/admin)
   * @param {Object} filtros - Filtros opcionales (estado, plan, limite)
   * @returns {Promise<Object>} Lista de solicitudes
   */
  getSolicitudes: async (filtros = {}) => {
    const params = new URLSearchParams(filtros).toString()
    const url = params ? `/api/suscripciones?${params}` : '/api/suscripciones'

    return apiCall(() => apiClient.get(url), getSolicitudesResponseSchema)
  },

  /**
   * Obtener estadísticas de solicitudes
   * @returns {Promise<Object>} Estadísticas
   */
  getEstadisticas: async () => {
    return apiCall(() => apiClient.get('/api/suscripciones/stats'), getEstadisticasResponseSchema)
  },

  /**
   * Actualizar estado de una solicitud
   * @param {string} id - ID de la solicitud
   * @param {Object} datos - Nuevos datos (estado, notas)
   * @returns {Promise<Object>} Respuesta del servidor
   */
  actualizarEstado: async (id, datos) => {
    return apiCall(
      () => apiClient.patch(`/api/suscripciones/${id}`, datos),
      actualizarEstadoResponseSchema
    )
  }
}

/**
 * Health check de la API
 * @returns {Promise<Object>} Estado de la API
 */
export const healthCheck = async () => {
  return apiCall(() => apiClient.get('/api/health'), healthCheckResponseSchema)
}

/**
 * Verificar disponibilidad de la API con timeout corto
 * @returns {Promise<boolean>} true si la API está disponible
 */
export const checkAPIAvailability = async () => {
  try {
    await apiClient.get('/api/health', { timeout: 5000 })
    return true
  } catch (error) {
    console.error('API no disponible:', error.message)
    return false
  }
}

export default apiClient
