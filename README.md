# 🎨 FRONTEND - LANDING MULTISALON

Interfaz de usuario de la landing page construida con React + Vite.

---

## 📁 ESTRUCTURA DE CARPETAS

```
frontend/
├── src/
│   ├── pages/                    # Páginas principales
│   │   ├── Home.jsx              # Página de inicio
│   │   ├── Planes.jsx            # Comparación de planes
│   │   ├── Suscripcion.jsx       # Formulario de suscripción
│   │   ├── Tutoriales.jsx        # Videos tutoriales
│   │   ├── Documentacion.jsx     # Docs y FAQs
│   │   └── Demo.jsx              # Demo interactiva
│   │
│   ├── components/
│   │   ├── common/               # Componentes reutilizables
│   │   │   ├── Button.jsx        # Botón con variantes
│   │   │   ├── Input.jsx         # Input con validación
│   │   │   ├── Select.jsx        # Select personalizado
│   │   │   ├── Card.jsx          # Card base
│   │   │   └── VideoPlayer.jsx   # Reproductor de video
│   │   │
│   │   ├── sections/             # Secciones de landing
│   │   │   ├── HeroSection.jsx   # Hero principal
│   │   │   ├── FeaturesSection.jsx    # Características
│   │   │   ├── PricingSection.jsx     # Planes y precios
│   │   │   ├── TestimonialsSection.jsx  # Testimonios
│   │   │   ├── FAQSection.jsx         # Preguntas frecuentes
│   │   │   └── CTASection.jsx         # Call to Action
│   │   │
│   │   ├── forms/
│   │   │   └── SubscriptionForm.jsx   # Formulario de suscripción
│   │   │
│   │   └── layout/
│   │       ├── Header.jsx        # Navegación
│   │       └── Footer.jsx        # Footer
│   │
│   ├── services/
│   │   └── api.js                # Cliente Axios para API
│   │
│   ├── utils/
│   │   ├── messages.js           # Mensajes centralizados
│   │   ├── selectOptions.js      # Opciones de selects
│   │   ├── toastConfig.js        # Configuración toast
│   │   ├── validation.js         # Validaciones
│   │   └── analytics.js          # Google Analytics
│   │
│   ├── styles/
│   │   ├── colors.css            # Variables de colores
│   │   ├── spacing.css           # Espaciado
│   │   ├── typography.css        # Tipografía
│   │   └── animations.css        # Animaciones
│   │
│   ├── App.jsx                   # Componente principal
│   ├── main.jsx                  # Entry point
│   └── index.css                 # Estilos globales
│
├── public/
│   ├── thumbnails/               # Miniaturas de videos
│   ├── docs/                     # PDFs de documentación
│   └── favicon.ico               # Favicon
│
├── .env.development              # Variables de entorno (dev)
├── .env.production               # Variables de entorno (prod)
├── package.json
├── vite.config.js
└── README.md                     # Este archivo
```

---

## 🛠️ TECNOLOGÍAS

- **React 18** - UI Library
- **Vite** - Build tool ultrarrápido
- **React Router v6** - Navegación
- **TailwindCSS** - Estilos utility-first (o Material-UI si prefieres)
- **Axios** - Cliente HTTP
- **React Hook Form** - Gestión de formularios
- **React Toastify** - Notificaciones
- **react-player** - Reproductor de videos (YouTube/Cloudinary)
- **Zod** - Validación de datos

---

## 🚀 INICIO RÁPIDO

### Instalación

```bash
# Desde la carpeta frontend/
npm install
```

### Variables de Entorno

Crea archivo `.env.development`:

