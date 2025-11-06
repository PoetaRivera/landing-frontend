import { Link } from 'react-router-dom'

function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Columna 1 - Marca */}
          <div>
            <h3 className="text-2xl font-bold mb-4">MiSalons</h3>
            <p className="text-gray-400">Sistema de gestión integral para salones de belleza</p>
          </div>

          {/* Columna 2 - Enlaces */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Navegación</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-400 hover:text-white transition">
                  Inicio
                </Link>
              </li>
              <li>
                <Link to="/planes" className="text-gray-400 hover:text-white transition">
                  Planes
                </Link>
              </li>
              <li>
                <Link to="/demo" className="text-gray-400 hover:text-white transition">
                  Demo
                </Link>
              </li>
            </ul>
          </div>

          {/* Columna 3 - Recursos */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Recursos</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/tutoriales" className="text-gray-400 hover:text-white transition">
                  Tutoriales
                </Link>
              </li>
              <li>
                <Link to="/documentacion" className="text-gray-400 hover:text-white transition">
                  Documentación
                </Link>
              </li>
            </ul>
          </div>

          {/* Columna 4 - Contacto */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contacto</h4>
            <p className="text-gray-400">Email: info@misalons.com</p>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; {currentYear} MiSalons. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
