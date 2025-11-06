# 👥 GUÍA COMPLETA - GESTIÓN DE CLIENTES

**Versión:** 1.0.0
**Nivel:** Básico-Intermedio
**Tiempo de lectura:** 20 minutos
**Última actualización:** 30 de Octubre de 2025

---

## 📋 TABLA DE CONTENIDOS

1. [Introducción](#1-introducción)
2. [Ver Lista de Clientes](#2-ver-lista-de-clientes)
3. [Crear Nuevo Cliente](#3-crear-nuevo-cliente)
4. [Editar Cliente](#4-editar-cliente)
5. [Buscar Clientes](#5-buscar-clientes)
6. [Historial del Cliente](#6-historial-del-cliente)
7. [Desactivar/Activar Clientes](#7-desactivaractivar-clientes)
8. [Casos de Uso Prácticos](#8-casos-de-uso-prácticos)
9. [Tips y Mejores Prácticas](#9-tips-y-mejores-prácticas)
10. [Solución de Problemas](#10-solución-de-problemas)

---

## 1. INTRODUCCIÓN

El módulo de **Gestión de Clientes** te permite administrar toda la base de datos de clientes de tu salón de forma organizada y eficiente.

### ¿Qué puedes hacer?

- ✅ Ver lista completa de clientes
- ✅ Crear nuevos clientes
- ✅ Editar información de clientes
- ✅ Buscar clientes rápidamente
- ✅ Ver historial de servicios
- ✅ Desactivar/activar clientes
- ✅ Exportar base de datos

### ¿Quién puede usar este módulo?

- 👨‍💼 **Empleados** - Ver y crear clientes
- 👑 **Administradores** - Todo + eliminar clientes

---

## 2. VER LISTA DE CLIENTES

### 2.1 Acceder al Módulo

1. Click en **"Clientes"** en el menú lateral
2. Verás la lista completa de clientes

### 2.2 Información Mostrada

Cada cliente muestra:

```
┌─────────────────────────────────────────────┐
│ 📸 [Foto]  María López García               │
│            📧 maria.lopez@email.com         │
│            📱 +503 7123-4567                │
│            📅 Última visita: 15 Oct 2025    │
│            ⭐ 12 visitas totales             │
│                                             │
│            [Ver Perfil] [Editar] [⋮]        │
└─────────────────────────────────────────────┘
```

**Datos visibles:**
- Nombre completo
- Email (si tiene)
- Teléfono
- Última visita
- Número total de visitas
- Foto de perfil (opcional)

### 2.3 Ordenar la Lista

Click en los encabezados de columna para ordenar:

- **Nombre** - Orden alfabético (A-Z o Z-A)
- **Última Visita** - Más reciente primero
- **Visitas Totales** - Más frecuente primero
- **Fecha de Registro** - Más nuevo primero

### 2.4 Filtros Disponibles

```
┌─────────────────────────────────────┐
│ Mostrar:                            │
│ ○ Todos los clientes                │
│ ○ Solo activos                      │
│ ○ Solo inactivos                    │
│                                     │
│ Ordenar por:                        │
│ ▼ Nombre (A-Z)                      │
│                                     │
│ Visitas:                            │
│ ○ Todos                             │
│ ○ Frecuentes (10+)                  │
│ ○ Nuevos (0-2 visitas)              │
└─────────────────────────────────────┘
```

---

## 3. CREAR NUEVO CLIENTE

### 3.1 Acceso Rápido

**3 formas de crear un cliente:**

1. **Desde lista de clientes:**
   - Click en "

+ Nuevo Cliente"

2. **Desde reservas:**
   - Al crear reserva → "+ Cliente Nuevo"

3. **Atajo de teclado:**
   - `Ctrl + Shift + C`

### 3.2 Formulario Completo

#### Datos Básicos (Obligatorios)

```
┌─────────────────────────────────────┐
│ Nombre *                            │
│ ┌─────────────────────────────────┐ │
│ │ María                           │ │
│ └─────────────────────────────────┘ │
│                                     │
│ Apellido *                          │
│ ┌─────────────────────────────────┐ │
│ │ López García                    │ │
│ └─────────────────────────────────┘ │
│                                     │
│ Teléfono *                          │
│ ┌─────────────────────────────────┐ │
│ │ 7123-4567                       │ │
│ └─────────────────────────────────┘ │
└─────────────────────────────────────┘
```

⚠️ **Campos obligatorios:**
- Nombre
- Apellido
- Teléfono

#### Datos Adicionales (Opcionales)

```
┌─────────────────────────────────────┐
│ Email                               │
│ ┌─────────────────────────────────┐ │
│ │ maria.lopez@email.com           │ │
│ └─────────────────────────────────┘ │
│                                     │
│ Fecha de Nacimiento                 │
│ ┌─────────────────────────────────┐ │
│ │ 15/03/1990               📅    │ │
│ └─────────────────────────────────┘ │
│                                     │
│ Género                              │
│ ○ Femenino  ○ Masculino  ○ Otro    │
│                                     │
│ Dirección                           │
│ ┌─────────────────────────────────┐ │
│ │ Col. Escalón, San Salvador      │ │
│ └─────────────────────────────────┘ │
└─────────────────────────────────────┘
```

💡 **Tip:** Mientras más datos captures, mejor servicio podrás dar.

#### Información Médica (Importante)

```
┌─────────────────────────────────────┐
│ Alergias o Condiciones              │
│ ┌─────────────────────────────────┐ │
│ │ Alérgica a tinte con amoniaco   │ │
│ │ Cuero cabelludo sensible        │ │
│ └─────────────────────────────────┘ │
│                                     │
│ Notas Adicionales                   │
│ ┌─────────────────────────────────┐ │
│ │ Prefiere agua fría              │ │
│ │ Le gusta café sin azúcar        │ │
│ └─────────────────────────────────┘ │
└─────────────────────────────────────┘
```

⚠️ **MUY IMPORTANTE:** Siempre documenta alergias y condiciones médicas.

#### Foto de Perfil (Opcional)

```
┌─────────────────────────────────────┐
│ Foto de Perfil                      │
│                                     │
│     ┌─────────┐                     │
│     │  📷     │                     │
│     │         │                     │
│     └─────────┘                     │
│                                     │
│ [Subir Foto] [Usar Webcam]          │
└─────────────────────────────────────┘
```

**Formatos aceptados:**
- JPG, PNG, WEBP
- Máximo 5 MB
- Recomendado: 300x300 px

### 3.3 Guardar Cliente

```
┌─────────────────────────────────────┐
│                                     │
│  [Cancelar]   [Guardar Cliente]     │
│                                     │
└─────────────────────────────────────┘
```

Click en **"Guardar Cliente"**

✅ **Confirmación:**
```
┌─────────────────────────────────────┐
│  ✅ Cliente Creado                  │
│                                     │
│  María López García ha sido         │
│  agregada al sistema                │
│                                     │
│  [Crear Reserva] [Ver Perfil]       │
└─────────────────────────────────────┘
```

### 3.4 Validaciones

El sistema valida:

❌ **No permite:**
- Teléfono duplicado (ya existe otro cliente con ese número)
- Email inválido (formato incorrecto)
- Nombre vacío
- Apellido vacío
- Caracteres especiales en nombre

✅ **Sí permite:**
- Mismo nombre (diferentes apellidos)
- Cliente sin email
- Cliente sin dirección
- Cliente sin fecha de nacimiento

---

## 4. EDITAR CLIENTE

### 4.1 Acceder a Edición

**Opción A:** Desde lista de clientes
1. Busca el cliente
2. Click en "Editar" (ícono ✏️)

**Opción B:** Desde perfil del cliente
1. Abre perfil del cliente
2. Click en "Editar Información"

### 4.2 Campos Editables

Puedes modificar:
- ✏️ Nombre y apellido
- ✏️ Teléfono
- ✏️ Email
- ✏️ Fecha de nacimiento
- ✏️ Género
- ✏️ Dirección
- ✏️ Alergias/condiciones
- ✏️ Notas
- ✏️ Foto de perfil

**No puedes modificar:**
- 🔒 Fecha de registro
- 🔒 Historial de visitas
- 🔒 ID del cliente

### 4.3 Guardar Cambios

Click en "Guardar Cambios"

⚠️ **Nota:** Los cambios afectan reservas futuras, NO las pasadas.

---

## 5. BUSCAR CLIENTES

### 5.1 Búsqueda Rápida

En la parte superior de la lista:

```
┌─────────────────────────────────────┐
│ 🔍 Buscar cliente...                │
│                                     │
│ ┌─────────────────────────────────┐ │
│ │ María                           │ │
│ └─────────────────────────────────┘ │
└─────────────────────────────────────┘
```

**Busca por:**
- Nombre
- Apellido
- Teléfono
- Email

**Resultados en tiempo real:**
```
Mostrando 3 resultados para "María"

• María López García (7123-4567)
• María Rodríguez (7234-5678)
• Ana María González (7345-6789)
```

### 5.2 Búsqueda Avanzada

Click en "Búsqueda Avanzada"

```
┌─────────────────────────────────────┐
│ Búsqueda Avanzada                   │
├─────────────────────────────────────┤
│ Nombre: [________]                  │
│ Apellido: [________]                │
│ Teléfono: [________]                │
│ Email: [________]                   │
│                                     │
│ Registrado entre:                   │
│ Desde: [01/01/2025] Hasta: [Hoy]   │
│                                     │
│ Última visita:                      │
│ ○ Última semana                     │
│ ○ Último mes                        │
│ ○ Últimos 3 meses                   │
│ ○ Más de 3 meses                    │
│                                     │
│ Número de visitas:                  │
│ Mínimo: [__] Máximo: [__]           │
│                                     │
│ [Limpiar] [Buscar]                  │
└─────────────────────────────────────┘
```

### 5.3 Atajos de Búsqueda

- `Ctrl + K` - Activar búsqueda rápida
- Escribir teléfono completo - Busca exacto
- Escribir @ - Busca por email

---

## 6. HISTORIAL DEL CLIENTE

### 6.1 Ver Historial Completo

1. Click en el cliente
2. Ve a la pestaña "Historial"

### 6.2 Información del Historial

```
┌─────────────────────────────────────┐
│ María López García                  │
│ 📊 Estadísticas                     │
├─────────────────────────────────────┤
│ Primera visita: 15 Ene 2025         │
│ Última visita: 28 Oct 2025          │
│ Total de visitas: 12                │
│ Gasto total: $450                   │
│ Gasto promedio: $37.50              │
│ Frecuencia: 1 vez cada 2 semanas    │
└─────────────────────────────────────┘
```

### 6.3 Historial de Servicios

```
┌─────────────────────────────────────┐
│ Historial de Servicios              │
├─────────────────────────────────────┤
│ 📅 28 Oct 2025                      │
│ • Corte de cabello ($15)            │
│ • Peinado ($10)                     │
│ Estilista: Ana García               │
│ Total: $25                          │
├─────────────────────────────────────┤
│ 📅 14 Oct 2025                      │
│ • Tinte completo ($45)              │
│ • Tratamiento ($20)                 │
│ Estilista: María Rodríguez          │
│ Total: $65                          │
├─────────────────────────────────────┤
│ Ver todas las 12 visitas →          │
└─────────────────────────────────────┘
```

### 6.4 Servicios Favoritos

El sistema detecta automáticamente:

```
🌟 Servicios más frecuentes:
• Corte de cabello (10 veces)
• Tinte (5 veces)
• Peinado (8 veces)

💇 Estilista preferida:
Ana García (7 visitas)
```

💡 **Usa esta info para:**
- Sugerir servicios al reservar
- Asignar estilista preferida
- Ofrecer promociones personalizadas

---

## 7. DESACTIVAR/ACTIVAR CLIENTES

### 7.1 ¿Cuándo Desactivar?

Desactiva un cliente cuando:
- ❌ Ya no visita el salón (6+ meses)
- ❌ Se mudó de ciudad/país
- ❌ Cliente problema (solicitud del admin)

### 7.2 Cómo Desactivar

1. Abre perfil del cliente
2. Click en "⋮" (más opciones)
3. Click en "Desactivar Cliente"
4. Confirma la acción

```
⚠️ ¿Desactivar a María López?

El cliente NO se eliminará, solo quedará
inactivo y no aparecerá en búsquedas.

[Cancelar] [Sí, Desactivar]
```

### 7.3 ¿Qué Pasa al Desactivar?

- ❌ No aparece en búsquedas normales
- ❌ No se puede crear reserva nueva
- ✅ Historial se conserva
- ✅ Se puede reactivar después

### 7.4 Ver Clientes Inactivos

1. Ve a lista de clientes
2. Filtro: "Solo inactivos"
3. Verás todos los desactivados

### 7.5 Reactivar Cliente

1. Busca en clientes inactivos
2. Abre perfil
3. Click en "Reactivar Cliente"

✅ **El cliente vuelve a estar activo inmediatamente.**

---

## 8. CASOS DE USO PRÁCTICOS

### Caso 1: Cliente Nuevo Walk-In

**Situación:** Llega cliente sin cita, nunca ha venido

**Solución Rápida:**
1. Click "+ Nuevo Cliente"
2. Llena solo datos básicos:
   - Nombre: María
   - Apellido: López
   - Teléfono: 7123-4567
3. Guardar
4. Crear reserva inmediata

⏱️ **Tiempo:** 1 minuto

### Caso 2: Cliente con Mismo Nombre

**Situación:** Llamas a "María" y aparecen 5 resultados

**Solución:**
1. Busca por apellido: "López"
2. O busca por teléfono: "7123"
3. O pregunta fecha de última visita
4. Compara con historial

### Caso 3: Actualizar Teléfono

**Situación:** Cliente cambió de número

**Solución:**
1. Busca por nombre o teléfono viejo
2. Editar cliente
3. Actualiza teléfono
4. Guarda

⚠️ **Nota:** Actualiza inmediatamente para futuras reservas.

### Caso 4: Cliente VIP

**Situación:** Cliente muy frecuente merece atención especial

**Solución:**
1. Edita perfil del cliente
2. En "Notas" agrega:
   ```
   ⭐ CLIENTE VIP
   - Siempre reservar con Ana García
   - Le gusta café latte
   - Descuento 10% en servicios
   ```
3. Guardar

💡 **Tip:** Todos los empleados verán estas notas al hacer reserva.

### Caso 5: Exportar Base de Datos

**Situación:** Necesitas respaldo o para marketing

**Solución:**
1. Ve a lista de clientes
2. Click en "Exportar"
3. Elige formato:
   - Excel (.xlsx)
   - CSV (.csv)
   - PDF (para imprimir)
4. Descarga

⚠️ **Solo Administradores** pueden exportar.

---

## 9. TIPS Y MEJORES PRÁCTICAS

### ✅ Buenas Prácticas

**Captura email siempre que puedas**
```
✅ Bueno: Preguntar email discretamente
"¿Nos dejas tu email para enviarte promociones?"

❌ Malo: No preguntar
```

**Actualiza información regularmente**
- Pregunta si cambió teléfono
- Actualiza dirección si se mudó
- Verifica email anualmente

**Documenta alergias SIEMPRE**
```
✅ CRÍTICO: "Alérgica a amoniaco"
⚠️ IMPORTANTE: "Cuero cabelludo sensible"
💡 INFO: "Prefiere cortes cortos"
```

**Usa notas para personalización**
```
Ejemplos buenos:
• "Le gusta conversar, muy sociable"
• "Prefiere ambiente tranquilo"
• "Siempre llega 10 min tarde"
• "Trae a su hija (3 años)"
```

### ⚡ Trucos de Productividad

**Búsqueda ultrarrápida:**
- Solo escribe primeras 3 letras del nombre
- O últimos 4 dígitos del teléfono

**Crear y reservar en un paso:**
- Al crear cliente desde reserva
- Click "Guardar y Seleccionar"
- Regresa automáticamente a crear reserva

**Atajos de teclado:**
- `Ctrl + F` en lista - Activar búsqueda
- `Enter` en búsqueda - Abrir primer resultado
- `Esc` - Cerrar perfil

### 💡 Tips Avanzados

**Para salones grandes:**
- Usa tags/etiquetas (si disponible)
- Ejemplos: "VIP", "Frecuente", "Nuevo"

**Para marketing:**
- Filtra clientes por última visita
- Contacta los que no vienen hace 2+ meses
- Ofrece promoción de "regreso"

**Para lealtad:**
- Marca cumpleaños
- Sistema puede enviar mensaje automático
- Ofrece descuento de cumpleaños

---

## 10. SOLUCIÓN DE PROBLEMAS

### Problema: No puedo crear cliente - "Teléfono ya existe"

**Causa:** Ya hay un cliente con ese teléfono

**Solución:**
1. Busca por ese teléfono
2. Verifica si es el mismo cliente
3. Si es el mismo: usa el existente
4. Si es diferente: el cliente dio número equivocado

### Problema: Cliente tiene datos duplicados

**Situación:** Mismo cliente aparece 2 veces

**Solución (Solo Admin):**
1. Identifica cuál tiene más historial
2. Edita el que tiene menos visitas
3. Copia notas importantes al principal
4. Desactiva el duplicado
5. Avisa a soporte para fusionar (si es crítico)

### Problema: No puedo editar cliente

**Causas posibles:**

❌ **No tienes permiso**
- Solo empleados y admin pueden editar
- Contacta a tu administrador

❌ **Cliente está en reserva activa**
- Espera que termine la cita
- O edita después

### Problema: Búsqueda no encuentra al cliente

**Verifica:**

1. ¿Escribiste el nombre correcto?
2. ¿El cliente está activo?
   - Cambia filtro a "Todos"
3. ¿Buscas por teléfono?
   - Prueba sin guiones: 71234567
4. Prueba búsqueda avanzada

### Problema: Historial no muestra todas las visitas

**Causa:** Hay paginación

**Solución:**
- Scroll down hasta el final
- Click en "Ver más" o "Cargar más"
- O ajusta filtro de fecha

---

## 📚 RECURSOS ADICIONALES

- 📺 [Video: Crear y gestionar clientes](../recursos/VIDEOS.md#clientes)
- 📺 [Video: Búsqueda avanzada](../recursos/VIDEOS.md#busqueda)
- 📖 [FAQ de Clientes](../recursos/FAQ.md#clientes)
- 📖 [Glosario](../recursos/GLOSARIO.md)

---

## ✅ CHECKLIST DE DOMINIO

**Básico:**
- [ ] Crear un cliente nuevo
- [ ] Buscar un cliente por nombre
- [ ] Buscar un cliente por teléfono
- [ ] Editar información básica

**Intermedio:**
- [ ] Ver historial completo
- [ ] Usar búsqueda avanzada
- [ ] Agregar notas importantes
- [ ] Desactivar/activar clientes

**Avanzado:**
- [ ] Identificar clientes VIP
- [ ] Usar filtros eficientemente
- [ ] Exportar base de datos
- [ ] Mantener datos actualizados

---

**¿Completaste el checklist básico?** ¡Ya dominas la Gestión de Clientes! 🎉

---

**Última actualización:** 30 de Octubre de 2025
**Versión:** 1.0.0
**Autor:** Equipo MultiSalon

[⬅️ Anterior: Reservas](./GUIA-RESERVAS.md) | [⬆️ Volver al Índice](../README.md) | [➡️ Siguiente: Servicios](./GUIA-SERVICIOS.md)
