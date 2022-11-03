import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path';
import vueJsx from '@vitejs/plugin-vue-jsx'

import Components from 'unplugin-vue-components/vite';
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers';
const pathResolve = (dir: string): any => {
  return resolve(__dirname, '.', dir);
};
// https://vitejs.dev/config/
export default defineConfig({
  base: './',	//不加打包后白屏
  server: {
    host: '0.0.0.0',
    port: 1234
    // open: true
  },
  build: {
    outDir: 'dist',
  },
  resolve: {
    alias: {
      '@': pathResolve('./src/'),
    }
  },
  plugins: [vue(), vueJsx(), Components({
    resolvers: [AntDesignVueResolver()],
  }),]
})
