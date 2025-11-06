import { defaultSchema } from 'rehype-sanitize'

/**
 * Configuración personalizada de sanitización para markdown
 * Más restrictiva que el default para mayor seguridad
 */
export const customSanitizeSchema = {
  ...defaultSchema,
  attributes: {
    ...defaultSchema.attributes,
    // Permitir solo ciertos atributos en elementos específicos
    a: [
      'href',
      'title',
      'target',
      'rel', // Para noopener noreferrer
      ...(defaultSchema.attributes?.a || [])
    ],
    img: [
      'src',
      'alt',
      'title',
      'width',
      'height',
      'loading' // Para lazy loading
    ],
    code: ['className'], // Para syntax highlighting
    pre: ['className'],
    // Remover event handlers peligrosos
    '*': (defaultSchema.attributes?.['*'] || []).filter(
      (attr) => !attr.startsWith('on') // No permitir onclick, onload, etc.
    )
  },
  // Protocols permitidos en links e imágenes
  protocols: {
    href: ['http', 'https', 'mailto'], // NO permitir javascript:
    src: ['http', 'https'] // Solo https/http para imágenes
  },
  // Tags permitidos (más restrictivo)
  tagNames: [
    // Texto básico
    'p',
    'br',
    'span',
    'strong',
    'em',
    'b',
    'i',
    'u',
    's',
    'del',
    'mark',
    // Headers
    'h1',
    'h2',
    'h3',
    'h4',
    'h5',
    'h6',
    // Listas
    'ul',
    'ol',
    'li',
    // Links e imágenes
    'a',
    'img',
    // Código
    'code',
    'pre',
    'kbd',
    'samp',
    'var',
    // Tablas
    'table',
    'thead',
    'tbody',
    'tr',
    'th',
    'td',
    // Bloques
    'blockquote',
    'div',
    'hr',
    // Definiciones
    'dl',
    'dt',
    'dd'
    // NO permitir: script, iframe, object, embed, form, input, etc.
  ],
  // Remover comentarios HTML
  allowComments: false,
  // Remover doctype
  allowDoctypes: false
}

/**
 * Validar URL para evitar XSS
 * @param {string} url - URL a validar
 * @returns {boolean} true si es segura
 */
export function isSafeURL(url) {
  if (!url) return false

  try {
    const parsed = new URL(url, window.location.origin)

    // Bloquear protocolos peligrosos
    // eslint-disable-next-line no-script-url
    const dangerousProtocols = ['javascript:', 'data:', 'vbscript:', 'file:']
    if (dangerousProtocols.some((proto) => parsed.protocol === proto)) {
      console.warn('⚠️ URL bloqueada (protocolo peligroso):', url)
      return false
    }

    // Permitir solo http, https, mailto
    const allowedProtocols = ['http:', 'https:', 'mailto:']
    if (!allowedProtocols.includes(parsed.protocol)) {
      console.warn('⚠️ URL bloqueada (protocolo no permitido):', url)
      return false
    }

    return true
  } catch (error) {
    console.error('❌ URL inválida:', url, error)
    return false
  }
}

/**
 * Sanitizar texto plano (remover caracteres peligrosos)
 * @param {string} text - Texto a sanitizar
 * @returns {string} Texto sanitizado
 */
export function sanitizePlainText(text) {
  if (!text) return ''

  return text
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '') // Remover tags script
    .replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, '') // Remover iframes
    .replace(/javascript:/gi, '') // Remover javascript:
    .replace(/on\w+\s*=/gi, '') // Remover event handlers (onclick, etc.)
    .trim()
}

/**
 * Validar contenido markdown antes de renderizar
 * @param {string} markdown - Contenido markdown
 * @returns {{valid: boolean, sanitized: string, warnings: string[]}} Resultado
 */
export function validateMarkdown(markdown) {
  const warnings = []

  if (!markdown || typeof markdown !== 'string') {
    return {
      valid: false,
      sanitized: '',
      warnings: ['Contenido markdown inválido']
    }
  }

  let sanitized = markdown

  // Detectar y advertir sobre contenido potencialmente peligroso
  if (/<script/i.test(markdown)) {
    warnings.push('⚠️ Contenido contiene tags <script>')
    sanitized = sanitized.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
  }

  if (/<iframe/i.test(markdown)) {
    warnings.push('⚠️ Contenido contiene tags <iframe>')
    sanitized = sanitized.replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, '')
  }

  if (/javascript:/i.test(markdown)) {
    warnings.push('⚠️ Contenido contiene protocolo javascript:')
    sanitized = sanitized.replace(/javascript:/gi, '')
  }

  if (/on\w+\s*=/i.test(markdown)) {
    warnings.push('⚠️ Contenido contiene event handlers HTML')
    sanitized = sanitized.replace(/on\w+\s*=/gi, '')
  }

  if (warnings.length > 0 && import.meta.env.DEV) {
    console.warn('🔒 Markdown sanitizado:', warnings)
  }

  return {
    valid: true,
    sanitized,
    warnings
  }
}

/**
 * Configuración para react-markdown con sanitización
 */
export const secureMarkdownConfig = {
  remarkPlugins: [],
  rehypePlugins: [
    // Sanitizar HTML embebido
    [require('rehype-sanitize'), customSanitizeSchema]
  ],
  components: {
    // Componente personalizado para links seguros
    a: ({ node, children, href, ...props }) => {
      // Validar URL
      if (!isSafeURL(href)) {
        return <span style={{ color: 'red', textDecoration: 'line-through' }}>{children}</span>
      }

      // Agregar rel="noopener noreferrer" a links externos
      const isExternal = href && (href.startsWith('http') || href.startsWith('//'))
      const rel = isExternal ? 'noopener noreferrer' : undefined
      const target = isExternal ? '_blank' : undefined

      return (
        <a href={href} rel={rel} target={target} {...props}>
          {children}
        </a>
      )
    },
    // Componente personalizado para imágenes seguras
    img: ({ node, src, alt, ...props }) => {
      // Validar URL de imagen
      if (!isSafeURL(src)) {
        return <span style={{ color: 'red' }}>[Imagen bloqueada: URL insegura]</span>
      }

      return <img src={src} alt={alt || 'Imagen'} loading="lazy" {...props} />
    }
  }
}

export default {
  customSanitizeSchema,
  isSafeURL,
  sanitizePlainText,
  validateMarkdown,
  secureMarkdownConfig
}
