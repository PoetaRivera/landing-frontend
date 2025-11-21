/**
 * Modal de Detalle de Solicitud Completa de Onboarding
 * Muestra toda la información capturada en los 9 pasos
 */

import { useState } from 'react'
import PropTypes from 'prop-types'
import Button from '../common/Button'
import {
  X,
  Building2,
  User,
  Palette,
  Scissors,
  ShoppingBag,
  Users,
  Camera,
  Clock,
  Sparkles
} from 'lucide-react'
import { showWarning } from '../../utils/toastConfig'

const OnboardingDetailModal = ({ solicitud, onClose, onUpdateEstado, onCrearSalon }) => {
  const [loading, setLoading] = useState(false)
  const [notas, setNotas] = useState('')
  const [selectedEstado, setSelectedEstado] = useState(solicitud.estado)

  const handleUpdateEstado = async () => {
    if (selectedEstado === solicitud.estado) {
      showWarning('Selecciona un estado diferente al actual')
      return
    }

    try {
      setLoading(true)
      await onUpdateEstado(solicitud.id, selectedEstado, notas)
      onClose()
    } catch (error) {
      console.error('Error al actualizar estado:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleCrearSalon = async () => {
    if (solicitud.estado !== 'aprobado') {
      showWarning('La solicitud debe estar aprobada para crear el salón')
      return
    }

    const confirmar = window.confirm(
      `¿Estás seguro de crear el salón "${solicitud.nombreSalon}"?\n\nEsto creará automáticamente:\n- Salón en el sistema principal\n- Usuario administrador\n- Servicios y estilistas\n- Configuración completa`
    )

    if (!confirmar) return

    try {
      setLoading(true)
      await onCrearSalon(solicitud.id)
    } catch (error) {
      console.error('Error al crear salón:', error)
    } finally {
      setLoading(false)
    }
  }

  const getEstadoBadge = (estado) => {
    const badges = {
      pendiente_revision: 'bg-yellow-100 text-yellow-800',
      aprobado: 'bg-blue-100 text-blue-800',
      completado: 'bg-green-100 text-green-800',
      rechazado: 'bg-red-100 text-red-800'
    }
    return badges[estado] || 'bg-gray-100 text-gray-800'
  }

  const formatHorarios = (horarios) => {
    if (!horarios) return 'No especificado'

    const dias = ['lunes', 'martes', 'miercoles', 'jueves', 'viernes', 'sabado', 'domingo']
    return dias.map((dia) => {
      const horario = horarios[dia]
      if (!horario) return null

      return (
        <div key={dia} className="flex justify-between text-sm py-1">
          <span className="font-medium capitalize">{dia}:</span>
          <span className="text-gray-600">
            {horario.abierto ? `${horario.inicio} - ${horario.fin}` : 'Cerrado'}
          </span>
        </div>
      )
    })
  }

  return (
    <div className="fixed inset-0 z-50 overflow-auto bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-5xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="bg-primary text-white px-6 py-4 flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold">{solicitud.nombreSalon}</h2>
            <p className="text-sm text-gray-100 mt-1">Solicitud de Onboarding Completo</p>
          </div>
          <button
            onClick={onClose}
            className="text-white hover:bg-white hover:bg-opacity-20 rounded-full p-2 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content - Scrollable */}
        <div className="overflow-y-auto max-h-[60vh] px-6 py-6">
          {/* Estado Actual */}
          <div className="mb-6 p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-gray-700 mb-2">Estado Actual:</p>
                <span
                  className={`px-3 py-1 text-sm font-semibold rounded-full ${getEstadoBadge(solicitud.estado)}`}
                >
                  {solicitud.estado}
                </span>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-600">Fecha de Solicitud:</p>
                <p className="font-semibold text-gray-800">
                  {new Date(solicitud.fechaCreacion).toLocaleDateString('es-ES', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric'
                  })}
                </p>
              </div>
            </div>
          </div>

          {/* Grid de Secciones */}
          <div className="space-y-6">
            {/* Paso 1: Información Básica */}
            <section className="border border-gray-200 rounded-lg p-4">
              <h3 className="font-bold text-lg text-gray-800 mb-4 flex items-center gap-2">
                <Building2 className="w-5 h-5 text-primary" />
                Información Básica
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="font-semibold text-gray-700">Nombre del Salón:</span>
                  <p className="text-gray-600 mt-1">{solicitud.nombreSalon}</p>
                </div>
                <div>
                  <span className="font-semibold text-gray-700">Propietario:</span>
                  <p className="text-gray-600 mt-1">{solicitud.nombrePropietario}</p>
                </div>
                <div>
                  <span className="font-semibold text-gray-700">Email:</span>
                  <p className="text-gray-600 mt-1">{solicitud.email}</p>
                </div>
                <div>
                  <span className="font-semibold text-gray-700">Teléfono:</span>
                  <p className="text-gray-600 mt-1">{solicitud.telefono}</p>
                </div>
                <div>
                  <span className="font-semibold text-gray-700">Dirección:</span>
                  <p className="text-gray-600 mt-1">{solicitud.direccion || 'No especificada'}</p>
                </div>
                <div>
                  <span className="font-semibold text-gray-700">Ciudad:</span>
                  <p className="text-gray-600 mt-1">{solicitud.ciudad || 'No especificada'}</p>
                </div>
                <div>
                  <span className="font-semibold text-gray-700">País:</span>
                  <p className="text-gray-600 mt-1">{solicitud.pais || 'El Salvador'}</p>
                </div>
              </div>
            </section>

            {/* Paso 2: Plan */}
            <section className="border border-gray-200 rounded-lg p-4">
              <h3 className="font-bold text-lg text-gray-800 mb-4 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-primary" />
                Plan Seleccionado
              </h3>
              <p className="text-lg font-semibold text-primary">{solicitud.plan}</p>
            </section>

            {/* Paso 3: Branding */}
            <section className="border border-gray-200 rounded-lg p-4">
              <h3 className="font-bold text-lg text-gray-800 mb-4 flex items-center gap-2">
                <User className="w-5 h-5 text-primary" />
                Branding
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="font-semibold text-gray-700">Nombre de Empresa:</span>
                  <p className="text-gray-600 mt-1">
                    {solicitud.nombreEmpresa || solicitud.nombreSalon}
                  </p>
                </div>
                <div>
                  <span className="font-semibold text-gray-700">Slogan:</span>
                  <p className="text-gray-600 mt-1">{solicitud.slogan || 'No especificado'}</p>
                </div>
                <div className="md:col-span-2">
                  <span className="font-semibold text-gray-700">Logo:</span>
                  <p className="text-gray-600 mt-1">
                    {solicitud.logo
                      ? 'Cargado (Cloudinary integration pendiente)'
                      : 'No cargado - Pendiente de envío por email'}
                  </p>
                </div>
              </div>
            </section>

            {/* Paso 4: Colores */}
            <section className="border border-gray-200 rounded-lg p-4">
              <h3 className="font-bold text-lg text-gray-800 mb-4 flex items-center gap-2">
                <Palette className="w-5 h-5 text-primary" />
                Paleta de Colores
              </h3>
              <p className="text-sm text-gray-600">
                Paleta seleccionada: <span className="font-semibold">{solicitud.paletaId}</span>
              </p>
            </section>

            {/* Paso 5: Servicios */}
            <section className="border border-gray-200 rounded-lg p-4">
              <h3 className="font-bold text-lg text-gray-800 mb-4 flex items-center gap-2">
                <Scissors className="w-5 h-5 text-primary" />
                Servicios ({solicitud.servicios?.length || 0})
              </h3>
              {solicitud.servicios && solicitud.servicios.length > 0 ? (
                <div className="space-y-3">
                  {solicitud.servicios.map((servicio, index) => (
                    <div key={index} className="bg-gray-50 p-3 rounded-lg">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-semibold text-gray-800">{servicio.nombre}</p>
                          <p className="text-sm text-gray-600 mt-1">{servicio.descripcion}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-primary">${servicio.precio}</p>
                          <p className="text-xs text-gray-500">{servicio.duracion}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-sm">No se agregaron servicios</p>
              )}
            </section>

            {/* Paso 6: Productos */}
            <section className="border border-gray-200 rounded-lg p-4">
              <h3 className="font-bold text-lg text-gray-800 mb-4 flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-primary" />
                Productos ({solicitud.productos?.length || 0})
              </h3>
              {solicitud.productos && solicitud.productos.length > 0 ? (
                <div className="space-y-3">
                  {solicitud.productos.map((producto, index) => (
                    <div key={index} className="bg-gray-50 p-3 rounded-lg">
                      <p className="font-semibold text-gray-800">{producto.nombre}</p>
                      <p className="text-sm text-gray-600">${producto.precio}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-sm">No venderá productos (solo servicios)</p>
              )}
            </section>

            {/* Paso 7: Estilistas */}
            <section className="border border-gray-200 rounded-lg p-4">
              <h3 className="font-bold text-lg text-gray-800 mb-4 flex items-center gap-2">
                <Users className="w-5 h-5 text-primary" />
                Estilistas ({solicitud.estilistas?.length || 0})
              </h3>
              {solicitud.estilistas && solicitud.estilistas.length > 0 ? (
                <div className="space-y-3">
                  {solicitud.estilistas.map((estilista, index) => (
                    <div key={index} className="bg-gray-50 p-3 rounded-lg">
                      <p className="font-semibold text-gray-800">{estilista.nombre}</p>
                      <p className="text-sm text-gray-600">
                        Especialidad: {estilista.especialidad}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-sm">No se agregaron estilistas</p>
              )}
            </section>

            {/* Paso 8: Imágenes */}
            <section className="border border-gray-200 rounded-lg p-4">
              <h3 className="font-bold text-lg text-gray-800 mb-4 flex items-center gap-2">
                <Camera className="w-5 h-5 text-primary" />
                Imágenes del Salón
              </h3>
              <p className="text-gray-500 text-sm">
                {solicitud.imagenesCarrusel && solicitud.imagenesCarrusel.length > 0
                  ? `${solicitud.imagenesCarrusel.length} imágenes cargadas (Cloudinary pendiente)`
                  : 'Pendiente de envío por email - Cloudinary integration en desarrollo'}
              </p>
            </section>

            {/* Paso 9: Configuración */}
            <section className="border border-gray-200 rounded-lg p-4">
              <h3 className="font-bold text-lg text-gray-800 mb-4 flex items-center gap-2">
                <Clock className="w-5 h-5 text-primary" />
                Configuración General
              </h3>

              {/* Horarios */}
              <div className="mb-4">
                <p className="font-semibold text-gray-700 mb-2">Horarios de Atención:</p>
                <div className="bg-gray-50 p-3 rounded-lg">
                  {formatHorarios(solicitud.horarios)}
                </div>
              </div>

              {/* Redes Sociales */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm mb-4">
                <div>
                  <span className="font-semibold text-gray-700">Facebook:</span>
                  <p className="text-gray-600 mt-1">{solicitud.facebook || 'No especificado'}</p>
                </div>
                <div>
                  <span className="font-semibold text-gray-700">Instagram:</span>
                  <p className="text-gray-600 mt-1">{solicitud.instagram || 'No especificado'}</p>
                </div>
                <div>
                  <span className="font-semibold text-gray-700">WhatsApp:</span>
                  <p className="text-gray-600 mt-1">{solicitud.whatsapp || 'No especificado'}</p>
                </div>
                <div>
                  <span className="font-semibold text-gray-700">Google Maps:</span>
                  <p className="text-gray-600 mt-1">
                    {solicitud.ubicacionMaps || 'No especificado'}
                  </p>
                </div>
              </div>

              {/* Mensaje Adicional */}
              {solicitud.mensaje && (
                <div>
                  <span className="font-semibold text-gray-700">Mensaje Adicional:</span>
                  <p className="text-gray-600 mt-1 bg-gray-50 p-3 rounded-lg">
                    {solicitud.mensaje}
                  </p>
                </div>
              )}
            </section>

            {/* Notas Internas */}
            {solicitud.notas && (
              <section className="border border-yellow-200 bg-yellow-50 rounded-lg p-4">
                <h3 className="font-bold text-lg text-gray-800 mb-2">Notas Internas</h3>
                <p className="text-sm text-gray-700">{solicitud.notas}</p>
              </section>
            )}
          </div>
        </div>

        {/* Footer - Actions */}
        <div className="border-t bg-gray-50 px-6 py-4">
          {/* Cambiar Estado */}
          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Cambiar Estado:
            </label>
            <div className="flex gap-4">
              <select
                value={selectedEstado}
                onChange={(e) => setSelectedEstado(e.target.value)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                <option value="pendiente_revision">Pendiente Revisión</option>
                <option value="aprobado">Aprobado</option>
                <option value="rechazado">Rechazado</option>
                <option value="completado">Completado</option>
              </select>
              <Button
                variant="outline"
                onClick={handleUpdateEstado}
                disabled={loading || selectedEstado === solicitud.estado}
              >
                Actualizar Estado
              </Button>
            </div>
          </div>

          {/* Notas */}
          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Notas (Opcional):
            </label>
            <textarea
              value={notas}
              onChange={(e) => setNotas(e.target.value)}
              placeholder="Agregar notas sobre esta solicitud..."
              rows={3}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>

          {/* Botones Principales */}
          <div className="flex justify-between items-center gap-4">
            <Button variant="outline" onClick={onClose}>
              Cerrar
            </Button>

            {solicitud.estado === 'aprobado' && (
              <Button
                variant="primary"
                onClick={handleCrearSalon}
                disabled={loading}
                loading={loading}
                className="flex items-center gap-2"
              >
                <Sparkles className="w-5 h-5" />
                {loading ? 'Creando Salón...' : 'Crear Salón Automáticamente'}
              </Button>
            )}
          </div>

          {solicitud.estado === 'completado' && (
            <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
              <p className="text-sm text-green-800 font-semibold">
                ✅ Esta solicitud ya fue procesada y el salón fue creado exitosamente.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

OnboardingDetailModal.propTypes = {
  solicitud: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
  onUpdateEstado: PropTypes.func.isRequired,
  onCrearSalon: PropTypes.func.isRequired
}

export default OnboardingDetailModal
