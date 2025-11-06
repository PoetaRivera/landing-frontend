/* eslint-disable no-console */
/**
 * Utilidades para Google Analytics 4
 *
 * Para habilitar Google Analytics:
 * 1. Agrega VITE_GA_MEASUREMENT_ID en tu .env
 * 2. El script se cargará automáticamente en producción
 *
 * Uso:
 * import { trackPageView, trackEvent } from '@/utils/analytics'
 *
 * trackPageView('/planes')
 * trackEvent('click', 'button', 'cta_subscribe')
 */

/**
 * Verifica si Google Analytics está habilitado y disponible
 */
export function isAnalyticsEnabled() {
  return !!import.meta.env.VITE_GA_MEASUREMENT_ID && typeof window !== 'undefined' && window.gtag
}

/**
 * Carga el script de Google Analytics
 * Se ejecuta automáticamente al importar este módulo en producción
 */
export function loadGoogleAnalytics() {
  const measurementId = import.meta.env.VITE_GA_MEASUREMENT_ID

  if (!measurementId) {
    console.warn('Google Analytics: VITE_GA_MEASUREMENT_ID no está configurado')
    return
  }

  // Solo cargar en producción o si está explícitamente habilitado
  if (import.meta.env.DEV && !import.meta.env.VITE_ENABLE_GA_IN_DEV) {
    console.log('Google Analytics deshabilitado en desarrollo')
    return
  }

  // Prevenir carga múltiple
  if (window.gtag) {
    console.log('Google Analytics ya está cargado')
    return
  }

  // Cargar script de Google Analytics
  const script = document.createElement('script')
  script.async = true
  script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`
  document.head.appendChild(script)

  // Inicializar gtag
  window.dataLayer = window.dataLayer || []
  window.gtag = function () {
    window.dataLayer.push(arguments)
  }
  window.gtag('js', new Date())
  window.gtag('config', measurementId, {
    send_page_view: false // Manejo manual de page views
  })

  console.log('Google Analytics inicializado:', measurementId)
}

/**
 * Registra una vista de página
 * @param {string} path - Ruta de la página (ej: '/planes')
 * @param {string} [title] - Título de la página (opcional)
 */
export function trackPageView(path, title) {
  if (!isAnalyticsEnabled()) return

  window.gtag('event', 'page_view', {
    page_path: path,
    page_title: title || document.title
  })

  console.log('GA Page View:', path, title)
}

/**
 * Registra un evento personalizado
 * @param {string} action - Acción del evento (ej: 'click', 'submit')
 * @param {string} category - Categoría (ej: 'button', 'form')
 * @param {string} label - Etiqueta descriptiva (ej: 'cta_subscribe')
 * @param {number} [value] - Valor numérico opcional
 */
export function trackEvent(action, category, label, value) {
  if (!isAnalyticsEnabled()) return

  window.gtag('event', action, {
    event_category: category,
    event_label: label,
    value
  })

  console.log('GA Event:', { action, category, label, value })
}

/**
 * Registra una conversión (ej: completar formulario de suscripción)
 * @param {string} conversionName - Nombre de la conversión (ej: 'sign_up', 'purchase')
 * @param {Object} [params] - Parámetros adicionales
 */
export function trackConversion(conversionName, params = {}) {
  if (!isAnalyticsEnabled()) return

  window.gtag('event', 'conversion', {
    ...params,
    conversion_name: conversionName
  })

  console.log('GA Conversion:', conversionName, params)
}

/**
 * Registra una excepción o error
 * @param {string} description - Descripción del error
 * @param {boolean} [fatal=false] - Si es un error fatal
 */
export function trackException(description, fatal = false) {
  if (!isAnalyticsEnabled()) return

  window.gtag('event', 'exception', {
    description,
    fatal
  })

  console.log('GA Exception:', description, fatal)
}

// Auto-cargar Google Analytics al importar este módulo
if (typeof window !== 'undefined') {
  loadGoogleAnalytics()
}
