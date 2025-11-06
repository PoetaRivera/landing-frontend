import { Helmet } from 'react-helmet-async'
import PropTypes from 'prop-types'

/**
 * Componente SEO para gestionar meta tags de manera centralizada
 *
 * @param {Object} props - Propiedades del componente
 * @param {string} props.title - Título de la página
 * @param {string} props.description - Descripción de la página
 * @param {string} [props.keywords] - Palabras clave
 * @param {string} [props.author] - Autor del contenido
 * @param {string} [props.image] - URL de la imagen para OpenGraph
 * @param {string} [props.url] - URL canónica de la página
 * @param {string} [props.type='website'] - Tipo de contenido OpenGraph
 */
function SEO({
  title,
  description,
  keywords = '',
  author = 'MiSalons',
  image = '/og-image.jpg',
  url = '',
  type = 'website'
}) {
  const siteName = 'MiSalons'
  const fullTitle = title ? `${title} | ${siteName}` : siteName
  const canonicalUrl = url || window.location.href

  return (
    <Helmet>
      {/* Meta Tags Básicos */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      {author && <meta name="author" content={author} />}

      {/* Meta Tags de Viewport y Charset */}
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />

      {/* Canonical URL */}
      <link rel="canonical" href={canonicalUrl} />

      {/* OpenGraph Tags (Facebook, LinkedIn) */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:locale" content="es_ES" />

      {/* Twitter Card Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* Additional Meta Tags */}
      <meta name="robots" content="index, follow" />
      <meta name="language" content="Spanish" />
      <meta name="revisit-after" content="7 days" />

      {/* App Metadata */}
      <meta name="application-name" content={siteName} />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      <meta name="apple-mobile-web-app-title" content={siteName} />
      <meta name="format-detection" content="telephone=no" />
      <meta name="mobile-web-app-capable" content="yes" />
    </Helmet>
  )
}

SEO.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  keywords: PropTypes.string,
  author: PropTypes.string,
  image: PropTypes.string,
  url: PropTypes.string,
  type: PropTypes.oneOf(['website', 'article', 'profile'])
}

export default SEO
