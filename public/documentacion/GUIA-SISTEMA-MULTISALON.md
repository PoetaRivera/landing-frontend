# 🏢 GUÍA DEL SISTEMA MULTI-SALÓN

**Versión:** 1.0.0
**Última actualización:** 12 de Noviembre de 2025
**Nivel:** Super Admin
**Tiempo de lectura:** 20 minutos

---

## 📋 TABLA DE CONTENIDOS

1. [Introducción](#introducción)
2. [¿Qué es el Sistema Multi-Salón?](#qué-es-el-sistema-multi-salón)
3. [Jerarquía de Usuarios](#jerarquía-de-usuarios)
4. [Dashboard de Administración](#dashboard-de-administración)
5. [Gestión de Salones](#gestión-de-salones)
6. [Gestión de Paletas de Colores](#gestión-de-paletas-de-colores)
7. [Configuración de Dominios](#configuración-de-dominios)
8. [Configuración de UI](#configuración-de-ui)
9. [Casos de Uso Prácticos](#casos-de-uso-prácticos)
10. [Solución de Problemas](#solución-de-problemas)
11. [Best Practices](#best-practices)

---

## 1. INTRODUCCIÓN

El **Sistema Multi-Salón** es la arquitectura central de MultiSalon que permite administrar múltiples salones de belleza desde una única plataforma. Esta guía está diseñada para Super Administradores que necesitan crear, configurar y gestionar salones en el sistema.

### ¿Para quién es esta guía?

Esta funcionalidad es EXCLUSIVA para:
- ✅ **Super Administradores** (acceso a panel `/admin`)
- ❌ **Admin Salón** NO tiene acceso a este panel
- ❌ **Empleados y Clientes** NO tienen acceso

### ⚠️ Importante: Diferencia con Admin Salón

```
Super Admin (tú):
✅ Administras TODO el sistema
✅ Creas y eliminas salones
✅ Configuras paletas globales
✅ Acceso a /admin

Admin Salón:
❌ NO administra el sistema
✅ Administra SU salón específico
✅ Gestiona usuarios, servicios, productos de SU salón
❌ NO tiene acceso a /admin
```

---

## 2. ¿QUÉ ES EL SISTEMA MULTI-SALÓN?

### Concepto Principal

MultiSalon es una **plataforma SaaS multi-tenant** donde cada salón opera de forma independiente pero comparte la misma infraestructura técnica.

### Arquitectura del Sistema

```
┌─────────────────────────────────────┐
│  PLATAFORMA MULTISALON (SaaS)      │
│  (Base de datos compartida)         │
└─────────────────────────────────────┘
           │
           ├─── Salón 1: "Bella Imagen"
           │    ├─ Dominio: bellaimagen.com
           │    ├─ Paleta: "Elegante Verde"
           │    ├─ 8 empleados
           │    └─ 350 clientes
           │
           ├─── Salón 2: "Glamour Studio"
           │    ├─ Dominio: glamourstudio.com
           │    ├─ Paleta: "Rosa Moderno"
           │    ├─ 5 empleados
           │    └─ 200 clientes
           │
           └─── Salón 3: "Urban Hair"
                ├─ Dominio: urbanhair.com
                ├─ Paleta: "Minimalista Gris"
                ├─ 12 empleados
                └─ 580 clientes
```

### Características del Multi-Tenant

#### ✅ **Aislamiento de Datos**
Cada salón tiene sus propios:
- 👥 Usuarios (clientes, empleados, admin)
- 💇 Servicios
- 🛍️ Productos
- 📅 Reservas
- 💰 Ventas
- 📊 Estadísticas

**Ejemplo:**
```
Un cliente registrado en "Bella Imagen" NO puede:
- Ver servicios de "Glamour Studio"
- Reservar en "Urban Hair"
- Acceder a usuarios de otros salones

Cada salón es un mundo independiente
```

#### ✅ **Branding Independiente**
Cada salón puede personalizar:
- 🎨 Colores (paleta)
- 🖼️ Logo
- 📸 Imágenes de carrusel
- ⚙️ Configuración de UI
- 🌐 Dominio propio

#### ✅ **Infraestructura Compartida**
Todos los salones comparten:
- 💾 Base de datos (Firebase)
- 🖥️ Servidores
- 🔐 Sistema de autenticación
- 📡 APIs
- 🛠️ Código base

**Beneficio:** Reduce costos de infraestructura y mantenimiento

---

## 3. JERARQUÍA DE USUARIOS

### Niveles de Acceso

#### 🔴 **Super Admin** (Nivel más alto)

**Acceso:**
- ✅ Panel de administración `/admin`
- ✅ Crear/editar/eliminar salones
- ✅ Crear/editar/eliminar paletas
- ✅ Ver estadísticas globales
- ✅ Acceso TOTAL a todos los salones

**Responsabilidades:**
- Gestión técnica del sistema
- Creación de nuevos salones
- Soporte de nivel 3
- Mantenimiento de la plataforma

**Ejemplo:**
```
Usuario: superadmin@multisalon.com
Puede:
- Crear nuevo salón "Estilo Total"
- Modificar configuración de cualquier salón
- Eliminar salón si cierra operaciones
- Crear paletas globales
```

#### 🟠 **Admin Salón** (Nivel medio)

**Acceso:**
- ✅ Panel del salón específico
- ✅ Gestionar usuarios de SU salón
- ✅ Crear/editar servicios y productos
- ✅ Ver reservas y estadísticas de SU salón
- ✅ Configurar horarios y empleados
- ❌ NO puede crear otros salones
- ❌ NO puede acceder a `/admin`

**Responsabilidades:**
- Operación diaria del salón
- Gestión de equipo (empleados)
- Atención a clientes
- Estrategias de marketing locales

**Ejemplo:**
```
Usuario: admin@bellaimagen.com
Puede:
- Agregar nuevo empleado a Bella Imagen
- Crear servicio "Keratina Premium"
- Ver estadísticas de su salón
NO puede:
- Ver datos de "Glamour Studio"
- Crear un nuevo salón
- Modificar paletas globales
```

#### 🟢 **Empleado** (Nivel bajo)

**Acceso:**
- ✅ Gestionar sus propias citas
- ✅ Ver clientes asignados
- ✅ Registrar servicios realizados
- ❌ NO puede ver datos administrativos
- ❌ NO puede gestionar otros empleados

#### 🔵 **Cliente** (Nivel más bajo)

**Acceso:**
- ✅ Hacer reservas
- ✅ Ver sus propios datos
- ✅ Ver servicios y productos del salón
- ❌ NO puede acceder a panel administrativo

---

## 4. DASHBOARD DE ADMINISTRACIÓN

### 4.1 Acceso al Dashboard

**Ruta:** `/admin`

**Requisitos:**
- Rol: Super Admin
- Autenticación: Token válido

**Primera pantalla:**
```
╔════════════════════════════════════════╗
║   Administración General               ║
║   Panel de control del sistema         ║
║   multi-salón                          ║
╠════════════════════════════════════════╣
║                                        ║
║  [Total: 15]  [Activos: 12]           ║
║  [Inactivos: 2]  [Mantenimiento: 1]   ║
║                                        ║
╠════════════════════════════════════════╣
║  🏢 Gestionar Salones                  ║
║  🎨 Gestionar Paletas                  ║
║  📊 Estadísticas del Sistema           ║
╚════════════════════════════════════════╝
```

### 4.2 Estadísticas Principales

#### Métricas en Cards

**📊 Total de Salones:**
- Cantidad total de salones en el sistema
- Incluye activos, inactivos y en mantenimiento
- Ejemplo: 15 salones totales

**✅ Salones Activos:**
- Salones en operación normal
- Clientes pueden reservar
- Servicios disponibles
- Ejemplo: 12 activos (80%)

**❌ Salones Inactivos:**
- Temporalmente cerrados
- No aceptan reservas
- Mantienen datos pero no operan
- Ejemplo: 2 inactivos (13%)

**🔧 En Mantenimiento:**
- En proceso de configuración
- Actualizaciones o cambios
- Próximos a activarse
- Ejemplo: 1 en mantenimiento (7%)

### 4.3 Estadísticas de Features

El dashboard muestra cuántos salones tienen activadas cada funcionalidad:

**📅 Booking Online:**
```
12 salones
= Permiten reservas online desde la web
```

**💅 Generador de Diseños:**
```
8 salones
= Tienen acceso al generador IA de diseños de uñas
```

**🛍️ Venta de Productos:**
```
10 salones
= Venden productos en la plataforma
```

**Interpretación:**
```
Si un feature tiene baja adopción:
- Evaluar si es útil
- Promoverlo con los salones
- Considerar eliminar si nadie lo usa
```

### 4.4 Acciones Rápidas

Desde el dashboard puedes:

**🏢 Ir a Gestionar Salones:**
- Ver lista completa
- Crear nuevo salón
- Editar configuraciones

**🎨 Ir a Gestionar Paletas:**
- Ver paletas disponibles
- Crear nueva paleta
- Editar colores existentes

---

## 5. GESTIÓN DE SALONES

### 5.1 Lista de Salones

**Ruta:** `/admin/salones`

#### Información Mostrada

Tabla con columnas:

| ID | Nombre | Estado | Dominios | Acciones |
|----|--------|--------|----------|----------|
| salon_001 | Bella Imagen | ✅ Activo | bellaimagen.com | ✏️ 🗑️ |
| salon_002 | Glamour Studio | ✅ Activo | glamour.com, www.glamour.com | ✏️ 🗑️ |
| salon_003 | Urban Hair | ❌ Inactivo | urbanhair.com | ✏️ 🗑️ |

#### Estados Posibles

**✅ Activo:**
- Salón en operación normal
- Chip verde
- Clientes pueden acceder

**❌ Inactivo:**
- Salón temporalmente cerrado
- Chip rojo
- Acceso bloqueado para clientes

**🔧 Mantenimiento:**
- En configuración o actualización
- Chip naranja
- Acceso limitado

**⚙️ Configuración:**
- Salón recién creado
- Chip gris
- Pendiente de configuración inicial

### 5.2 Crear Nuevo Salón

**Ruta:** `/admin/salones/nuevo`

#### Paso a Paso Completo

**Paso 1: Click en "➕ Crear Salón"**

**Paso 2: Formulario - Información Básica**

```
Campo: Nombre Comercial *
Valor: "Estilo Total"
Descripción: Nombre visible del salón
```

```
Campo: Estado del Salón *
Opciones:
- ✅ Activo
- ❌ Inactivo
- 🔧 Mantenimiento
- ⚙️ Configuración (recomendado para nuevos)
```

```
Campo: Dominios
Valor: "estilototal.com, www.estilototal.com"
Descripción: Separados por coma
```

**Paso 3: Configuración de Interfaz (UI)**

**Cantidades Máximas:**

```
Máx. Estilistas en Inicio: 6
= Cuántos estilistas mostrar en página principal
Rango: 1-20
```

```
Máx. Productos en Inicio: 6
= Cuántos productos destacar en inicio
Rango: 1-50
```

```
Máx. Servicios en Inicio: 6
= Cuántos servicios mostrar en inicio
Rango: 1-50
```

```
Máx. Estilistas en Reservas: 6
= Cuántos estilistas mostrar en página de reservas
Rango: 1-20
```

**Visibilidad de Secciones:**

```
☑️ Mostrar Carrusel de Imágenes
= Slider con fotos en página principal
```

```
☑️ Mostrar Sección de Estilistas
= Grid con equipo de trabajo
```

```
☑️ Mostrar Sección de Productos
= Catálogo de productos a la venta
```

```
☑️ Mostrar Sección de Servicios
= Lista de servicios ofrecidos
```

```
☑️ Mostrar Footer (Pie de Página)
= Información de contacto, redes sociales, etc.
```

**Paso 4: Guardar**

```
Click en "Crear"
→ Sistema crea el salón
→ Genera ID automático (ej: salon_016)
→ Registra en Firebase:
  - salones_map/{dominio} → salon_016
  - salones/salon_016 → datos completos
```

**Paso 5: Resultado**

```
✅ "Salón creado exitosamente"
→ Redirige a /admin/salones
→ Nuevo salón aparece en la lista
```

### 5.3 Editar Salón Existente

**Ruta:** `/admin/salones/editar/{salonId}`

**Proceso:**

```
1. Ir a /admin/salones
2. Localizar el salón a editar
3. Click en "✏️ Editar"
4. Modificar campos deseados
5. Click en "Actualizar"
```

**Campos editables:**
- ✅ Nombre comercial
- ✅ Estado (activar/desactivar)
- ✅ Dominios (agregar/quitar)
- ✅ Toda la configuración de UI
- ❌ ID del salón (NO se puede cambiar)

**Ejemplo de caso de uso:**

```
CASO: Desactivar salón temporalmente por vacaciones

1. Ir a editar "Bella Imagen"
2. Cambiar estado a: ❌ Inactivo
3. Guardar
4. RESULTADO:
   - Clientes no pueden acceder a bellaimagen.com
   - Se muestra mensaje "Salón temporalmente cerrado"
   - Datos se mantienen intactos
   - Admin del salón puede seguir accediendo
```

### 5.4 Eliminar Salón

**⚠️ ADVERTENCIA: Esta acción NO se puede deshacer**

#### ¿Qué se Elimina?

```
✅ Registro del salón en salones_map
✅ Documento en salones/{salonId}
✅ Toda la configuración del salón

❌ NO se eliminan:
- Usuarios (se quedan huérfanos)
- Productos
- Servicios
- Reservas
```

#### Proceso de Eliminación

**Paso 1: Click en "🗑️ Eliminar"**

**Paso 2: Dialog de Confirmación**

```
╔════════════════════════════════════════╗
║   ⚠️ Confirmar Eliminación            ║
╠════════════════════════════════════════╣
║ ¿Estás seguro de que deseas eliminar  ║
║ el salón "Bella Imagen" (salon_001)?  ║
║                                        ║
║ ⚠️ Esta acción NO se puede deshacer   ║
║                                        ║
║ Se eliminarán:                         ║
║ • El salón de Firestore                ║
║ • Toda la configuración                ║
║                                        ║
║ NO se eliminan usuarios, productos...  ║
╠════════════════════════════════════════╣
║  [Cancelar]  [Sí, Eliminar]           ║
╚════════════════════════════════════════╝
```

**Paso 3: Confirmar**

```
Click en "Sí, Eliminar"
→ Sistema elimina registros
→ ✅ "Salón eliminado correctamente"
→ Lista se actualiza automáticamente
```

#### ¿Cuándo Eliminar un Salón?

**✅ Casos válidos:**
- Salón cerró definitivamente sus operaciones
- Salón fue creado por error (prueba)
- Migración a nueva cuenta

**❌ NO eliminar si:**
- Solo está cerrado temporalmente → usar estado "Inactivo"
- Tiene deudas pendientes → resolver primero
- Hay disputas legales → consultar legal

---

## 6. GESTIÓN DE PALETAS DE COLORES

### 6.1 ¿Qué son las Paletas?

Las paletas son **conjuntos de colores predefinidos** que los salones pueden elegir para personalizar su branding.

**Estructura de una paleta:**

```javascript
{
  id: "paleta_001",
  nombre: "Elegante Verde",
  colors: {
    primary: "#81c784",      // Color principal
    secondary: "#c8e6c9",    // Color secundario
    accent: "#b8860b",       // Color de acento
    background: "#f5f5f5",   // Fondo
    text: "#212121",         // Texto principal
    textSecondary: "#757575" // Texto secundario
  }
}
```

**Aplicación en el sistema:**

```
Botones primarios → primary
Headers, títulos → primary
Botones secundarios → secondary
Highlights, badges → accent
Fondos de página → background
Textos normales → text
Textos auxiliares → textSecondary
```

### 6.2 Lista de Paletas

**Ruta:** `/admin/paletas`

#### Información Mostrada

Tabla con columnas:

| ID | Nombre | Colores (Preview) | Acciones |
|----|--------|-------------------|----------|
| paleta_001 | Elegante Verde | 🟢 🟩 🟡 | ✏️ 🗑️ |
| paleta_002 | Rosa Moderno | 🩷 🌸 🔴 | ✏️ 🗑️ |
| paleta_003 | Minimalista Gris | ⬜ ⬛ 🔵 | ✏️ 🗑️ |

**Preview de colores:**
- Cuadros pequeños (30x30px) con los 3 colores principales
- Primary, Secondary, Accent
- Hover muestra código hexadecimal

### 6.3 Crear Nueva Paleta

**Ruta:** `/admin/paletas/nueva`

#### Formulario de Creación

**Campo: Nombre de la Paleta**
```
Ejemplo: "Tropical Vibrante"
Descripción: Nombre descriptivo para elegir
```

**Campo: Color Primario**
```
Input: Color picker
Ejemplo: #FF6B6B (Rojo coral)
Uso: Botones principales, headers
```

**Campo: Color Secundario**
```
Input: Color picker
Ejemplo: #FFE66D (Amarillo claro)
Uso: Botones secundarios, highlights suaves
```

**Campo: Color de Acento**
```
Input: Color picker
Ejemplo: #4ECDC4 (Turquesa)
Uso: Call-to-actions, badges, alertas
```

**Campos Adicionales (opcional):**
```
Background: #FFFFFF
Text: #2C2C2C
Text Secondary: #6C6C6C
Success: #4CAF50
Error: #F44336
Warning: #FF9800
Info: #2196F3
```

**Botón: Guardar**
```
→ Valida colores (formato hexadecimal)
→ Crea documento en Firebase
→ ✅ "Paleta creada exitosamente"
→ Disponible para asignar a salones
```

#### Ejemplo Paso a Paso

```
CASO: Crear paleta para salón de estilo tropical

Paso 1: Ir a /admin/paletas
Paso 2: Click en "➕ Crear Paleta"
Paso 3: Llenar formulario:
  - Nombre: "Tropical Vibrante"
  - Primary: #FF6B6B (rojo coral)
  - Secondary: #FFE66D (amarillo suave)
  - Accent: #4ECDC4 (turquesa)
Paso 4: Click en "Crear"
Paso 5: ✅ Paleta lista para usar
Paso 6: Ir a editar salón "Paradise Spa"
Paso 7: Seleccionar paleta "Tropical Vibrante"
Paso 8: Guardar
Paso 9: Paradise Spa ahora usa esos colores
```

### 6.4 Editar Paleta Existente

**Ruta:** `/admin/paletas/editar/{paletaId}`

**Proceso:**
```
1. Ir a /admin/paletas
2. Localizar paleta
3. Click en "✏️ Editar"
4. Modificar colores con color picker
5. Click en "Actualizar"
```

**⚠️ Importante:**
```
Al editar una paleta, TODOS los salones que la usan
verán los nuevos colores automáticamente.

Ejemplo:
- 5 salones usan "Elegante Verde"
- Cambias primary de #81c784 a #4CAF50
- Los 5 salones ahora tienen el nuevo verde
```

### 6.5 Eliminar Paleta

**Proceso con Validación:**

**Caso 1: Paleta NO está en uso**
```
1. Click en "🗑️ Eliminar"
2. Dialog: "¿Estás seguro?"
3. Click en "Sí, Eliminar"
4. ✅ Paleta eliminada
```

**Caso 2: Paleta está en uso**
```
1. Click en "🗑️ Eliminar"
2. Dialog muestra:
   ⚠️ Esta paleta está siendo usada por 3 salón(es):
   • Bella Imagen (salon_001)
   • Glamour Studio (salon_002)
   • Urban Hair (salon_003)

   Puedes forzar la eliminación, pero los salones
   perderán su paleta asignada.

3. Opciones:
   - [Cancelar]
   - [Forzar Eliminación]

4. Si fuerzas:
   - Paleta se elimina
   - Salones quedan sin paleta (usan colores por defecto)
   - Debes asignarles una nueva paleta manualmente
```

**Recomendación:**
```
Antes de eliminar paleta en uso:
1. Ver qué salones la usan
2. Asignarles una nueva paleta
3. Confirmar que se ven bien con la nueva
4. ENTONCES eliminar la vieja paleta
```

---

## 7. CONFIGURACIÓN DE DOMINIOS

### 7.1 ¿Cómo Funcionan los Dominios?

MultiSalon usa el dominio para identificar qué salón debe cargar.

**Flujo técnico:**

```
1. Cliente visita: bellaimagen.com
2. Sistema consulta: salones_map/bellaimagen.com
3. Obtiene: salon_001
4. Carga datos de: salones/salon_001
5. Renderiza interfaz con:
   - Nombre: "Bella Imagen"
   - Paleta: "Elegante Verde"
   - Servicios del salon_001
   - Empleados del salon_001
```

### 7.2 Agregar Dominio a Salón

**Proceso en el Sistema:**

```
1. Ir a /admin/salones/editar/salon_001
2. Campo "Dominios": bellaimagen.com
3. Agregar más dominios:
   - www.bellaimagen.com
   - bellaimagen.mx (si tienen otro dominio)
4. Separar por coma
5. Guardar
```

**Sistema automáticamente crea:**
```
salones_map/bellaimagen.com → salon_001
salones_map/www.bellaimagen.com → salon_001
salones_map/bellaimagen.mx → salon_001
```

**Resultado:**
```
Todos estos dominios cargan el mismo salón:
- http://bellaimagen.com
- http://www.bellaimagen.com
- http://bellaimagen.mx
```

### 7.3 Configuración DNS Externa

**⚠️ Importante:** El dominio debe apuntar al servidor de MultiSalon

**Pasos (fuera de la plataforma):**

```
1. Ir al proveedor de dominio (ej: GoDaddy, Namecheap)
2. Configurar DNS:

   Tipo: A Record
   Host: @
   Valor: [IP del servidor MultiSalon]
   TTL: 3600

   Tipo: CNAME
   Host: www
   Valor: [dominio principal MultiSalon]
   TTL: 3600

3. Guardar cambios
4. Esperar propagación (1-48 horas)
5. Verificar con: nslookup bellaimagen.com
```

**Verificación:**
```
Si el dominio ya apunta correctamente:
1. Navegar a bellaimagen.com
2. Debe cargar la plataforma MultiSalon
3. Debe mostrar datos de "Bella Imagen"
4. ✅ Configuración correcta
```

---

## 8. CONFIGURACIÓN DE UI

### 8.1 Cantidades Máximas

Estas configuraciones controlan cuántos elementos se muestran en cada sección.

#### Max Estilistas en Inicio

**Qué controla:** Grid de estilistas en página principal

**Valor típico:** 6

**Casos de uso:**
```
Salón pequeño (3 estilistas): Configurar 3
→ Muestra los 3, no queda vacío

Salón grande (15 estilistas): Configurar 8
→ Muestra solo los primeros 8
→ Botón "Ver todos" para ver los 15
```

#### Max Productos en Inicio

**Qué controla:** Cantidad de productos destacados

**Valor típico:** 6

**Recomendación:**
```
Pocos productos (<5): Configurar cantidad real
Muchos productos (>20): Configurar 6-8
→ Evita página demasiado larga
```

#### Max Servicios en Inicio

**Qué controla:** Servicios mostrados en home

**Valor típico:** 6

**Estrategia:**
```
Mostrar solo servicios MÁS populares:
1. Corte de cabello
2. Manicure
3. Pedicure
4. Tinte
5. Brushing
6. Depilación

Los demás se ven en página dedicada /servicios
```

#### Max Estilistas en Reservas

**Qué controla:** Cuántos estilistas se pueden seleccionar al reservar

**Valor típico:** 6

**Consideración:**
```
Si tienes 10 estilistas pero solo 3 hacen cierto servicio:
→ Configurar 10 (mostrar todos)
→ El sistema filtra automáticamente por disponibilidad
```

### 8.2 Visibilidad de Secciones

Estas opciones permiten activar/desactivar secciones completas.

#### ☑️ Mostrar Carrusel

**ON:** Hero slider con imágenes en la parte superior
**OFF:** Página comienza directo con contenido

**Caso de uso OFF:**
```
Salón minimalista que prefiere diseño limpio
→ Desactivar carrusel
→ Página más rápida de cargar
→ Enfoque directo en servicios
```

#### ☑️ Mostrar Estilistas

**ON:** Sección "Nuestro Equipo" visible
**OFF:** No se muestra el equipo

**Caso de uso OFF:**
```
Salón pequeño con solo el dueño trabajando
→ No tiene sentido mostrar "equipo" de 1 persona
→ Desactivar sección
```

#### ☑️ Mostrar Productos

**ON:** Sección de productos a la venta
**OFF:** No se muestra catálogo

**Caso de uso OFF:**
```
Salón que NO vende productos
→ Solo ofrece servicios
→ Desactivar para no confundir clientes
```

#### ☑️ Mostrar Servicios

**ON:** Lista de servicios ofrecidos
**OFF:** No se muestran servicios en home

**Caso de uso OFF:**
```
Raramente desactivado
Solo si el salón tiene página personalizada de servicios
```

#### ☑️ Mostrar Footer

**ON:** Pie de página con info de contacto, redes, etc.
**OFF:** Sin footer

**Caso de uso OFF:**
```
Casi nunca desactivado
Footer es importante para SEO y contacto
```

---

## 9. CASOS DE USO PRÁCTICOS

### Caso 1: Agregar Nuevo Salón al Sistema

**Situación:** Un nuevo cliente "Paradise Spa" quiere unirse a MultiSalon

**Información recibida:**
- Nombre: Paradise Spa
- Dominio: paradisespa.com
- 5 estilistas
- 25 servicios
- Estilo: Tropical, colores vivos

**Proceso completo:**

```
PASO 1: Crear la paleta de colores
1. Ir a /admin/paletas
2. Click en "➕ Crear Paleta"
3. Nombre: "Paradise Tropical"
4. Colores:
   - Primary: #FF6B6B (coral)
   - Secondary: #FFE66D (amarillo)
   - Accent: #4ECDC4 (turquesa)
5. Guardar
✅ Paleta creada

PASO 2: Crear el salón
1. Ir a /admin/salones
2. Click en "➕ Crear Salón"
3. Formulario:
   - Nombre: "Paradise Spa"
   - Estado: ⚙️ Configuración (hasta que terminen setup)
   - Dominios: paradisespa.com, www.paradisespa.com
   - Max Estilistas Inicio: 5 (todos)
   - Max Servicios Inicio: 6 (destacados)
   - Todas las secciones activadas ✅
4. Guardar
✅ Salón creado (salon_016)

PASO 3: Configurar DNS (cliente hace esto)
1. Dar instrucciones al cliente:
   "En su proveedor de dominio, configure:
    Tipo A: @ → [IP servidor MultiSalon]
    Tipo CNAME: www → multisalon.com"
2. Esperar 24-48h propagación

PASO 4: Crear usuario Admin del salón
1. Cliente registra su cuenta en paradisespa.com/registro
2. Tú (Super Admin) cambias su rol a "admin_salon"
   - En Firebase: users/{uid}/rol = "admin_salon"
3. Notificar al cliente que ya puede administrar

PASO 5: Capacitación inicial
1. Enviar manual de usuario al admin del salón
2. Guía rápida:
   - Cómo agregar servicios
   - Cómo agregar empleados
   - Cómo configurar horarios
3. Sesión de onboarding (opcional)

PASO 6: Activación
1. Una vez configurado todo:
   - Ir a /admin/salones/editar/salon_016
   - Cambiar estado a: ✅ Activo
   - Guardar
2. ✅ Paradise Spa YA ESTÁ EN VIVO

RESULTADO:
- Clientes pueden visitar paradisespa.com
- Ven interfaz con colores tropicales
- Pueden reservar servicios
- Admin puede gestionar todo desde su panel
```

---

### Caso 2: Migrar Salón a Nueva Paleta

**Situación:** "Bella Imagen" quiere cambiar su branding

**Paleta actual:** "Elegante Verde" (#81c784)
**Nueva paleta deseada:** Tonos morados elegantes

**Proceso:**

```
PASO 1: Crear nueva paleta
1. /admin/paletas → Crear Paleta
2. Nombre: "Morado Elegante"
3. Colores:
   - Primary: #9C27B0 (morado)
   - Secondary: #E1BEE7 (lila claro)
   - Accent: #FFD700 (dorado)
4. Guardar

PASO 2: Previsualizar (opcional)
1. En entorno de prueba/staging:
   - Asignar temporalmente la nueva paleta
   - Revisar que todo se vea bien
   - Verificar contraste de textos
   - Comprobar accesibilidad

PASO 3: Aplicar en producción
1. Ir a /admin/salones/editar/salon_001
2. Campo "Paleta": Cambiar a "Morado Elegante"
3. Guardar

RESULTADO:
- bellaimagen.com ahora usa colores morados
- Cambio instantáneo
- Usuarios ven nuevo branding inmediatamente
- ✅ Rebranding completo

PASO 4: Limpiar paleta vieja (opcional)
Si "Elegante Verde" ya no se usa:
1. Verificar que ningún otro salón la use
2. /admin/paletas → Eliminar "Elegante Verde"
```

---

### Caso 3: Desactivar Salón Temporalmente

**Situación:** "Glamour Studio" cierra 2 semanas por remodelación

**Proceso:**

```
PASO 1: Cambiar estado
1. /admin/salones/editar/salon_002
2. Estado: Cambiar a ❌ Inactivo
3. Guardar

RESULTADO INMEDIATO:
- glamourstudio.com muestra: "Temporalmente cerrado"
- Clientes NO pueden reservar
- Empleados y admin SÍ pueden acceder
- Datos permanecen intactos

PASO 2: Comunicación (fuera del sistema)
- Avisar en redes sociales
- Email a clientes con reservas existentes
- Cartel en puerta física

PASO 3: Reactivar después de remodelación
1. /admin/salones/editar/salon_002
2. Estado: Cambiar a ✅ Activo
3. Guardar
4. ✅ Salón operando nuevamente
```

---

### Caso 4: Eliminar Salón que Cerró Definitivamente

**Situación:** "Urban Hair" cerró operaciones permanentemente

**Proceso completo:**

```
PASO 1: Comunicación con el cliente
- Confirmar cierre definitivo
- Solicitar backup de datos (si lo necesitan)
- Aclarar que eliminación es permanente

PASO 2: Backup preventivo (opcional pero recomendado)
1. Exportar todas las reservas del salón
2. Exportar lista de usuarios
3. Guardar en archivo seguro
4. Mantener por 6-12 meses

PASO 3: Desactivar primero
1. /admin/salones/editar/salon_003
2. Estado: ❌ Inactivo
3. Guardar
4. Esperar 1 semana (período de gracia)

PASO 4: Eliminar definitivamente
1. /admin/salones
2. Localizar "Urban Hair"
3. Click en 🗑️ Eliminar
4. Leer advertencias del dialog
5. Click en "Sí, Eliminar"

⚠️ QUÉ SE ELIMINA:
- Registro del salón
- Configuración
- Mapeo de dominios

❌ QUÉ NO SE ELIMINA (se queda huérfano):
- Usuarios registrados en ese salón
- Reservas históricas
- Productos y servicios

PASO 5: Limpieza manual (opcional)
Si quieres limpiar TODO:
1. En Firebase, eliminar manualmente:
   - users donde salonId = salon_003
   - reservas donde salonId = salon_003
   - servicios donde salonId = salon_003
   - productos donde salonId = salon_003

ADVERTENCIA: Solo hacer si estás SEGURO
```

---

### Caso 5: Configurar Salón con Restricción de Empleados

**Situación:** "Bella Imagen" tiene políticas de privacidad estrictas

**Requisito:** Empleados solo deben ver sus propias citas, no las de otros

**Proceso:**

```
PASO 1: Activar restricción en configuración del salón
1. Ir a configuración avanzada (Firebase)
2. salones/salon_001/configuracion
3. Agregar campo:
   restriccionPorEmpleado: true
4. Guardar

RESULTADO:
- Admin sigue viendo TODO
- Empleado "Ana" solo ve citas donde ella es la estilista
- Empleado "Carlos" solo ve sus propias citas
- Protección de privacidad entre empleados

PASO 2: Comunicar a empleados
"A partir de ahora, por políticas de privacidad,
solo podrás ver tus propias citas. Si necesitas
información de citas de otros estilistas, consulta
con el administrador."

ALTERNATIVA: Desactivar restricción
Si el salón prefiere colaboración abierta:
restriccionPorEmpleado: false
→ Todos ven todas las citas (facilita coordinación)
```

---

## 10. SOLUCIÓN DE PROBLEMAS

### ❌ "No puedo acceder a /admin"

**Causa:** No tienes rol de Super Admin

**Solución:**
```
1. Verificar tu rol en Firebase:
   - users/{tu_uid}/rol
   - Debe ser: "super_admin"
2. Si no lo tienes:
   - Solo otro Super Admin puede otorgártelo
   - O modificar directamente en Firebase (con acceso)
3. Si acabas de cambiar el rol:
   - Cerrar sesión
   - Iniciar sesión nuevamente
   - Forzar actualización del token
```

---

### ❌ "El dominio no carga el salón correcto"

**Causa:** Mapeo incorrecto o DNS no propagado

**Diagnóstico:**
```
1. Verificar mapeo en Firebase:
   - salones_map/{dominio}
   - ¿Existe el registro?
   - ¿Apunta al salón correcto?

2. Verificar DNS:
   - Abrir terminal
   - Comando: nslookup dominio.com
   - ¿Apunta a la IP correcta de MultiSalon?

3. Verificar propagación:
   - Usar: https://dnschecker.org
   - Ingresar: dominio.com
   - Ver si propagó en todos los servidores
```

**Solución según causa:**
```
Si mapeo está mal:
1. /admin/salones/editar/{salonId}
2. Corregir dominios
3. Guardar (actualiza salones_map automáticamente)

Si DNS no apunta:
1. Ir al proveedor de dominio
2. Configurar A Record correctamente
3. Esperar propagación (1-48 horas)

Si propagación está pendiente:
- Esperar (paciencia)
- Mientras tanto, usar IP directa para pruebas
```

---

### ❌ "Eliminé una paleta y los salones quedaron sin colores"

**Causa:** Eliminaste paleta en uso sin reasignar

**Solución:**
```
1. Identificar salones afectados:
   - Sistema muestra colores por defecto (grises)
   - Listar los que se ven mal

2. Asignar nueva paleta:
   Para cada salón afectado:
   - /admin/salones/editar/{salonId}
   - Seleccionar paleta disponible
   - Guardar

3. Verificar:
   - Visitar el sitio del salón
   - Confirmar que colores se ven bien

4. Prevención futura:
   - Antes de eliminar paleta, verificar uso
   - Sistema muestra advertencia con lista de salones
   - Reasignar ANTES de eliminar
```

---

### ⚠️ "Un salón reporta lentitud extrema"

**Causa posible:** Configuraciones muy altas

**Diagnóstico:**
```
Revisar configuración UI del salón:
- maxEstilistasInicio: ¿>20?
- maxProductosInicio: ¿>50?
- maxServiciosInicio: ¿>50?

Si los valores son muy altos:
→ Página carga muchos elementos
→ Base de datos hace muchas consultas
→ Lentitud
```

**Solución:**
```
1. /admin/salones/editar/{salonId}
2. Reducir configuraciones:
   - maxEstilistasInicio: 6-8 (máximo 12)
   - maxProductosInicio: 6-12 (máximo 20)
   - maxServiciosInicio: 6-12 (máximo 20)
3. Guardar
4. Verificar mejora de velocidad

Recomendación general:
- Menos elementos = página más rápida
- Usar botones "Ver todos" para acceso completo
- No cargar todo en la página principal
```

---

### 🔧 "Necesito cambiar el ID de un salón"

**Causa:** El ID es generado automáticamente y usado en toda la base de datos

**Solución:**
```
⚠️ NO es posible cambiar el ID directamente

ALTERNATIVA: Migrar datos a nuevo salón
1. Crear nuevo salón con la configuración deseada
2. Exportar datos del salón viejo:
   - Usuarios
   - Servicios
   - Productos
   - Reservas
3. Importar manualmente al nuevo salón
4. Actualizar usuarios para que apunten al nuevo salonId
5. Desactivar/eliminar salón viejo
6. Actualizar dominios para que apunten al nuevo

⚠️ ADVERTENCIA: Proceso complejo y riesgoso
Recomendación: Solo hacerlo si es absolutamente necesario
Mejor: Mantener el ID original
```

---

## 11. BEST PRACTICES

### 📝 Nomenclatura de Salones

**✅ Buenos nombres:**
```
"Bella Imagen"
"Glamour Studio"
"Urban Hair Salon"
"Paradise Spa & Beauty"
```

**❌ Evitar:**
```
"salon1" (poco descriptivo)
"Mi Negocio" (muy genérico)
"Test" (confuso en producción)
"BELLA IMAGEN" (todo mayúsculas)
```

**Recomendaciones:**
- Usar Título Case (Primera Letra Mayúscula)
- Máximo 30 caracteres
- Sin caracteres especiales complejos
- Coincidente con el nombre comercial real

---

### 🎨 Gestión de Paletas

#### Crear Paletas Estratégicamente

**✅ Paletas por estilo:**
```
- "Elegante Clásico" (neutros, dorados)
- "Moderno Minimalista" (grises, blancos, negro)
- "Tropical Vibrante" (colores vivos)
- "Romántico Femenino" (rosas, lilas)
- "Profesional Corporativo" (azules, grises)
```

**Beneficio:** Salones nuevos tienen opciones ya listas

#### Evitar Paletas Demasiado Similares

**❌ Mal:**
```
"Verde Elegante" (#81c784)
"Verde Clásico" (#85c788)
"Verde Moderno" (#7dc67d)
```
= 3 paletas casi idénticas, confuso

**✅ Bien:**
```
"Verde Elegante" (#81c784)
"Azul Profesional" (#2196F3)
"Rosa Moderno" (#E91E63)
```
= 3 paletas claramente diferenciadas

#### Mantener Accesibilidad

**Contraste de texto:**
```
Si primary es oscuro (#2C2C2C):
→ Texto sobre primary debe ser blanco (#FFFFFF)

Si primary es claro (#FFE66D):
→ Texto sobre primary debe ser oscuro (#212121)
```

**Herramienta recomendada:**
```
WebAIM Contrast Checker
https://webaim.org/resources/contrastchecker/

Ratio mínimo recomendado: 4.5:1
```

---

### 🔐 Seguridad y Permisos

#### Nunca Compartir Acceso Super Admin

**❌ Mal:**
```
Dar credenciales de Super Admin a:
- Cliente del salón
- Empleado del salón
- Desarrollador externo temporal
```

**✅ Bien:**
```
- Clientes: Crear cuenta Admin Salón
- Empleados: Crear cuenta Empleado
- Desarrolladores: Acceso temporal limitado o cuenta de prueba
```

#### Revisión Periódica de Salones

**Rutina mensual:**
```
1. Revisar lista de salones
2. Identificar inactivos por >3 meses
3. Contactar para saber si siguen operando
4. Si cerraron: Desactivar o eliminar
5. Mantener sistema limpio
```

---

### 📊 Monitoreo y Análisis

#### Dashboard de Super Admin

**Métricas a revisar semanalmente:**
```
- Total de salones activos
- Salones nuevos este mes
- Salones que se dieron de baja
- Distribución de features activados
- Salones con problemas reportados
```

#### Análisis de Adopción de Features

**Ejemplo:**
```
Feature: Generador de Diseños de Uñas
- Total salones: 15
- Con feature activado: 8 (53%)
- Sin feature: 7 (47%)

ACCIÓN:
- Promover feature con los 7 que no lo usan
- Hacer demo o tutorial
- Ofrecer capacitación
```

---

### 🚀 Escalabilidad

#### Planificación de Crecimiento

**Sistema actual:** 15 salones

**Proyección a 1 año:** 50 salones

**Preparación:**
```
1. Infraestructura:
   - Verificar capacidad de servidor
   - Optimizar consultas a base de datos
   - Considerar CDN para assets estáticos

2. Paletas:
   - Crear al menos 10 paletas variadas
   - Cubrir diferentes estilos y nichos

3. Documentación:
   - Mantener manuales actualizados
   - Videos tutoriales de onboarding
   - FAQ actualizado

4. Soporte:
   - Definir SLA (tiempo de respuesta)
   - Sistema de tickets (Zendesk, Freshdesk)
   - Chat de soporte en vivo
```

---

## 📚 RESUMEN Y PRÓXIMOS PASOS

### ✅ Lo que aprendiste:

- ✅ Arquitectura del sistema multi-salón
- ✅ Diferencias entre Super Admin y Admin Salón
- ✅ Cómo crear y configurar nuevos salones
- ✅ Gestión completa de paletas de colores
- ✅ Configuración de dominios y DNS
- ✅ Personalización de interfaz (UI)
- ✅ Casos de uso reales y complejos
- ✅ Solución de problemas comunes
- ✅ Best practices de administración

### 🎯 Checklist de Dominio:

**Básico:**
- [ ] Accedí al dashboard de Super Admin
- [ ] Revisé la lista de salones existentes
- [ ] Revisé las paletas disponibles
- [ ] Entiendo la diferencia entre Super Admin y Admin Salón

**Intermedio:**
- [ ] Creé mi primer salón de prueba
- [ ] Creé una paleta personalizada
- [ ] Asigné una paleta a un salón
- [ ] Edité configuración de UI de un salón
- [ ] Configuré dominios correctamente

**Avanzado:**
- [ ] Completé proceso de onboarding de salón real
- [ ] Migré un salón de una paleta a otra
- [ ] Desactivé y reactivé un salón
- [ ] Eliminé un salón que cerró operaciones
- [ ] Resolví problema de dominio no cargando

---

## 🆘 ¿NECESITAS AYUDA?

- 📖 [FAQ](/documentacion/FAQ.md)
- 🔧 [Troubleshooting](/documentacion/TROUBLESHOOTING.md)
- 📧 [Contacto y Soporte](/documentacion/CONTACTO.md)

---

**Última actualización:** 12 de Noviembre de 2025
**Versión del documento:** 1.0.0
**Autor:** Equipo MultiSalon

[⬅️ Volver al Índice](/documentacion/) | [➡️ Siguiente: Consultas Avanzadas](/documentacion/GUIA-CONSULTAS-AVANZADAS.md)
