# ll-client

This template should help get you started developing with Vue 3 in Vite.

## I. Develop

1. Require: [NodeJS](https://nodejs.org/en/download/package-manager/current) (version >= 18)

2. Config: create file `.env.dev` from `.env.example`

3. Install dependencies:

```bash
# npm
npm install
# yarn
yarn
```

3. Run server at `http://localhost:5173`:

```bash
# npm
npm run dev
# yarn
yarn  dev
```

4. Recommendations extension:

- [Vue - Official](https://marketplace.visualstudio.com/items?itemName=Vue.volar) - Provides support for Vue 3 development
- [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) - Check code formatting
- [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) - Check code rules
- [Code Spell Checker](https://marketplace.visualstudio.com/items?itemName=streetsidesoftware.code-spell-checker) - Check for spelling errors
- [EditorConfig](https://marketplace.visualstudio.com/items?itemName=EditorConfig.EditorConfig) - Maintain consistent coding styles

## II. Deploy

1. Build:

```bash
# npm
npm run build
# yarn
yarn build
```

2. Deploy server:

```bash
node .output/server/index.mjs
```

## III. Features

```
src
├── assets <-> Chứa các static asset
├── components <-> Chứa tất cả các Vue components (auto-import)
│   ├── app <-> Chứa các component của ứng dụng
│   └── layouts <-> Chứa component với chức năng làm layout
├── composables <-> Chứa tất cả các Vue composables
├── middleware <-> Chứa các route middleware
├── modules <-> Chứa tất cả các modules chức năng
├─── moduleX <-> thư mục module X
|   ├─── components <-> Chứa các component sử dụng trong module
|   ├─── constants <-> Chứa các biến không đổi của module
|   ├─── stores  <-> Chứa các state tổng của module
|   ├─── services <-> Chứa các function call axios của module
|   ├─── composables <-> Chứa các hooks để truy vấn data
|   ├─── index.vue <-> Trang chính module X với route: /moduleX
|   ├─── Y.vue <-> Trang Y của module X với route: /moduleX/Y
|   └─── types.ts <-> Chứa các interface model của module
├── stores <-> Chứa các pinia store của ứng dụng
├── styles <-> Chứa các pinia store của ứng dụng
│   ├─── base
│   |   ├── _mixis.scss
│   |   ├── _normalize.scss
│   |   └── _variables.scss
│   └── app.scss <-> style tổng của ứng dụng
├── types <-> Chứa các interface, type
├── utils <-> Chứa các hàm util
├── App.vue <-> Component chính của ứng dụng
└── main.ts <-> File
```

### IV. Features

1. Framework: [VueJS](https://vuejs.org/)
2. State management: [Pinia](https://pinia.vuejs.org/)
3. Router: [Vue Router](https://router.vuejs.org/)
4. Composable: [Vueuse](https://vueuse.org/)
5. HTTP Client: [Axios](https://axios-http.com/)
6. UI Library: [Naive UI](https://www.naiveui.com/en-US/os-theme/)
7. Icon: [Iconify for Vue](https://iconify.design/docs/icon-components/vue/)
8. Style: [Scss](https://sass-lang.com/)
9. Vite Plugin: [unplugin-auto-import](https://github.com/antfu/unplugin-auto-import), [unplugin-vue-components](https://github.com/antfu/unplugin-vue-components), [vite-plugin-pages](https://github.com/hannoeru/vite-plugin-pages), [vite-plugin-vue-layouts](https://github.com/JohnCampionJr/vite-plugin-vue-layouts)
10. Code Formatter: [Prettier](https://prettier.io/)
11. Code Quality: [Nuxt ESlint](https://eslint.nuxt.com/)
