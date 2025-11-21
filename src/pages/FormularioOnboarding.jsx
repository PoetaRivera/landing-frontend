/**
 * Formulario de Onboarding Completo - Multi-Step Form
 * Captura TODA la información necesaria para montar un salón automáticamente
 */

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Card from '../components/common/Card'
import Button from '../components/common/Button'
import { showSuccess, showError } from '../utils/toastConfig'
import { ArrowLeft, ArrowRight, CheckCircle } from 'lucide-react'

// Importar componentes de pasos (los crearemos después)
import Paso1InfoBasica from '../components/onboarding/Paso1InfoBasica'
import Paso2PlanSeleccionado from '../components/onboarding/Paso2PlanSeleccionado'
import Paso3Branding from '../components/onboarding/Paso3Branding'
import Paso4Colores from '../components/onboarding/Paso4Colores'
import Paso5Servicios from '../components/onboarding/Paso5Servicios'
import Paso6Productos from '../components/onboarding/Paso6Productos'
import Paso7Estilistas from '../components/onboarding/Paso7Estilistas'
import Paso8Imagenes from '../components/onboarding/Paso8Imagenes'
import Paso9Configuracion from '../components/onboarding/Paso9Configuracion'

const TOTAL_PASOS = 9

const FormularioOnboarding = () => {
  const navigate = useNavigate()
  const [pasoActual, setPasoActual] = useState(1)
  const [loading, setLoading] = useState(false)
  const [completado, setCompletado] = useState(false)

  // Estado unificado del formulario
  const [formData, setFormData] = useState({
    // Paso 1: Información Básica
    nombreSalon: '',
    nombrePropietario: '',
    email: '',
    telefono: '',
    direccion: '',
    ciudad: '',
    pais: 'El Salvador',

    // Paso 2: Plan
    plan: 'Plan Básico',

    // Paso 3: Branding
    logo: null, // URL de Cloudinary
    nombreEmpresa: '',
    slogan: '',

    // Paso 4: Colores
    paletaId: 'paleta1',
    coloresPersonalizados: null,

    // Paso 5: Servicios
    servicios: [],

    // Paso 6: Productos
    productos: [],

    // Paso 7: Estilistas
    estilistas: [],

    // Paso 8: Imágenes
    imagenesCarrusel: [],
    imagenPrincipal: null,

    // Paso 9: Configuración
    horarios: {
      lunes: { abierto: true, inicio: '09:00', fin: '18:00' },
      martes: { abierto: true, inicio: '09:00', fin: '18:00' },
      miercoles: { abierto: true, inicio: '09:00', fin: '18:00' },
      jueves: { abierto: true, inicio: '09:00', fin: '18:00' },
      viernes: { abierto: true, inicio: '09:00', fin: '18:00' },
      sabado: { abierto: true, inicio: '09:00', fin: '14:00' },
      domingo: { abierto: false, inicio: '', fin: '' }
    },
    ubicacionMaps: '',
    facebook: '',
    instagram: '',
    whatsapp: '',
    duracionesPorDefecto: {
      '30min': '00:30',
      '1h': '01:00',
      '1h30min': '01:30',
      '2h': '02:00',
      '2h30min': '02:30',
      '3h': '03:00'
    },
    mensaje: '',
    notas: ''
  })

  // Actualizar datos del formulario
  const handleUpdateData = (stepData) => {
    setFormData((prev) => ({
      ...prev,
      ...stepData
    }))
  }

  // Navegar entre pasos
  const handleSiguiente = () => {
    if (pasoActual < TOTAL_PASOS) {
      setPasoActual(pasoActual + 1)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const handleAnterior = () => {
    if (pasoActual > 1) {
      setPasoActual(pasoActual - 1)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  // Enviar formulario completo
  const handleSubmit = async () => {
    try {
      setLoading(true)

      console.log('📝 Enviando formulario completo:', formData)

      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/solicitudes-completas`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })

      const data = await response.json()

      if (!response.ok || !data.success) {
        throw new Error(data.mensaje || data.error || 'Error al enviar solicitud')
      }

      console.log('✅ Solicitud enviada:', data.data.solicitudId)

      showSuccess('¡Solicitud enviada exitosamente!')
      setCompletado(true)

      // Redirigir después de 3 segundos
      setTimeout(() => {
        navigate('/')
      }, 3000)
    } catch (error) {
      console.error('❌ Error al enviar solicitud:', error)
      showError(error.message || 'Error al enviar solicitud')
    } finally {
      setLoading(false)
    }
  }

  // Renderizar paso actual
  const renderPasoActual = () => {
    const props = {
      formData,
      onUpdateData: handleUpdateData
    }

    switch (pasoActual) {
      case 1:
        return <Paso1InfoBasica {...props} />
      case 2:
        return <Paso2PlanSeleccionado {...props} />
      case 3:
        return <Paso3Branding {...props} />
      case 4:
        return <Paso4Colores {...props} />
      case 5:
        return <Paso5Servicios {...props} />
      case 6:
        return <Paso6Productos {...props} />
      case 7:
        return <Paso7Estilistas {...props} />
      case 8:
        return <Paso8Imagenes {...props} />
      case 9:
        return <Paso9Configuracion {...props} />
      default:
        return null
    }
  }

  // Título del paso actual
  const getTituloPaso = () => {
    const titulos = {
      1: 'Información Básica',
      2: 'Plan Seleccionado',
      3: 'Logo y Branding',
      4: 'Paleta de Colores',
      5: 'Servicios',
      6: 'Productos',
      7: 'Estilistas',
      8: 'Imágenes del Salón',
      9: 'Configuración General'
    }
    return titulos[pasoActual]
  }

  // Pantalla de completado
  if (completado) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 flex items-center justify-center p-4">
        <Card className="max-w-2xl w-full text-center" padding="lg">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6">
            <CheckCircle className="w-12 h-12 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-4">¡Solicitud Enviada!</h1>
          <p className="text-lg text-gray-600 mb-6">
            Gracias por completar el formulario. Hemos recibido toda la información de tu salón.
          </p>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
            <h3 className="font-semibold text-blue-800 mb-3">📧 Próximos Pasos:</h3>
            <ol className="text-left text-blue-700 space-y-2 list-decimal list-inside">
              <li>Revisaremos tu información (24-48 horas)</li>
              <li>Te contactaremos para confirmar detalles</li>
              <li>Montaremos tu sistema MultiSalon</li>
              <li>Recibirás tus credenciales de acceso por email</li>
            </ol>
          </div>
          <Button variant="primary" size="lg" onClick={() => navigate('/')}>
            Volver al Inicio
          </Button>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="container mx-auto max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
            Formulario de Onboarding
          </h1>
          <p className="text-gray-600">Completa la información de tu salón para comenzar</p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-semibold text-gray-600">
              Paso {pasoActual} de {TOTAL_PASOS}
            </span>
            <span className="text-sm font-semibold text-primary">
              {Math.round((pasoActual / TOTAL_PASOS) * 100)}% Completado
            </span>
          </div>
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-primary transition-all duration-300"
              style={{ width: `${(pasoActual / TOTAL_PASOS) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Card del Paso Actual */}
        <Card padding="lg" shadow className="mb-6">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-1">{getTituloPaso()}</h2>
            <p className="text-sm text-gray-500">
              Paso {pasoActual} de {TOTAL_PASOS}
            </p>
          </div>

          {/* Contenido del Paso */}
          <div className="mb-8">{renderPasoActual()}</div>

          {/* Botones de Navegación */}
          <div className="flex justify-between gap-4">
            <Button
              variant="outline"
              onClick={handleAnterior}
              disabled={pasoActual === 1 || loading}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Anterior
            </Button>

            {pasoActual < TOTAL_PASOS ? (
              <Button
                variant="primary"
                onClick={handleSiguiente}
                disabled={loading}
                className="flex items-center gap-2"
              >
                Siguiente
                <ArrowRight className="w-4 h-4" />
              </Button>
            ) : (
              <Button
                variant="primary"
                onClick={handleSubmit}
                disabled={loading}
                loading={loading}
                className="flex items-center gap-2"
              >
                {loading ? 'Enviando...' : 'Enviar Solicitud'}
                <CheckCircle className="w-4 h-4" />
              </Button>
            )}
          </div>
        </Card>

        {/* Help Text */}
        <div className="text-center text-sm text-gray-600">
          ¿Necesitas ayuda?{' '}
          <a href="mailto:soporte@multisalon.com" className="text-primary hover:underline">
            Contacta a soporte
          </a>
        </div>
      </div>
    </div>
  )
}

export default FormularioOnboarding
