# ⚙️ GUÍA - PANEL DE ADMINISTRACIÓN

**Versión:** 1.0.0
**Nivel:** Administrador SOLO
**Tiempo:** 15 minutos

---

## 📋 CONTENIDO

1. [Gestión de Usuarios](#gestión-de-usuarios)
2. [Gestión de Estilistas](#gestión-de-estilistas)
3. [Configuración General](#configuración-general)
4. [Configuración Avanzada](#configuración-avanzada)

---

## GESTIÓN DE USUARIOS

### Roles del Sistema

**1. Cliente** 👤
- Ver servicios
- Hacer pre-reservas
- Sin acceso al panel admin

**2. Empleado** 👨‍💼
- Crear/ver reservas
- Gestionar clientes
- NO puede eliminar

**3. Admin Salón** 👑
- Acceso total
- Configuración
- Eliminar registros

### Ver Usuarios

**Menú > Administración > Usuarios**

```
┌─────────────────────────────────┐
│ Ana García                      │
│ 📧 ana@salon.com                │
│ 🎭 Rol: Empleado                │
│ ✅ Activo                        │
│ [Editar] [Desactivar]           │
├─────────────────────────────────┤
│ Carlos Martínez                 │
│ 📧 carlos@salon.com             │
│ 🎭 Rol: Admin Salón             │
│ ✅ Activo                        │
│ [Editar] [Desactivar]           │
└─────────────────────────────────┘
```

### Crear Usuario

1. Click "+ Nuevo Usuario"
2. Completar:

```
Nombre *: Ana
Apellido *: García
Email *: ana@salon.com
Contraseña Temporal *: ********

Rol *: [Seleccionar ▼]
  ○ Cliente
  ○ Empleado
  ● Admin Salón

Estado:
● Activo
○ Inactivo

[Cancelar] [Crear Usuario]
```

3. Usuario recibe email con contraseña

⚠️ **Seguridad:**
- Sistema obliga cambiar contraseña en primer login
- Contraseña mínimo 8 caracteres

### Editar Usuario

**Puedes cambiar:**
- ✏️ Nombre/Apellido
- ✏️ Email
- ✏️ Rol
- ✏️ Estado (activo/inactivo)

**NO puedes cambiar:**
- 🔒 Contraseña (usuario la cambia desde su perfil)

### Restablecer Contraseña

**Si un usuario olvidó su contraseña:**

1. Busca el usuario
2. Click "⋮" > "Restablecer Contraseña"
3. Sistema envía email automático
4. Usuario sigue enlace y crea nueva contraseña

---

## GESTIÓN DE ESTILISTAS

### Ver Estilistas

**Menú > Administración > Estilistas**

```
┌─────────────────────────────────┐
│ 💇 Ana García                   │
│ Especialidades:                 │
│ • Corte  • Tinte  • Peinado     │
│ Horario: Lun-Sab 9AM-6PM        │
│ ✅ Activo                        │
│ [Editar] [Horarios] [Desactivar]│
└─────────────────────────────────┘
```

### Crear Estilista

1. Click "+ Nuevo Estilista"
2. Completar:

```
Nombre *: María
Apellido *: Rodríguez

Foto: [Subir]

Especialidades:
☑ Corte de cabello
☑ Tinte
☑ Tratamientos
☐ Uñas
☑ Peinado

Descripción:
┌────────────────────────────────┐
│ 10 años de experiencia         │
│ Especialista en color          │
└────────────────────────────────┘

Horario:
Lunes:    [09:00] a [18:00] ☑
Martes:   [09:00] a [18:00] ☑
Miércoles:[09:00] a [18:00] ☑
Jueves:   [09:00] a [18:00] ☑
Viernes:  [09:00] a [18:00] ☑
Sábado:   [09:00] a [14:00] ☑
Domingo:  No trabaja ☐

[Guardar]
```

### Configurar Horarios

**Horarios Regulares:**
- Define días y horas de trabajo
- Mismo horario todas las semanas

**Excepciones:**
```
Fecha: 25 Dic 2025
Motivo: Navidad
Estado: No disponible
```

**Vacaciones:**
```
Desde: 01 Ene 2026
Hasta: 07 Ene 2026
Motivo: Vacaciones
```

Sistema bloquea automáticamente esos días.

### Desactivar Estilista

**¿Cuándo?**
- Ya no trabaja en el salón
- Licencia temporal

**Qué pasa:**
- NO aparece al crear reservas
- Reservas pasadas se conservan
- Se puede reactivar después

---

## CONFIGURACIÓN GENERAL

### Información del Salón

**Menú > Administración > Configuración**

```
┌────────────────────────────────┐
│ INFORMACIÓN BÁSICA             │
├────────────────────────────────┤
│ Nombre del Salón *             │
│ Bella Estética                 │
│                                │
│ Dirección *                    │
│ Col. Escalón, San Salvador     │
│                                │
│ Teléfono *                     │
│ +503 2222-3333                 │
│                                │
│ Email *                        │
│ info@bellaestetica.com         │
└────────────────────────────────┘
```

### Horarios del Salón

```
┌────────────────────────────────┐
│ HORARIOS DE ATENCIÓN           │
├────────────────────────────────┤
│ Lunes a Viernes                │
│ Abre:  [09:00]                 │
│ Cierra: [19:00]                │
│                                │
│ Sábado                         │
│ Abre:  [09:00]                 │
│ Cierra: [14:00]                │
│                                │
│ Domingo                        │
│ ☑ Cerrado                      │
└────────────────────────────────┘
```

### Configuración de Reservas

```
┌────────────────────────────────┐
│ CONFIGURACIÓN DE CITAS         │
├────────────────────────────────┤
│ Duración de slot               │
│ ○ 15 minutos                   │
│ ● 30 minutos (recomendado)     │
│ ○ 60 minutos                   │
│                                │
│ Reservas futuras               │
│ Máximo: [90] días adelante     │
│                                │
│ Cancelación                    │
│ Permitir hasta: [24] horas antes│
│                                │
│ Pre-Reservas                   │
│ ☑ Permitir desde web pública   │
│ ☑ Enviar email al recibir      │
└────────────────────────────────┘
```

### Notificaciones

```
┌────────────────────────────────┐
│ NOTIFICACIONES                 │
├────────────────────────────────┤
│ Email                          │
│ ☑ Nueva pre-reserva            │
│ ☑ Reserva cancelada            │
│ ☐ Cliente no asistió           │
│                                │
│ WhatsApp (próximamente)        │
│ ☐ Recordatorio 24h antes       │
│ ☐ Confirmación de reserva      │
└────────────────────────────────┘
```

---

## CONFIGURACIÓN AVANZADA

### Duraciones Predefinidas

**Menú > Administración > Duraciones**

Define duraciones comunes para crear servicios rápido:

```
┌────────────────────────────────┐
│ DURACIONES PREDEFINIDAS        │
├────────────────────────────────┤
│ • 30 minutos  (1 slot)         │
│ • 1 hora      (2 slots)        │
│ • 1.5 horas   (3 slots)        │
│ • 2 horas     (4 slots)        │
│ • 3 horas     (6 slots)        │
│                                │
│ [+ Agregar] [Editar]           │
└────────────────────────────────┘
```

### Mantenimiento Automático

**Sistema ejecuta automáticamente:**

**📅 Mensual (día 1 al mediodía):**
- Genera slots de reserva para próximos 30 días
- Por cada estilista activo
- Según horarios configurados

**🗑️ Trimestral (día 3 cada 3 meses):**
- Elimina reservas mayores a 90 días
- Libera espacio en base de datos
- Mantiene sistema ágil

⚠️ **Esto es automático, NO requiere intervención**

### Exportar Datos

**Menú > Administración > Exportar**

```
┌────────────────────────────────┐
│ EXPORTAR DATOS                 │
├────────────────────────────────┤
│ Clientes                       │
│ [Excel] [CSV] [PDF]            │
│                                │
│ Reservas                       │
│ Desde: [01/01/2025]            │
│ Hasta: [31/12/2025]            │
│ [Exportar]                     │
│                                │
│ Servicios                      │
│ [Excel] [CSV] [PDF]            │
│                                │
│ Productos                      │
│ [Excel] [CSV] [PDF]            │
└────────────────────────────────┘
```

### Respaldos

**Sistema hace respaldo automático:**
- Firebase Backup diario
- Almacenado en Google Cloud
- Retención: 30 días

**Para respaldo manual:**
1. Exporta todos los módulos
2. Guarda en lugar seguro
3. Recomendación: Mensual

---

## BUENAS PRÁCTICAS

### Usuarios

✅ **Recomendaciones:**
- Mínimo 2 admins (por seguridad)
- Revisa usuarios inactivos mensualmente
- Cambia contraseñas cada 90 días
- Usa emails reales (para recuperación)

⚠️ **Evita:**
- Compartir contraseñas
- Crear usuarios "genéricos"
- Dar permisos de admin innecesariamente

### Estilistas

✅ **Recomendaciones:**
- Actualiza horarios semanalmente
- Marca vacaciones con anticipación
- Fotos profesionales de cada estilista
- Especialidades claras y precisas

### Configuración

✅ **Recomendaciones:**
- Revisa configuración mensualmente
- Ajusta horarios según demanda
- Mantén información de contacto actualizada

---

## CASOS PRÁCTICOS

### Caso 1: Nuevo Empleado

**Situación:** Contratas nueva recepcionista

**Pasos:**
1. Crear Usuario
   - Rol: Empleado
   - Email: recepcion@salon.com
2. Enviar credenciales
3. Primera sesión: cambiar contraseña
4. Capacitar en funciones básicas

### Caso 2: Estilista de Vacaciones

**Situación:** Ana va de vacaciones 2 semanas

**Solución:**
1. Ve a Estilistas > Ana
2. Click "Horarios"
3. Agregar excepción:
   - Desde: 01 Dic
   - Hasta: 15 Dic
   - Motivo: Vacaciones
4. Sistema bloquea automáticamente

### Caso 3: Cambio de Horario

**Situación:** Cierras a las 6PM en vez de 7PM

**Pasos:**
1. Configuración > Horarios
2. Cambia cierre a 18:00
3. Guardar
4. Afecta desde mañana
5. Reservas existentes se mantienen

---

## CHECKLIST DE ADMINISTRADOR

**Setup Inicial:**
- [ ] Crear usuarios del equipo
- [ ] Configurar estilistas
- [ ] Definir horarios del salón
- [ ] Configurar notificaciones
- [ ] Personalizar apariencia

**Mantenimiento Semanal:**
- [ ] Revisar pre-reservas pendientes
- [ ] Verificar disponibilidad estilistas
- [ ] Revisar alertas de stock (productos)

**Mantenimiento Mensual:**
- [ ] Exportar datos para respaldo
- [ ] Revisar usuarios activos
- [ ] Actualizar información de contacto si cambió

---

**Última actualización:** 12 Nov 2025
[⬅️ Anterior](/documentacion/GUIA-PERSONALIZACION.md) | [⬆️ Índice](/documentacion/README.md) | [➡️ Siguiente: FAQ](/documentacion/FAQ.md)
