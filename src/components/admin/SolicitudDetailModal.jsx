/**
 * Modal de Detalle de Solicitud
 * Muestra información completa y permite cambiar el estado
 */

import { useState } from 'react'
import PropTypes from 'prop-types'
import Button from '../common/Button'
import { X, Mail, Phone, Calendar, User, Building2, CreditCard } from 'lucide-react'

function SolicitudDetailModal({ solicitud, onClose, onUpdateEstado, onConfirmarPago }) {
  const [updating, setUpdating] = useState(false)
  const [notas, setNotas] = useState('')

  if (!solicitud) return null

  const handleUpdateEstado = async (nuevoEstado) => {
    try {
      setUpdating(true)
      await onUpdateEstado(solicitud.id, nuevoEstado, notas)
      onClose()
    } catch (error) {
      console.error('Error al actualizar estado:', error)
    } finally {
      setUpdating(false)
    }
  }

  const handleConfirmarPago = async () => {
    try {
      setUpdating(true)
      await onConfirmarPago(solicitud.id)
      onClose()
    } catch (error) {
      console.error('Error al confirmar pago:', error)
    } finally {
      setUpdating(false)
    }
  }

  const getEstadoBadge = (estado) => {
    const badges = {
      pendiente: 'bg-yellow-100 text-yellow-800 border-yellow-300',
      contactado: 'bg-blue-100 text-blue-800 border-blue-300',
      pago_confirmado: 'bg-purple-100 text-purple-800 border-purple-300',
      procesado: 'bg-green-100 text-green-800 border-green-300',
      rechazado: 'bg-red-100 text-red-800 border-red-300'
    }
    return badges[estado] || 'bg-gray-100 text-gray-800 border-gray-300'
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b px-6 py-4 flex justify-between items-start">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Detalle de Solicitud</h2>
            <p className="text-sm text-gray-600 mt-1">ID: {solicitud.id}</p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
            aria-label="Cerrar"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="px-6 py-4 space-y-6">
          {/* Estado Actual */}
          <div>
            <label className="text-sm font-semibold text-gray-700 uppercase tracking-wide">
              Estado Actual
            </label>
            <div className="mt-2">
              <span
                className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold border ${getEstadoBadge(solicitud.estado)}`}
              >
                {solicitud.estado}
              </span>
            </div>
          </div>

          {/* Información del Salón */}
          <div className="bg-gray-50 rounded-lg p-4 space-y-3">
            <h3 className="font-semibold text-gray-800 flex items-center gap-2">
              <Building2 className="w-5 h-5 text-primary" />
              Información del Salón
            </h3>
            <div className="grid grid-cols-1 gap-3">
              <div>
                <label className="text-sm text-gray-600">Nombre del Salón</label>
                <p className="font-semibold text-gray-800">{solicitud.nombreSalon}</p>
              </div>
              <div>
                <label className="text-sm text-gray-600">Plan Seleccionado</label>
                <p className="font-semibold text-gray-800">{solicitud.plan}</p>
              </div>
            </div>
          </div>

          {/* Información del Propietario */}
          <div className="bg-gray-50 rounded-lg p-4 space-y-3">
            <h3 className="font-semibold text-gray-800 flex items-center gap-2">
              <User className="w-5 h-5 text-primary" />
              Información del Propietario
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <label className="text-sm text-gray-600">Nombre Completo</label>
                <p className="font-semibold text-gray-800">{solicitud.nombrePropietario}</p>
              </div>
              <div>
                <label className="text-sm text-gray-600 flex items-center gap-1">
                  <Phone className="w-4 h-4" />
                  Teléfono
                </label>
                <p className="font-semibold text-gray-800">
                  <a href={`tel:${solicitud.telefono}`} className="text-primary hover:underline">
                    {solicitud.telefono}
                  </a>
                </p>
              </div>
              <div className="md:col-span-2">
                <label className="text-sm text-gray-600 flex items-center gap-1">
                  <Mail className="w-4 h-4" />
                  Email
                </label>
                <p className="font-semibold text-gray-800">
                  <a href={`mailto:${solicitud.email}`} className="text-primary hover:underline">
                    {solicitud.email}
                  </a>
                </p>
              </div>
            </div>
          </div>

          {/* Mensaje del Cliente */}
          {solicitud.mensaje && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <label className="text-sm font-semibold text-blue-900">Mensaje del Cliente</label>
              <p className="mt-2 text-gray-700 whitespace-pre-wrap">{solicitud.mensaje}</p>
            </div>
          )}

          {/* Información Adicional */}
          <div className="border-t pt-4 space-y-2">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Calendar className="w-4 h-4" />
              <span>
                Fecha de solicitud:{' '}
                <span className="font-semibold text-gray-800">
                  {new Date(solicitud.fechaSolicitud || solicitud.fechaCreacion).toLocaleDateString(
                    'es-ES',
                    {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    }
                  )}
                </span>
              </span>
            </div>
            {solicitud.clienteId && (
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <User className="w-4 h-4" />
                <span>
                  Cliente ID:{' '}
                  <span className="font-mono text-xs bg-gray-100 px-2 py-1 rounded">
                    {solicitud.clienteId}
                  </span>
                </span>
              </div>
            )}
            {solicitud.stripeSessionId && (
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <CreditCard className="w-4 h-4" />
                <span>
                  Stripe Session:{' '}
                  <span className="font-mono text-xs bg-gray-100 px-2 py-1 rounded">
                    {solicitud.stripeSessionId}
                  </span>
                </span>
              </div>
            )}
          </div>

          {/* Notas para actualización */}
          {solicitud.estado !== 'procesado' && (
            <div>
              <label htmlFor="notas" className="block text-sm font-semibold text-gray-700 mb-2">
                Notas (opcional)
              </label>
              <textarea
                id="notas"
                value={notas}
                onChange={(e) => setNotas(e.target.value)}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                placeholder="Agrega notas sobre el cambio de estado..."
              />
            </div>
          )}
        </div>

        {/* Footer - Acciones */}
        <div className="sticky bottom-0 bg-gray-50 border-t px-6 py-4">
          <div className="flex flex-wrap gap-3 justify-end">
            <Button variant="outline" onClick={onClose} disabled={updating}>
              Cerrar
            </Button>

            {solicitud.estado === 'pendiente' && (
              <>
                <Button
                  variant="secondary"
                  onClick={() => handleUpdateEstado('contactado')}
                  disabled={updating}
                >
                  {updating ? 'Actualizando...' : 'Marcar como Contactado'}
                </Button>
                <Button
                  variant="danger"
                  onClick={() => handleUpdateEstado('rechazado')}
                  disabled={updating}
                >
                  {updating ? 'Actualizando...' : 'Rechazar'}
                </Button>
                <Button
                  variant="primary"
                  onClick={() => handleUpdateEstado('procesado')}
                  disabled={updating}
                >
                  {updating ? 'Actualizando...' : 'Aprobar y Procesar'}
                </Button>
              </>
            )}

            {solicitud.estado === 'contactado' && (
              <>
                <Button
                  variant="danger"
                  onClick={() => handleUpdateEstado('rechazado')}
                  disabled={updating}
                >
                  {updating ? 'Actualizando...' : 'Rechazar'}
                </Button>
                <Button
                  variant="primary"
                  onClick={handleConfirmarPago}
                  disabled={updating}
                >
                  {updating ? 'Confirmando...' : '✅ Confirmar Pago'}
                </Button>
              </>
            )}

            {solicitud.estado === 'pago_confirmado' && (
              <div className="w-full">
                <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 mb-3">
                  <p className="text-sm text-purple-800">
                    <strong>✅ Pago confirmado.</strong> El cliente ha recibido un email con sus
                    credenciales para acceder al formulario de onboarding.
                  </p>
                  <p className="text-sm text-purple-700 mt-2">
                    Cuando el cliente complete el formulario, aparecerá en la sección de{' '}
                    <strong>Solicitudes de Onboarding</strong> para revisión.
                  </p>
                </div>
              </div>
            )}

            {solicitud.estado === 'rechazado' && (
              <Button
                variant="secondary"
                onClick={() => handleUpdateEstado('pendiente')}
                disabled={updating}
              >
                {updating ? 'Actualizando...' : 'Reactivar Solicitud'}
              </Button>
            )}

            {solicitud.estado === 'procesado' && (
              <div className="text-sm text-green-600 flex items-center gap-2">
                <span className="inline-block w-2 h-2 bg-green-600 rounded-full"></span>
                Solicitud procesada exitosamente
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

SolicitudDetailModal.propTypes = {
  solicitud: PropTypes.shape({
    id: PropTypes.string.isRequired,
    nombreSalon: PropTypes.string.isRequired,
    nombrePropietario: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    telefono: PropTypes.string.isRequired,
    plan: PropTypes.string.isRequired,
    mensaje: PropTypes.string,
    estado: PropTypes.string.isRequired,
    fechaSolicitud: PropTypes.string,
    fechaCreacion: PropTypes.string,
    clienteId: PropTypes.string,
    stripeSessionId: PropTypes.string
  }),
  onClose: PropTypes.func.isRequired,
  onUpdateEstado: PropTypes.func.isRequired,
  onConfirmarPago: PropTypes.func.isRequired
}

export default SolicitudDetailModal
