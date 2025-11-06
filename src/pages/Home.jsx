import { Link } from 'react-router-dom'

function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-primary-light text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6 animate-fadeIn">
            Gestiona tu Salón de Belleza de Forma Profesional
          </h1>
          <p className="text-xl mb-8 max-w-2xl mx-auto animate-slideUp">
            Sistema completo de reservas, gestión de clientes, inventario y más.
            Todo lo que necesitas en una sola plataforma.
          </p>
          <div className="flex gap-4 justify-center">
            <Link
              to="/suscripcion"
              className="bg-white text-primary px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
            >
              Comenzar Ahora
            </Link>
            <Link
              to="/demo"
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-primary transition"
            >
              Ver Demo
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">
            ¿Por qué elegir MiSalons?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <div className="text-primary text-4xl mb-4">📅</div>
              <h3 className="text-2xl font-semibold mb-3">Sistema de Reservas</h3>
              <p className="text-gray-600">
                Gestiona citas de forma eficiente con nuestro calendario inteligente
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <div className="text-primary text-4xl mb-4">👥</div>
              <h3 className="text-2xl font-semibold mb-3">Gestión de Clientes</h3>
              <p className="text-gray-600">
                Base de datos completa con historial de servicios y preferencias
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <div className="text-primary text-4xl mb-4">📦</div>
              <h3 className="text-2xl font-semibold mb-3">Control de Inventario</h3>
              <p className="text-gray-600">
                Mantén el control de productos y servicios en tiempo real
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-secondary text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            ¿Listo para transformar tu salón?
          </h2>
          <p className="text-xl mb-8">
            Únete a cientos de salones que ya confían en MiSalons
          </p>
          <Link
            to="/planes"
            className="bg-white text-secondary px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition inline-block"
          >
            Ver Planes y Precios
          </Link>
        </div>
      </section>
    </div>
  )
}

export default Home
