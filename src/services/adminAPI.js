/**
 * Servicio API para Panel de Administración
 * Usa cookies HTTP-only para autenticación
 */

import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4001'
const BASE_URL = `${API_URL}/api`

// Configurar axios para enviar cookies automáticamente
axios.defaults.withCredentials = true

/**
 * Login de administrador
 * @param {string} email - Email del admin
 * @param {string} password - Contraseña
 * @returns {Promise<Object>} - { user }
 */
export const login = async (email, password) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/auth/login`,
      {
        email,
        password
      },
      {
        withCredentials: true
      }
    )

    if (response.data.success) {
      // El token viene en cookie HTTP-only, no en el body
      return { user: response.data.user }
    }

    throw new Error(response.data.mensaje || 'Error en login')
  } catch (error) {
    console.error('Error en login de admin:', error)
    throw new Error(error.response?.data?.mensaje || error.message || 'Error al iniciar sesión')
  }
}

/**
 * Logout de administrador
 * Llama al backend para limpiar la cookie
 */
export const logout = async () => {
  try {
    await axios.post(`${BASE_URL}/auth/logout`, {}, {
      withCredentials: true
    })
    console.log('✅ Sesión cerrada correctamente')
  } catch (error) {
    console.error('Error en logout:', error)
    // No lanzar error - permitir que el frontend limpie el estado de todos modos
  }
}

/**
 * Verificar si el token es válido
 * @returns {Promise<boolean>}
 */
export const verifyToken = async () => {
  try {
    // La cookie se envía automáticamente
    const response = await axios.get(`${BASE_URL}/admin/estadisticas`, {
      withCredentials: true
    })

    return response.data.success
  } catch (error) {
    console.error('Error al verificar token de admin:', error)
    return false
  }
}

/**
 * Obtener estadísticas del dashboard
 * @returns {Promise<Object>}
 */
export const getEstadisticas = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/admin/estadisticas`, {
      withCredentials: true
    })

    if (response.data.success) {
      return response.data.estadisticas
    }

    throw new Error(response.data.mensaje || 'Error al obtener estadísticas')
  } catch (error) {
    console.error('Error al obtener estadísticas:', error)
    throw new Error(
      error.response?.data?.mensaje || error.message || 'Error al obtener estadísticas'
    )
  }
}

/**
 * Obtener lista de clientes
 * @param {Object} filtros - Filtros opcionales (estado, plan, limite, offset)
 * @returns {Promise<Object>}
 */
export const getClientes = async (filtros = {}) => {
  try {
    const params = new URLSearchParams()
    if (filtros.estado) params.append('estado', filtros.estado)
    if (filtros.plan) params.append('plan', filtros.plan)
    if (filtros.limite) params.append('limite', filtros.limite)
    if (filtros.offset) params.append('offset', filtros.offset)

    const response = await axios.get(`${BASE_URL}/admin/clientes?${params.toString()}`, {
      withCredentials: true
    })

    if (response.data.success) {
      return response.data
    }

    throw new Error(response.data.mensaje || 'Error al obtener clientes')
  } catch (error) {
    console.error('Error al obtener clientes:', error)
    throw new Error(error.response?.data?.mensaje || error.message || 'Error al obtener clientes')
  }
}

/**
 * Obtener detalles de un cliente
 * @param {string} clienteId - ID del cliente
 * @returns {Promise<Object>}
 */
export const getClienteById = async (clienteId) => {
  try {
    const response = await axios.get(`${BASE_URL}/admin/clientes/${clienteId}`, {
      withCredentials: true
    })

    if (response.data.success) {
      return response.data.cliente
    }

    throw new Error(response.data.mensaje || 'Error al obtener cliente')
  } catch (error) {
    console.error('Error al obtener cliente:', error)
    throw new Error(error.response?.data?.mensaje || error.message || 'Error al obtener cliente')
  }
}

/**
 * Actualizar estado de un cliente
 * @param {string} clienteId - ID del cliente
 * @param {string} estado - Nuevo estado (activo, suspendido, cancelado)
 * @param {string} razon - Razón del cambio (opcional)
 * @returns {Promise<Object>}
 */
