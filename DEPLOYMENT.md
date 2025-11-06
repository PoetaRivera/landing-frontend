# Guía de Deployment - MiSalons Frontend Landing

Esta guía cubre todos los pasos necesarios para deployar la landing page de MiSalons en producción.

## 📋 Requisitos Previos

Antes de hacer el deployment, asegúrate de tener:

- [ ] Cuenta en el servicio de hosting (Vercel, Netlify, o similar)
- [ ] Backend deployado y funcionando
- [ ] Cuenta de Google Analytics (opcional)
- [ ] Cuenta de Cloudinary para imágenes/videos (opcional)
- [ ] Dominio configurado (opcional, pero recomendado)

---

## 🛠 Configuración de Variables de Entorno

### 1. Variables Requeridas

Crea un archivo `.env.production` en la raíz del proyecto:

```bash
# URL del backend en producción
VITE_API_URL=https://tu-backend.com

# Cloudinary (opcional)
VITE_CLOUDINARY_CLOUD=your_cloud_name
VITE_CLOUDINARY_VIDEO_FOLDER=multisalon/landing/videos

# Google Analytics (opcional pero recomendado)
VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

### 2. Obtener ID de Google Analytics

1. Ve a [Google Analytics](https://analytics.google.com/)
2. Crea una nueva propiedad o usa una existente
3. Copia el Measurement ID (formato: `G-XXXXXXXXXX`)
4. Agrega la variable `VITE_GA_MEASUREMENT_ID` en tu `.env.production`

---

## 🚀 Deployment en Vercel (Recomendado)

### Opción 1: Desde GitHub (Recomendado)

1. **Conecta tu repositorio:**

   ```bash
   # Asegúrate de que tu código esté en GitHub
   git push origin main
   ```

2. **Importa en Vercel:**
   - Ve a [vercel.com](https://vercel.com)
   - Click en "Import Project"
   - Selecciona tu repositorio de GitHub
   - Vercel detectará automáticamente que es un proyecto Vite

3. **Configura variables de entorno:**
   - En el dashboard de Vercel → Settings → Environment Variables
   - Agrega todas las variables de `.env.production`
   - Marca que sean para "Production"

4. **Deploy:**
   - Click en "Deploy"
   - Vercel construirá y deployará automáticamente

### Opción 2: Desde CLI

```bash
# Instalar Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
vercel --prod

# Sigue las instrucciones en pantalla
```

### Configuración de Vercel

Crea `vercel.json` en la raíz (opcional):

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }],
  "headers": [
    {
      "source": "/assets/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=31536000, immutable"
        }
      ]
    }
  ]
}
```

---

## 🌐 Deployment en Netlify

### Opción 1: Desde Dashboard

