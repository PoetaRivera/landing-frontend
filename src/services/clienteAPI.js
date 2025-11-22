/**
 * Servicio API para autenticación y gestión de clientes
 * Usa cookies HTTP-only para autenticación
 */

import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4001'
const BASE_URL = `${API_URL}/api/clientes`

// Configurar axios para enviar cookies automáticamente
axios.defaults.withCredentials = true

/**
 * Login de cliente
 * @param {string} identifier - Email o usuario
 * @param {string} password - Contraseña
 * @returns {Promise<Object>} - { cliente }
 */
export const login = async (identifier, password) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/login`,
      {
        identifier,
        password
      },
      {
        withCredentials: true
      }
    )

    if (response.data.success) {
      // El token viene en cookie HTTP-only, no en el body
      const { cliente } = response.data.data
      return { cliente }
    }

    throw new Error(response.data.mensaje || 'Error en login')
  } catch (error) {
    console.error('Error en login:', error)
    throw new Error(error.response?.data?.mensaje || error.message || 'Error al iniciar sesión')
  }
}

/**
 * Logout de cliente
 * Llama al backend para limpiar la cookie
 */
export const logout = async () => {
  try {
    await axios.post(`${BASE_URL}/logout`, {}, {
      withCredentials: true
    })
    console.log('✅ Sesión cerrada correctamente')
  } catch (error) {
    console.error('Error en logout:', error)
    // No lanzar error - permitir que el frontend limpie el estado de todos modos
  }
}

/**
 * Verificar si el token es válido y obtener datos del cliente
 * @returns {Promise<Object|null>} - Cliente data o null si inválido
 */
export const verifyToken = async () => {
  try {
    // La cookie se envía automáticamente
    const response = await axios.get(`${BASE_URL}/verify`, {
      withCredentials: true
    })

    if (response.data.success && response.data.valido) {
      return response.data.data // Retornar datos del cliente
    }

    return null
  } catch (error) {
    console.error('Error al verificar token:', error)
    return null
  }
}

/**
 * Obtener perfil del cliente autenticado
 * @returns {Promise<Object>}
 */
export const getProfile = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/me`, {
      withCredentials: true
    })

    if (response.data.success) {
      return response.data.data
    }

    throw new Error(response.data.mensaje || 'Error al obtener perfil')
  } catch (error) {
    console.error('Error al obtener perfil:', error)
    throw new Error(error.response?.data?.mensaje || error.message || 'Error al obtener perfil')
  }
}

/**
 * Cambiar contraseña
 * @param {string} passwordActual - Contraseña actual
 * @param {string} passwordNueva - Nueva contraseña
 * @returns {Promise<Object>}
 */
export const changePassword = async (passwordActual, passwordNueva) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/change-password`,
      {
        passwordActual,
        passwordNueva
      },
      {
        withCredentials: true
      }
    )

    if (response.data.success) {
      return response.data
    }

    throw new Error(response.data.mensaje || 'Error al cambiar contraseña')
  } catch (error) {
    console.error('Error al cambiar contraseña:', error)
    throw new Error(error.response?.data?.mensaje || error.message || 'Error al cambiar contraseña')
  }
}

/**
 * Solicitar recuperación de contraseña
 * @param {string} email - Email del cliente
 * @returns {Promise<Object>}
 */
export const forgotPassword = async (email) => {
  try {
    const response = await axios.post(`${BASE_URL}/forgot-password`, {
      email
    })

    if (response.data.success) {
      return response.data
    }

    throw new Error(response.data.mensaje || 'Error al solicitar recuperación')
  } catch (error) {
    console.error('Error al solicitar recuperación de contraseña:', error)
    throw new Error(
      error.response?.data?.mensaje ||
        error.message ||
        'Error al solicitar recuperación de contraseña'
    )
  }
}

/**
 * Resetear contraseña con token
 * @param {string} token - Token de recuperación
 * @param {string} passwordNueva - Nueva contraseña
 * @returns {Promise<Object>}
 */
export const resetPassword = async (token, passwordNueva) => {
  try {
    const response = await axios.post(`${BASE_URL}/reset-password`, {
      token,
      passwordNueva
    })

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
  getProfile,
  changePassword,
  forgotPassword,
  resetPassword
}
