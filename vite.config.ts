import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueDevTools from 'vite-plugin-vue-devtools';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers';
import Layouts from 'vite-plugin-vue-layouts';
import Pages from 'vite-plugin-pages';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
    Pages({
      dirs: [{ dir: 'src/pages', baseRoute: '' }],
      exclude: ['**/components/*.vue']
    }),
    Layouts({
      defaultLayout: 'default',
      layoutsDirs: 'src/components/layouts'
    }),
    Components({
      dirs: ['src/components', 'src/pages/**/components'],
      dts: true,
      directoryAsNamespace: true,
      resolvers: [NaiveUiResolver()],
      types: [{ from: 'vue-router', names: ['RouterLink', 'RouterView'] }]
    }),
    AutoImport({
      include: [
        /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
        /\.vue$/,
        /\.vue\?vue/ // .vue
      ],
      imports: [
        'vue',
        'vue-router',
        'pinia',
        { 'naive-ui': ['useDialog', 'useMessage', 'useNotification', 'useLoadingBar'] }
      ],
      dts: 'auto-imports.d.ts',
      vueTemplate: true
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '@components': fileURLToPath(new URL('./src/components/', import.meta.url)),
      '@stores': fileURLToPath(new URL('./src/stores/', import.meta.url)),
      '@styles': fileURLToPath(new URL('./src/styles/', import.meta.url)),
      '@utils': fileURLToPath(new URL('./src/utils/', import.meta.url))
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: '@use "@styles/base/variables.scss" as *;'
      }
    }
  }
});
