import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4001'

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
 * Interceptor para logging de responses (solo en desarrollo)
 */
apiClient.interceptors.response.use(
  (response) => {
    if (import.meta.env.DEV) {
      console.log('✅ Response:', response.status, response.config.url)
    }
    return response
  },
  (error) => {
    console.error('❌ Response Error:', error.response?.status, error.response?.data)
    return Promise.reject(error)
  }
)

/**
 * Servicio de Suscripciones
 */
export const suscripcionesAPI = {
  /**
   * Crear una nueva solicitud de suscripción
   */
  crearSolicitud: async (datos) => {
    try {
      const response = await apiClient.post('/api/suscripciones', datos)
      return response.data
    } catch (error) {
      // Extraer mensaje de error del backend
      const mensajeError = error.response?.data?.mensaje
        || error.response?.data?.error
        || 'Error al enviar la solicitud. Por favor, intenta nuevamente.'

      throw new Error(mensajeError)
    }
  },

  /**
   * Obtener todas las solicitudes (uso interno/admin)
   */
  getSolicitudes: async (filtros = {}) => {
    try {
      const params = new URLSearchParams(filtros).toString()
      const url = params ? `/api/suscripciones?${params}` : '/api/suscripciones'
      const response = await apiClient.get(url)
      return response.data
    } catch (error) {
      const mensajeError = error.response?.data?.error
        || 'Error al obtener solicitudes'

      throw new Error(mensajeError)
    }
  },

  /**
   * Obtener estadísticas de solicitudes
   */
  getEstadisticas: async () => {
    try {
      const response = await apiClient.get('/api/suscripciones/stats')
      return response.data
    } catch (error) {
      const mensajeError = error.response?.data?.error
        || 'Error al obtener estadísticas'

      throw new Error(mensajeError)
    }
  },

  /**
   * Actualizar estado de una solicitud
   */
  actualizarEstado: async (id, datos) => {
    try {
      const response = await apiClient.patch(`/api/suscripciones/${id}`, datos)
      return response.data
    } catch (error) {
      const mensajeError = error.response?.data?.error
        || 'Error al actualizar estado'

      throw new Error(mensajeError)
    }
  }
}

/**
 * Health check de la API
 */
export const healthCheck = async () => {
  try {
    const response = await apiClient.get('/api/health')
    return response.data
  } catch (error) {
    throw new Error('API no disponible')
  }
}

export default apiClient
