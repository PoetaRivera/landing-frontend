import js from '@eslint/js'
import react from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import prettier from 'eslint-plugin-prettier'
import prettierConfig from 'eslint-config-prettier'

export default [
  // Ignora directorios de build
  {
    ignores: ['dist/**', 'node_modules/**', 'build/**', '.vite/**']
  },

  // Configuración base de JavaScript
  js.configs.recommended,

  // Configuración para archivos JSX
  {
    files: ['**/*.{js,jsx}'],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      parserOptions: {
        ecmaFeatures: {
          jsx: true
        }
      },
      globals: {
        // Browser globals
        window: 'readonly',
        document: 'readonly',
        navigator: 'readonly',
        console: 'readonly',
        localStorage: 'readonly',
        sessionStorage: 'readonly',
        fetch: 'readonly',
        setTimeout: 'readonly',
        setInterval: 'readonly',
        clearTimeout: 'readonly',
        clearInterval: 'readonly',
        URL: 'readonly',
        URLSearchParams: 'readonly',
        FormData: 'readonly',
        // Node.js globals (para archivos de configuración)
        process: 'readonly',
        __dirname: 'readonly',
        __filename: 'readonly',
        module: 'readonly',
        require: 'readonly',
        // Vite globals
        import: 'readonly'
      }
    },
    plugins: {
      react,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      prettier
    },
    rules: {
      // Reglas de React
      ...react.configs.recommended.rules,
      ...react.configs['jsx-runtime'].rules,
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'off', // Desactivado porque usamos validación con Zod
      'react/jsx-uses-react': 'off',
      'react/jsx-uses-vars': 'error',
      'react/jsx-key': ['error', { checkFragmentShorthand: true }],

      // Reglas de React Hooks
      ...reactHooks.configs.recommended.rules,
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',

      // Reglas de React Refresh
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],

      // Reglas de Prettier
      'prettier/prettier': [
        'error',
        {
          endOfLine: 'auto'
        }
      ],

      // Reglas generales
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      'no-unused-vars': [
        'warn',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          ignoreRestSiblings: true
        }
      ],
      'prefer-const': 'error',
      'no-var': 'error',
      'object-shorthand': 'warn',
      'quote-props': ['warn', 'as-needed'],

      // Mejores prácticas
      eqeqeq: ['error', 'always', { null: 'ignore' }],
      'no-eval': 'error',
      'no-implied-eval': 'error',
      'no-with': 'error',
      'no-new-func': 'error',
      'no-script-url': 'error'
    },
    settings: {
      react: {
        version: 'detect'
      }
    }
  },

  // Desactiva reglas que entran en conflicto con Prettier
  prettierConfig
]