export const updateClienteEstado = async (clienteId, estado, razon = null) => {
  try {
    const response = await axios.patch(
      `${BASE_URL}/admin/clientes/${clienteId}/estado`,
      {
        estado,
        razon
      },
      {
        withCredentials: true
      }
    )

    if (response.data.success) {
      return response.data
    }

    throw new Error(response.data.mensaje || 'Error al actualizar estado')
  } catch (error) {
    console.error('Error al actualizar estado del cliente:', error)
    throw new Error(error.response?.data?.mensaje || error.message || 'Error al actualizar estado')
  }
}

/**
 * Obtener lista de solicitudes
 * @param {Object} filtros - Filtros opcionales (estado, plan, limite, offset)
 * @returns {Promise<Object>}
 */
export const getSolicitudes = async (filtros = {}) => {
  try {
    const params = new URLSearchParams()
    if (filtros.estado) params.append('estado', filtros.estado)
    if (filtros.plan) params.append('plan', filtros.plan)
    if (filtros.limite) params.append('limite', filtros.limite)
    if (filtros.offset) params.append('offset', filtros.offset)

    const response = await axios.get(`${BASE_URL}/admin/solicitudes?${params.toString()}`, {
      withCredentials: true
    })

    if (response.data.success) {
      return response.data
    }

    throw new Error(response.data.mensaje || 'Error al obtener solicitudes')
  } catch (error) {
    console.error('Error al obtener solicitudes:', error)
    throw new Error(
      error.response?.data?.mensaje || error.message || 'Error al obtener solicitudes'
    )
  }
}

/**
 * Actualizar estado de una solicitud
 * @param {string} solicitudId - ID de la solicitud
 * @param {string} estado - Nuevo estado (pendiente, contactado, procesado, rechazado)
 * @param {string} notas - Notas sobre el cambio (opcional)
 * @returns {Promise<Object>}
 */
export const updateSolicitudEstado = async (solicitudId, estado, notas = null) => {
  try {
    const response = await axios.patch(
      `${BASE_URL}/admin/solicitudes/${solicitudId}/estado`,
      {
        estado,
        notas
      },
      {
        withCredentials: true
      }
    )

    if (response.data.success) {
      return response.data
    }

    throw new Error(response.data.mensaje || 'Error al actualizar estado')
  } catch (error) {
    console.error('Error al actualizar estado de solicitud:', error)
    throw new Error(error.response?.data?.mensaje || error.message || 'Error al actualizar estado')
  }
}

/**
 * Crear cliente automáticamente desde una solicitud aprobada
 * @param {string} solicitudId - ID de la solicitud
 * @returns {Promise<Object>} - { clienteId, usuario, passwordTemporal, email, nombreSalon }
 */
export const crearClienteDesdeSolicitud = async (solicitudId) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/admin/solicitudes/${solicitudId}/crear-cliente`,
      {},
      {
        withCredentials: true
      }
    )

    if (response.data.success) {
      return response.data
    }

    throw new Error(response.data.mensaje || 'Error al crear cliente')
  } catch (error) {
    console.error('Error al crear cliente desde solicitud:', error)
    throw new Error(error.response?.data?.mensaje || error.message || 'Error al crear cliente')
  }
}

/**
 * Confirmar pago y crear cliente con acceso al onboarding
 * @param {string} solicitudId - ID de la solicitud
 * @returns {Promise<Object>} - { clienteId, usuario, passwordTemporal, email, nombreSalon, estado }
 */
export const confirmarPagoYCrearCliente = async (solicitudId) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/admin/solicitudes/${solicitudId}/confirmar-pago`,
      {},
      {
        withCredentials: true
      }
    )

    if (response.data.success) {
      return response.data
    }

    throw new Error(response.data.mensaje || 'Error al confirmar pago')
  } catch (error) {
    console.error('Error al confirmar pago y crear cliente:', error)
    throw new Error(error.response?.data?.mensaje || error.message || 'Error al confirmar pago')
  }
}

/**
 * Obtener lista de solicitudes completas (onboarding)
 * @param {Object} filtros - Filtros opcionales (estado, limite, offset)
 * @returns {Promise<Object>}
 */
export const getSolicitudesCompletas = async (filtros = {}) => {
  try {
    const params = new URLSearchParams()
    if (filtros.estado) params.append('estado', filtros.estado)
    if (filtros.limite) params.append('limite', filtros.limite)
    if (filtros.offset) params.append('offset', filtros.offset)

    const response = await axios.get(`${BASE_URL}/solicitudes-completas?${params.toString()}`, {
      withCredentials: true
    })

    if (response.data.success) {
      return response.data
    }

    throw new Error(response.data.mensaje || 'Error al obtener solicitudes completas')
  } catch (error) {
    console.error('Error al obtener solicitudes completas:', error)
    throw new Error(
      error.response?.data?.mensaje || error.message || 'Error al obtener solicitudes completas'
    )
  }
}

