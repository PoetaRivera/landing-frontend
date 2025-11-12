/**
 * Servicio API para Panel de Administración
 */

import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4001'
const BASE_URL = `${API_URL}/api`

/**
 * Configurar token en headers de axios
 */
const setAuthToken = (token) => {
  if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
  } else {
    delete axios.defaults.headers.common['Authorization']
  }
}

/**
 * Login de administrador
 * @param {string} email - Email del admin
 * @param {string} password - Contraseña
 * @returns {Promise<Object>} - { token, admin }
 */
export const login = async (email, password) => {
  try {
    const response = await axios.post(`${BASE_URL}/auth/login`, {
      email,
      password
    })

    if (response.data.success) {
      const { token } = response.data

      // Guardar token en localStorage
      localStorage.setItem('adminToken', token)

      // Configurar token para futuras peticiones
      setAuthToken(token)

      return { token }
    }

    throw new Error(response.data.mensaje || 'Error en login')
  } catch (error) {
    console.error('Error en login de admin:', error)
    throw new Error(
      error.response?.data?.mensaje ||
      error.message ||
      'Error al iniciar sesión'
    )
  }
}

/**
 * Logout de administrador
 */
export const logout = () => {
  localStorage.removeItem('adminToken')
  setAuthToken(null)
}

/**
 * Verificar si el token es válido
 * @returns {Promise<boolean>}
 */
export const verifyToken = async () => {
  try {
    const token = localStorage.getItem('adminToken')

    if (!token) {
      return false
    }

    setAuthToken(token)

    // Intentar obtener estadísticas para verificar el token
    const response = await axios.get(`${BASE_URL}/admin/estadisticas`)

    return response.data.success
  } catch (error) {
    console.error('Error al verificar token de admin:', error)
    logout()
    return false
  }
}

/**
 * Obtener estadísticas del dashboard
 * @returns {Promise<Object>}
 */
export const getEstadisticas = async () => {
  try {
    const token = localStorage.getItem('adminToken')

    if (!token) {
      throw new Error('No hay sesión activa')
    }

    setAuthToken(token)

    const response = await axios.get(`${BASE_URL}/admin/estadisticas`)

    if (response.data.success) {
      return response.data.estadisticas
    }

    throw new Error(response.data.mensaje || 'Error al obtener estadísticas')
  } catch (error) {
    console.error('Error al obtener estadísticas:', error)
    throw new Error(
      error.response?.data?.mensaje ||
      error.message ||
      'Error al obtener estadísticas'
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
    const token = localStorage.getItem('adminToken')

    if (!token) {
      throw new Error('No hay sesión activa')
    }

    setAuthToken(token)

    const params = new URLSearchParams()
    if (filtros.estado) params.append('estado', filtros.estado)
    if (filtros.plan) params.append('plan', filtros.plan)
    if (filtros.limite) params.append('limite', filtros.limite)
    if (filtros.offset) params.append('offset', filtros.offset)

    const response = await axios.get(`${BASE_URL}/admin/clientes?${params.toString()}`)

    if (response.data.success) {
      return response.data
    }

    throw new Error(response.data.mensaje || 'Error al obtener clientes')
  } catch (error) {
    console.error('Error al obtener clientes:', error)
    throw new Error(
      error.response?.data?.mensaje ||
      error.message ||
      'Error al obtener clientes'
    )
  }
}

/**
 * Obtener detalles de un cliente
 * @param {string} clienteId - ID del cliente
 * @returns {Promise<Object>}
 */
export const getClienteById = async (clienteId) => {
  try {
    const token = localStorage.getItem('adminToken')

    if (!token) {
      throw new Error('No hay sesión activa')
    }

    setAuthToken(token)

    const response = await axios.get(`${BASE_URL}/admin/clientes/${clienteId}`)

    if (response.data.success) {
      return response.data.cliente
    }

    throw new Error(response.data.mensaje || 'Error al obtener cliente')
  } catch (error) {
    console.error('Error al obtener cliente:', error)
    throw new Error(
      error.response?.data?.mensaje ||
      error.message ||
      'Error al obtener cliente'
    )
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
    const token = localStorage.getItem('adminToken')

    if (!token) {
      throw new Error('No hay sesión activa')
    }

    setAuthToken(token)

    const response = await axios.patch(`${BASE_URL}/admin/clientes/${clienteId}/estado`, {
      estado,
      razon
    })

    if (response.data.success) {
      return response.data
    }

    throw new Error(response.data.mensaje || 'Error al actualizar estado')
  } catch (error) {
    console.error('Error al actualizar estado del cliente:', error)
    throw new Error(
      error.response?.data?.mensaje ||
      error.message ||
      'Error al actualizar estado'
    )
  }
}

/**
 * Obtener lista de solicitudes
 * @param {Object} filtros - Filtros opcionales (estado, plan, limite, offset)
 * @returns {Promise<Object>}
 */
export const getSolicitudes = async (filtros = {}) => {
  try {
    const token = localStorage.getItem('adminToken')

    if (!token) {
      throw new Error('No hay sesión activa')
    }

    setAuthToken(token)

    const params = new URLSearchParams()
    if (filtros.estado) params.append('estado', filtros.estado)
    if (filtros.plan) params.append('plan', filtros.plan)
    if (filtros.limite) params.append('limite', filtros.limite)
    if (filtros.offset) params.append('offset', filtros.offset)

    const response = await axios.get(`${BASE_URL}/admin/solicitudes?${params.toString()}`)

    if (response.data.success) {
      return response.data
    }

    throw new Error(response.data.mensaje || 'Error al obtener solicitudes')
  } catch (error) {
    console.error('Error al obtener solicitudes:', error)
    throw new Error(
      error.response?.data?.mensaje ||
      error.message ||
      'Error al obtener solicitudes'
    )
  }
}

/**
 * Verificar si hay una sesión activa
 * @returns {boolean}
 */
export const isAuthenticated = () => {
  return !!localStorage.getItem('adminToken')
}

/**
 * Obtener token del localStorage
 * @returns {string|null}
 */
export const getToken = () => {
  return localStorage.getItem('adminToken')
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
  isAuthenticated,
  getToken,
  setAuthToken
}
