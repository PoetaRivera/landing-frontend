/**
 * Paso 6: Productos (Opcional)
 * Lista de productos que vende el salón
 */

import { useState, useEffect } from 'react'
import { ShoppingBag } from 'lucide-react'

const Paso6Productos = ({ formData, onUpdateData }) => {
  const [skipProductos, setSkipProductos] = useState(
    !formData.productos || formData.productos.length === 0
  )

  useEffect(() => {
    onUpdateData({ productos: skipProductos ? [] : formData.productos || [] })
  }, [skipProductos, formData.productos, onUpdateData])

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <ShoppingBag className="w-12 h-12 text-primary mx-auto mb-3" />
        <p className="text-gray-600">¿Vendes productos en tu salón?</p>
      </div>

      <div className="flex flex-col gap-4">
        <button
          onClick={() => setSkipProductos(true)}
          className={`p-6 rounded-lg border-2 transition-all ${
            skipProductos
              ? 'border-primary bg-primary text-white shadow-lg'
              : 'border-gray-200 hover:border-primary'
          }`}
        >
          <h3 className="font-bold text-lg mb-2">No, solo servicios</h3>
          <p className={`text-sm ${skipProductos ? 'text-gray-100' : 'text-gray-600'}`}>
            Me enfocaré únicamente en ofrecer servicios
          </p>
        </button>

        <button
          onClick={() => setSkipProductos(false)}
          className={`p-6 rounded-lg border-2 transition-all ${
            !skipProductos
              ? 'border-primary bg-primary text-white shadow-lg'
              : 'border-gray-200 hover:border-primary'
          }`}
        >
          <h3 className="font-bold text-lg mb-2">Sí, vendo productos</h3>
          <p className={`text-sm ${!skipProductos ? 'text-gray-100' : 'text-gray-600'}`}>
            Agregaré productos más adelante en el panel de administración
          </p>
        </button>
      </div>

      <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
        <p className="text-sm text-purple-800">
          <strong>💡 Nota:</strong> Podrás agregar productos y gestionar inventario desde el panel
          de administración.
        </p>
      </div>
    </div>
  )
}

export default Paso6Productos
