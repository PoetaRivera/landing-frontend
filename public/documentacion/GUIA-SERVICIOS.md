# 📦 GUÍA - SERVICIOS Y PRODUCTOS

**Versión:** 1.0.0
**Nivel:** Administrador
**Tiempo:** 15 minutos

---

## 📋 CONTENIDO

1. [Gestión de Servicios](#servicios)
2. [Gestión de Productos](#productos)
3. [Casos Prácticos](#casos-prácticos)

---

## SERVICIOS

### Ver Servicios

**Acceso:** Menú > Servicios

**Información mostrada:**
```
┌──────────────────────────────────┐
│ 💇 Corte de Cabello             │
│ Categoría: Cabello               │
│ Precio: $15.00                   │
│ Duración: 30 minutos             │
│ Estado: ✅ Activo                │
│ [Editar] [Desactivar]            │
└──────────────────────────────────┘
```

### Crear Servicio

1. Click "+ Nuevo Servicio"
2. Completar:

```
Nombre *: Corte de Cabello
Categoría: [Seleccionar ▼]
  • Cabello
  • Tinte
  • Tratamientos
  • Uñas
  • Maquillaje

Precio *: $15.00
Duración *: 30 minutos (1 slot)

Descripción:
┌─────────────────────────────────┐
│ Corte personalizado según       │
│ tu estilo                        │
└─────────────────────────────────┘

Imagen: [Subir foto] (opcional)
```

3. Guardar

### Editar Servicio

- Click en servicio > Editar
- Modifica lo necesario
- Guardar cambios

⚠️ **Cambios de precio NO afectan reservas pasadas**

### Desactivar Servicio

**¿Cuándo?**
- Ya no ofreces ese servicio
- Temporalmente no disponible

**Cómo:**
- Click en servicio > Desactivar
- NO aparecerá al crear reservas
- Historial se conserva

✅ **Mejor desactivar que eliminar**

---

## PRODUCTOS

### Ver Productos

**Acceso:** Menú > Productos

```
┌──────────────────────────────────┐
│ 🧴 Shampoo Anti-Frizz            │
│ Marca: L'Oréal                   │
│ Precio: $12.00                   │
│ Stock: 15 unidades               │
│ Estado: ✅ Activo                │
│ [Editar] [Ajustar Stock]         │
└──────────────────────────────────┘
```

### Crear Producto

1. Click "+ Nuevo Producto"
2. Completar:

```
Nombre *: Shampoo Anti-Frizz
Marca: L'Oréal
Categoría: [Seleccionar ▼]
  • Shampoo
  • Acondicionador
  • Tratamientos
  • Tintes
  • Herramientas

Precio de Venta *: $12.00
Precio de Costo: $6.00 (opcional)

Stock Actual *: 15
Stock Mínimo: 5 (alerta cuando baje)

Descripción:
┌─────────────────────────────────┐
│ Shampoo profesional anti-frizz  │
│ para cabello rebelde             │
└─────────────────────────────────┘

Imagen: [Subir foto]
```

3. Guardar

### Ajustar Stock

**Opción A: Ajuste Manual**
```
Stock actual: 15
Ajustar a: [10]
Motivo: Venta al cliente
```

**Opción B: Agregar Entrada**
```
Stock actual: 10
Agregar: [+20]
Stock nuevo: 30
Motivo: Compra a proveedor
```

### Alertas de Stock

Sistema alerta cuando:
```
⚠️ Stock Bajo
Shampoo Anti-Frizz
Quedan 4 unidades (mínimo: 5)
[Reabastecer]
```

---

## CASOS PRÁCTICOS

### Caso 1: Servicio Promocional

**Situación:** Promoción de tinte 30% OFF

**Solución:**
1. NO modifiques el servicio original
2. Crea servicio nuevo:
   - Nombre: "Tinte Completo - PROMO"
   - Precio: $31.50 (antes $45)
3. Al terminar promoción: Desactívalo

### Caso 2: Paquete de Servicios

**Situación:** "Cambio de Look" = Corte + Tinte + Peinado

**Solución:**
- Crea servicio combinado:
  - Nombre: "Paquete Cambio de Look"
  - Precio: $60 (vs $70 separado)
  - Duración: 3 horas

### Caso 3: Producto Agotado

**Situación:** Se acabó el producto

**Solución:**
1. Ajusta stock a 0
2. Sistema mostrará: "Agotado"
3. Desactiva si no reabastecerás pronto

### Caso 4: Actualizar Precios

**Situación:** Suben costos, necesitas aumentar precios

**Solución:**
1. Edita servicio/producto
2. Actualiza precio
3. Cambios aplican desde YA
4. Reservas pasadas mantienen precio anterior

---

## TIPS IMPORTANTES

✅ **Buenas Prácticas:**
- Usa fotos de alta calidad
- Descripciones claras y breves
- Actualiza stock semanalmente
- Revisa precios mensualmente

✅ **Organización:**
- Usa categorías consistentemente
- Nombra servicios claramente
- Agrupa productos por tipo

✅ **Stock:**
- Define stock mínimo realista
- Revisa alertas diariamente
- Haz inventario mensual

⚠️ **Evita:**
- Eliminar servicios (mejor desactivar)
- Precios con muchos decimales
- Descripciones muy largas

---

## ATAJOS

- `Ctrl + Shift + S` - Nuevo servicio
- `Ctrl + Shift + P` - Nuevo producto

---

**Última actualización:** 12 Nov 2025
[⬅️ Anterior](/documentacion/GUIA-CLIENTES.md) | [⬆️ Índice](/documentacion/README.md) | [➡️ Siguiente](/documentacion/GUIA-PERSONALIZACION.md)
