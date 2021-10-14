import { NuxtConfig } from '@nuxt/types'

require('dotenv').config()
const { API_KEY } = process.env

const config: NuxtConfig = {
  publicRuntimeConfig: {
    apiKey: process.env.NODE_ENV !== 'production' ? API_KEY : undefined,
  },

  privateRuntimeConfig: {
    apiKey: API_KEY,
  },

  typescript: {
    typeCheck: {
      eslint: {
        files: './**/*.{ts,js,tsx,jsx,vue}',
      },
    },
  },

  ssr: false,

  srcDir: 'src/',

  // Target (https://go.nuxtjs.dev/config-target)

  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    title: 'SIMPLE KAKEIBO',
    htmlAttrs: { lang: 'ja' },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
      {
        rel: 'stylesheet',
        href:
          'https://fonts.googleapis.com/css2?family=Orbitron:wght@500&display=swap',
      },
    ],
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: ['element-ui/lib/theme-chalk/index.css'],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: ['@/plugins/element-ui.ts'],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
    // https://go.nuxtjs.dev/tailwindcss
    '@nuxtjs/tailwindcss',

    '@nuxtjs/composition-api/module',
  ],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/dotenv',
    '@nuxt/http',
  ],

  // Axios module configuration (https://go.nuxtjs.dev/config-axios)
  axios: {},

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {
    babel: {
      presets: ['@nuxt/babel-preset-app', 'vca-jsx'],
    },
  },
}

export default config
