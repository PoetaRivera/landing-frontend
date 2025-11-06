/* eslint-disable no-console */
/**
 * Configuración y validación de variables de entorno
 * Asegura que todas las variables requeridas están definidas antes de iniciar la app
 */

/**
 * Variables de entorno requeridas
 */
const REQUIRED_ENV_VARS = {
  VITE_API_URL: {
    required: true,
    description: 'URL del backend API',
    defaultValue: 'http://localhost:4001',
    validate: (value) => {
      try {
        new URL(value)
        return true
      } catch {
        return false
      }
    }
  }
}

/**
 * Variables de entorno opcionales (con defaults)
 */
const OPTIONAL_ENV_VARS = {
  VITE_CLOUDINARY_CLOUD: {
    required: false,
    description: 'Cloud name de Cloudinary',
    defaultValue: null
  },
  VITE_CLOUDINARY_VIDEO_FOLDER: {
    required: false,
    description: 'Carpeta de videos en Cloudinary',
    defaultValue: 'multisalon/landing/videos'
  },
  VITE_GA_MEASUREMENT_ID: {
    required: false,
    description: 'Google Analytics Measurement ID',
    defaultValue: null
  },
  VITE_FB_PIXEL_ID: {
    required: false,
    description: 'Facebook Pixel ID',
    defaultValue: null
  }
}

/**
 * Clase para manejar la configuración de entorno
 */
class EnvConfig {
  constructor() {
    this.config = {}
    this.errors = []
    this.warnings = []
  }

  /**
   * Validar todas las variables de entorno
   */
  validate() {
    this.errors = []
    this.warnings = []

    // Validar variables requeridas
    Object.entries(REQUIRED_ENV_VARS).forEach(([key, config]) => {
      const value = import.meta.env[key]

      if (!value || value === 'undefined') {
        if (config.defaultValue) {
          this.config[key] = config.defaultValue
          this.warnings.push(`⚠️  ${key} no definida, usando default: ${config.defaultValue}`)
        } else {
          this.errors.push(`❌ ${key} es requerida pero no está definida. ${config.description}`)
        }
      } else {
        // Validar el valor si hay función de validación
        if (config.validate && !config.validate(value)) {
          this.errors.push(`❌ ${key} tiene un valor inválido: ${value}`)
        } else {
          this.config[key] = value
        }
      }
    })

    // Procesar variables opcionales
    Object.entries(OPTIONAL_ENV_VARS).forEach(([key, config]) => {
      const value = import.meta.env[key]

      if (!value || value === 'undefined' || value === 'null') {
        if (config.defaultValue) {
          this.config[key] = config.defaultValue
        } else {
          this.config[key] = null
          if (import.meta.env.DEV) {
            this.warnings.push(`ℹ️  ${key} no definida. ${config.description}`)
          }
        }
      } else {
        this.config[key] = value
      }
    })

    return {
      valid: this.errors.length === 0,
      errors: this.errors,
      warnings: this.warnings
    }
  }

  /**
   * Obtener valor de configuración
   */
  get(key) {
    return this.config[key]
  }

  /**
   * Obtener toda la configuración
   */
  getAll() {
    return { ...this.config }
  }

  /**
   * Imprimir reporte de configuración
   */
  printReport() {
    if (import.meta.env.DEV) {
      console.group('🔧 Environment Configuration')

      if (this.errors.length > 0) {
        console.error('❌ Errores:')
        this.errors.forEach((error) => console.error(error))
      }

      if (this.warnings.length > 0) {
        console.warn('⚠️  Advertencias:')
        this.warnings.forEach((warning) => console.warn(warning))
      }

      console.log('✅ Configuración válida:', this.config)
      console.groupEnd()
    }
  }
}

// Crear instancia global
const envConfig = new EnvConfig()

/**
 * Validar configuración de entorno al importar
 */
export function validateEnv() {
  const result = envConfig.validate()

  if (import.meta.env.DEV) {
    envConfig.printReport()
  }

  if (!result.valid) {
    const errorMessage = `
╔═══════════════════════════════════════════════════════╗
║   ❌ ERROR: Variables de entorno faltantes            ║
╚═══════════════════════════════════════════════════════╝

${result.errors.join('\n')}

💡 Solución:
1. Verifica que tengas un archivo .env o .env.development
2. Asegúrate de que todas las variables requeridas estén definidas
3. Reinicia el servidor de desarrollo

Ejemplo de .env.development:
VITE_API_URL=http://localhost:4001
VITE_CLOUDINARY_CLOUD=tu_cloud_name
`

    if (import.meta.env.PROD) {
      // En producción, solo loguear el error pero no bloquear
      console.error(errorMessage)
    } else {
      // En desarrollo, mostrar error completo
      console.error(errorMessage)

      // Crear un div de error visible en la página
      const errorDiv = document.createElement('div')
      errorDiv.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0,0,0,0.95);
        color: white;
        padding: 40px;
        z-index: 999999;
        font-family: monospace;
        overflow: auto;
      `
      errorDiv.innerHTML = `
        <h1 style="color: #ff4444; margin-bottom: 20px;">⚠️ Error de Configuración</h1>
        <pre style="background: #222; padding: 20px; border-radius: 8px; overflow-x: auto;">${errorMessage}</pre>
      `
      document.body.appendChild(errorDiv)
    }
  }

  return result
}

/**
 * Obtener valor de configuración
 */
export function getEnv(key) {
  return envConfig.get(key)
}

/**
 * Obtener toda la configuración
 */
export function getAllEnv() {
  return envConfig.getAll()
}

/**
 * Configuración exportada lista para usar
 */
export const env = {
  API_URL: () => envConfig.get('VITE_API_URL'),
  CLOUDINARY_CLOUD: () => envConfig.get('VITE_CLOUDINARY_CLOUD'),
  CLOUDINARY_VIDEO_FOLDER: () => envConfig.get('VITE_CLOUDINARY_VIDEO_FOLDER'),
  GA_MEASUREMENT_ID: () => envConfig.get('VITE_GA_MEASUREMENT_ID'),
  FB_PIXEL_ID: () => envConfig.get('VITE_FB_PIXEL_ID'),
  isDev: import.meta.env.DEV,
  isProd: import.meta.env.PROD,
  mode: import.meta.env.MODE
}

export default envConfig
