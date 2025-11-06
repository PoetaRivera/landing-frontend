import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { trackPageView } from '../utils/analytics'

/**
 * Custom hook para tracking automático de cambios de página con Google Analytics
 *
 * Uso:
 * En App.jsx, agregar:
 * import usePageTracking from './hooks/usePageTracking'
 *
 * function App() {
 *   usePageTracking() // <- Esto registra automáticamente cada cambio de ruta
 *   // ...resto del código
 * }
 */
function usePageTracking() {
  const location = useLocation()

  useEffect(() => {
    // Registrar vista de página cada vez que cambia la ubicación
    trackPageView(location.pathname + location.search, document.title)
  }, [location])
}

export default usePageTracking
