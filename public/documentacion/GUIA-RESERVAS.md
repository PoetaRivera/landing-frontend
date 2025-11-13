# 📅 GUÍA COMPLETA - SISTEMA DE RESERVAS

**Versión:** 1.0.0
**Nivel:** Intermedio
**Tiempo de lectura:** 25 minutos
**Última actualización:** 12 de Noviembre de 2025

---

## 📋 TABLA DE CONTENIDOS

1. [Introducción](#1-introducción)
2. [Conceptos Clave](#2-conceptos-clave)
3. [Ver el Calendario](#3-ver-el-calendario)
4. [Crear una Reserva](#4-crear-una-reserva)
5. [Editar una Reserva](#5-editar-una-reserva)
6. [Cancelar/Eliminar Reserva](#6-cancelareliminar-reserva)
7. [Pre-Reservas](#7-pre-reservas)
8. [Casos de Uso Prácticos](#8-casos-de-uso-prácticos)
9. [Tips y Mejores Prácticas](#9-tips-y-mejores-prácticas)
10. [Solución de Problemas](#10-solución-de-problemas)

---

## 1. INTRODUCCIÓN

El **Sistema de Reservas** es el corazón de MultiSalon. Te permite gestionar todas las citas de tu salón de forma eficiente, visual y organizada.

### ¿Qué puedes hacer?

- ✅ Ver calendario completo del salón
- ✅ Crear nuevas reservas
- ✅ Editar citas existentes
- ✅ Cancelar o eliminar reservas
- ✅ Gestionar pre-reservas de clientes
- ✅ Ver disponibilidad de estilistas
- ✅ Asignar servicios y duraciones

### ¿Quién puede usar este módulo?

- 👨‍💼 **Empleados** - Ver y crear reservas
- 👑 **Administradores** - Todo lo anterior + eliminar

---

## 2. CONCEPTOS CLAVE

### 2.1 Sistema de Reservas y Horarios

**Horarios disponibles:**
- **Inicio:** 5:00 AM
- **Fin:** 10:00 PM
- **Duración mínima:** 30 minutos

**Cómo funciona:**
- Cada reserva tiene una **hora de inicio** y **hora de fin**
- La duración se calcula automáticamente
- La duración mínima es 30 minutos
- Todas las duraciones son múltiplos de 30 minutos

**Ejemplo de reservas:**
```
Cliente 1:  09:00 AM - 10:30 AM  (1 hora 30 min)
Cliente 2:  10:30 AM - 11:00 AM  (30 minutos)
Cliente 3:  11:00 AM - 01:30 PM  (2 horas 30 min)
Cliente 4:  02:00 PM - 04:00 PM  (2 horas)
```

### 2.2 Duraciones Predefinidas

El sistema tiene **6 duraciones estándar** para facilitar la selección:

| Duración | Formato | Uso común |
|----------|---------|-----------|
| **30 minutos** | 00:30 | Corte de cabello, retoque |
| **1 hora** | 01:00 | Tinte, peinado |
| **1.5 horas** | 01:30 | Tinte completo, manicure + pedicure |
| **2 horas** | 02:00 | Keratina, tratamiento capilar |
| **2.5 horas** | 02:30 | Keratina + corte, mechas completas |
| **3 horas** | 03:00 | Maquillaje de novia, alisado completo |

**Características:**
- ✅ Cada servicio tiene una **duración sugerida** (la que más usa)
- ✅ Puedes **ajustar la duración** en cada reserva individual
- ✅ Si un cliente necesita más o menos tiempo, lo cambias al momento
- ✅ Existe un servicio especial llamado **"Multi Servicio"** para cuando un cliente quiere varios servicios en una sola cita

**Ejemplo:**
```
Servicio "Tinte" tiene duración sugerida: 1 hora

Cliente A viene para tinte rápido:
- Usas 30 minutos (ajustas la duración)

Cliente B tiene cabello largo:
- Usas 1.5 horas (ajustas la duración)
```

💡 **Importante:** La duración sugerida es solo una guía. Siempre puedes ajustarla según las necesidades del cliente.

### 2.3 Estados de Reserva

Una reserva puede tener diferentes estados:

- **Confirmada** ✅ - Cita normal, activa
- **Completada** ✔️ - Servicio ya realizado
- **Cancelada** ❌ - Cliente canceló
- **No asistió** 🚫 - Cliente no llegó

### 2.4 Reserva vs Pre-Reserva

**Reserva:**
- Creada por empleado o admin
- Inmediatamente confirmada
- Aparece en calendario
- Slot queda ocupado

**Pre-Reserva:**
- Solicitud hecha por el cliente
- Requiere aprobación
- NO aparece en calendario (hasta aprobar)
- Slot aún disponible

---

## 3. VER EL CALENDARIO

### 3.1 Acceder al Calendario

1. Click en **"Reservas"** en el menú lateral
2. Verás el calendario principal

### 3.2 Vistas del Calendario

El sistema ofrece 3 vistas:

#### Vista por Día
```
┌─────────────────────────────────────┐
│  Lunes 30 de Octubre                │
├──────────┬────────┬────────┬────────┤
│  Hora    │ Ana    │ María  │ Carlos │
├──────────┼────────┼────────┼────────┤
│ 08:00 AM │ [Cita] │        │        │
│ 08:30 AM │ [Cita] │ [Cita] │        │
│ 09:00 AM │        │ [Cita] │ [Cita] │
└──────────┴────────┴────────┴────────┘
```
**Uso:** Para ver detalle de un día específico

#### Vista por Semana
```
┌────────┬─────┬─────┬─────┬─────┬─────┐
│        │ Lun │ Mar │ Mié │ Jue │ Vie │
├────────┼─────┼─────┼─────┼─────┼─────┤
│  Ana   │  3  │  5  │  2  │  4  │  6  │
│  María │  4  │  3  │  5  │  3  │  4  │
│ Carlos │  2  │  4  │  3  │  5  │  3  │
└────────┴─────┴─────┴─────┴─────┴─────┘
```
**Uso:** Para planificación semanal

#### Vista por Estilista
```
Estilista: Ana García
├─ Lunes: 3 citas
├─ Martes: 5 citas
├─ Miércoles: 2 citas
└─ Jueves: 4 citas
```
**Uso:** Para ver agenda individual

### 3.3 Navegación del Calendario

**Botones de navegación:**
- ⬅️ **Anterior** - Retrocede un día/semana
- ➡️ **Siguiente** - Avanza un día/semana
- 📅 **Hoy** - Regresa a la fecha actual
- 🔍 **Buscar** - Buscar reserva específica

**Filtros disponibles:**
- Por estilista
- Por fecha
- Por cliente
- Por servicio
- Por estado

### 3.4 Información en el Calendario

Cada cita muestra:
```
┌─────────────────────────┐
│ 09:00 AM - 10:30 AM     │ ← Horario
│ María López             │ ← Cliente
│ Tinte + Corte           │ ← Servicio
│ Ana García              │ ← Estilista
└─────────────────────────┘
```

**Códigos de color:**
- 🟢 Verde - Confirmada
- 🔵 Azul - Completada
- 🟡 Amarillo - Pendiente
- 🔴 Rojo - Cancelada

---

## 4. CREAR UNA RESERVA

### 4.1 Proceso Completo

#### Paso 1: Abrir Formulario

**Opción A:** Click en "Nueva Reserva" (botón superior)
**Opción B:** Click en un slot vacío del calendario
**Opción C:** Atajo de teclado `Ctrl + N`

#### Paso 2: Seleccionar Fecha y Hora

```
┌─────────────────────────────────┐
│ Fecha: [30/10/2025]      📅    │
│ Hora:  [09:00 AM]        🕐    │
└─────────────────────────────────┘
```

💡 **Tip:** Si clickeaste en el calendario, fecha y hora ya vienen pre-seleccionadas.

#### Paso 3: Seleccionar Estilista

```
┌─────────────────────────────────┐
│ Estilista: [Seleccionar...]  ▼ │
│                                 │
│ ○ Ana García                    │
│ ○ María Rodríguez               │
│ ○ Carlos Martínez               │
└─────────────────────────────────┘
```

**El sistema muestra:**
- ✅ Estilistas disponibles en ese horario
- ❌ Estilistas no disponibles (ocupados)

⚠️ **Nota:** Solo aparecen estilistas activos.

#### Paso 4: Seleccionar Cliente

**Opción A: Cliente Existente**
```
┌─────────────────────────────────┐
│ Cliente: [Buscar...]         🔍 │
│                                 │
│ Resultados:                     │
│ • María López (7123-4567)       │
│ • María García (7234-5678)      │
└─────────────────────────────────┘
```

Escribe nombre o teléfono para buscar.

**Opción B: Cliente Nuevo**

Click en "+ Crear Cliente Nuevo"

Llena formulario rápido:
- Nombre *
- Apellido *
- Teléfono *
- Email (opcional)

Click "Guardar y Seleccionar"

#### Paso 5: Seleccionar Servicio(s)

```
┌─────────────────────────────────┐
│ Servicios:                      │
│                                 │
│ ☑ Corte de cabello ($15)        │
│ ☐ Tinte completo ($45)          │
│ ☑ Peinado ($10)                 │
│                                 │
│ Total: $25                      │
│ Duración: 1 hora                │
└─────────────────────────────────┘
```

**Puedes seleccionar múltiples servicios.**

⚡ **El sistema calcula automáticamente:**
- Duración total
- Precio total
- Slots necesarios

#### Paso 6: Notas Adicionales (Opcional)

```
┌─────────────────────────────────┐
│ Notas:                          │
│ ┌─────────────────────────────┐ │
│ │ Cliente prefiere agua fría  │ │
│ │ para el lavado              │ │
│ └─────────────────────────────┘ │
└─────────────────────────────────┘
```

Usa este campo para:
- Preferencias del cliente
- Alergias o precauciones
- Recordatorios especiales
- Solicitudes específicas

#### Paso 7: Confirmar

```
┌─────────────────────────────────┐
│ Resumen de Reserva              │
├─────────────────────────────────┤
│ Cliente: María López            │
│ Fecha: 30 Oct 2025, 9:00 AM     │
│ Estilista: Ana García           │
│ Servicios:                      │
│  - Corte ($15)                  │
│  - Peinado ($10)                │
│ Total: $25 | Duración: 1h       │
├─────────────────────────────────┤
│  [Cancelar]  [Crear Reserva]    │
└─────────────────────────────────┘
```

Click en **"Crear Reserva"**

✅ **La reserva se guarda automáticamente y aparece en el calendario.**

### 4.2 Validaciones Automáticas

El sistema verifica:

❌ **No permite:**
- Hora en el pasado
- Estilista ocupado en ese horario
- Horario fuera de 5:00 AM - 10:00 PM
- Cliente sin nombre
- Servicio sin seleccionar

✅ **Sí permite:**
- Reservas el mismo día (walk-ins)
- Reservas con meses de anticipación
- Múltiples servicios
- Mismo cliente, múltiples citas el mismo día

### 4.3 Confirmación Visual

Después de crear, verás:

```
┌─────────────────────────────────┐
│  ✅ Reserva Creada              │
│                                 │
│  La cita ha sido confirmada     │
│  para María López               │
│                                 │
│  [Ver en Calendario] [Cerrar]   │
└─────────────────────────────────┘
```

---

## 5. EDITAR UNA RESERVA

### 5.1 ¿Cuándo Editar?

Edita una reserva cuando necesites cambiar:
- ✏️ Fecha u hora
- ✏️ Estilista asignado
- ✏️ Servicio(s)
- ✏️ Cliente
- ✏️ Notas

### 5.2 Cómo Editar

#### Opción A: Desde el Calendario

1. Click en la cita que quieres editar
2. Se abre ventana con detalles
3. Click en "Editar"
4. Modifica lo necesario
5. Click en "Guardar Cambios"

#### Opción B: Desde Lista de Reservas

1. Ve a "Reservas" > "Listar Todas"
2. Busca la reserva
3. Click en ícono ✏️ (editar)
4. Modifica
5. Guardar

### 5.3 Cambiar Fecha/Hora

```
Antes:
30 Oct 2025, 9:00 AM

Después:
31 Oct 2025, 2:00 PM
```

⚠️ **El sistema valida:**
- Nueva hora disponible para el estilista
- Horario dentro del rango permitido

### 5.4 Cambiar Estilista

```
De: Ana García
A:  María Rodríguez
```

⚠️ **Requisitos:**
- Nuevo estilista debe estar disponible
- Nuevo estilista debe ofrecer ese servicio

### 5.5 Agregar/Quitar Servicios

**Agregar:**
- Marca servicios adicionales
- Sistema recalcula duración y precio

**Quitar:**
- Desmarca servicios
- Sistema recalcula

⚠️ **Mínimo:** Debe quedar al menos 1 servicio

---

## 6. CANCELAR/ELIMINAR RESERVA

### 6.1 Cancelar vs Eliminar

**Cancelar:**
- ✅ La reserva queda en el historial
- ✅ Marcada como "Cancelada"
- ✅ Libera el slot en el calendario
- ✅ Se puede ver en reportes

**Eliminar:**
- ❌ Se borra completamente
- ❌ NO aparece en historial
- ❌ No se puede recuperar
- 🔒 Solo Administradores

💡 **Recomendación:** SIEMPRE cancela, NO elimines.

### 6.2 Cómo Cancelar

1. Abre la reserva
2. Click en "Cancelar Reserva"
3. Confirma la acción
4. (Opcional) Indica motivo:
   - Cliente canceló
   - Estilista no disponible
   - Otro

### 6.3 Cómo Eliminar (Solo Admin)

1. Abre la reserva
2. Click en "⋮" (más opciones)
3. Click en "Eliminar Permanentemente"
4. Escribe "ELIMINAR" para confirmar
5. Click en "Sí, Eliminar"

⚠️ **ADVERTENCIA:** Esta acción es IRREVERSIBLE.

---

## 7. PRE-RESERVAS

### 7.1 ¿Qué son?

Las **pre-reservas** son solicitudes de cita hechas por clientes desde la página pública del salón.

**Características:**
- 📝 NO son citas confirmadas
- 📝 NO ocupan espacio en calendario (hasta aprobar)
- 📝 Requieren revisión manual
- 📝 Se pueden aprobar o rechazar

### 7.2 Ver Pre-Reservas

1. Ve a "Reservas" > "Pre-Reservas"
2. Verás lista de solicitudes pendientes

```
┌─────────────────────────────────┐
│ Pre-Reservas Pendientes (3)     │
├─────────────────────────────────┤
│ María López                     │
│ Solicitó: 30 Oct, 2:00 PM       │
│ Servicio: Tinte                 │
│ [Aprobar] [Rechazar] [Ver]      │
├─────────────────────────────────┤
│ Ana Martínez                    │
│ ...                             │
└─────────────────────────────────┘
```

### 7.3 Aprobar Pre-Reserva

1. Click en "Ver" o en la pre-reserva
2. Revisa la información:
   - Cliente
   - Fecha/hora solicitada
   - Servicio deseado
   - Mensaje del cliente
3. Verifica disponibilidad
4. Click en "Aprobar"

**Opciones al aprobar:**
- ✅ Mantener fecha/hora solicitada
- ✏️ Proponer fecha/hora diferente
- ✏️ Asignar estilista específico

5. Click en "Confirmar y Crear Reserva"

✅ **La pre-reserva se convierte en reserva normal.**

### 7.4 Rechazar Pre-Reserva

1. Abre la pre-reserva
2. Click en "Rechazar"
3. (Opcional) Indica motivo:
   - No hay disponibilidad
   - Servicio no disponible
   - Otro
4. Confirmar

El cliente recibe notificación (si dejó email).

---

## 8. CASOS DE USO PRÁCTICOS

### Caso 1: Walk-In (Cliente Sin Cita)

**Situación:** Cliente llega sin reserva

**Solución:**
1. Revisa calendario para ver disponibilidad inmediata
2. Identifica estilista disponible
3. Crea nueva reserva con hora actual
4. Si es cliente nuevo, créalo rápido
5. Asigna servicio
6. Guardar

⏱️ **Tiempo:** 2 minutos

### Caso 2: Cliente Llama para Reagendar

**Situación:** Cliente quiere cambiar su cita del viernes a sábado

**Solución:**
1. Busca la reserva actual (por nombre o teléfono)
2. Abre y click "Editar"
3. Cambia fecha a sábado
4. Verifica disponibilidad del mismo estilista
5. Si no está disponible, ofrece otro estilista u hora
6. Guardar cambios

### Caso 3: Cita Grupal

**Situación:** 3 amigas quieren venir juntas a las 2 PM

**Solución:**
1. Verifica disponibilidad de 3 estilistas a las 2 PM
2. Crea 3 reservas separadas:
   - Reserva 1: Cliente A con Estilista X
   - Reserva 2: Cliente B con Estilista Y
   - Reserva 3: Cliente C con Estilista Z
3. Agrega nota en cada una: "Grupo - Llegaron juntas"

### Caso 4: Servicio Largo (4 horas)

**Situación:** Cliente reserva keratina completa (4 horas)

**Solución:**
1. Selecciona servicio "Keratina Completa"
2. Ajusta duración si es necesario (3 o 4 horas según el caso)
3. Verifica que estilista esté libre el tiempo necesario
4. Crear reserva
5. Sistema bloquea ese horario en el calendario

### Caso 5: Cliente No Llegó (No-Show)

**Situación:** Cliente tenía cita a las 10 AM pero no llegó

**Solución:**
1. A las 10:30 (después de esperar 30 min)
2. Abre la reserva
3. Click en "Marcar como No Asistió"
4. Confirmar
5. El slot se libera para otros clientes

💡 **Tip:** Esto ayuda con estadísticas de no-shows.

---

## 9. TIPS Y MEJORES PRÁCTICAS

### ✅ Buenas Prácticas

**Siempre agrega notas importantes**
```
✅ Bueno: "Cliente alérgica a tinte con amoniaco"
❌ Malo: Dejar vacío
```

**Confirma citas 24 horas antes**
- Llama o manda WhatsApp
- Reduce no-shows en 50%

**Deja espacios entre citas**
```
✅ Bueno:
09:00 - 10:00  Cliente A
10:30 - 11:30  Cliente B  ← 30 min buffer

❌ Malo:
09:00 - 10:00  Cliente A
10:00 - 11:00  Cliente B  ← Sin tiempo para limpiar
```

**Bloquea horas de almuerzo**
- Crea "reservas" bloqueadas
- Cliente: "ALMUERZO"
- Previene reservas en ese horario

**Usa colores consistentemente**
- Asigna color por tipo de servicio
- Fácil visualización en calendario

### ⚡ Atajos de Productividad

- `Ctrl + N` - Nueva reserva
- `Ctrl + F` - Buscar reserva
- `Esc` - Cerrar modal
- Click en slot vacío - Crear reserva en ese horario

### 💡 Tips Avanzados

**Para días ocupados:**
1. Usa vista de DÍA
2. Imprime el calendario
3. Déjalo en recepción como referencia

**Para evitar confusiones:**
- Siempre confirma nombre completo del cliente
- Lee los servicios en voz alta al confirmar
- Repite fecha y hora

**Para ahorrar tiempo:**
- Crea "clientes frecuentes" marcados con ⭐
- Aparecen primero en búsquedas

---

## 10. SOLUCIÓN DE PROBLEMAS

### Problema: No puedo crear reserva

**Posibles causas:**

❌ **Estilista ocupado**
- Solución: Elige otro estilista u otra hora

❌ **Hora en el pasado**
- Solución: Selecciona fecha/hora futura

❌ **Fuera de horario (antes 5 AM o después 10 PM)**
- Solución: Elige hora dentro del rango

❌ **Cliente sin nombre**
- Solución: Completa datos del cliente

### Problema: La reserva no aparece en el calendario

**Verifica:**

1. ¿Se guardó correctamente?
   - Debes ver confirmación verde
2. ¿Estás viendo la fecha correcta?
   - Navega a la fecha de la cita
3. ¿Filtros activos?
   - Quita filtros de estilista/servicio
4. Refresca la página (F5)

### Problema: Cliente dice que tenía cita pero no aparece

**Pasos:**

1. Busca por nombre del cliente
2. Busca por teléfono
3. Revisa reservas canceladas
4. Revisa pre-reservas pendientes
5. Pregunta fecha exacta al cliente

**Si no la encuentras:**
- Puede que nunca se confirmó
- Revisa si hay pre-reserva pendiente
- Crea nueva cita inmediatamente

### Problema: Doble reserva (dos citas al mismo tiempo)

**Esto NO debería pasar** (el sistema lo previene)

Si sucede:
1. Reporta el bug a soporte
2. Cancela una de las dos
3. Reagenda con el cliente afectado

### Problema: Quiero ver reservas antiguas

1. Ve a "Reservas" > "Historial"
2. Filtra por rango de fechas
3. Incluye reservas completadas y canceladas

⚠️ **Nota:** Reservas muy antiguas (90+ días) pueden estar archivadas.

---

## 📚 RECURSOS ADICIONALES

- 📖 [FAQ de Reservas](/documentacion/FAQ.md#reservas)
- 📖 [Solución de Problemas](/documentacion/TROUBLESHOOTING.md)

---

## ✅ CHECKLIST DE DOMINIO

Marca lo que ya sabes hacer:

**Básico:**
- [ ] Ver el calendario
- [ ] Crear una reserva simple
- [ ] Buscar una reserva existente
- [ ] Editar fecha/hora de una cita

**Intermedio:**
- [ ] Crear reserva con múltiples servicios
- [ ] Gestionar pre-reservas
- [ ] Cancelar reservas correctamente
- [ ] Manejar walk-ins

**Avanzado:**
- [ ] Optimizar calendario para días ocupados
- [ ] Usar filtros eficientemente
- [ ] Gestionar citas grupales
- [ ] Bloquear horarios estratégicamente

---

**¿Completaste todo el checklist básico?** ¡Felicidades! Ya dominas el Sistema de Reservas. 🎉

---

**Última actualización:** 12 de Noviembre de 2025
**Versión:** 1.0.0
**Autor:** Equipo MultiSalon

[⬅️ Volver al Índice](/documentacion/README.md) | [➡️ Siguiente: Gestión de Clientes](/documentacion/GUIA-CLIENTES.md)
