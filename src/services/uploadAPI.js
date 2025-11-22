/**
 * Servicio API para subir imágenes a Cloudinary
 */

import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4001'

/**
 * Subir una imagen a Cloudinary
 * @param {File} file - Archivo de imagen
 * @param {string} folder - Carpeta destino (logos, carrusel, general)
 * @param {string} salonId - ID único del salón (requerido)
 * @returns {Promise<string>} - URL de la imagen subida
 */
export const uploadImage = async (file, folder = 'general', salonId) => {
  try {
    // Validar salonId
    if (!salonId) {
      throw new Error('salonId es requerido para subir imágenes')
    }

    // Validar archivo
    if (!file) {
      throw new Error('No se seleccionó ningún archivo')
    }

    // Validar tipo de archivo
    if (!file.type.startsWith('image/')) {
      throw new Error('El archivo debe ser una imagen (JPG, PNG, WebP, etc.)')
    }

    // Validar tamaño (5MB máximo)
    const MAX_SIZE = 5 * 1024 * 1024 // 5MB
    if (file.size > MAX_SIZE) {
      throw new Error('La imagen es muy grande. Tamaño máximo: 5MB')
    }

    // Crear FormData
    const formData = new FormData()
    formData.append('file', file)
    formData.append('folder', folder)
    formData.append('salonId', salonId)

    // Subir
    const response = await axios.post(`${API_URL}/api/upload`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      // Timeout de 30 segundos
      timeout: 30000
    })

    if (!response.data.success) {
      throw new Error(response.data.mensaje || 'Error al subir imagen')
    }

    // Retornar URL
    return response.data.data.url
  } catch (error) {
    console.error('Error subiendo imagen:', error)

    // Mensajes de error amigables
    if (error.code === 'ECONNABORTED') {
      throw new Error('La subida tardó demasiado. Por favor, intenta con una imagen más pequeña.')
    }

    if (error.response) {
      throw new Error(error.response.data?.mensaje || 'Error al subir imagen')
    }

    throw error
  }
}

/**
 * Subir múltiples imágenes a Cloudinary
 * @param {File[]} files - Array de archivos
 * @param {string} folder - Carpeta destino
 * @param {string} salonId - ID único del salón (requerido)
 * @param {Function} onProgress - Callback de progreso (opcional)
 * @returns {Promise<string[]>} - Array de URLs de imágenes subidas
 */
export const uploadMultipleImages = async (files, folder = 'carrusel', salonId, onProgress = null) => {
  try {
    // Validar salonId
    if (!salonId) {
      throw new Error('salonId es requerido para subir imágenes')
    }

    // Validar archivos
    if (!files || files.length === 0) {
      throw new Error('No se seleccionaron archivos')
    }

    // Validar límite (máximo 4 imágenes para carrusel)
    if (files.length > 4) {
      throw new Error('Máximo 4 imágenes por vez')
    }

    // Crear FormData
    const formData = new FormData()

    // Agregar archivos
    for (const file of files) {
      // Validar tipo
      if (!file.type.startsWith('image/')) {
        throw new Error(`${file.name} no es una imagen válida`)
      }

      // Validar tamaño
      const MAX_SIZE = 5 * 1024 * 1024 // 5MB
      if (file.size > MAX_SIZE) {
        throw new Error(`${file.name} es muy grande (máx 5MB)`)
      }

      formData.append('files', file)
    }

    formData.append('folder', folder)
    formData.append('salonId', salonId)

    // Subir
    const response = await axios.post(`${API_URL}/api/upload/multiple`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      timeout: 60000, // 60 segundos para múltiples
      onUploadProgress: (progressEvent) => {
        if (onProgress) {
          const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total)
          onProgress(percentCompleted)
        }
      }
    })

    if (!response.data.success) {
      throw new Error(response.data.mensaje || 'Error al subir imágenes')
    }

    // Extraer URLs
    const urls = response.data.data.uploaded.map((img) => img.url)

    // Mostrar advertencia si hubo errores
    if (response.data.data.errors && response.data.data.errors.length > 0) {
      console.warn('Algunas imágenes no se pudieron subir:', response.data.data.errors)
    }

    return urls
  } catch (error) {
    console.error('Error subiendo múltiples imágenes:', error)

    if (error.code === 'ECONNABORTED') {
      throw new Error('La subida tardó demasiado. Intenta con menos imágenes.')
    }

    if (error.response) {
      throw new Error(error.response.data?.mensaje || 'Error al subir imágenes')
    }

    throw error
  }
}

/**
 * Obtener vista previa de imagen como Data URL
 * @param {File} file - Archivo de imagen
 * @returns {Promise<string>} - Data URL de la imagen
 */
export const getImagePreview = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()

    reader.onload = (e) => {
      resolve(e.target.result)
    }

    reader.onerror = (error) => {
      reject(error)
    }

    reader.readAsDataURL(file)
  })
}

export default {
  uploadImage,
  uploadMultipleImages,
  getImagePreview
}
