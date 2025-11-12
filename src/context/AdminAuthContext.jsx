/**
 * Contexto de Autenticación de Administradores
 * Maneja el estado global de autenticación del panel de admin
 */

import { createContext, useContext, useState, useEffect } from 'react'
import { verifyToken, logout as apiLogout } from '../services/adminAPI'

const AdminAuthContext = createContext()

export function AdminAuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loading, setLoading] = useState(true)

  // Verificar token al cargar
  useEffect(() => {
    checkAuth()
  }, [])

  const checkAuth = async () => {
    try {
      const isValid = await verifyToken()
      setIsAuthenticated(isValid)
    } catch (error) {
      console.error('Error verificando autenticación de admin:', error)
      setIsAuthenticated(false)
    } finally {
      setLoading(false)
    }
  }

  const login = () => {
    setIsAuthenticated(true)
  }

  const logout = () => {
    apiLogout()
    setIsAuthenticated(false)
  }

  return (
    <AdminAuthContext.Provider
      value={{
        isAuthenticated,
        loading,
        login,
        logout
      }}
    >
      {children}
    </AdminAuthContext.Provider>
  )
}

export function useAdminAuth() {
  const context = useContext(AdminAuthContext)
  if (!context) {
    throw new Error('useAdminAuth debe usarse dentro de AdminAuthProvider')
  }
  return context
}
