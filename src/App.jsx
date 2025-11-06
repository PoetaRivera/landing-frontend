import { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import ErrorBoundary from './components/common/ErrorBoundary'
import Header from './components/layout/Header'
import Footer from './components/layout/Footer'

// Eager load Home page (landing page should load immediately)
import Home from './pages/Home'

// Lazy load other pages for better performance
const Planes = lazy(() => import('./pages/Planes'))
const Suscripcion = lazy(() => import('./pages/Suscripcion'))
const Tutoriales = lazy(() => import('./pages/Tutoriales'))
const Documentacion = lazy(() => import('./pages/Documentacion'))
const MarkdownViewer = lazy(() => import('./pages/MarkdownViewer'))
const Demo = lazy(() => import('./pages/Demo'))

/**
 * Loading fallback component
 */
function LoadingFallback() {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="text-center">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary mb-4"></div>
        <p className="text-gray-600">Cargando...</p>
      </div>
    </div>
  )
}

function App() {
  return (
    <ErrorBoundary showSupport={true}>
      <div className="flex flex-col min-h-screen">
        <Header />

        <main className="flex-grow">
          <ErrorBoundary>
            <Suspense fallback={<LoadingFallback />}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/planes" element={<Planes />} />
                <Route path="/suscripcion" element={<Suscripcion />} />
                <Route path="/tutoriales" element={<Tutoriales />} />
                <Route path="/documentacion" element={<Documentacion />} />
                <Route path="/documentacion/:archivo" element={<MarkdownViewer />} />
                <Route path="/demo" element={<Demo />} />
              </Routes>
            </Suspense>
          </ErrorBoundary>
        </main>

        <Footer />
      </div>
    </ErrorBoundary>
  )
}

export default App