/**
 * Obtener detalles de una solicitud completa
 * @param {string} solicitudId - ID de la solicitud
 * @returns {Promise<Object>}
 */
export const getSolicitudCompletaById = async (solicitudId) => {
  try {
    const response = await axios.get(`${BASE_URL}/solicitudes-completas/${solicitudId}`, {
      withCredentials: true
    })

    if (response.data.success) {
      return response.data.solicitud
    }

    throw new Error(response.data.mensaje || 'Error al obtener solicitud')
  } catch (error) {
    console.error('Error al obtener solicitud completa:', error)
    throw new Error(error.response?.data?.mensaje || error.message || 'Error al obtener solicitud')
  }
}

/**
 * Actualizar estado de una solicitud completa
 * @param {string} solicitudId - ID de la solicitud
 * @param {string} estado - Nuevo estado (pendiente_revision, aprobado, rechazado, completado)
 * @param {string} notas - Notas sobre el cambio (opcional)
 * @returns {Promise<Object>}
 */
export const updateSolicitudCompletaEstado = async (solicitudId, estado, notas = null) => {
  try {
    const response = await axios.patch(
      `${BASE_URL}/solicitudes-completas/${solicitudId}/estado`,
      {
        estado,
        notas
      },
      {
        withCredentials: true
      }
    )

    if (response.data.success) {
      return response.data
    }

    throw new Error(response.data.mensaje || 'Error al actualizar estado')
  } catch (error) {
    console.error('Error al actualizar estado de solicitud completa:', error)
    throw new Error(error.response?.data?.mensaje || error.message || 'Error al actualizar estado')
  }
}

/**
 * Crear salón automáticamente desde una solicitud completa aprobada
 * @param {string} solicitudId - ID de la solicitud
 * @returns {Promise<Object>} - { salonId, adminId, usuario, passwordTemporal }
 */
export const crearSalonDesdeSolicitud = async (solicitudId) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/solicitudes-completas/${solicitudId}/crear-salon`,
      {},
      {
        withCredentials: true
      }
    )

    if (response.data.success) {
      return response.data
    }

    throw new Error(response.data.mensaje || 'Error al crear salón')
  } catch (error) {
    console.error('Error al crear salón desde solicitud:', error)
    throw new Error(error.response?.data?.mensaje || error.message || 'Error al crear salón')
  }
}

/**
 * Solicitar recuperación de contraseña
 * @param {string} email - Email del admin
 * @returns {Promise<Object>}
 */
export const forgotPassword = async (email) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/auth/forgot-password`,
      { email },
      { withCredentials: true }
    )

    if (response.data.success) {
      return response.data
    }

    throw new Error(response.data.mensaje || 'Error al solicitar recuperación')
  } catch (error) {
    console.error('Error al solicitar recuperación de contraseña:', error)
    throw new Error(
      error.response?.data?.mensaje || error.message || 'Error al solicitar recuperación'
    )
  }
}

/**
 * Resetear contraseña con token
 * @param {string} token - Token de recuperación
 * @param {string} newPassword - Nueva contraseña
 * @returns {Promise<Object>}
 */
export const resetPassword = async (token, newPassword) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/auth/reset-password/${token}`,
      { newPassword },
      { withCredentials: true }
    )

    if (response.data.success) {
      return response.data
    }

    throw new Error(response.data.mensaje || 'Error al resetear contraseña')
  } catch (error) {
    console.error('Error al resetear contraseña:', error)
    throw new Error(
      error.response?.data?.mensaje || error.message || 'Error al resetear contraseña'
    )
  }
}

export default {
  login,
  logout,
  verifyToken,
  getEstadisticas,
  getClientes,
  getClienteById,
  updateClienteEstado,
  getSolicitudes,
  updateSolicitudEstado,
  crearClienteDesdeSolicitud,
  confirmarPagoYCrearCliente,
  getSolicitudesCompletas,
  getSolicitudCompletaById,
  updateSolicitudCompletaEstado,
  crearSalonDesdeSolicitud,
  forgotPassword,
  resetPassword
}
