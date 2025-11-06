import { toast } from 'react-toastify'

/**
 * Configuración centralizada para notificaciones toast
 * Usa react-toastify
 */

/**
 * Configuración por defecto
 */
export const defaultToastConfig = {
  position: 'top-center',
  autoClose: 4000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  theme: 'light'
}

/**
 * Toast de éxito
 */
export function showSuccess(message, options = {}) {
  return toast.success(message, {
    ...defaultToastConfig,
    ...options
  })
}

/**
 * Toast de error
 */
export function showError(message, options = {}) {
  return toast.error(message, {
    ...defaultToastConfig,
    autoClose: 6000, // Errores se muestran más tiempo
    ...options
  })
}

/**
 * Toast de advertencia
 */
export function showWarning(message, options = {}) {
  return toast.warning(message, {
    ...defaultToastConfig,
    ...options
  })
}

/**
 * Toast informativo
 */
export function showInfo(message, options = {}) {
  return toast.info(message, {
    ...defaultToastConfig,
    ...options
  })
}

/**
 * Toast de carga
 */
export function showLoading(message = 'Cargando...', options = {}) {
  return toast.loading(message, {
    ...defaultToastConfig,
    autoClose: false,
    closeButton: false,
    ...options
  })
}

/**
 * Actualizar toast existente
 */
export function updateToast(toastId, { message, type = 'success', ...options }) {
  const typeMap = {
    success: toast.TYPE.SUCCESS,
    error: toast.TYPE.ERROR,
    warning: toast.TYPE.WARNING,
    info: toast.TYPE.INFO
  }

  return toast.update(toastId, {
    render: message,
    type: typeMap[type],
    isLoading: false,
    autoClose: 4000,
    closeButton: true,
    ...options
  })
}

/**
 * Toast con promesa (muestra loading, luego success o error)
 */
export function showPromiseToast(
  promise,
  messages = {
    pending: 'Procesando...',
    success: 'Operación exitosa',
    error: 'Error en la operación'
  },
  options = {}
) {
  return toast.promise(
    promise,
    {
      pending: {
        render: messages.pending,
        ...defaultToastConfig,
        ...options.pending
      },
      success: {
        render: messages.success,
        ...defaultToastConfig,
        ...options.success
      },
      error: {
        render: ({ data }) => {
          // Intentar extraer mensaje de error
          const errorMessage = data?.message || messages.error
          return errorMessage
        },
        ...defaultToastConfig,
        autoClose: 6000,
        ...options.error
      }
    }
  )
}

/**
 * Cerrar toast específico
 */
export function dismissToast(toastId) {
  toast.dismiss(toastId)
}

/**
 * Cerrar todos los toasts
 */
export function dismissAllToasts() {
  toast.dismiss()
}

/**
 * Verificar si un toast está activo
 */
export function isToastActive(toastId) {
  return toast.isActive(toastId)
}

export default {
  defaultToastConfig,
  showSuccess,
  showError,
  showWarning,
  showInfo,
  showLoading,
  updateToast,
  showPromiseToast,
  dismissToast,
  dismissAllToasts,
  isToastActive
}
