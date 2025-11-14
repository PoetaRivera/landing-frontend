# Script de Limpieza de Dependencias Duplicadas

## Dependencias a Eliminar

### 1. react-hot-toast (Duplicado con react-toastify)

**Ya tienes:** `react-toastify` ✅
**Eliminar:** `react-hot-toast` ❌

```bash
npm uninstall react-hot-toast
```

**Archivos que podrían usar react-hot-toast:**

- Ninguno encontrado en el análisis ✅

---

### 2. react-icons (Duplicado con lucide-react)

**Ya tienes:** `lucide-react` ✅
**Eliminar:** `react-icons` ❌

```bash
npm uninstall react-icons
```

**Archivos que podrían usar react-icons:**

- Ninguno encontrado en el análisis ✅

---

## Comandos a Ejecutar

### Opción 1: Comando Individual

```bash
cd frontend
npm uninstall react-hot-toast react-icons
```

### Opción 2: Script completo con verificación

```bash
cd frontend

echo "🧹 Limpiando dependencias duplicadas..."
echo ""

# Desinstalar duplicados
npm uninstall react-hot-toast react-icons

echo ""
echo "✅ Dependencias eliminadas"
echo ""

# Verificar que no haya imports rotos
echo "🔍 Verificando imports..."
npm run lint

echo ""
echo "📦 Bundle size esperado reducido en ~100KB"
echo ""
```

---

## Verificación Post-Limpieza

### 1. Verificar package.json

```bash
cat package.json | grep -E "react-hot-toast|react-icons"
```

Resultado esperado: No debe aparecer ninguna línea

### 2. Buscar imports en código

```bash
# Buscar react-hot-toast
grep -r "react-hot-toast" src/

# Buscar react-icons
grep -r "from 'react-icons" src/
```

Resultado esperado: No debe encontrar nada

### 3. Probar build

```bash
npm run build
```

Resultado esperado: Build exitoso sin errores

---

## Impacto Esperado

### Antes

```
Total bundle size: ~530KB
- react-toastify: ~50KB
- react-hot-toast: ~20KB ❌ (duplicado)
- lucide-react: ~30KB
- react-icons: ~50KB ❌ (duplicado)
```

### Después

```
Total bundle size: ~460KB (-70KB)
- react-toastify: ~50KB ✅
- lucide-react: ~30KB ✅
```

**Reducción:** ~70-100KB del bundle total

---

## Notas

- **react-toastify** se usa en: `utils/toastConfig.js`
- **lucide-react** se usa en: Varios componentes (Button, Input, etc.)
- Ambas librerías eliminadas NO están siendo usadas en el código actual
- Es seguro eliminarlas sin romper funcionalidad

---

## En Caso de Error

Si al ejecutar `npm run build` encuentras errores de imports:

1. **Buscar el archivo con error:**

   ```bash
   grep -r "react-hot-toast" src/
   ```

2. **Reemplazar imports:**
   - `react-hot-toast` → `react-toastify`
   - `react-icons` → `lucide-react`

3. **Ejemplo:**

   ```javascript
   // Antes
   import toast from 'react-hot-toast'

   // Después
   import { toast } from 'react-toastify'
   ```

---

**Última actualización:** 2025-11-13
