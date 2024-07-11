import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react({
      jsxImportSource: '@theme-ui/core',
      plugins: [['@swc/plugin-emotion', {}]]
    })
  ],
})
