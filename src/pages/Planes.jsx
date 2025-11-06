import { PricingSection } from '../components/sections'
import SEO from '../components/common/SEO'

function Planes() {
  return (
    <>
      <SEO
        title="Planes y Precios"
        description="Descubre nuestros planes accesibles para salones de belleza. Plan Básico desde $15/mes con todas las funcionalidades esenciales. Sin contratos, cancela cuando quieras."
        keywords="planes misalons, precios salón belleza, software económico salones, suscripción salón"
        url="https://misalons.com/planes"
      />

      <div className="min-h-screen">
        <PricingSection
          title="Planes y Precios"
          subtitle="Elige el plan que mejor se adapte a tu salón"
        />
      </div>
    </>
  )
}

export default Planes