1. **Conecta tu repositorio:**
   - Ve a [netlify.com](https://netlify.com)
   - Click en "Add new site" → "Import an existing project"
   - Conecta tu repositorio de GitHub

2. **Configuración de build:**

   ```
   Build command: npm run build
   Publish directory: dist
   ```

3. **Variables de entorno:**
   - Site settings → Environment → Environment variables
   - Agrega todas las variables de `.env.production`

4. **Deploy:**
   - Click en "Deploy site"

### Opción 2: Desde CLI

```bash
# Instalar Netlify CLI
npm i -g netlify-cli

# Login
netlify login

# Deploy
netlify deploy --prod

# Sigue las instrucciones
```

### Configuración de Netlify

Crea `netlify.toml` en la raíz:

```toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

[[headers]]
  for = "/assets/*"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"
```

---

## 🏗 Build Manual

Si prefieres hacer el build manualmente y subirlo a tu propio servidor:

```bash
# 1. Instalar dependencias
npm install

# 2. Crear build de producción
npm run build

# 3. El build estará en la carpeta /dist
# Sube el contenido de /dist a tu servidor web
```

### Configuración del Servidor Web

#### Nginx

```nginx
server {
    listen 80;
    server_name tu-dominio.com;
    root /var/www/landing-frontend/dist;
    index index.html;

    # Configurar SPA routing
    location / {
        try_files $uri $uri/ /index.html;
    }

    # Cache para assets
    location /assets/ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # Gzip compression
    gzip on;
    gzip_types text/css application/javascript image/svg+xml;
    gzip_vary on;
}
```

#### Apache (.htaccess)

```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>

# Cache para assets
<IfModule mod_expires.c>
  ExpiresActive On
  ExpiresByType image/jpg "access plus 1 year"
  ExpiresByType image/jpeg "access plus 1 year"
  ExpiresByType image/gif "access plus 1 year"
  ExpiresByType image/png "access plus 1 year"
  ExpiresByType image/svg+xml "access plus 1 year"
  ExpiresByType text/css "access plus 1 year"
  ExpiresByType application/javascript "access plus 1 year"
</IfModule>
```

---

## ✅ Checklist Post-Deployment

Después del deployment, verifica:

- [ ] La aplicación carga correctamente
- [ ] Todas las rutas funcionan (Home, Planes, Suscripción, etc.)
- [ ] El formulario de suscripción envía datos al backend
- [ ] Google Analytics está trackeando visitas (abre la consola y busca "GA")
- [ ] Los meta tags SEO están presentes (View → Page Source)
- [ ] Las imágenes y videos se cargan correctamente
- [ ] El sitio es responsivo en móvil
- [ ] No hay errores en la consola del navegador

### Herramientas de Verificación

- **SEO:** https://www.seoptimer.com/
- **Performance:** https://pagespeed.web.dev/
- **SSL:** https://www.ssllabs.com/ssltest/
- **Responsive:** https://responsivedesignchecker.com/

---

## 🔧 Solución de Problemas Comunes

### 1. Error 404 en rutas

**Problema:** Al navegar directamente a `/planes` o `/suscripcion`, recibes un 404.

**Solución:** Configura redirects/rewrites en tu hosting para que todas las rutas apunten a `index.html`.

### 2. Variables de entorno no funcionan

**Problema:** Las variables de entorno no se cargan en producción.

**Solución:**

- Asegúrate de que las variables empiezan con `VITE_`
- Verifica que las agregaste en el panel del hosting
- Re-deploya después de agregar variables

### 3. API calls fallan (CORS)

**Problema:** Las llamadas al backend fallan con error de CORS.

**Solución:** Configura CORS en el backend para permitir tu dominio:

```javascript
// En tu backend (Express.js)
app.use(
  cors({
    origin: ['https://tu-dominio.com', 'https://www.tu-dominio.com']
  })
)
```

### 4. Build falla por memoria

**Problema:** `npm run build` falla por falta de memoria.

**Solución:**

```bash
# Aumentar límite de memoria de Node.js
export NODE_OPTIONS="--max-old-space-size=4096"
npm run build
```

---

## 📊 Monitoreo y Mantenimiento

### Google Analytics Dashboard

1. Ve a tu dashboard de Google Analytics
2. Monitorea:
   - Páginas más visitadas
   - Tasa de conversión (formulario de suscripción)
   - Tiempo en página
   - Dispositivos más usados

### Actualizaciones

Para actualizar la aplicación:

```bash
# 1. Hacer cambios en local
# 2. Probar localmente
npm run dev

# 3. Build para verificar
npm run build

# 4. Commit y push
git add .
git commit -m "feat: nueva funcionalidad"
git push origin main

# 5. Vercel/Netlify deployará automáticamente
```

---

## 🔐 Seguridad

### Headers de Seguridad Recomendados

Agrega estos headers en tu hosting:

```
X-Frame-Options: DENY
X-Content-Type-Options: nosniff
Referrer-Policy: strict-origin-when-cross-origin
Permissions-Policy: geolocation=(), microphone=(), camera=()
```

### HTTPS

- **Vercel/Netlify:** SSL automático ✅
- **Servidor propio:** Usa Let's Encrypt (certbot)

```bash
# Instalar certbot
sudo apt install certbot python3-certbot-nginx

# Obtener certificado
sudo certbot --nginx -d tu-dominio.com
```

---

## 📞 Soporte

Si encuentras problemas durante el deployment:

1. Revisa los logs del servicio de hosting
2. Verifica la consola del navegador
3. Consulta la documentación:
   - [Vite Deployment](https://vitejs.dev/guide/static-deploy.html)
   - [Vercel Docs](https://vercel.com/docs)
   - [Netlify Docs](https://docs.netlify.com/)

---

## 🎉 ¡Deployment Exitoso!

Tu landing page de MiSalons ahora está en producción. No olvides:

- Compartir el link con tu equipo
- Configurar un dominio personalizado
- Monitorear analytics regularmente
- Mantener el código actualizado

**URL de Producción:** `https://tu-dominio.com`
