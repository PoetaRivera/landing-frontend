/**
 * Contexto de Autenticación de Administradores
 * Maneja el estado global de autenticación del panel de admin
 */

import { createContext, useContext, useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { verifyToken, logout as apiLogout } from '../services/adminAPI'

const AdminAuthContext = createContext()

export function AdminAuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loading, setLoading] = useState(true)
  const location = useLocation()

  // Verificar token solo en rutas de admin
  useEffect(() => {
    // Solo verificar autenticación en rutas de admin
    if (location.pathname.startsWith('/admin')) {
      checkAuth()
    } else {
      // Si no estamos en rutas de admin, marcar como no autenticado y no loading
      setIsAuthenticated(false)
      setLoading(false)
    }
  }, [location.pathname])

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
