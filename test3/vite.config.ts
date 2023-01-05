import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { crx } from '@crxjs/vite-plugin'
import { resolve } from 'path'
import manifest from './manifest.json' assert { type: 'json' } // Node >=17


export default defineConfig({
  plugins: [
    vue(),
    crx({ manifest }),
  ],
  build: {
    rollupOptions: {
      input: {
        popup: resolve(__dirname, 'src/pages/popup/index.html'),
        option: resolve(__dirname, 'src/pages/option/index.html'),
      },
    },
  }
})