```bash
# URL del backend
VITE_API_URL=http://localhost:4001

# Cloudinary (para imágenes/videos)
VITE_CLOUDINARY_CLOUD=your_cloud_name
VITE_CLOUDINARY_VIDEO_FOLDER=multisalon/videos

# Google Analytics (opcional)
VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

### Desarrollo

```bash
npm run dev
# Abre: http://localhost:5174
```

### Build de Producción

```bash
npm run build
npm run preview  # Previsualizar build
```

---

## 🎨 SISTEMA DE DISEÑO

### Colores Principales

```css
--landing-primary: #2563eb;        /* Azul profesional */
--landing-secondary: #10b981;      /* Verde éxito */
--landing-accent: #f59e0b;         /* Naranja CTA */
```

### Variantes de Botones

- **PRIMARY** - CTAs principales (Suscribirse, Empezar)
- **SECONDARY** - Acciones secundarias (Ver demo, Más info)
- **OUTLINE** - Botones con borde
- **GHOST** - Navegación
- **CTA** - Call to Action destacado con animación

### Breakpoints

- **Mobile:** 320px - 767px
- **Tablet:** 768px - 1023px
- **Desktop:** 1024px+

---

## 📋 PÁGINAS Y RUTAS

| Ruta | Componente | Descripción |
|------|-----------|-------------|
| `/` | `Home.jsx` | Hero + Features + CTAs |
| `/planes` | `Planes.jsx` | Comparación de planes de suscripción |
| `/suscripcion` | `Suscripcion.jsx` | Formulario completo de solicitud |
| `/tutoriales` | `Tutoriales.jsx` | Videos organizados por categoría |
| `/documentacion` | `Documentacion.jsx` | Guías, FAQs, términos |
| `/demo` | `Demo.jsx` | Video demo + screenshots interactivos |

---

## 🔌 INTEGRACIÓN CON BACKEND

### Endpoint Principal

```javascript
// services/api.js
import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
})

// Enviar solicitud de suscripción
export const enviarSolicitud = async (datos) => {
  const response = await api.post('/api/suscribir', datos)
  return response.data
}
```

### Ejemplo de Uso

```javascript
// En SubscriptionForm.jsx
import { enviarSolicitud } from '../services/api'
import { toast } from 'react-toastify'

const handleSubmit = async (formData) => {
  try {
    const resultado = await enviarSolicitud(formData)
    toast.success('¡Solicitud enviada exitosamente!')
    // Redirigir o mostrar mensaje de éxito
  } catch (error) {
    toast.error('Error al enviar solicitud')
    console.error(error)
  }
}
```

---

## 📊 ANALYTICS

### Google Analytics

```javascript
// utils/analytics.js
export const trackEvent = (eventName, eventData) => {
  if (window.gtag) {
    window.gtag('event', eventName, eventData)
  }
}

// Eventos a trackear
- PAGE_VIEW
- PLAN_SELECTED
- FORM_STARTED
- FORM_SUBMITTED
- DEMO_REQUESTED
- VIDEO_PLAYED
```

---

## 🎬 VIDEOS

### Estrategia de Hosting

**Tutoriales largos (5+ min):** YouTube
- Gratis, ilimitado, SEO
- Embed con `react-player`

**Demos cortos (30-90 seg):** Cloudinary
- Rápido, integrado
- Control total

**Implementación:**

```jsx
<VideoPlayer
  videoId="dQw4w9WgXcQ"
  platform="youtube"
  thumbnail="/thumbnails/tutorial-reservas.jpg"
  title="Cómo gestionar reservas"
/>
```

---

## ✅ CHECKLIST DE DESARROLLO

### Setup Inicial
- [ ] Inicializar proyecto Vite
- [ ] Instalar dependencias
- [ ] Configurar variables de entorno
- [ ] Configurar React Router
- [ ] Configurar TailwindCSS (o MUI)

### Componentes Base
- [ ] Button
- [ ] Input
- [ ] Select
- [ ] Card
- [ ] VideoPlayer
- [ ] Header
- [ ] Footer

### Páginas
- [ ] Home
- [ ] Planes
- [ ] Suscripcion (formulario)
- [ ] Tutoriales
- [ ] Documentacion
- [ ] Demo

### Integración
- [ ] Conectar con backend
- [ ] Validación de formularios
- [ ] Notificaciones toast
- [ ] Manejo de errores
- [ ] Analytics (GA)

### Optimización
- [ ] Lazy loading de componentes
- [ ] Optimización de imágenes
- [ ] Minificación de assets
- [ ] SEO (meta tags, Open Graph)
- [ ] Responsive design

---

## 🚀 DEPLOY

### Opción 1: Firebase Hosting (Recomendado)

```bash
npm run build
firebase deploy --only hosting
```

### Opción 2: Vercel

```bash
npm install -g vercel
vercel
```

### Opción 3: Netlify

```bash
npm install -g netlify-cli
netlify deploy --prod
```

---

## 📝 NOTAS IMPORTANTES

1. **Puerto 5174** para no conflictuar con el frontend principal (5173)
2. **Independiente del sistema principal** - Solo comparte Firebase
3. **Página pública** - No requiere autenticación
4. **Mobile-first** - Diseña primero para móvil
5. **Performance** - Optimiza imágenes y lazy load

---

**Siguiente paso:** Inicializar proyecto con `npm create vite@latest`
