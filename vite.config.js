import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
export default defineConfig(({ command }) => {
  // base: '/tids-demo/',
  if (command === 'build') {
    return {
      base: '/tids-demo/',
      plugins: [vue(), vueDevTools()],
      resolve: {
        alias: {
          '@': fileURLToPath(new URL('./src', import.meta.url)),
        },
      },
    }
  } else {
    return {
      plugins: [vue(), vueDevTools()],
      resolve: {
        alias: {
          '@': fileURLToPath(new URL('./src', import.meta.url)),
        },
      },
    }
  }
})
