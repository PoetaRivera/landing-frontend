/**
 * Contexto de Autenticación para Clientes
 * Maneja el estado de autenticación global para clientes
 */

import { createContext, useContext, useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { verifyToken, logout as apiLogout } from '../services/clienteAPI'

const ClienteAuthContext = createContext(null)

export const useClienteAuth = () => {
  const context = useContext(ClienteAuthContext)
  if (!context) {
    throw new Error('useClienteAuth debe usarse dentro de ClienteAuthProvider')
  }
  return context
}

export const ClienteAuthProvider = ({ children }) => {
  const [cliente, setCliente] = useState(null)
  const [loading, setLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const location = useLocation()

  // Verificar token solo en rutas de cliente
  useEffect(() => {
    // Solo verificar autenticación en rutas de cliente
    if (location.pathname.startsWith('/cliente')) {
      checkAuth()
    } else {
      // Si no estamos en rutas de cliente, marcar como no autenticado y no loading
      setCliente(null)
      setIsAuthenticated(false)
      setLoading(false)
    }
  }, [location.pathname])

  const checkAuth = async () => {
    try {
      setLoading(true)
      const clienteData = await verifyToken()

      if (clienteData) {
        setCliente(clienteData)
        setIsAuthenticated(true)
      } else {
        setCliente(null)
        setIsAuthenticated(false)
      }
    } catch (error) {
      console.error('Error al verificar autenticación:', error)
      setCliente(null)
      setIsAuthenticated(false)
    } finally {
      setLoading(false)
    }
  }

  const login = (clienteData) => {
    setCliente(clienteData)
    setIsAuthenticated(true)
  }

  const logout = () => {
    apiLogout()
    setCliente(null)
    setIsAuthenticated(false)
  }

  const updateCliente = (clienteData) => {
    setCliente(clienteData)
  }

  const value = {
    cliente,
    isAuthenticated,
    loading,
    login,
    logout,
    updateCliente,
    checkAuth
  }

  return <ClienteAuthContext.Provider value={value}>{children}</ClienteAuthContext.Provider>
}

export default ClienteAuthContext
