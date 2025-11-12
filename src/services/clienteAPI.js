/**
 * Servicio API para autenticación y gestión de clientes
 */

import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4001'
const BASE_URL = `${API_URL}/api/clientes`

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
 * Login de cliente
 * @param {string} identifier - Email o usuario
 * @param {string} password - Contraseña
 * @returns {Promise<Object>} - { token, cliente }
 */
export const login = async (identifier, password) => {
  try {
    const response = await axios.post(`${BASE_URL}/login`, {
      identifier,
      password
    })

    if (response.data.success) {
      const { token, cliente } = response.data.data

      // Guardar token en localStorage
      localStorage.setItem('clienteToken', token)

      // Configurar token para futuras peticiones
      setAuthToken(token)

      return { token, cliente }
    }

    throw new Error(response.data.mensaje || 'Error en login')
  } catch (error) {
    console.error('Error en login:', error)
    throw new Error(
      error.response?.data?.mensaje ||
      error.message ||
      'Error al iniciar sesión'
    )
  }
}

/**
 * Logout de cliente
 */
export const logout = () => {
  localStorage.removeItem('clienteToken')
  setAuthToken(null)
}

/**
 * Verificar si el token es válido
 * @returns {Promise<Object|null>} - Datos del cliente o null
 */
export const verifyToken = async () => {
  try {
    const token = localStorage.getItem('clienteToken')

    if (!token) {
      return null
    }

    setAuthToken(token)

    const response = await axios.get(`${BASE_URL}/verify`)

    if (response.data.success && response.data.valido) {
      return response.data.data
    }

    // Token inválido, limpiar
    logout()
    return null
  } catch (error) {
    console.error('Error al verificar token:', error)
    logout()
    return null
  }
}

/**
 * Obtener perfil completo del cliente autenticado
 * @returns {Promise<Object>} - Perfil del cliente
 */
export const getProfile = async () => {
  try {
    const token = localStorage.getItem('clienteToken')

    if (!token) {
      throw new Error('No hay sesión activa')
    }

    setAuthToken(token)

    const response = await axios.get(`${BASE_URL}/me`)

    if (response.data.success) {
      return response.data.data
    }

    throw new Error(response.data.mensaje || 'Error al obtener perfil')
  } catch (error) {
    console.error('Error al obtener perfil:', error)
    throw new Error(
      error.response?.data?.mensaje ||
      error.message ||
      'Error al obtener tu perfil'
    )
  }
}

/**
 * Cambiar contraseña del cliente
 * @param {string} passwordActual - Contraseña actual
 * @param {string} passwordNueva - Contraseña nueva
 * @returns {Promise<Object>} - Resultado
 */
export const changePassword = async (passwordActual, passwordNueva) => {
  try {
    const token = localStorage.getItem('clienteToken')

    if (!token) {
      throw new Error('No hay sesión activa')
    }

    setAuthToken(token)

    const response = await axios.post(`${BASE_URL}/change-password`, {
      passwordActual,
      passwordNueva
    })

    if (response.data.success) {
      return response.data
    }

    throw new Error(response.data.mensaje || 'Error al cambiar contraseña')
  } catch (error) {
    console.error('Error al cambiar contraseña:', error)
    throw new Error(
      error.response?.data?.mensaje ||
      error.message ||
      'Error al cambiar tu contraseña'
    )
  }
}

/**
 * Verificar si hay una sesión activa
 * @returns {boolean}
 */
export const isAuthenticated = () => {
  return !!localStorage.getItem('clienteToken')
}

/**
 * Obtener token del localStorage
 * @returns {string|null}
 */
export const getToken = () => {
  return localStorage.getItem('clienteToken')
}

export default {
  login,
  logout,
  verifyToken,
  getProfile,
  changePassword,
  isAuthenticated,
  getToken,
  setAuthToken
}
