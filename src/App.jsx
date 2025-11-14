import { lazy, Suspense } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import ErrorBoundary from './components/common/ErrorBoundary'
import Header from './components/layout/Header'
import Footer from './components/layout/Footer'
import usePageTracking from './hooks/usePageTracking'
import { ClienteAuthProvider } from './context/ClienteAuthContext'
import { AdminAuthProvider } from './context/AdminAuthContext'
import PrivateRoute from './components/PrivateRoute'
import AdminPrivateRoute from './components/AdminPrivateRoute'

// Eager load Home page (landing page should load immediately)
import Home from './pages/Home'
import NotFound from './pages/NotFound'

// Lazy load other pages for better performance
const Planes = lazy(() => import('./pages/Planes'))
const Suscripcion = lazy(() => import('./pages/Suscripcion'))
const SubscriptionSuccess = lazy(() => import('./pages/suscripcion/SubscriptionSuccess'))
const SubscriptionCancel = lazy(() => import('./pages/suscripcion/SubscriptionCancel'))
const Tutoriales = lazy(() => import('./pages/Tutoriales'))
const Documentacion = lazy(() => import('./pages/Documentacion'))
const MarkdownViewer = lazy(() => import('./pages/MarkdownViewer'))
const Demo = lazy(() => import('./pages/Demo'))

// Lazy load pages del portal de clientes
const ClienteLogin = lazy(() => import('./pages/cliente/ClienteLogin'))
const ClienteDashboard = lazy(() => import('./pages/cliente/ClienteDashboard'))
const ForgotPassword = lazy(() => import('./pages/cliente/ForgotPassword'))
const ResetPassword = lazy(() => import('./pages/cliente/ResetPassword'))

// Lazy load pages del panel de administración
const AdminLogin = lazy(() => import('./pages/admin/AdminLogin'))
const AdminDashboard = lazy(() => import('./pages/admin/AdminDashboard'))
const AdminClientes = lazy(() => import('./pages/admin/AdminClientes'))
const AdminSolicitudes = lazy(() => import('./pages/admin/AdminSolicitudes'))

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
  // Tracking automático de páginas con Google Analytics
  usePageTracking()
  const location = useLocation()

  // Rutas del portal de clientes (sin header/footer)
  const isClientePortal = location.pathname.startsWith('/cliente')

  // Rutas del panel de admin (sin header/footer)
  const isAdminPortal = location.pathname.startsWith('/admin')

  return (
    <ErrorBoundary showSupport={true}>
      <AdminAuthProvider>
        <ClienteAuthProvider>
          {isAdminPortal ? (
            // Panel de Administración (sin header/footer)
            <ErrorBoundary>
              <Suspense fallback={<LoadingFallback />}>
                <Routes>
                  <Route path="/admin/login" element={<AdminLogin />} />
                  <Route
                    path="/admin/dashboard"
                    element={
                      <AdminPrivateRoute>
                        <AdminDashboard />
                      </AdminPrivateRoute>
                    }
                  />
                  <Route
                    path="/admin/clientes"
                    element={
                      <AdminPrivateRoute>
                        <AdminClientes />
                      </AdminPrivateRoute>
                    }
                  />
                  <Route
                    path="/admin/solicitudes"
                    element={
                      <AdminPrivateRoute>
                        <AdminSolicitudes />
                      </AdminPrivateRoute>
                    }
                  />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </Suspense>
            </ErrorBoundary>
          ) : isClientePortal ? (
            // Portal de Clientes (sin header/footer)
            <ErrorBoundary>
              <Suspense fallback={<LoadingFallback />}>
                <Routes>
                  <Route path="/cliente/login" element={<ClienteLogin />} />
                  <Route path="/cliente/forgot-password" element={<ForgotPassword />} />
                  <Route path="/cliente/reset-password" element={<ResetPassword />} />
                  <Route
                    path="/cliente/dashboard"
                    element={
                      <PrivateRoute>
                        <ClienteDashboard />
                      </PrivateRoute>
                    }
                  />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </Suspense>
            </ErrorBoundary>
          ) : (
            // Landing Page (con header/footer)
            <div className="flex flex-col min-h-screen">
              <Header />

              <main className="flex-grow">
                <ErrorBoundary>
                  <Suspense fallback={<LoadingFallback />}>
                    <Routes>
                      <Route path="/" element={<Home />} />
                      <Route path="/planes" element={<Planes />} />
                      <Route path="/suscripcion" element={<Suscripcion />} />
                      <Route path="/suscripcion/success" element={<SubscriptionSuccess />} />
                      <Route path="/suscripcion/cancel" element={<SubscriptionCancel />} />
                      <Route path="/tutoriales" element={<Tutoriales />} />
                      <Route path="/documentacion" element={<Documentacion />} />
                      <Route path="/documentacion/:archivo" element={<MarkdownViewer />} />
                      <Route path="/demo" element={<Demo />} />
                      <Route path="*" element={<NotFound />} />
                    </Routes>
                  </Suspense>
                </ErrorBoundary>
              </main>

              <Footer />
            </div>
          )}
        </ClienteAuthProvider>
      </AdminAuthProvider>
    </ErrorBoundary>
  )
}

export default App
