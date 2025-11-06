import { Routes, Route } from 'react-router-dom'
import Header from './components/layout/Header'
import Footer from './components/layout/Footer'
import Home from './pages/Home'
import Planes from './pages/Planes'
import Suscripcion from './pages/Suscripcion'
import Tutoriales from './pages/Tutoriales'
import Documentacion from './pages/Documentacion'
import MarkdownViewer from './pages/MarkdownViewer'
import Demo from './pages/Demo'

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/planes" element={<Planes />} />
          <Route path="/suscripcion" element={<Suscripcion />} />
          <Route path="/tutoriales" element={<Tutoriales />} />
          <Route path="/documentacion" element={<Documentacion />} />
          <Route path="/documentacion/:archivo" element={<MarkdownViewer />} />
          <Route path="/demo" element={<Demo />} />
        </Routes>
      </main>

      <Footer />
    </div>
  )
}

export default App
