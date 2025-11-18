import { useState, useEffect, useRef } from 'react'
import { useParams, Link, useNavigate, useLocation } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeRaw from 'rehype-raw'
import rehypeSanitize from 'rehype-sanitize'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import jsPDF from 'jspdf'
import html2canvas from 'html2canvas'
import { Clock, Share2, Download, Search, Moon, Sun, BookOpen } from 'lucide-react'

function MarkdownViewer() {
  const { archivo } = useParams()
  const navigate = useNavigate()
  const location = useLocation()
  const [contenido, setContenido] = useState('')
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState(null)
  const [headings, setHeadings] = useState([])
  const [modoOscuro, setModoOscuro] = useState(() => {
    return localStorage.getItem('modoOscuro') === 'true'
  })
  const [busqueda, setBusqueda] = useState('')
  const [resultadosBusqueda, setResultadosBusqueda] = useState([])
  const [tiempoLectura, setTiempoLectura] = useState(0)
  const [historialDocs, setHistorialDocs] = useState([])
  const [generandoPDF, setGenerandoPDF] = useState(false)
  const contentRef = useRef(null)

  // Obtener nombre legible del archivo
  const getNombreDocumento = () => {
    const nombre = archivo.replace('.md', '').replace(/-/g, ' ')
    return nombre
      .split(' ')
      .map((palabra) => palabra.charAt(0).toUpperCase() + palabra.slice(1).toLowerCase())
      .join(' ')
  }

  // Calcular tiempo de lectura (200 palabras por minuto promedio)
  const calcularTiempoLectura = (texto) => {
    const palabras = texto.split(/\s+/).length
    const minutos = Math.ceil(palabras / 200)
    return minutos
  }

  // Guardar en historial
  const guardarEnHistorial = (nombreArchivo) => {
    const historial = JSON.parse(localStorage.getItem('historialDocs') || '[]')
    const nuevoItem = {
      archivo: nombreArchivo,
      nombre: getNombreDocumento(),
      fecha: new Date().toISOString()
    }

    // Evitar duplicados
    const historialFiltrado = historial.filter((item) => item.archivo !== nombreArchivo)
    const nuevoHistorial = [nuevoItem, ...historialFiltrado].slice(0, 5) // Máximo 5

    localStorage.setItem('historialDocs', JSON.stringify(nuevoHistorial))
    setHistorialDocs(nuevoHistorial)
  }

  // Cargar historial
  useEffect(() => {
    const historial = JSON.parse(localStorage.getItem('historialDocs') || '[]')
    setHistorialDocs(historial)
  }, [])

  // Guardar preferencia de modo oscuro
  useEffect(() => {
    localStorage.setItem('modoOscuro', modoOscuro)
  }, [modoOscuro])

  // Scroll a hash de URL al cargar
  useEffect(() => {
    if (location.hash && contenido) {
      setTimeout(() => {
        const id = location.hash.substring(1)
        const element = document.getElementById(id)
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' })
        }
      }, 500)
    }
  }, [location.hash, contenido])

  useEffect(() => {
    const cargarDocumento = async () => {
      try {
        setCargando(true)
        setError(null)

        const response = await fetch(`/documentacion/${archivo}`)

        if (!response.ok) {
          throw new Error('Documento no encontrado')
        }

        const texto = await response.text()
        setContenido(texto)

        // Calcular tiempo de lectura
        const tiempo = calcularTiempoLectura(texto)
        setTiempoLectura(tiempo)

        // Guardar en historial
        guardarEnHistorial(archivo)

        // Extraer headings para tabla de contenidos
        const headingRegex = /^#{1,3}\s+(.+)$/gm
        const matches = []
        let match

        while ((match = headingRegex.exec(texto)) !== null) {
          const level = match[0].match(/^#+/)[0].length
          const text = match[1].replace(/[#*`]/g, '').trim()
          const id = text
            .toLowerCase()
            .replace(/[^\w\s-]/g, '')
            .replace(/\s+/g, '-')

          matches.push({ level, text, id })
        }

        setHeadings(matches)
        setCargando(false)
      } catch (err) {
        console.error('Error al cargar documento:', err)
        setError(err.message)
        setCargando(false)
      }
    }

    if (archivo) {
      cargarDocumento()
    }
  }, [archivo])

  // Búsqueda en el documento
  useEffect(() => {
    if (busqueda.trim() === '') {
      setResultadosBusqueda([])
      return
    }

    const lineas = contenido.split('\n')
    const resultados = []

    lineas.forEach((linea, index) => {
      if (linea.toLowerCase().includes(busqueda.toLowerCase())) {
        // Encontrar posición en el texto original
        const textoAntes = lineas.slice(0, index).join('\n')
        const palabrasAntes = textoAntes.split(/\s+/).length

        resultados.push({
          lineNumber: index + 1,
          content: linea.trim(),
          preview: linea.substring(0, 100),
          wordPosition: palabrasAntes
        })
      }
    })

    setResultadosBusqueda(resultados.slice(0, 10))
  }, [busqueda, contenido])

  const scrollToHeading = (id) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })

      // Actualizar URL con hash
      window.history.pushState(null, '', `#${id}`)
    }
  }

  // Scroll a resultado de búsqueda
  const scrollToSearchResult = (wordPosition) => {
    if (!contentRef.current) return

    const allTextElements = contentRef.current.querySelectorAll('p, li, h1, h2, h3, h4, h5, h6')
    let currentWords = 0

    for (const element of allTextElements) {
      const elementWords = element.innerText.split(/\s+/).length
      if (currentWords + elementWords > wordPosition) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' })
        element.classList.add('highlight-search')
        setTimeout(() => element.classList.remove('highlight-search'), 2000)
        break
      }
      currentWords += elementWords
    }
  }

  const copiarCodigo = async (codigo) => {
    try {
      await navigator.clipboard.writeText(codigo)
      toast.success('📋 ¡Código copiado al portapapeles!', {
        autoClose: 2000,
        position: 'bottom-right'
      })
    } catch (err) {
      toast.error('Error al copiar', {
        autoClose: 2000,
        position: 'bottom-right'
      })
    }
  }

  // Compartir enlace a sección
  const compartirSeccion = async (id, texto) => {
    const url = `${window.location.origin}${window.location.pathname}#${id}`

    try {
      await navigator.clipboard.writeText(url)
      toast.success(`🔗 Enlace a "${texto}" copiado`, {
        autoClose: 3000,
        position: 'bottom-right'
      })
    } catch (err) {
      toast.error('Error al copiar enlace', {
        autoClose: 2000,
        position: 'bottom-right'
      })
    }
  }

  // Generar PDF
  const generarPDF = async () => {
    if (!contentRef.current) return

    setGenerandoPDF(true)
    const toastId = toast.info('Generando PDF...', { autoClose: false })

    try {
      const pdf = new jsPDF('p', 'mm', 'a4')

      // Capturar el contenido HTML como imagen con buena calidad
      const canvas = await html2canvas(contentRef.current, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: modoOscuro ? '#1F2937' : '#FFFFFF'
      })

      const imgData = canvas.toDataURL('image/png')

      // Dimensiones del PDF en mm (A4: 210 x 297 mm)
      const pdfWidth = pdf.internal.pageSize.getWidth() // 210 mm
      const pdfHeight = pdf.internal.pageSize.getHeight() // 297 mm

      // Márgenes en mm
      const margin = 10
      const contentWidth = pdfWidth - margin * 2 // 190 mm
      const contentHeight = pdfHeight - margin * 2 // 277 mm

      // Dimensiones del canvas en píxeles
      const canvasWidthPx = canvas.width
      const canvasHeightPx = canvas.height

      // Calcular dimensiones de la imagen en el PDF
      // La imagen debe ocupar todo el ancho disponible (190mm)
      const imgWidthMm = contentWidth
      // Mantener la proporción del aspect ratio
      const aspectRatio = canvasHeightPx / canvasWidthPx
      const imgHeightMm = imgWidthMm * aspectRatio

      // Calcular cuántas páginas necesitamos
      const numPages = Math.ceil(imgHeightMm / contentHeight)

      console.log('PDF Generation Info:', {
        canvasSize: `${canvasWidthPx}x${canvasHeightPx}px`,
        pdfSize: `${pdfWidth}x${pdfHeight}mm`,
        contentArea: `${contentWidth}x${contentHeight}mm`,
        imageSize: `${imgWidthMm.toFixed(2)}x${imgHeightMm.toFixed(2)}mm`,
        numPages
      })

      // Agregar cada página
      for (let pageNum = 0; pageNum < numPages; pageNum++) {
        if (pageNum > 0) {
          pdf.addPage()
        }

        // Calcular la posición vertical en mm donde empieza esta página
        const pageStartMm = pageNum * contentHeight
        // Convertir a píxeles en el canvas
        const pageStartPx = (pageStartMm / imgWidthMm) * canvasWidthPx
        // Altura de esta página en píxeles
        const pageHeightPx = (contentHeight / imgWidthMm) * canvasWidthPx
        // No exceder la altura del canvas
        const actualPageHeightPx = Math.min(pageHeightPx, canvasHeightPx - pageStartPx)
        // Convertir de vuelta a mm
        const actualPageHeightMm = (actualPageHeightPx / canvasWidthPx) * imgWidthMm

        // Crear un canvas temporal para esta página
        const pageCanvas = document.createElement('canvas')
        pageCanvas.width = canvasWidthPx
        pageCanvas.height = actualPageHeightPx
        const pageCtx = pageCanvas.getContext('2d')

        // Copiar la porción correspondiente del canvas original
        pageCtx.drawImage(
          canvas,
          0,
          pageStartPx, // sx, sy - coordenadas de origen
          canvasWidthPx,
          actualPageHeightPx, // sWidth, sHeight - tamaño de la porción
          0,
          0, // dx, dy - destino en el nuevo canvas
          canvasWidthPx,
          actualPageHeightPx // dWidth, dHeight - tamaño en destino
        )

        // Convertir el canvas temporal a imagen
        const pageImgData = pageCanvas.toDataURL('image/png')

        // Agregar la imagen al PDF
        pdf.addImage(
          pageImgData,
          'PNG',
          margin,
          margin,
          imgWidthMm,
          actualPageHeightMm,
          undefined,
          'FAST'
        )
      }

      pdf.save(`${archivo.replace('.md', '')}.pdf`)
      toast.dismiss(toastId)
      toast.success('¡PDF generado exitosamente!')
    } catch (err) {
      console.error('Error generando PDF:', err)
      toast.dismiss(toastId)
      toast.error('Error al generar PDF')
    } finally {
      setGenerandoPDF(false)
    }
  }

  // Componente de bloque de código con botón copiar
  const CodeBlock = ({ children, className, ...props }) => {
    const match = /language-(\w+)/.exec(className || '')
    const code = String(children).replace(/\n$/, '')
    const isInline = !className

    if (isInline) {
      return (
        <code
          className="bg-gray-100 text-red-600 px-1.5 py-0.5 rounded text-sm dark:bg-gray-800 dark:text-red-400"
          {...props}
        >
          {children}
        </code>
      )
    }

    return (
      <div className="relative group my-4">
        <div className="absolute right-2 top-2 opacity-0 group-hover:opacity-100 transition-opacity z-10">
          <button
            onClick={() => copiarCodigo(code)}
            className="px-3 py-1 bg-gray-700 hover:bg-gray-600 text-white text-xs rounded flex items-center gap-1 shadow-lg"
            title="Copiar código"
          >
            <span>📋</span>
            Copiar
          </button>
        </div>
        <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto dark:bg-black">
          <code className={className} {...props}>
            {children}
          </code>
        </pre>
      </div>
    )
  }

  // Componente de heading con botón compartir
  const HeadingWithShare = ({ level, id, children }) => {
    const Tag = `h${level}`

    return (
      <Tag
        id={id}
        className={`group relative ${modoOscuro ? 'text-gray-100' : 'text-gray-900'} ${
          level <= 2 ? `border-b ${modoOscuro ? 'border-gray-700' : 'border-gray-200'}` : ''
        }`}
      >
        {children}
        <button
          onClick={() => compartirSeccion(id, children.toString())}
          className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity inline-flex items-center text-primary hover:text-primary-dark"
          title="Compartir enlace a esta sección"
        >
          <Share2 size={16} />
        </button>
      </Tag>
    )
  }

  if (cargando) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-16 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Cargando documento...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 p-6 rounded">
            <h2 className="text-2xl font-bold text-red-800 dark:text-red-400 mb-2">
              Error al cargar documento
            </h2>
            <p className="text-red-600 dark:text-red-300 mb-4">{error}</p>
            <Link
              to="/documentacion"
              className="inline-block bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary-dark transition"
            >
              Volver a Documentación
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div
      className={`min-h-screen ${modoOscuro ? 'dark bg-gray-900' : 'bg-gray-50'} transition-colors duration-200`}
    >
      {/* Header sticky */}
      <div
        className={`${modoOscuro ? 'bg-gray-800 border-gray-700' : 'bg-white'} shadow-sm sticky top-0 z-20 border-b transition-colors duration-200`}
      >
        <div className="container mx-auto px-4 py-4">
          {/* Breadcrumbs con tiempo de lectura */}
          <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
            <div
              className={`text-sm flex items-center gap-2 ${modoOscuro ? 'text-gray-400' : 'text-gray-600'}`}
            >
              <Link to="/" className="hover:text-primary transition">
                Inicio
              </Link>
              <span>→</span>
              <Link to="/documentacion" className="hover:text-primary transition">
                Documentación
              </Link>
              <span>→</span>
              <span className={modoOscuro ? 'text-gray-200' : 'text-gray-900'}>
                {getNombreDocumento()}
              </span>
            </div>
            <div
              className={`flex items-center gap-2 text-sm ${modoOscuro ? 'text-gray-400' : 'text-gray-600'}`}
            >
              <Clock size={16} />
              <span>{tiempoLectura} min de lectura</span>
            </div>
          </div>

          <div className="flex items-center justify-between gap-4 flex-wrap">
            <button
              onClick={() => navigate(-1)}
              className={`flex items-center ${modoOscuro ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-primary'} transition`}
            >
              <span className="mr-2">←</span>
              Volver
            </button>

            <div className="flex gap-2 items-center flex-wrap">
              {/* Búsqueda */}
              <div className="relative">
                <Search
                  size={16}
                  className={`absolute left-3 top-1/2 -translate-y-1/2 ${modoOscuro ? 'text-gray-400' : 'text-gray-500'}`}
                />
                <input
                  type="text"
                  placeholder="Buscar..."
                  value={busqueda}
                  onChange={(e) => setBusqueda(e.target.value)}
                  className={`pl-10 pr-10 py-2 rounded-lg text-sm border ${
                    modoOscuro
                      ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                      : 'bg-white border-gray-300 text-gray-900'
                  } focus:outline-none focus:ring-2 focus:ring-primary w-48 md:w-64`}
                />
                {busqueda && (
                  <button
                    onClick={() => setBusqueda('')}
                    className={`absolute right-2 top-1/2 -translate-y-1/2 ${modoOscuro ? 'text-gray-400 hover:text-gray-200' : 'text-gray-400 hover:text-gray-600'}`}
                  >
                    ✕
                  </button>
                )}
              </div>

              {/* Generar PDF */}
              <button
                onClick={generarPDF}
                disabled={generandoPDF}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-semibold transition ${
                  generandoPDF
                    ? 'bg-gray-400 cursor-not-allowed'
                    : modoOscuro
                      ? 'bg-purple-600 hover:bg-purple-700 text-white'
                      : 'bg-purple-500 hover:bg-purple-600 text-white'
                }`}
                title="Generar PDF"
              >
                <Download size={16} />
                {generandoPDF ? 'Generando...' : 'PDF'}
              </button>

              {/* Toggle modo oscuro */}
              <button
                onClick={() => setModoOscuro(!modoOscuro)}
                className={`px-3 py-2 rounded-lg text-sm font-semibold transition flex items-center gap-1 ${
                  modoOscuro
                    ? 'bg-yellow-500 text-gray-900 hover:bg-yellow-400'
                    : 'bg-gray-700 text-white hover:bg-gray-600'
                }`}
                title="Cambiar tema"
              >
                {modoOscuro ? <Sun size={16} /> : <Moon size={16} />}
              </button>

              <a
                href={`/documentacion/${archivo}`}
                download
                className={`flex items-center gap-2 px-3 py-2 border-2 rounded-lg transition text-sm ${
                  modoOscuro
                    ? 'border-primary text-primary hover:bg-primary hover:text-white'
                    : 'border-primary text-primary hover:bg-primary hover:text-white'
                }`}
              >
                <Download size={16} />
                MD
              </a>

              <Link
                to="/documentacion"
                className="px-3 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition text-sm flex items-center gap-1"
              >
                <BookOpen size={16} />
                Todos
              </Link>
            </div>
          </div>

          {/* Resultados de búsqueda */}
          {resultadosBusqueda.length > 0 && (
            <div className={`mt-3 p-3 ${modoOscuro ? 'bg-gray-700' : 'bg-blue-50'} rounded-lg`}>
              <p
                className={`text-sm font-semibold mb-2 ${modoOscuro ? 'text-gray-200' : 'text-gray-700'}`}
              >
                {resultadosBusqueda.length} resultado{resultadosBusqueda.length !== 1 ? 's' : ''}{' '}
                encontrado{resultadosBusqueda.length !== 1 ? 's' : ''}:
              </p>
              <div className="space-y-1 max-h-40 overflow-y-auto">
                {resultadosBusqueda.map((resultado, index) => (
                  <button
                    key={index}
                    onClick={() => scrollToSearchResult(resultado.wordPosition)}
                    className={`block w-full text-left text-xs ${modoOscuro ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'} hover:bg-primary/10 p-2 rounded transition`}
                  >
                    <span className="font-semibold">Línea {resultado.lineNumber}:</span>{' '}
                    {resultado.preview}...
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Historial de documentos */}
          {historialDocs.length > 1 && (
            <div className={`mt-3 p-3 ${modoOscuro ? 'bg-gray-700' : 'bg-gray-100'} rounded-lg`}>
              <p
                className={`text-xs font-semibold mb-2 ${modoOscuro ? 'text-gray-300' : 'text-gray-600'}`}
              >
                Vistos recientemente:
              </p>
              <div className="flex gap-2 flex-wrap">
                {historialDocs.slice(1, 4).map((doc, index) => (
                  <Link
                    key={index}
                    to={`/documentacion/${doc.archivo}`}
                    className={`text-xs px-2 py-1 rounded transition ${
                      modoOscuro
                        ? 'bg-gray-600 text-gray-200 hover:bg-gray-500'
                        : 'bg-white text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {doc.nombre}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex gap-8 max-w-7xl mx-auto">
          {/* Tabla de contenidos - Desktop */}
          {headings.length > 0 && (
            <aside className="hidden lg:block w-64 flex-shrink-0">
              <div
                className={`sticky top-28 ${modoOscuro ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-sm p-6 transition-colors duration-200`}
              >
                <h3
                  className={`font-semibold ${modoOscuro ? 'text-gray-100' : 'text-gray-900'} mb-4 flex items-center gap-2`}
                >
                  <BookOpen size={18} />
                  Contenido
                </h3>
                <nav className="space-y-2 max-h-[70vh] overflow-y-auto">
                  {headings.map((heading, index) => (
                    <button
                      key={index}
                      onClick={() => scrollToHeading(heading.id)}
                      className={`block w-full text-left text-sm hover:text-primary transition ${
                        heading.level === 1
                          ? `font-semibold ${modoOscuro ? 'text-gray-100' : 'text-gray-900'}`
                          : heading.level === 2
                            ? `pl-4 ${modoOscuro ? 'text-gray-300' : 'text-gray-700'}`
                            : `pl-8 ${modoOscuro ? 'text-gray-400' : 'text-gray-600'}`
                      }`}
                    >
                      {heading.text}
                    </button>
                  ))}
                </nav>
              </div>
            </aside>
          )}

          {/* Contenido principal */}
          <article
            ref={contentRef}
            className={`flex-1 ${modoOscuro ? 'bg-gray-800 text-gray-100' : 'bg-white'} rounded-lg shadow-sm p-8 lg:p-12 overflow-hidden transition-colors duration-200`}
          >
            <div
              className={`markdown-content prose prose-lg max-w-none ${modoOscuro ? 'dark' : ''}`}
            >
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeRaw, rehypeSanitize]}
                components={{
                  h1: ({ children, ...props }) => {
                    const id = children
                      .toString()
                      .toLowerCase()
                      .replace(/[^\w\s-]/g, '')
                      .replace(/\s+/g, '-')
                    return (
                      <HeadingWithShare level={1} id={id}>
                        {children}
                      </HeadingWithShare>
                    )
                  },
                  h2: ({ children, ...props }) => {
                    const id = children
                      .toString()
                      .toLowerCase()
                      .replace(/[^\w\s-]/g, '')
                      .replace(/\s+/g, '-')
                    return (
                      <HeadingWithShare level={2} id={id}>
                        {children}
                      </HeadingWithShare>
                    )
                  },
                  h3: ({ children, ...props }) => {
                    const id = children
                      .toString()
                      .toLowerCase()
                      .replace(/[^\w\s-]/g, '')
                      .replace(/\s+/g, '-')
                    return (
                      <HeadingWithShare level={3} id={id}>
                        {children}
                      </HeadingWithShare>
                    )
                  },
                  p: ({ children, ...props }) => (
                    <p className={modoOscuro ? 'text-gray-300' : 'text-gray-900'} {...props}>
                      {children}
                    </p>
                  ),
                  code: CodeBlock,
                  table: ({ children, ...props }) => (
                    <div className="overflow-x-auto my-6">
                      <table
                        className={`min-w-full divide-y ${modoOscuro ? 'divide-gray-700 border-gray-700' : 'divide-gray-200 border-gray-200'} border`}
                        {...props}
                      >
                        {children}
                      </table>
                    </div>
                  ),
                  th: ({ children, ...props }) => (
                    <th
                      className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${modoOscuro ? 'bg-gray-700 text-gray-300' : 'bg-gray-50 text-gray-700'}`}
                      {...props}
                    >
                      {children}
                    </th>
                  ),
                  td: ({ children, ...props }) => (
                    <td
                      className={`px-6 py-4 whitespace-nowrap text-sm border-t ${modoOscuro ? 'text-gray-300 border-gray-700' : 'text-gray-900 border-gray-200'}`}
                      {...props}
                    >
                      {children}
                    </td>
                  ),
                  a: ({ href, children, ...props }) => (
                    <a
                      href={href}
                      className="text-primary hover:text-primary-dark underline"
                      target={href?.startsWith('http') ? '_blank' : undefined}
                      rel={href?.startsWith('http') ? 'noopener noreferrer' : undefined}
                      {...props}
                    >
                      {children}
                    </a>
                  ),
                  blockquote: ({ children, ...props }) => (
                    <blockquote
                      className={`border-l-4 border-primary pl-4 py-2 my-4 italic ${modoOscuro ? 'bg-blue-900/20 text-gray-300' : 'bg-blue-50 text-gray-700'}`}
                      {...props}
                    >
                      {children}
                    </blockquote>
                  ),
                  ul: ({ children, ...props }) => (
                    <ul className={modoOscuro ? 'text-gray-300' : 'text-gray-900'} {...props}>
                      {children}
                    </ul>
                  ),
                  ol: ({ children, ...props }) => (
                    <ol className={modoOscuro ? 'text-gray-300' : 'text-gray-900'} {...props}>
                      {children}
                    </ol>
                  ),
                  li: ({ children, ...props }) => (
                    <li className={modoOscuro ? 'text-gray-300' : 'text-gray-900'} {...props}>
                      {children}
                    </li>
                  )
                }}
              >
                {contenido}
              </ReactMarkdown>
            </div>

            {/* Footer del documento */}
            <div
              className={`mt-12 pt-8 border-t ${modoOscuro ? 'border-gray-700' : 'border-gray-200'}`}
            >
              <div className="flex justify-between items-center flex-wrap gap-4">
                <button
                  onClick={() => navigate(-1)}
                  className={`${modoOscuro ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-primary'} transition flex items-center gap-2`}
                >
                  ← Volver atrás
                </button>
                <Link
                  to="/documentacion"
                  className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary-dark transition flex items-center gap-2"
                >
                  <BookOpen size={18} />
                  Ver más documentación
                </Link>
              </div>
            </div>
          </article>
        </div>
      </div>

      {/* CSS para resaltado de búsqueda */}
      <style>{`
        .highlight-search {
          background-color: ${modoOscuro ? 'rgba(59, 130, 246, 0.3)' : 'rgba(59, 130, 246, 0.2)'};
          transition: background-color 0.3s ease;
          padding: 0.25rem;
          border-radius: 0.25rem;
        }
      `}</style>
    </div>
  )
}

export default MarkdownViewer
