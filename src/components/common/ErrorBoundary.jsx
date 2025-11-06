import { Component } from 'react'
import { useNavigate } from 'react-router-dom'

/**
 * Error Boundary Component
 * Captura errores en componentes hijos y muestra una UI de fallback
 */
class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null
    }
  }

  static getDerivedStateFromError(error) {
    // Actualizar el estado para mostrar la UI de fallback
    return { hasError: true }
  }

  componentDidCatch(error, errorInfo) {
    // Registrar el error
    console.error('Error capturado por ErrorBoundary:', error, errorInfo)

    this.setState({
      error,
      errorInfo
    })

    // En producción, enviar a servicio de monitoreo (Sentry, etc.)
    if (import.meta.env.PROD) {
      // TODO: Integrar con servicio de error tracking
      // Ejemplo: Sentry.captureException(error)
    }
  }

  handleReset = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null
    })
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
          <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-8">
            <div className="text-center">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
                <svg
                  className="h-6 w-6 text-red-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
              </div>

              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                Algo salió mal
              </h1>

              <p className="text-gray-600 mb-6">
                Lo sentimos, ha ocurrido un error inesperado. Por favor, intenta de nuevo.
              </p>

              {import.meta.env.DEV && this.state.error && (
                <details className="text-left mb-6 bg-gray-100 rounded p-4">
                  <summary className="cursor-pointer font-semibold text-sm text-gray-700 mb-2">
                    Detalles del error (solo en desarrollo)
                  </summary>
                  <div className="text-xs text-red-600 font-mono overflow-auto">
                    <p className="font-bold mb-2">{this.state.error.toString()}</p>
                    <pre className="whitespace-pre-wrap">
                      {this.state.errorInfo?.componentStack}
                    </pre>
                  </div>
                </details>
              )}

              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <button
                  onClick={this.handleReset}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Intentar de nuevo
                </button>

                <button
                  onClick={() => window.location.href = '/'}
                  className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  Ir al inicio
                </button>
              </div>

              {this.props.showSupport && (
                <p className="mt-6 text-sm text-gray-500">
                  Si el problema persiste, contacta a{' '}
                  <a
                    href="mailto:soporte@multisalon.com"
                    className="text-blue-600 hover:underline"
                  >
                    soporte@multisalon.com
                  </a>
                </p>
              )}
            </div>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}

/**
 * Hook-based error boundary wrapper para usar con funciones
 */
export function withErrorBoundary(Component, errorBoundaryProps = {}) {
  return function WithErrorBoundary(props) {
    return (
      <ErrorBoundary {...errorBoundaryProps}>
        <Component {...props} />
      </ErrorBoundary>
    )
  }
}

export default ErrorBoundary
