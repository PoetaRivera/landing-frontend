import { Link } from 'react-router-dom'

function Header() {
  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="text-2xl font-bold text-primary">
            MiSalons
          </Link>

          <div className="hidden md:flex space-x-6">
            <Link to="/" className="text-gray-700 hover:text-primary transition">
              Inicio
            </Link>
            <Link to="/planes" className="text-gray-700 hover:text-primary transition">
              Planes
            </Link>
            <Link to="/tutoriales" className="text-gray-700 hover:text-primary transition">
              Tutoriales
            </Link>
            <Link to="/documentacion" className="text-gray-700 hover:text-primary transition">
              Documentación
            </Link>
            <Link to="/demo" className="text-gray-700 hover:text-primary transition">
              Demo
            </Link>
          </div>

          <Link
            to="/suscripcion"
            className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary-dark transition"
          >
            Suscríbete
          </Link>
        </div>
      </nav>
    </header>
  )
}

export default Header
