/**
 * Mensajes centralizados de la aplicación
 * Facilita traducciones futuras y mantiene consistencia
 */

export const MESSAGES = {
  // Mensajes de éxito
  SUCCESS: {
    SOLICITUD_ENVIADA: '¡Solicitud enviada exitosamente! Te contactaremos pronto.',
    DATOS_GUARDADOS: 'Datos guardados correctamente',
    OPERACION_EXITOSA: 'Operación completada con éxito',
    PDF_GENERADO: 'PDF generado exitosamente',
    EMAIL_ENVIADO: 'Email enviado correctamente'
  },

  // Mensajes de error
  ERROR: {
    GENERICO: 'Ha ocurrido un error. Por favor, intenta nuevamente.',
    NETWORK: 'No se pudo conectar al servidor. Verifica tu conexión a internet.',
    TIMEOUT: 'La solicitud tardó demasiado. Por favor, intenta nuevamente.',
    VALIDACION: 'Por favor, corrige los errores en el formulario.',
    API_NO_DISPONIBLE: 'El servidor no está disponible en este momento.',
    DOCUMENTO_NO_ENCONTRADO: 'El documento solicitado no fue encontrado.',
    SIN_PERMISOS: 'No tienes permisos para realizar esta acción.',
    SESION_EXPIRADA: 'Tu sesión ha expirado. Por favor, inicia sesión nuevamente.',
    DATOS_INVALIDOS: 'Los datos proporcionados son inválidos.',
    OPERACION_FALLIDA: 'La operación no pudo completarse.'
  },

  // Mensajes de validación de formularios
  VALIDACION: {
    CAMPO_REQUERIDO: 'Este campo es requerido',
    EMAIL_INVALIDO: 'Ingresa un email válido',
    TELEFONO_INVALIDO: 'Ingresa un teléfono válido',
    MIN_LENGTH: (min) => `Mínimo ${min} caracteres`,
    MAX_LENGTH: (max) => `Máximo ${max} caracteres`,
    FORMATO_INVALIDO: 'El formato es inválido',
    SELECCIONA_OPCION: 'Debes seleccionar una opción',
    ACEPTA_TERMINOS: 'Debes aceptar los términos y condiciones'
  },

  // Mensajes informativos
  INFO: {
    CARGANDO: 'Cargando...',
    GUARDANDO: 'Guardando...',
    PROCESANDO: 'Procesando...',
    ENVIANDO: 'Enviando...',
    SIN_RESULTADOS: 'No se encontraron resultados',
    SIN_DATOS: 'No hay datos para mostrar',
    CAMPO_OPCIONAL: '(Opcional)',
    COMPLETAR_FORMULARIO: 'Por favor, completa todos los campos requeridos'
  },

  // Mensajes de confirmación
  CONFIRMACION: {
    ELIMINAR: '¿Estás seguro de que deseas eliminar este elemento?',
    CANCELAR: '¿Estás seguro de que deseas cancelar? Los cambios no guardados se perderán.',
    SALIR: '¿Deseas salir sin guardar los cambios?',
    ACTUALIZAR: '¿Deseas actualizar esta información?'
  },

  // Textos de UI
  UI: {
    ENVIAR: 'Enviar',
    CANCELAR: 'Cancelar',
    GUARDAR: 'Guardar',
    ACEPTAR: 'Aceptar',
    CERRAR: 'Cerrar',
    CONTINUAR: 'Continuar',
    VOLVER: 'Volver',
    SIGUIENTE: 'Siguiente',
    ANTERIOR: 'Anterior',
    VER_MAS: 'Ver más',
    VER_MENOS: 'Ver menos',
    DESCARGAR: 'Descargar',
    COMPARTIR: 'Compartir',
    BUSCAR: 'Buscar',
    FILTRAR: 'Filtrar',
    LIMPIAR: 'Limpiar',
    EDITAR: 'Editar',
    ELIMINAR: 'Eliminar',
    ACTUALIZAR: 'Actualizar',
    INICIO: 'Inicio',
    MAS_INFO: 'Más información'
  },

  // Mensajes de la landing page
  LANDING: {
    HERO_TITLE: 'Gestiona tu salón de belleza con facilidad',
    HERO_SUBTITLE: 'Sistema completo de gestión para salones de belleza',
    CTA_PRIMARY: '¡Empieza Gratis!',
    CTA_SECONDARY: 'Ver Demo',
    CTA_SUSCRIBIR: 'Solicitar Suscripción',
    CTA_VER_PLANES: 'Ver Planes',
    CTA_VER_TUTORIALES: 'Ver Tutoriales',
    CTA_VER_DEMO: 'Ver Demo',
    FOOTER_COPYRIGHT: '© 2024 MultiSalón. Todos los derechos reservados.',
    CONTACTO_EMAIL: 'contacto@multisalon.com',
    CONTACTO_TELEFONO: '+503 7777-8888',
    TIEMPO_LECTURA: (minutos) => `${minutos} min de lectura`
  },

  // Mensajes de planes
  PLANES: {
    BASICO_TITLE: 'Plan Básico',
    BASICO_SUBTITLE: 'Perfecto para comenzar',
    PREMIUM_TITLE: 'Plan Premium',
    PREMIUM_SUBTITLE: 'Para salones en crecimiento',
    ENTERPRISE_TITLE: 'Plan Enterprise',
    ENTERPRISE_SUBTITLE: 'Solución completa',
    PROXIMAMENTE: 'Próximamente',
    CARACTERISTICAS_TITLE: 'Características incluidas',
    PRECIO_DESDE: 'Desde'
  },

  // Mensajes de documentación
  DOCS: {
    VOLVER_A_DOCS: 'Volver a Documentación',
    TABLA_CONTENIDO: 'Tabla de Contenido',
    HISTORIAL_RECIENTE: 'Documentos recientes',
    GENERAR_PDF: 'Generar PDF',
    COMPARTIR_DOCUMENTO: 'Compartir documento',
    MODO_OSCURO: 'Modo oscuro',
    MODO_CLARO: 'Modo claro',
    BUSCAR_DOCUMENTO: 'Buscar en el documento...',
    NO_HAY_HISTORIAL: 'No hay documentos recientes'
  },

  // Mensajes de error específicos de la app
  APP: {
    ERROR_CARGAR_DOCUMENTO: 'Error al cargar el documento',
    ERROR_GENERAR_PDF: 'Error al generar el PDF',
    ERROR_ENVIAR_SOLICITUD: 'Error al enviar la solicitud',
    ERROR_CARGAR_DATOS: 'Error al cargar los datos',
    SOLICITUD_RECIBIDA: '¡Gracias! Tu solicitud ha sido recibida.',
    SOLICITUD_EN_PROCESO: 'Tu solicitud está siendo procesada.',
    CONTACTO_PRONTO: 'Te contactaremos pronto para continuar con el proceso.',
    EMAIL_ADVERTENCIA: 'Nota: Es posible que el email de confirmación tarde unos minutos en llegar.'
  }
}

/**
 * Helper para obtener mensaje
 */
export function getMessage(key, ...args) {
  const keys = key.split('.')
  let message = MESSAGES

  for (const k of keys) {
    message = message[k]
    if (!message) return key
  }

  // Si es una función, llamarla con los argumentos
  if (typeof message === 'function') {
    return message(...args)
  }

  return message
}

/**
 * Helper para mensajes de validación
 */
export function getValidationMessage(type, value) {
  const validations = MESSAGES.VALIDACION

  if (typeof validations[type] === 'function') {
    return validations[type](value)
  }

  return validations[type] || MESSAGES.ERROR.VALIDACION
}

export default {
  MESSAGES,
  getMessage,
  getValidationMessage
}
