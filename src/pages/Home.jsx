import { HeroSection, FeaturesSection, CTASection } from '../components/sections'

function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <HeroSection
        title="Gestiona tu Salón de Belleza de Forma Profesional"
        subtitle="Sistema completo de reservas, gestión de clientes, inventario y más. Todo lo que necesitas en una sola plataforma."
        primaryButtonText="Comenzar Ahora"
        primaryButtonTo="/suscripcion"
        secondaryButtonText="Ver Demo"
        secondaryButtonTo="/demo"
      />

      {/* Features Section */}
      <FeaturesSection
        title="¿Por qué elegir MiSalons?"
      />

      {/* CTA Section */}
      <CTASection
        title="¿Listo para transformar tu salón?"
        subtitle="Únete a cientos de salones que ya confían en MiSalons"
        buttonText="Ver Planes y Precios"
        buttonTo="/planes"
        bgColor="bg-secondary"
      />
    </div>
  )
}

export default Home
