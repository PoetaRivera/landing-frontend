# 📖 MANUAL DE USUARIO GENERAL - MULTISALON

**Versión:** 1.0.0
**Última actualización:** 12 de Noviembre de 2025
**Nivel:** Básico
**Tiempo de lectura:** 20 minutos

---

## 📋 TABLA DE CONTENIDOS

1. [Introducción](#introducción)
2. [¿Qué es MultiSalon?](#qué-es-multisalon)
3. [Requisitos del Sistema](#requisitos-del-sistema)
4. [Acceso al Sistema](#acceso-al-sistema)
5. [Interfaz y Navegación](#interfaz-y-navegación)
6. [Roles y Permisos](#roles-y-permisos)
7. [Conceptos Básicos](#conceptos-básicos)
8. [Primeros Pasos](#primeros-pasos)
9. [Preguntas Frecuentes](#preguntas-frecuentes)

---

## 1. INTRODUCCIÓN

Bienvenido a **MultiSalon**, tu sistema completo de gestión para tu salón de belleza. Este manual te guiará a través de las funcionalidades básicas del sistema y te ayudará a comenzar a usarlo de manera efectiva.

### ¿Para quién es este manual?

Este manual es ideal para:
- ✅ **Nuevos usuarios** que nunca han usado el sistema
- ✅ **Empleados** que necesitan aprender las funciones básicas
- ✅ **Administradores** que quieren entender el sistema completo

### ¿Qué aprenderás?

Al completar este manual sabrás:
- Cómo acceder y navegar por el sistema
- Qué puede hacer cada tipo de usuario
- Conceptos básicos fundamentales
- Cómo realizar tareas comunes

---

## 2. ¿QUÉ ES MULTISALON?

**MultiSalon** es un sistema web completo diseñado específicamente para la gestión de tu salón de belleza. Permite administrar todos los aspectos de tu negocio desde un solo lugar.

### Funcionalidades Principales

#### 📅 **Sistema de Reservas**
- Gestión de citas y calendario
- Asignación de estilistas
- Control de horarios
- Pre-reservas de clientes

#### 👥 **Gestión de Clientes**
- Base de datos completa
- Historial de servicios
- Información de contacto
- Búsqueda avanzada

#### 💇 **Gestión de Estilistas**
- Perfiles de equipo
- Horarios y disponibilidad
- Especialidades
- Asignación de servicios

#### 📦 **Servicios y Productos**
- Catálogo completo
- Precios y descripciones
- Control de inventario
- Categorías personalizadas

#### 🎨 **Personalización**
- 16 paletas de colores
- Logo personalizado
- Carousel de imágenes
- Textos personalizados

#### ⚙️ **Administración**
- Gestión de usuarios
- Roles y permisos
- Configuración general
- Reportes y estadísticas

---

## 3. REQUISITOS DEL SISTEMA

### 🌐 Navegadores Compatibles

MultiSalon funciona en cualquier navegador moderno:

✅ **Recomendados:**
- Google Chrome (versión 90 o superior)
- Microsoft Edge (versión 90 o superior)
- Firefox (versión 88 o superior)
- Safari (versión 14 o superior)

⚠️ **No compatible con:**
- Internet Explorer (ninguna versión)
- Navegadores muy antiguos

### 💻 Dispositivos

El sistema es **completamente responsive** y funciona en:

- 🖥️ **Computadoras de escritorio**
- 💻 **Laptops**
- 📱 **Tablets** (iPad, Android tablets)
- 📱 **Smartphones** (funcionalidad limitada)

💡 **Recomendación:** Para mejor experiencia, usa computadora o tablet.

### 🌍 Conexión a Internet

- ✅ Requiere conexión a internet activa
- ✅ Mínimo recomendado: 5 Mbps
- ✅ El sistema guarda automáticamente

⚠️ **Nota:** Sin internet, no podrás acceder al sistema.

---

## 4. ACCESO AL SISTEMA

### 4.1 URL de Acceso

Tu salón tiene una URL única personalizada basada en subdominios:

```
https://[nombre-de-tu-salon].multisalon.com
```

**Ejemplo:**
```
https://bella-estetica.multisalon.com
```

**Si tu salón tiene dominio propio:**
```
https://www.tusalonbella.com
```
_(El sistema detectará automáticamente tu salón desde el dominio)_

💡 **Tip:** Guarda esta URL en tus marcadores/favoritos para acceso rápido.

### 4.2 Pantalla de Login

Al acceder, verás la pantalla de inicio de sesión:

<!-- ![Pantalla de Login](../recursos/imagenes/login-screen.png) -->

**Campos requeridos:**
1. **Email** - Tu correo electrónico registrado
2. **Contraseña** - Tu contraseña personal

### 4.3 Primer Inicio de Sesión

**Cuando accedas por primera vez:**

1. Usa las credenciales que te proporcionó tu administrador
2. El sistema te pedirá cambiar tu contraseña
3. Ingresa una contraseña segura:
   - Mínimo 8 caracteres
   - Al menos 1 letra mayúscula
   - Al menos 1 número
   - Al menos 1 carácter especial (@, #, $, etc.)

```
✅ Buena contraseña: Salon2025!
❌ Mala contraseña: 123456
```

4. Guarda tu nueva contraseña en un lugar seguro

### 4.4 ¿Olvidaste tu Contraseña?

1. En la pantalla de login, click en "¿Olvidaste tu contraseña?"
2. Ingresa tu email registrado
3. Recibirás un correo con instrucciones
4. Sigue el enlace en el email
5. Crea una nueva contraseña

⏰ **El enlace expira en 1 hora**

---

## 5. INTERFAZ Y NAVEGACIÓN

### 5.1 Estructura General

Cuando inicies sesión, verás esta estructura:

```
┌─────────────────────────────────────────────────┐
│  HEADER (Navegación superior)                   │
├──────────┬──────────────────────────────────────┤
│          │                                       │
│  SIDEBAR │     ÁREA PRINCIPAL                   │
│  (Menú)  │     (Contenido)                      │
│          │                                       │
│          │                                       │
└──────────┴──────────────────────────────────────┘
```

### 5.2 Header (Barra Superior)

En la parte superior encontrarás:

- **Logo del Salón** - Click para ir al inicio
- **Nombre del Salón** - Identificación
- **Usuario Actual** - Tu nombre y rol
- **Menú de Usuario** - Configuración y logout

### 5.3 Sidebar (Menú Lateral)

El menú lateral contiene todas las secciones principales:

#### Para Todos los Usuarios:
- 🏠 **Inicio** - Dashboard principal
- 📅 **Reservas** - Gestión de citas
- 👥 **Clientes** - Base de datos
- 💇 **Estilistas** - Equipo del salón

#### Solo para Administradores:
- 📦 **Servicios** - Catálogo de servicios
- 🛍️ **Productos** - Inventario
- 🎨 **Personalización** - Apariencia
- ⚙️ **Configuración** - Ajustes generales
- 👤 **Usuarios** - Gestión de accesos

### 5.4 Área Principal

Aquí se muestra el contenido de la sección seleccionada.

**Elementos comunes:**
- **Título de sección** - Nombre de donde estás
- **Breadcrumbs** - Ruta de navegación
- **Acciones principales** - Botones de acción
- **Contenido** - Información y formularios

### 5.5 Navegación Breadcrumbs

Los breadcrumbs te muestran dónde estás:

```
Inicio > Reservas > Nueva Reserva
```

💡 **Tip:** Click en cualquier parte del breadcrumb para volver atrás.

### 5.6 Atajos de Teclado

Acelera tu trabajo con estos atajos:

- `Ctrl + H` - Ir al inicio
- `Ctrl + N` - Nueva reserva (en sección Reservas)
- `Ctrl + K` - Búsqueda rápida
- `Ctrl + S` - Guardar formulario activo
- `Esc` - Cerrar modal/cancelar

📝 **Nota:** En Mac usa `Cmd` en lugar de `Ctrl`

---

## 6. ROLES Y PERMISOS

MultiSalon tiene un sistema de roles que define qué puede hacer cada usuario.

### 6.1 Tipos de Roles

#### 👤 **Cliente**
**Acceso:** Muy limitado
**Puede:**
- ✅ Ver servicios y productos
- ✅ Hacer pre-reservas
- ✅ Ver información del salón

**No puede:**
- ❌ Acceder al sistema administrativo
- ❌ Ver otros clientes
- ❌ Modificar nada

#### 👨‍💼 **Empleado**
**Acceso:** Medio
**Puede:**
- ✅ Ver y crear reservas
- ✅ Gestionar clientes
- ✅ Ver servicios y productos
- ✅ Ver estilistas

**No puede:**
- ❌ Eliminar reservas
- ❌ Modificar servicios/productos
- ❌ Acceder a configuración
- ❌ Gestionar usuarios

#### 👑 **Admin Salón** (Administrador)
**Acceso:** Completo
**Puede:**
- ✅ TODO lo que puede Empleado +
- ✅ Crear/editar/eliminar servicios
- ✅ Crear/editar/eliminar productos
- ✅ Gestionar estilistas
- ✅ Personalizar apariencia
- ✅ Configurar el salón
- ✅ Gestionar usuarios y permisos
- ✅ **ELIMINAR** cualquier cosa

⚠️ **Precaución:** Los administradores tienen control total.

### 6.2 ¿Cómo Saber tu Rol?

Tu rol se muestra en:

1. **Header superior** - Junto a tu nombre
2. **Menú de usuario** - En tu perfil
3. **Dashboard** - En la tarjeta de información

---

## 7. CONCEPTOS BÁSICOS

Antes de usar el sistema, es importante entender estos conceptos:

### 7.1 Reserva vs Pre-Reserva

**Reserva:**
- ✅ Cita confirmada en el calendario
- ✅ Tiene fecha, hora y estilista asignado
- ✅ Aparece en el calendario
- ✅ Solo Admin o Empleado puede crear

**Pre-Reserva:**
- 📝 Solicitud de cita por parte del cliente
- 📝 AÚN NO está confirmada
- 📝 Requiere aprobación
- 📝 Los clientes pueden crearlas desde la web pública

### 7.2 Activo vs Inactivo

Muchos elementos pueden estar "activos" o "inactivos":

**Activo:**
- ✅ Visible en el sistema
- ✅ Disponible para usar
- ✅ Aparece en listas y búsquedas

**Inactivo:**
- ❌ Oculto del sistema
- ❌ No se puede usar
- ❌ Solo Admin puede ver

💡 **Tip:** No elimines, mejor desactiva. Preserva el historial.

### 7.3 Soft Delete

MultiSalon usa "eliminación suave" (soft delete):

- Cuando "eliminas" algo, realmente solo se desactiva
- Los datos NO se borran permanentemente
- El historial se preserva
- Solo Admin puede ver elementos eliminados
- Se pueden restaurar si es necesario

### 7.4 Horarios y Slots

**Slot:**
- Espacio de tiempo en el calendario
- Duración: 30 minutos por defecto
- Horario: 5:00 AM - 10:00 PM
- Cada estilista tiene sus propios slots

**Ejemplo:**
```
8:00 AM - 8:30 AM → Slot 1
8:30 AM - 9:00 AM → Slot 2
9:00 AM - 9:30 AM → Slot 3
```

Un servicio de 1 hora ocupa 2 slots consecutivos.

---

## 8. PRIMEROS PASOS

### Paso 1: Familiarízate con la Interfaz

1. Inicia sesión
2. Explora el menú lateral
3. Visita cada sección principal
4. No tengas miedo de hacer click (no vas a romper nada)

### Paso 2: Actualiza tu Perfil

1. Click en tu nombre (header superior)
2. Selecciona "Mi Perfil"
3. Completa/verifica tu información:
   - Nombre completo
   - Email
   - Teléfono
   - Foto (opcional)
4. Click en "Guardar"

### Paso 3: Conoce el Dashboard

El Dashboard es tu página de inicio:

**Verás:**
- Resumen de actividad
- Reservas del día
- Estadísticas básicas
- Accesos rápidos

### Paso 4: Aprende las Funciones Básicas

Según tu rol, aprende:

**Si eres Empleado:**
1. Cómo crear una reserva → [Guía de Reservas](/documentacion/GUIA-RESERVAS.md)
2. Cómo buscar un cliente → [Guía de Clientes](/documentacion/GUIA-CLIENTES.md)
3. Cómo ver el calendario del día

**Si eres Administrador:**
1. Todo lo anterior +
2. Cómo crear un servicio → [Guía de Servicios](/documentacion/GUIA-SERVICIOS.md)
3. Cómo personalizar colores → [Guía de Personalización](/documentacion/GUIA-PERSONALIZACION.md)
4. Cómo gestionar usuarios → [Guía de Administración](/documentacion/GUIA-ADMINISTRACION.md)

### Paso 5: Practica

La mejor forma de aprender es practicando:

1. Crea datos de prueba
2. Experimenta con las funciones
3. No te preocupes por equivocarte
4. Usa "Cancelar" si no estás seguro

💡 **Tip:** Todo se puede deshacer o corregir.

---

## 9. PREGUNTAS FRECUENTES

### ¿Puedo acceder desde mi celular?

✅ Sí, el sistema es responsive y funciona en celulares, pero la experiencia es mejor en computadora o tablet.

### ¿Se guarda automáticamente?

⚠️ No completamente. Debes hacer click en "Guardar" en los formularios. Pero las reservas se guardan automáticamente al crearlas.

### ¿Puedo usar el sistema sin internet?

❌ No, requieres conexión a internet activa.

### ¿Mis datos están seguros?

✅ Sí, todos los datos están encriptados y almacenados en servidores seguros (Firebase/Google Cloud).

### ¿Cuántos usuarios pueden estar conectados a la vez?

✅ Ilimitados. Todos los empleados pueden usar el sistema simultáneamente.

### ¿Puedo deshacer una acción?

⚠️ Depende de la acción:
- **Reservas**: Sí, se pueden editar o eliminar
- **Editar datos**: Sí, solo guarda de nuevo
- **Eliminar**: Depende (algunas cosas usan soft delete)

### ¿Qué hago si encuentro un error?

1. Toma una captura de pantalla
2. Anota qué estabas haciendo
3. Contacta a soporte
4. Intenta recargar la página (F5)

### ¿Puedo cambiar mi email?

⚠️ Solo un administrador puede cambiar emails. Contacta a tu admin.

### ¿El sistema hace respaldos automáticos?

✅ Sí, Firebase hace respaldos automáticos diarios. Tus datos están seguros.

### ¿Puedo exportar mis datos?

✅ Sí (solo Admin). Hay opciones de exportación en varios formatos (Excel, PDF).

---

## 📚 SIGUIENTES PASOS

Ahora que conoces lo básico, continúa con:

1. **[Guía de Reservas](/documentacion/GUIA-RESERVAS.md)** - Tu función principal
2. **[Guía de Clientes](/documentacion/GUIA-CLIENTES.md)** - Gestión de clientes
3. **[FAQ](/documentacion/FAQ.md)** - Preguntas frecuentes

---

## 🆘 ¿NECESITAS AYUDA?

- 📖 [FAQ Completo](/documentacion/FAQ.md)
- 🔧 [Solución de Problemas](/documentacion/TROUBLESHOOTING.md)
- 📧 [Contactar Soporte](/documentacion/CONTACTO.md)

---

## ✅ CHECKLIST DE INICIO

Marca lo que ya completaste:

- [ ] Leí el manual completo
- [ ] Pude iniciar sesión sin problemas
- [ ] Actualicé mi perfil
- [ ] Exploré el menú lateral
- [ ] Entiendo mi rol y permisos
- [ ] Conozco los conceptos básicos
- [ ] Visité el Dashboard
- [ ] Sé dónde buscar ayuda

**¿Completaste todo?** ¡Felicidades! Estás listo para usar MultiSalon. 🎉

---

**Última actualización:** 12 de Noviembre de 2025
**Versión del documento:** 1.0.0
**Autor:** Equipo MultiSalon

[⬅️ Volver al Índice](/documentacion/README.md) | [➡️ Siguiente: Guía de Reservas](/documentacion/GUIA-RESERVAS.md)
