# 🔍 GUÍA DE CONSULTAS AVANZADAS

**Versión:** 1.0.0
**Última actualización:** 12 de Noviembre de 2025
**Nivel:** Admin
**Tiempo de lectura:** 22 minutos

---

## 📋 TABLA DE CONTENIDOS

1. [Introducción](#introducción)
2. [¿Qué son las Consultas Avanzadas?](#qué-son-las-consultas-avanzadas)
3. [Acceso y Requisitos](#acceso-y-requisitos)
4. [Consultas de Usuarios](#consultas-de-usuarios)
5. [Consultas de Reservas](#consultas-de-reservas)
6. [Estadísticas de Reservas](#estadísticas-de-reservas)
7. [Agenda de Reservas](#agenda-de-reservas)
8. [Exportación de Datos](#exportación-de-datos)
9. [Casos de Uso Prácticos](#casos-de-uso-prácticos)
10. [Solución de Problemas](#solución-de-problemas)
11. [Tips y Mejores Prácticas](#tips-y-mejores-prácticas)

---

## 1. INTRODUCCIÓN

El **Sistema de Consultas Avanzadas** de MultiSalon te permite analizar, filtrar y visualizar datos críticos de tu negocio. Esta herramienta centraliza toda la información de usuarios, reservas, estadísticas y agenda en un solo lugar, facilitando la toma de decisiones basada en datos.

### ¿Para quién es esta guía?

Esta funcionalidad es exclusiva para:
- ✅ **Administradores del salón** (rol: admin_salon)
- ⚠️ **Empleados** tienen acceso limitado según configuración de restricciones

### Beneficios Principales

- 📊 **Análisis profundo** de comportamiento de clientes
- 🔎 **Búsquedas personalizadas** con múltiples filtros
- 📈 **Visualización gráfica** de tendencias y métricas
- 📅 **Gestión visual** de la agenda diaria, semanal y por estilista
- 💾 **Exportación** de datos para análisis externo

---

## 2. ¿QUÉ SON LAS CONSULTAS AVANZADAS?

### Módulos Principales

El sistema está dividido en 4 módulos principales:

#### 📊 **Dashboard de Usuarios**
Visualiza estadísticas generales de tu base de clientes y empleados.

**Características:**
- Total de usuarios por rol (clientes, empleados, admins)
- Usuarios activos vs inactivos
- Gráficos de crecimiento
- Métricas de compromiso

#### 🔎 **Búsqueda Avanzada de Usuarios**
Filtra y encuentra usuarios con criterios específicos.

**Filtros disponibles:**
- Por nombre o alias
- Por rol (cliente, empleado, admin_salon)
- Por estado (activo, inactivo)
- Por fecha de registro
- Por correo electrónico

#### 📅 **Consultas de Reservas**
Sistema de búsqueda unificado con filtros en cascada.

**Capacidades:**
- Búsqueda por cliente
- Búsqueda por servicio
- Búsqueda por estilista
- Búsqueda global (todas las reservas)
- Filtros combinados (cliente + servicio + estilista)
- Rango de fechas obligatorio

#### 📈 **Estadísticas de Reservas**
Dashboard visual con métricas clave y gráficos.

**Métricas incluidas:**
- Total de reservas
- Reservas activas
- Slots disponibles
- Tasa de ocupación
- Servicios únicos
- Clientes únicos
- Servicios más reservados
- Productividad por estilista

#### 🗓️ **Agenda de Reservas**
Calendario visual con 3 vistas diferentes.

**Vistas disponibles:**
- Vista Día: tabla hora x estilista
- Vista Semana: grid día x estilista
- Vista Estilista: lista detallada individual

---

## 3. ACCESO Y REQUISITOS

### 3.1 ¿Cómo Accedo?

**Para Administradores:**

**Paso 1:** Inicia sesión con cuenta de Administrador del salón

**Paso 2:** En el menú lateral, busca la sección **"Consultas"** o **"Análisis"**

**Paso 3:** Encontrarás las siguientes opciones:
- 🔍 Consultas de Usuarios (`/consultasusuarios`)
- 📅 Consultas de Reservas (`/consultas-reservas`)
- 📊 Estadísticas de Reservas (`/estadisticas-reservas`)
- 🗓️ Agenda de Reservas (`/agenda`)

**Para Empleados:**

⚠️ **Acceso con Restricción:** Si el salón tiene activada la configuración `restriccionPorEmpleado`, los empleados solo verán sus propias reservas en la agenda.

### 3.2 Requisitos del Sistema

✅ **Navegador:**
- Google Chrome (recomendado)
- Firefox, Edge, Safari actualizados

✅ **Conexión:**
- Mínimo 3 Mbps para cargar datos
- 5 Mbps recomendado para gráficos

✅ **Permisos:**
- Rol Admin Salón (acceso completo)
- Rol Empleado (acceso limitado según configuración)

---

## 4. CONSULTAS DE USUARIOS

### 4.1 Acceso al Módulo

**Ruta:** `/consultasusuarios`

Esta pantalla unificada te da acceso a 3 pestañas:
1. 📊 Dashboard
2. 📋 Lista de Usuarios
3. 🔎 Búsqueda Avanzada

### 4.2 Dashboard de Usuarios

#### ¿Qué muestra?

El dashboard presenta un resumen visual con tarjetas de métricas:

**Métricas principales:**
- **Total de Usuarios:** Cantidad total registrados en tu salón
- **Por Rol:**
  - 👥 Clientes
  - 💼 Empleados
  - 👑 Administradores
- **Por Estado:**
  - ✅ Activos
  - ❌ Inactivos

**Visualización:**
- Tarjetas con números grandes y colores distintivos
- Iconos intuitivos
- Actualización en tiempo real

#### ¿Cómo se usa?

1. Click en pestaña **"📊 Dashboard"**
2. Observa las métricas principales
3. Identifica tendencias (ej: muchos usuarios inactivos)
4. Usa esta información para planificar acciones

**Ejemplo de interpretación:**
```
Total Usuarios: 450
- Clientes: 380
- Empleados: 8
- Admins: 2

Activos: 350 (78%)
Inactivos: 100 (22%)

✅ Análisis: Buena retención de clientes activos
⚠️ Acción: Campaña de reactivación para los 100 inactivos
```

### 4.3 Lista de Usuarios

#### Características

La pestaña **"📋 Lista de Usuarios"** muestra una tabla completa con:

**Columnas:**
- Nombre/Alias
- Correo electrónico
- Rol
- Estado
- Fecha de registro
- Última actividad

**Funcionalidades:**
- ✅ Ordenamiento por columna
- ✅ Paginación (20 usuarios por página)
- ✅ Búsqueda rápida por nombre
- ✅ Filtros por rol y estado
- ✅ Exportación a CSV

#### ¿Cómo usar los filtros?

**Filtro por Rol:**
```
1. Click en dropdown "Todos los roles"
2. Selecciona: Cliente, Empleado o Admin Salón
3. La tabla se actualiza automáticamente
```

**Filtro por Estado:**
```
1. Click en dropdown "Todos los estados"
2. Selecciona: Activo o Inactivo
3. Los resultados se filtran instantáneamente
```

**Búsqueda por nombre:**
```
1. Escribe en el campo "Buscar usuario..."
2. El sistema busca en nombre, alias y correo
3. Resultados en tiempo real
```

### 4.4 Búsqueda Avanzada

#### ¿Qué es?

La pestaña **"🔎 Búsqueda Avanzada"** permite combinar múltiples criterios de búsqueda.

**Filtros disponibles:**

1. **Por Nombre Completo:**
   - Busca coincidencias exactas o parciales
   - Ejemplo: "María" encuentra "María López", "Ana María", etc.

2. **Por Correo Electrónico:**
   - Busca por dominio o correo completo
   - Ejemplo: "@gmail.com" encuentra todos los Gmail

3. **Por Rango de Fechas:**
   - Fecha de registro desde/hasta
   - Útil para encontrar usuarios nuevos o antiguos

4. **Combinación de Filtros:**
   - Puedes usar varios filtros simultáneamente
   - Ejemplo: Clientes activos registrados en noviembre 2025

#### Ejemplo de uso:

**Caso: Encontrar clientes nuevos del mes**

```
Paso 1: Ir a pestaña "Búsqueda Avanzada"
Paso 2: Seleccionar filtros:
  - Rol: Cliente
  - Estado: Activo
  - Fecha desde: 01/11/2025
  - Fecha hasta: 30/11/2025
Paso 3: Click en "🔍 Buscar"
Paso 4: Ver resultados (ej: 45 clientes nuevos)
Paso 5: Exportar a CSV para campaña de bienvenida
```

---

## 5. CONSULTAS DE RESERVAS

### 5.1 Acceso al Módulo

**Ruta:** `/consultas-reservas`

Este módulo usa un sistema de **filtros en cascada** inteligente que previene redundancias.

### 5.2 Tipos de Búsqueda

#### 🔷 Por Cliente

**Cuándo usar:** Quieres ver todas las reservas de un cliente específico.

**Proceso:**
```
1. Seleccionar "Por Cliente"
2. Escribir nombre del cliente (ej: "Juan Pérez")
3. Seleccionar rango de fechas (OBLIGATORIO)
4. [OPCIONAL] Agregar filtro adicional:
   - Por Servicio: ver solo cortes de Juan
   - Por Estilista: ver reservas de Juan con Ana
5. Click en "🔍 Buscar"
```

**Ejemplo práctico:**
```
Búsqueda:
- Cliente: "María González"
- Servicio: "Manicure"
- Fecha: 01/10/2025 - 31/10/2025

Resultado:
✅ Se encontraron 4 reservas de María para manicure en octubre
```

#### 🔷 Por Servicio

**Cuándo usar:** Análisis de demanda de un servicio específico.

**Proceso:**
```
1. Seleccionar "Por Servicio"
2. Elegir servicio del dropdown (ej: "Corte de Cabello")
3. Seleccionar rango de fechas
4. [OPCIONAL] Filtrar por estilista específico
5. Click en "🔍 Buscar"
```

**Ejemplo de análisis:**
```
Búsqueda:
- Servicio: "Tinte Completo"
- Fecha: 01/11/2025 - 30/11/2025

Resultado:
✅ 78 reservas de tinte en noviembre
📊 Promedio: 2.6 tintes por día
💡 Insight: Aumentar stock de tintes
```

#### 🔷 Por Estilista

**Cuándo usar:** Evaluar carga de trabajo de un estilista.

**Proceso:**
```
1. Seleccionar "Por Estilista"
2. Elegir estilista del dropdown
3. Seleccionar rango de fechas
4. Click en "🔍 Buscar"
```

**Ejemplo de evaluación:**
```
Búsqueda:
- Estilista: "Ana Rodríguez"
- Fecha: 01/11/2025 - 30/11/2025

Resultado:
✅ 125 reservas atendidas en noviembre
📊 Promedio: 4.2 clientes por día
💡 Insight: Ana está a capacidad óptima
```

#### 🔷 Globales

**Cuándo usar:** Ver todas las reservas del salón en un período.

**Proceso:**
```
1. Seleccionar "Globales"
2. Seleccionar rango de fechas (AMPLIO permitido)
3. Click en "🔍 Buscar"
4. Se muestran TODAS las reservas del período
```

**Advertencia:**
⚠️ Rangos muy amplios (ej: 6 meses) pueden tardar en cargar

### 5.3 Modo de Búsqueda Avanzada

#### ¿Qué es?

Después de realizar tu primera búsqueda, el sistema cambia a **"Modo Avanzado"**, permitiendo combinar filtros libremente.

**Características del modo avanzado:**

✅ **Filtros combinados:**
```
Ejemplo:
- Cliente: "Luis Martínez"
- Servicio: "Corte"
- Estilista: "Carlos"
- Fecha: 01/09/2025 - 30/11/2025

= Ver todos los cortes que Luis se hizo con Carlos en 3 meses
```

✅ **Chips de filtros activos:**
- Los filtros aplicados se muestran como chips de colores
- Cada chip es removible con un ✕
- Permite ajustar búsqueda sin empezar de cero

✅ **Botón "Actualizar Búsqueda":**
- Mantiene filtros activos
- Solo agrega/quita los que modificaste
- No resetea la búsqueda completa

### 5.4 Visualización de Resultados

#### Tabla de Reservas

**Columnas mostradas:**
- 📅 Fecha (formato: DD/MM/YY)
- 🕐 Hora Inicio
- 🕐 Hora Fin
- 👤 Cliente
- 💼 Servicio
- 💇 Estilista
- ⏱️ Duración
- ✅ Estado

**Funcionalidades:**
- Ordenamiento por columna
- Resaltado de reservas canceladas
- Color distintivo por estado
- Paginación automática

#### Acciones Disponibles

**Botones de acción:**

🔄 **Actualizar Búsqueda:**
- Aplica cambios en filtros
- Mantiene filtros no modificados

🧹 **Limpiar Todo:**
- Resetea todos los filtros
- Vuelve a pantalla inicial
- Borra resultados

📥 **Exportar (próximamente):**
- Descarga CSV con resultados
- Incluye todos los campos

### 5.5 Validaciones y Restricciones

#### Fechas Obligatorias

⚠️ **Siempre debes seleccionar un rango de fechas**

**Validaciones aplicadas:**
- ❌ No puedes buscar sin fecha de inicio
- ❌ No puedes buscar sin fecha de fin
- ❌ Fecha inicio no puede ser posterior a fecha fin
- ✅ Rango recomendado: máximo 3 meses

**Mensajes de error:**
```
❌ "Debes seleccionar fechas de búsqueda (inicio y fin)"
❌ "La fecha de inicio no puede ser posterior a la fecha de fin"
```

#### Filtros Requeridos

**Primera búsqueda:**
- Debes seleccionar un tipo (Cliente/Servicio/Estilista/Globales)
- Si eliges "Por Cliente", debes escribir el nombre
- Si eliges "Por Servicio", debes seleccionar uno del dropdown
- Si eliges "Por Estilista", debes seleccionar uno del dropdown

**Búsquedas subsecuentes (modo avanzado):**
- Debes mantener al menos UN filtro activo
- No puedes buscar sin ningún criterio

---

## 6. ESTADÍSTICAS DE RESERVAS

### 6.1 Acceso al Dashboard

**Ruta:** `/estadisticas-reservas`

Este módulo presenta un dashboard visual con métricas clave y gráficos interactivos.

### 6.2 Filtros de Período

#### Opciones de Filtrado

**🗓️ Por Mes Completo:**
```
1. Seleccionar "Por Mes Completo"
2. Elegir mes/año (ej: Noviembre 2025)
3. El sistema calcula automáticamente:
   - Primer día del mes (01/11/2025)
   - Último día del mes (30/11/2025)
4. Click en "🔍 Aplicar Filtros"
```

**📅 Por Rango de Fechas:**
```
1. Seleccionar "Por Rango de Fechas"
2. Elegir fecha inicio (ej: 15/11/2025)
3. Elegir fecha fin (ej: 21/11/2025)
4. Click en "🔍 Aplicar Filtros"
```

**⚠️ Importante:**
- Los filtros NO se aplican automáticamente
- Debes hacer click en "Aplicar Filtros"
- "Limpiar" resetea al mes actual

### 6.3 Métricas Principales

El dashboard muestra 6 tarjetas con métricas clave:

#### 📅 **Total Reservas**
**Qué muestra:** Cantidad total de reservas en el período seleccionado

**Interpretación:**
```
Ejemplo: 450 reservas en noviembre
- Promedio: 15 reservas/día
- Si trabajas 8 estilistas: 1.9 clientes/estilista/día
```

#### ✅ **Reservas Activas**
**Qué muestra:** Reservas confirmadas y no canceladas

**Interpretación:**
```
Ejemplo: 430 activas de 450 totales
- Tasa de confirmación: 95.6%
- Cancelaciones: 20 (4.4%)
💡 Excelente tasa de confirmación
```

#### 🕐 **Slots Disponibles**
**Qué muestra:** Horarios aún libres en el período

**Interpretación:**
```
Ejemplo: 320 slots libres
- Total slots: 750 (430 ocupados + 320 libres)
- Ocupación: 57.3%
⚠️ Aún hay capacidad disponible
```

#### 📊 **Tasa de Ocupación**
**Qué muestra:** Porcentaje de slots ocupados vs disponibles

**Interpretación:**
```
Ejemplo: 68% de ocupación
✅ 60-75%: Ocupación saludable
⚠️ <50%: Baja demanda
❌ >90%: Sobrecarga (considerar más estilistas)
```

#### 💈 **Servicios Únicos**
**Qué muestra:** Cantidad de tipos de servicios diferentes reservados

**Interpretación:**
```
Ejemplo: 12 servicios únicos
💡 Diversidad de servicios ofrecidos
📊 Útil para identificar servicios no demandados
```

#### 👥 **Clientes Únicos**
**Qué muestra:** Cantidad de clientes diferentes atendidos

**Interpretación:**
```
Ejemplo: 280 clientes únicos de 430 reservas
- Ratio: 1.54 reservas por cliente
💡 Algunos clientes repiten en el mes
✅ Buena fidelización
```

### 6.4 Gráficos de Análisis

#### 📈 Servicios Más Reservados

**Qué muestra:** Gráfico de barras horizontales con los 10 servicios más populares.

**Información visual:**
- Barras de colores por servicio
- Cantidad numérica al final de cada barra
- Ordenado de mayor a menor demanda

**Ejemplo de lectura:**
```
Corte de Cabello        ████████████ 85
Manicure                ██████████ 72
Pedicure                ████████ 58
Tinte Completo          ██████ 45
Brushing                ████ 32
```

**Insights que puedes obtener:**
- ✅ Qué servicios son los más rentables
- ✅ Qué servicios promover más
- ✅ Qué servicios considerar eliminar (si tienen muy poca demanda)
- ✅ Planificación de stock (ej: más tinte si hay alta demanda)

#### 💼 Productividad por Estilista

**Qué muestra:** Gráfico de barras con cantidad de reservas atendidas por cada estilista.

**Información visual:**
- Barras de colores por estilista
- Nombre del estilista (no relación técnica)
- Cantidad de reservas completadas

**Ejemplo de lectura:**
```
Ana Rodríguez           ████████████████ 125
Carlos Méndez           ██████████████ 112
Laura Fernández         ████████████ 98
Pedro Sánchez           ██████████ 85
```

**Insights que puedes obtener:**
- ✅ Quién atiende más clientes
- ✅ Distribución equitativa de carga
- ⚠️ Estilistas con baja productividad
- ⚠️ Posibles problemas de programación
- ✅ Reconocimiento a estilistas destacados

**Acción recomendada:**
```
Si un estilista tiene MUCHO más que otros:
- ¿Está sobrecargado?
- ¿Es el más solicitado?
- ¿Necesita apoyo?

Si un estilista tiene MUCHO menos:
- ¿Tiene menos disponibilidad?
- ¿Necesita capacitación?
- ¿Hay un problema con su desempeño?
```

### 6.5 Interpretación Avanzada

#### Análisis Combinado de Métricas

**Ejemplo de análisis completo:**

```
ESCENARIO: Noviembre 2025

📅 Total Reservas: 450
✅ Reservas Activas: 430 (95.6%)
🕐 Slots Disponibles: 320
📊 Tasa de Ocupación: 57%
💈 Servicios Únicos: 12
👥 Clientes Únicos: 280

📈 Top 3 Servicios:
1. Corte: 85 reservas
2. Manicure: 72 reservas
3. Pedicure: 58 reservas

💼 Top 3 Estilistas:
1. Ana: 125 reservas
2. Carlos: 112 reservas
3. Laura: 98 reservas

🎯 CONCLUSIONES:
✅ Excelente tasa de confirmación (95.6%)
⚠️ Ocupación moderada (57%) - aún hay capacidad
✅ Buena diversidad de servicios (12 tipos)
✅ Fidelización decente (1.6 reservas/cliente)
💡 Ana es la más productiva (125 reservas)
📊 Corte es el servicio estrella (85 reservas)

🚀 ACCIONES RECOMENDADAS:
1. Campaña de marketing para aumentar ocupación a 70%
2. Promover servicios menos demandados
3. Reconocer a Ana, Carlos y Laura
4. Investigar por qué otros estilistas tienen menos carga
5. Asegurar stock suficiente para corte, manicure y pedicure
```

---

## 7. AGENDA DE RESERVAS

### 7.1 Acceso al Módulo

**Ruta:** `/agenda`

La agenda ofrece 3 vistas visuales diferentes para gestionar tus reservas.

### 7.2 Navegación de Mes

#### Selector de Mes

En la parte superior verás un **selector de mes** con:
- ◀️ Botón mes anterior
- 📅 Mes y año actual (ej: "noviembre 2025")
- ▶️ Botón mes siguiente

**Comportamiento:**
- Al cambiar de mes, se cargan automáticamente TODAS las reservas del mes
- Esto optimiza la navegación (no hace llamadas repetidas al servidor)
- Loading solo aparece una vez al inicio

**Restricción de Navegación:**
⚠️ Si intentas navegar fuera del mes actual (ej: con flechas de día/semana):
```
Modal: "¿Deseas ir al mes siguiente?"
- Sí: Cambia el mes y recarga todas las reservas
- No: Permanece en el día/semana actual
```

### 7.3 Vista Día

#### ¿Qué muestra?

Tabla detallada **Hora x Estilista** con slots de 30 minutos.

**Estructura:**
```
        | Ana          | Carlos       | Laura        |
--------|--------------|--------------|--------------|
05:00   | LIBRE        | LIBRE        | LIBRE        |
05:30   | LIBRE        | María (Corte)| LIBRE        |
06:00   | (continúa)   | LIBRE        | Juan (Tinte) |
06:30   | Pedro (Mani) | LIBRE        | (continúa)   |
...
```

#### Características

✅ **Slots de 30 minutos:** Desde apertura hasta cierre del salón

✅ **Rowspan automático:** Si un servicio dura 1 hora, la celda ocupa 2 filas

✅ **Información de la cita:**
- Nombre del cliente (en negritas)
- Servicio (color secundario)
- Hora inicio - Hora fin (en gris)

✅ **Colores:**
- Header: color primario del salón
- Citas: borde izquierdo color primario + fondo sutil
- Libres: fondo gris claro (#fafafa)

#### ¿Cómo navegar?

**Botones:**
- **⬅️ Anterior:** Va al día anterior
- **📅 Hoy:** Salta al día de hoy
- **Siguiente ➡️:** Va al día siguiente

**DatePicker:**
```
1. Click en pestaña "📆 Día"
2. Se abre modal de selección de fecha
3. Elige un día específico del mes actual
4. La vista se actualiza instantáneamente
```

#### Caso de uso:

```
ESCENARIO: Es lunes y quieres ver la agenda de hoy

Paso 1: Ir a /agenda
Paso 2: Click en pestaña "📆 Día"
Paso 3: Click en "📅 Hoy" (si no estás ya ahí)
Paso 4: Revisar tabla hora por hora

RESULTADO:
- Ves todas las citas de todos los estilistas
- Identificas huecos libres
- Puedes ofrecer esos slots a clientes walk-in
- Sabes qué estilista está más ocupado
```

### 7.4 Vista Semana

#### ¿Qué muestra?

Grid resumen **Estilista x Día** con totales numéricos.

**Estructura:**
```
           | Lun | Mar | Mié | Jue | Vie | Sáb | Dom | Total |
-----------|-----|-----|-----|-----|-----|-----|-----|-------|
Ana        |  6  |  5  |  7  |  8  |  9  |  4  |  0  |  39   |
Carlos     |  5  |  6  |  6  |  5  |  7  |  3  |  0  |  32   |
Laura      |  4  |  5  |  5  |  6  |  6  |  2  |  0  |  28   |
```

#### Características

✅ **Vista de alto nivel:** Totales por día, no detalle de hora

✅ **Colores dinámicos:**
- Números > 0: color primario (reservas confirmadas)
- Números = 0: gris (día sin reservas)
- Columna Total: fondo color secundario

✅ **Resumen visual rápido:**
- Identifica días más ocupados
- Compara carga entre estilistas
- Detecta patrones semanales

#### Navegación

**Botones:**
- **⬅️ Anterior:** Va a la semana anterior
- **📅 Hoy:** Salta a la semana actual
- **Siguiente ➡️:** Va a la semana siguiente

**Definición de semana:**
- Comienza el lunes
- Termina el domingo
- Si cambias de mes, se solicita confirmación

#### Caso de uso:

```
ESCENARIO: Quieres planificar la siguiente semana

Paso 1: Ir a /agenda
Paso 2: Click en pestaña "📅 Semana"
Paso 3: Click en "Siguiente ➡️"
Paso 4: Analizar el grid

RESULTADO:
Ana tiene:
- Lun: 8 citas (día ocupado)
- Mar: 5 citas (normal)
- Mié: 3 citas (día tranquilo)

💡 ACCIÓN:
- Ofrecer promoción para el miércoles de Ana
- Redistribuir clientes si lunes está sobrecargado
```

### 7.5 Vista Estilista

#### ¿Qué muestra?

Tarjetas individuales por estilista con detalle de la semana.

**Estructura de cada tarjeta:**
```
╔══════════════════════════════════╗
║ Ana Rodríguez                    ║
╠══════════════════════════════════╣
║ • Lunes:     6 citas             ║
║ • Martes:    5 citas             ║
║ • Miércoles: 7 citas             ║
║ • Jueves:    8 citas             ║
║ • Viernes:   9 citas             ║
║ • Sábado:    4 citas             ║
║ • Domingo:   0 citas             ║
╠══════════════════════════════════╣
║ Total semana: 39 citas           ║
╚══════════════════════════════════╝
```

#### Características

✅ **Tarjetas visuales:** Una por cada estilista

✅ **Colores por estilista:**
- Borde superior: color primario
- Total semana: fondo color secundario
- Números en color si hay reservas, gris si no

✅ **Ordenamiento:** Por cantidad de reservas (más activos primero)

#### Caso de uso:

```
ESCENARIO: Evaluación de desempeño mensual

Paso 1: Ir a /agenda
Paso 2: Click en pestaña "👤 Estilista"
Paso 3: Revisar totales semanales

RESULTADO:

Ana Rodríguez: 39 citas/semana
- ✅ Excelente productividad
- 💰 Bono por desempeño

Carlos Méndez: 32 citas/semana
- ✅ Productividad buena
- 📊 Dentro de lo esperado

Pedro Sánchez: 15 citas/semana
- ⚠️ Baja productividad
- 🔍 Investigar causas:
  - ¿Menos disponibilidad?
  - ¿Clientes lo solicitan menos?
  - ¿Necesita capacitación?
```

### 7.6 Restricción por Empleado

#### ¿Qué es?

Configuración del salón que limita lo que ven los empleados.

**Configuración:**
- `restriccionPorEmpleado: true` → Empleado solo ve sus reservas
- `restriccionPorEmpleado: false` → Empleado ve todas las reservas

**Comportamiento:**

**Si eres Admin:**
```
✅ SIEMPRE ves todas las reservas
✅ SIEMPRE ves todos los estilistas
```

**Si eres Empleado con restricción activa:**
```
⚠️ Solo ves tus propias reservas
⚠️ En vista Día: solo tu columna
⚠️ En vista Semana: solo tu fila
⚠️ En vista Estilista: solo tu tarjeta
```

**Si eres Empleado sin restricción:**
```
✅ Ves todas las reservas (igual que admin)
✅ Puedes ayudar en gestión de agenda general
```

#### Ejemplo práctico:

```
SALÓN: "Bella Imagen"
CONFIGURACIÓN: restriccionPorEmpleado = true

USUARIOS:
1. María (Admin) → Ve TODO
2. Ana (Empleado) → Solo ve sus reservas
3. Carlos (Empleado) → Solo ve sus reservas

Si Ana inicia sesión:
- Vista Día: Solo columna "Ana Rodríguez"
- Vista Semana: Solo fila "Ana Rodríguez"
- Vista Estilista: Solo tarjeta "Ana Rodríguez"

Privacidad: Ana NO puede ver reservas de Carlos
```

---

## 8. EXPORTACIÓN DE DATOS

### 8.1 Exportar Usuarios

**Disponible en:** `/consultasusuarios` → Pestaña "Lista de Usuarios"

**Formato:** CSV (Excel compatible)

**Columnas incluidas:**
- Nombre completo
- Alias
- Correo electrónico
- Rol
- Estado
- Fecha de registro
- Última actividad

**Proceso:**
```
1. Aplicar filtros deseados (opcional)
2. Click en botón "📥 Exportar CSV"
3. Descarga automática
4. Abrir en Excel o Google Sheets
```

**Casos de uso:**
- 📧 Crear lista de correos para newsletter
- 📊 Análisis externo en Excel
- 📋 Reportes para gerencia
- 🎯 Segmentación de clientes

### 8.2 Exportar Reservas

**Disponible en:** `/consultas-reservas`

**Formato:** CSV

**Columnas incluidas:**
- Fecha
- Hora inicio
- Hora fin
- Cliente
- Servicio
- Estilista
- Duración
- Estado

**Proceso:**
```
1. Realizar búsqueda con filtros
2. Verificar que los resultados sean correctos
3. Click en "📥 Exportar Resultados"
4. Descarga automática
```

**Casos de uso:**
- 📊 Análisis de tendencias en Excel
- 💰 Cálculo de ingresos por servicio
- 📈 Gráficos personalizados
- 📋 Reportes para contabilidad

### 8.3 Tips de Exportación

#### ✅ Buenas prácticas:

**1. Filtra antes de exportar:**
```
❌ Malo: Exportar 10,000 registros y filtrar en Excel
✅ Bueno: Filtrar en MultiSalon, exportar solo lo necesario
```

**2. Usa nombres descriptivos:**
```
❌ Malo: "export.csv"
✅ Bueno: "reservas_noviembre_2025_cortes.csv"
```

**3. Documenta tus filtros:**
```
Ejemplo de nombre:
"usuarios_clientes_activos_nov2025.csv"
= Usuarios con rol Cliente, estado Activo, registrados en nov 2025
```

---

## 9. CASOS DE USO PRÁCTICOS

### Caso 1: Análisis de Clientes Inactivos

**Objetivo:** Identificar clientes que no han reservado en 3 meses

**Paso a paso:**
```
1. Ir a /consultasusuarios
2. Pestaña "Búsqueda Avanzada"
3. Filtros:
   - Rol: Cliente
   - Última actividad: hace más de 90 días
4. Buscar
5. Exportar CSV
6. Usar lista para:
   - Campaña de email "Te extrañamos"
   - Descuento de reactivación 20%
   - WhatsApp personalizado
```

**Resultado esperado:**
- Identificar 50-100 clientes inactivos
- Campaña de reactivación
- Meta: Recuperar 20% (10-20 clientes)

---

### Caso 2: Evaluación de Servicio Poco Demandado

**Objetivo:** Decidir si eliminar o promover un servicio

**Paso a paso:**
```
1. Ir a /estadisticas-reservas
2. Aplicar filtro: Últimos 3 meses
3. Ver gráfico "Servicios Más Reservados"
4. Identificar servicio con BAJA demanda (ej: "Depilación Facial": 3 reservas en 3 meses)
5. Ir a /consultas-reservas
6. Buscar por servicio: "Depilación Facial"
7. Rango: Últimos 6 meses
8. Analizar:
   - ¿Solo 3 clientes en 6 meses?
   - ¿Qué clientes lo usan?
   - ¿Son clientes frecuentes o únicos?
```

**Decisión:**
```
SI el servicio tiene <10 reservas en 6 meses Y no es parte de paquete:
→ OPCIÓN A: Eliminarlo del catálogo
→ OPCIÓN B: Hacer promoción 2x1 por 1 mes

SI el servicio es parte de paquete:
→ Mantener pero no promover individualmente
```

---

### Caso 3: Optimización de Horarios por Estilista

**Objetivo:** Balancear carga de trabajo entre estilistas

**Paso a paso:**
```
1. Ir a /estadisticas-reservas
2. Ver gráfico "Productividad por Estilista"
3. Identificar desbalance:
   - Ana: 125 reservas/mes
   - Carlos: 112 reservas/mes
   - Laura: 98 reservas/mes
   - Pedro: 55 reservas/mes ⚠️
4. Ir a /agenda
5. Vista Semana
6. Analizar patrón de Pedro:
   - ¿Tiene menos días disponibles?
   - ¿Tiene menos horas/día?
   - ¿Sus slots están mal distribuidos?
```

**Acciones correctivas:**
```
SI Pedro trabaja menos días:
→ Ofrecer más turnos

SI Pedro trabaja igual pero no lo reservan:
→ Investigar: ¿calidad? ¿velocidad? ¿trato al cliente?
→ Capacitación o mentoría con Ana

SI Pedro tiene horarios malos (ej: solo mañanas):
→ Redistribuir horarios
→ Darle slots de mayor demanda (ej: viernes tarde)
```

---

### Caso 4: Campaña de Marketing para Día Específico

**Objetivo:** Llenar slots de un día con baja ocupación

**Paso a paso:**
```
1. Ir a /agenda
2. Vista Semana
3. Identificar: Los miércoles tienen baja ocupación
   - Lunes: 35 reservas
   - Martes: 32 reservas
   - Miércoles: 18 reservas ⚠️
   - Jueves: 33 reservas
4. Ir a /estadisticas-reservas
5. Filtrar solo miércoles del último mes
6. Ver servicios más reservados los miércoles
7. Diseñar promoción:
   "Miércoles de Manicure: 30% off"
```

**Ejecución:**
```
Semana 1: Lanzar promoción
Semana 2: Medir resultados
- Ir a /consultas-reservas
- Filtrar: Servicio "Manicure" + Miércoles
- Comparar con semanas anteriores

Resultado esperado:
- Antes: 18 reservas/miércoles
- Después: 28 reservas/miércoles (+55%)
```

---

### Caso 5: Identificar Cliente VIP

**Objetivo:** Encontrar clientes más frecuentes para programa de lealtad

**Paso a paso:**
```
1. Ir a /consultasusuarios
2. Pestaña "Lista de Usuarios"
3. Ordenar por "Última actividad" (más reciente primero)
4. Manualmente (o con CSV):
   - Exportar lista de clientes activos
   - En Excel, usar BUSCAR para contar cuántas veces aparece cada cliente en reservas exportadas
5. O bien, revisar uno por uno:
   - Ir a /consultas-reservas
   - Buscar por cliente: "María González"
   - Rango: Últimos 12 meses
   - Contar reservas
```

**Criterios VIP:**
```
Nivel Oro: 12+ reservas/año (1/mes)
Nivel Plata: 6-11 reservas/año
Nivel Bronce: 3-5 reservas/año
```

**Acciones VIP:**
```
Oro:
- Descuento 15% permanente
- Cumpleaños: servicio gratis
- Prioridad en agenda

Plata:
- Descuento 10%
- Invitación a eventos

Bronce:
- Descuento 5%
- Newsletter exclusiva
```

---

## 10. SOLUCIÓN DE PROBLEMAS

### ❌ "No se encontraron reservas"

**Causa:** Los filtros son muy restrictivos o no hay datos para ese período

**Solución:**
```
1. Verificar rango de fechas:
   - ¿Es muy corto? Ampliar a 1 mes
   - ¿Es muy antiguo? El sistema podría no tener datos de hace años
2. Reducir filtros:
   - Si buscas Cliente + Servicio + Estilista, prueba solo 1 o 2
3. Intentar búsqueda "Globales":
   - Si eso funciona, el problema son los filtros específicos
4. Verificar escritura:
   - Nombre de cliente: "María" vs "Maria" (con/sin tilde)
```

---

### ❌ "La carga es muy lenta"

**Causa:** Rango de fechas demasiado amplio o mucha información

**Solución:**
```
1. Reducir rango de fechas:
   - En vez de 1 año, buscar por mes
2. Filtrar por estilista específico:
   - En vez de búsqueda global, elegir 1 estilista
3. Cerrar otras pestañas del navegador:
   - Liberar memoria RAM
4. Verificar conexión a internet:
   - Mínimo 3 Mbps requerido
5. Actualizar navegador:
   - Chrome, Firefox, Edge a última versión
```

---

### ❌ "No puedo ver la pestaña de consultas"

**Causa:** No tienes permisos de administrador

**Solución:**
```
1. Verificar tu rol:
   - Ir a perfil de usuario
   - Debe decir "admin_salon"
2. Si eres empleado:
   - Pedir al administrador que te otorgue permisos
   - O usar funciones limitadas disponibles para empleados
3. Si eres cliente:
   - Los clientes NO tienen acceso a consultas
   - Solo pueden ver sus propias reservas
```

---

### ⚠️ "Los gráficos no se ven correctamente"

**Causa:** Problema de caché o navegador desactualizado

**Solución:**
```
1. Limpiar caché del navegador:
   - Chrome: Ctrl + Shift + Delete
   - Seleccionar "Imágenes y archivos en caché"
   - Eliminar
2. Recargar página con Ctrl + F5
3. Probar en modo incógnito:
   - Si funciona ahí, es problema de caché
4. Probar en otro navegador:
   - Chrome → Firefox o viceversa
5. Verificar resolución de pantalla:
   - Mínimo 1024x768 recomendado
```

---

### 🐌 "La tabla de reservas tarda en cargar"

**Causa:** Muchos resultados (500+)

**Solución:**
```
1. Usar paginación:
   - La tabla carga 50 registros por vez
   - Navegar con botones "Anterior" / "Siguiente"
2. Refinar filtros:
   - Agregar más criterios para reducir resultados
3. Exportar a CSV:
   - Si necesitas ver todo, es más rápido en Excel
```

---

## 11. TIPS Y MEJORES PRÁCTICAS

### 📊 Revisiones Recomendadas

#### Diaria
```
✅ Vista Día en Agenda
- Revisar citas del día
- Identificar huecos
- Preparar materiales

✅ Dashboard de Usuarios (rápido)
- Ver si hay nuevos registros
```

#### Semanal
```
✅ Vista Semana en Agenda
- Planificar siguiente semana
- Balancear carga entre estilistas

✅ Consultas de Reservas
- Ver cancelaciones de la semana
- Contactar clientes que cancelaron
```

#### Mensual
```
✅ Estadísticas de Reservas
- Analizar todo el mes completo
- Identificar tendencias
- Tomar decisiones estratégicas

✅ Consultas de Usuarios
- Identificar clientes inactivos
- Planificar campañas de reactivación
```

### 🎯 Estrategias de Análisis

#### Análisis de Tendencias

**Comparar mes a mes:**
```
Noviembre 2024:
- 380 reservas
- 65% ocupación
- Top servicio: Corte (75 reservas)

Noviembre 2025:
- 450 reservas (+18%)
- 68% ocupación (+3%)
- Top servicio: Corte (85 reservas, +13%)

✅ CONCLUSIÓN: Crecimiento sostenido
💡 ACCIÓN: Mantener estrategia actual
```

#### Análisis de Horarios Pico

**Identificar mejores horarios:**
```
1. Ir a /agenda → Vista Semana
2. Anotar días con MÁS reservas
3. Ir a /agenda → Vista Día en esos días
4. Identificar horarios pico

Resultado ejemplo:
- Viernes 4pm-7pm: PICO
- Sábado 10am-2pm: PICO
- Miércoles 11am-1pm: VALLE

💡 ACCIONES:
- Promociones en horarios valle
- Precios premium en horarios pico
- Más staff en horarios pico
```

### 💡 Automatización de Rutinas

#### Crear Rutina Semanal

**Lunes a las 8 AM:**
```
1. Abrir /agenda
2. Vista Semana
3. Screenshot o imprimir
4. Compartir con equipo vía WhatsApp/email
5. Todos saben su carga semanal
```

**Último día del mes:**
```
1. Abrir /estadisticas-reservas
2. Filtrar mes completo que termina
3. Exportar dashboard (screenshot)
4. Crear presentación con:
   - Métricas principales
   - Top servicios
   - Top estilistas
5. Reunión con equipo
```

### 🔐 Seguridad y Privacidad

**Datos sensibles:**
```
⚠️ Los CSV contienen información personal:
- Nombres completos
- Correos electrónicos
- Teléfonos (si están en DB)

🔒 RECOMENDACIONES:
- No compartir CSVs públicamente
- Almacenar en carpeta protegida
- Eliminar después de usar
- No enviar por email sin cifrar
```

**Acceso restrictivo:**
```
✅ Solo admins deben tener acceso completo
✅ Empleados con restricción solo ven lo suyo
✅ Revisar permisos cada 3 meses
```

---

## 📚 RESUMEN Y PRÓXIMOS PASOS

### ✅ Lo que aprendiste:

- ✅ Cómo acceder a los 4 módulos de consultas
- ✅ Usar filtros avanzados en consultas de usuarios
- ✅ Sistema de filtros en cascada para reservas
- ✅ Interpretar métricas y gráficos de estadísticas
- ✅ Navegar las 3 vistas de la agenda
- ✅ Exportar datos a CSV
- ✅ Analizar casos de uso reales
- ✅ Resolver problemas comunes

### 🎯 Checklist de Dominio:

**Básico:**
- [ ] Accedí a cada uno de los 4 módulos
- [ ] Realicé mi primera búsqueda de usuarios
- [ ] Realicé mi primera búsqueda de reservas
- [ ] Vi el dashboard de estadísticas
- [ ] Navegué la agenda en vista Día

**Intermedio:**
- [ ] Usé filtros combinados en búsqueda de reservas
- [ ] Exporté datos a CSV
- [ ] Interpreté gráficos de servicios y productividad
- [ ] Navegué las 3 vistas de agenda (Día, Semana, Estilista)
- [ ] Identifiqué un patrón o tendencia en los datos

**Avanzado:**
- [ ] Realicé análisis completo mensual
- [ ] Identifiqué oportunidad de mejora con datos
- [ ] Creé campaña de marketing basada en análisis
- [ ] Balanceé carga de trabajo entre estilistas
- [ ] Implementé rutina semanal de revisión de datos

---

## 🆘 ¿NECESITAS AYUDA?

- 📖 [FAQ](/documentacion/FAQ.md)
- 🔧 [Troubleshooting](/documentacion/TROUBLESHOOTING.md)
- 📧 [Contacto y Soporte](/documentacion/CONTACTO.md)

---

**Última actualización:** 12 de Noviembre de 2025
**Versión del documento:** 1.0.0
**Autor:** Equipo MultiSalon

[⬅️ Volver al Índice](/documentacion/) | [➡️ Siguiente: Sistema Multi-Salón](/documentacion/GUIA-SISTEMA-MULTISALON.md)
