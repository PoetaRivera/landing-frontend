# 💅 GUÍA DE DISEÑOS DE UÑAS CON IA

**Versión:** 1.0.0
**Última actualización:** 12 de Noviembre de 2025
**Nivel:** Admin
**Tiempo de lectura:** 15 minutos

---

## 📋 TABLA DE CONTENIDOS

1. [Introducción](#introducción)
2. [¿Qué es el Generador de Diseños?](#qué-es-el-generador-de-diseños)
3. [Acceso y Requisitos](#acceso-y-requisitos)
4. [Cómo Usar el Generador](#cómo-usar-el-generador)
5. [Límites y Restricciones](#límites-y-restricciones)
6. [Galería de Diseños](#galería-de-diseños)
7. [Tips y Mejores Prácticas](#tips-y-mejores-prácticas)
8. [Casos de Uso](#casos-de-uso)
9. [Solución de Problemas](#solución-de-problemas)

---

## 1. INTRODUCCIÓN

El **Generador de Diseños de Uñas con IA** es una funcionalidad exclusiva de MultiSalon que te permite crear diseños de uñas personalizados usando Inteligencia Artificial. Esta herramienta está impulsada por Google Gemini 2.0 Flash y puede generar diseños únicos basados en tus descripciones.

### ¿Para quién es esta guía?

Esta funcionalidad es exclusiva para:
- ✅ **Administradores del salón** (rol: admin_salon)

⚠️ **Nota:** Empleados y clientes NO tienen acceso a esta funcionalidad.

---

## 2. ¿QUÉ ES EL GENERADOR DE DISEÑOS?

### Funcionalidad Principal

El generador de diseños permite:
- 🎨 **Crear diseños únicos** con descripción de texto
- 💾 **Guardar automáticamente** en tu galería
- 👀 **Visualizar inmediatamente** el resultado
- 📱 **Compartir con clientes** desde la galería pública
- ☁️ **Almacenamiento en la nube** (Cloudinary)

### Tecnología

- **Motor IA:** Google Gemini 2.0 Flash Exp
- **Almacenamiento:** Cloudinary + Firebase Firestore
- **Velocidad:** Generación en 10-30 segundos
- **Formato:** Imágenes PNG de alta calidad (600px de ancho)

---

## 3. ACCESO Y REQUISITOS

### 3.1 ¿Cómo Accedo?

**Paso 1:** Inicia sesión con cuenta de Administrador

**Paso 2:** En el menú lateral, busca la opción **"Diseños de Uñas"** o **"Generador IA"**

**Paso 3:** Click en la opción para abrir el generador

### 3.2 Requisitos del Sistema

✅ **Navegador:**
- Google Chrome (recomendado)
- Firefox, Edge, Safari

✅ **Conexión:**
- Mínimo 5 Mbps
- La generación requiere buena conexión

✅ **Permisos:**
- Solo rol Admin Salón

---

## 4. CÓMO USAR EL GENERADOR

### 4.1 Proceso Completo

#### **Paso 1: Escribir el Prompt**

En el campo de texto, describe el diseño que deseas:

**Ejemplo de prompts efectivos:**
```
"Diseño de uñas francesas con flores rosadas y doradas"
"Uñas largas con degradado azul a morado y brillos"
"Nail art minimalista con líneas negras geométricas"
"Uñas cortas con diseño de mármol blanco y oro"
```

**Características del prompt:**
- ✅ Máximo: 500 caracteres
- ✅ Idioma: Español o inglés
- ✅ Descripción clara y específica
- ⚠️ No incluir palabras ofensivas

#### **Paso 2: Generar el Diseño**

1. Revisa tu prompt
2. Click en botón **"Generar Diseño"**
3. Espera 10-30 segundos
4. ⚙️ El sistema está generando con IA

**Mientras esperas:**
- 🔄 Se muestra un indicador de carga
- ⏱️ El proceso puede tardar 10-30 segundos
- 🚫 NO cierres la ventana

#### **Paso 3: Revisar el Resultado**

Cuando la imagen está lista:
- ✅ Se muestra en pantalla inmediatamente
- 📊 Ves tus generaciones restantes del día
- 💾 Se guarda automáticamente en tu galería

**Opciones disponibles:**
- ✅ **Guardar diseño** - Ya está guardado automáticamente
- 🔄 **Generar otro** - Si tienes generaciones disponibles
- 🗑️ **Descartar** - Puedes eliminarlo de la galería después

### 4.2 Verificar Generaciones Restantes

En la pantalla del generador verás:
```
Generaciones restantes hoy: 7 de 10
```

- **Total diario:** 10 generaciones
- **Reseteo:** Automático cada día a medianoche
- **Sin acumular:** El límite NO se acumula entre días

---

## 5. LÍMITES Y RESTRICCIONES

### 5.1 Límite Diario

⚠️ **10 generaciones por día**

**¿Por qué hay límite?**
- El servicio de IA tiene costos por uso
- Evita uso excesivo de recursos
- Fomenta prompts más pensados

**¿Qué pasa si llego al límite?**
```
❌ "Límite diario alcanzado (10 generaciones por día)"
```
- Debes esperar hasta el día siguiente
- Reseteo automático a medianoche
- No hay forma de aumentar el límite actualmente

### 5.2 Restricciones del Prompt

| Restricción | Límite |
|-------------|--------|
| **Longitud máxima** | 500 caracteres |
| **Longitud mínima** | 10 caracteres |
| **Caracteres especiales** | Permitidos |
| **Idiomas** | Español, Inglés |
| **Contenido prohibido** | Nada ofensivo |

**Prompts NO permitidos:**
- ❌ Prompts vacíos o muy cortos
- ❌ Solo números o símbolos
- ❌ Contenido ofensivo o inapropiado
- ❌ Más de 500 caracteres

### 5.3 Otros Límites

- **Tiempo de generación:** Máximo 60 segundos
- **Formato de salida:** Solo PNG
- **Tamaño de imagen:** 600px de ancho (optimizado)
- **Almacenamiento:** Ilimitado en Cloudinary

---

## 6. GALERÍA DE DISEÑOS

### 6.1 ¿Dónde Están Mis Diseños?

Todos los diseños generados se guardan automáticamente en:
- 📂 **Sección "Ver Diseños"** en el menú
- 📂 **Ruta:** `/verDisenosUnas`
- 🌐 **Visibilidad:** Pública (todos pueden ver)

### 6.2 Gestionar la Galería

**Ver todos los diseños:**
1. Ir a "Ver Diseños de Uñas"
2. Se muestran todos los diseños generados
3. Vista en cuadrícula con miniaturas

**Información mostrada:**
- 🖼️ Miniatura del diseño
- 📝 Prompt usado (descripción)
- 📅 Fecha de creación
- ✅ Estado: Activo/Inactivo

**Acciones disponibles:**
- 👀 **Ver en grande** - Click en la imagen
- 🗑️ **Eliminar diseño** - Solo admins (soft delete)
- 🔗 **Compartir** - Copiar URL de la imagen
- 📥 **Descargar** - Guardar localmente

### 6.3 Eliminar Diseños

⚠️ **Solo Administradores** pueden eliminar diseños

**Proceso:**
1. Abrir "Ver Diseños"
2. Click en el diseño a eliminar
3. Botón "Eliminar"
4. Confirmar acción

**Importante:**
- ✅ Usa **soft delete** (se marca como inactivo)
- ✅ No se borra permanentemente
- ✅ Se puede restaurar si es necesario
- ✅ NO aparece en galería pública

---

## 7. TIPS Y MEJORES PRÁCTICAS

### 7.1 Escribir Buenos Prompts

#### ✅ **Prompts Efectivos:**

**Sé específico con los detalles:**
```
❌ Malo: "uñas bonitas"
✅ Bueno: "Uñas largas almendra con degradado rosa pastel y brillos"
```

**Menciona estilo y colores:**
```
❌ Malo: "diseño de flores"
✅ Bueno: "Nail art elegante con rosas rojas y hojas doradas"
```

**Incluye forma y longitud:**
```
❌ Malo: "uñas con rayas"
✅ Bueno: "Uñas cortas cuadradas con líneas verticales negras y blancas"
```

#### 📝 **Plantilla de Prompt:**

```
[Forma de uña] + [Longitud] + [Estilo] + [Colores] + [Detalles]

Ejemplo:
"Uñas almendra largas con estilo elegante, degradado de azul a violeta, con brillos plateados y líneas finas doradas"
```

### 7.2 Maximizar tus 10 Generaciones

🎯 **Estrategias:**

1. **Planifica antes de generar**
   - Escribe 2-3 opciones de prompts
   - Elige el más claro y específico
   - No generes por generar

2. **Usa referencias visuales**
   - Mira diseños existentes
   - Anota los elementos que te gustan
   - Combina ideas en el prompt

3. **Aprende de tus resultados**
   - Si sale bien, guarda el prompt
   - Identifica qué palabras funcionan
   - Ajusta progresivamente

4. **Prioriza diseños para clientes**
   - Genera cuando tengas cita programada
   - Crea diseños para tu catálogo
   - Evita experimentar sin propósito

### 7.3 Compartir con Clientes

**Opción 1: Mostrar Galería**
- Lleva al cliente a `/verDisenosUnas`
- Muestra todos los diseños disponibles
- Cliente elige el que más le gusta

**Opción 2: Compartir Imagen Directa**
- Click derecho en el diseño
- "Copiar dirección de imagen"
- Envía por WhatsApp o email

**Opción 3: Durante la Reserva**
- Genera diseño personalizado
- Toma captura de pantalla
- Envía al cliente para confirmación

---

## 8. CASOS DE USO

### Caso 1: Crear Catálogo de Diseños

**Situación:**
Quieres tener un catálogo de 10 diseños variados para mostrar a clientes.

**Solución:**
1. **Día 1:** Genera 10 diseños con diferentes estilos
   - 2 diseños elegantes
   - 2 diseños minimalistas
   - 2 diseños llamativos
   - 2 diseños para eventos
   - 2 diseños temporada (navidad, verano, etc.)

2. **Resultado:** Galería completa en un día

**Prompts sugeridos:**
```
1. "Uñas francesas clásicas con punta blanca y brillos sutiles"
2. "Nail art minimalista con puntos negros sobre base nude"
3. "Diseño llamativo con degradado arcoíris y purpurina dorada"
4. "Uñas para novia: francesas con encaje blanco delicado"
5. "Diseño navideño: rojo con copos de nieve blancos y dorados"
```

---

### Caso 2: Diseño Personalizado para Cliente VIP

**Situación:**
Cliente importante pide un diseño único para un evento especial.

**Solución:**
1. **Consulta con la cliente:**
   - ¿Qué colores prefieres?
   - ¿Qué estilo: elegante, llamativo, minimalista?
   - ¿Alguna forma de uña específica?

2. **Genera el diseño:**
   ```
   Prompt ejemplo:
   "Uñas almendra largas con elegante degradado de champagne a nude, decoración con líneas finas doradas y pequeños cristales, estilo sofisticado para evento formal"
   ```

3. **Muestra el resultado:**
   - Envía la imagen por WhatsApp
   - Cliente aprueba antes de la cita
   - Ahorras tiempo en explicaciones

---

### Caso 3: Actualizar Diseños por Temporada

**Situación:**
Cada temporada quieres ofrecer diseños acordes (verano, navidad, halloween, etc.)

**Solución:**
1. **Temporada actual:** Noviembre (otoño/pre-navidad)
2. **Generar 5 diseños temáticos:**

```
Prompts otoño:
- "Diseño de uñas con hojas de otoño naranjas y doradas sobre base beige"
- "Nail art con colores tierra: café, naranja quemado y beige con textura matte"

Prompts navideños:
- "Uñas navideñas con rojo brillante, copos de nieve blancos y toques dorados"
- "Diseño festivo con verde pino, rojo y pequeños regalos pintados"
- "Nail art elegante para fin de año: negro con estrellas doradas y brillos"
```

3. **Resultados:**
   - Galería actualizada temporada por temporada
   - Clientes ven opciones relevantes
   - Marketing natural de nuevos diseños

---

## 9. SOLUCIÓN DE PROBLEMAS

### ❌ "Límite diario alcanzado"

**Causa:** Ya generaste 10 diseños hoy

**Solución:**
- ⏰ Espera hasta mañana (reseteo a medianoche)
- 📝 Anota tus ideas para el día siguiente
- 👀 Mientras tanto, muestra diseños existentes

---

### ❌ "El prompt no puede estar vacío"

**Causa:** No escribiste nada en el campo de texto

**Solución:**
- ✍️ Escribe una descripción del diseño
- 📏 Mínimo 10 caracteres
- 💡 Usa los ejemplos de esta guía

---

### ❌ "El prompt no puede exceder 500 caracteres"

**Causa:** Tu descripción es muy larga

**Solución:**
- ✂️ Acorta la descripción
- 🎯 Sé más conciso
- 💡 Elimina palabras innecesarias

**Ejemplo:**
```
❌ Demasiado largo (520 caracteres):
"Quiero un diseño de uñas que sea muy elegante y sofisticado para un evento especial que tengo el próximo fin de semana, me gustaría que tenga colores suaves como rosa pastel o beige claro, con algunos detalles dorados o plateados que le den un toque de brillo pero sin exagerar, también me gustaría que tenga algún elemento floral pero muy delicado y minimalista, nada muy recargado, y que la forma de las uñas sea almendra porque es mi favorita, prefiero uñas largas pero no demasiado..."

✅ Versión corta (118 caracteres):
"Uñas almendra largas elegantes para evento, rosa pastel con detalles florales minimalistas y toques dorados sutiles"
```

---

### ❌ "Error generando imagen" o "No se generó una imagen válida"

**Causas posibles:**
1. Problema temporal con el servicio de IA
2. Conexión a internet lenta o interrumpida
3. Prompt con contenido no permitido
4. Servidor de IA sobrecargado

**Soluciones:**
1. **Verificar conexión:**
   - ¿Tienes buena señal de internet?
   - Intenta cargar otra página web

2. **Reformular el prompt:**
   - Simplifica la descripción
   - Usa palabras más comunes
   - Evita términos ambiguos

3. **Esperar e intentar de nuevo:**
   - Espera 1-2 minutos
   - Vuelve a generar
   - Si falla 3 veces, reporta el problema

4. **Contactar soporte:**
   - Si el problema persiste
   - Envía captura del error
   - Incluye el prompt que usaste

---

### ⚠️ "Error al guardar en la galería"

**Causa:** Problema guardando en Cloudinary o Firestore

**¿Qué significa?**
- ✅ La imagen SÍ se generó
- ❌ NO se guardó en la galería
- 📷 Puedes tomar captura manualmente

**Solución temporal:**
1. Toma captura de pantalla del diseño
2. Guarda la imagen en tu dispositivo
3. Reporta el error a soporte

**Solución permanente:**
- Soporte técnico debe revisar configuración
- Verificar credenciales de Cloudinary
- Revisar permisos de Firebase

---

### 🐌 "La generación tarda mucho (más de 1 minuto)"

**Causas:**
1. Conexión a internet lenta
2. Servidor de Gemini sobrecargado
3. Prompt muy complejo

**Soluciones:**
1. **Verificar velocidad de internet:**
   - Mínimo recomendado: 5 Mbps
   - Evita usar Wi-Fi público

2. **Simplificar el prompt:**
   - Menos detalles complejos
   - Descripción más directa

3. **Intentar en otro momento:**
   - Horarios pico: 10AM-2PM, 6PM-9PM
   - Horarios tranquilos: 7AM-9AM, 3PM-5PM

4. **Cerrar otras pestañas:**
   - Libera recursos del navegador
   - Cierra aplicaciones pesadas

---

### 📱 "No puedo ver el botón 'Generar Diseño'"

**Causa:** No tienes permisos de Administrador

**Solución:**
- ⚠️ Esta funcionalidad es solo para Admins
- 👥 Si eres Empleado, pide a tu Admin que genere
- 📧 Contacta a tu administrador para verificar tu rol

---

## 📚 RESUMEN Y PRÓXIMOS PASOS

### ✅ Lo que aprendiste:

- ✅ Cómo acceder al generador de diseños
- ✅ Escribir prompts efectivos
- ✅ Límites y restricciones (10/día, 500 caracteres)
- ✅ Gestionar tu galería de diseños
- ✅ Compartir diseños con clientes
- ✅ Resolver problemas comunes

### 🎯 Checklist de Dominio:

**Básico:**
- [ ] Generé mi primer diseño exitosamente
- [ ] Entiendo el límite de 10 generaciones diarias
- [ ] Sé escribir un prompt claro de 1-2 líneas
- [ ] Puedo ver mis diseños en la galería

**Intermedio:**
- [ ] Generé al menos 5 diseños diferentes
- [ ] Compartí un diseño con un cliente
- [ ] Creé diseños para diferentes estilos (elegante, casual, evento)
- [ ] Usé la plantilla de prompts efectivamente

**Avanzado:**
- [ ] Tengo un catálogo de 10+ diseños variados
- [ ] Planifico mis generaciones estratégicamente
- [ ] Actualizo diseños por temporada
- [ ] Maximizo cada generación con prompts optimizados

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
