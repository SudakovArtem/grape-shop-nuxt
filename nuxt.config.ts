// https://nuxt.com/docs/api/configuration/nuxt-config
import { fileURLToPath } from 'url'

export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  devtools: { enabled: true },
  alias: {
    '@img': fileURLToPath(new URL('./assets/images', import.meta.url)),
    '@icons': fileURLToPath(new URL('./assets/icons', import.meta.url)),
    '@adapters': fileURLToPath(new URL('./core/adapters', import.meta.url)),
    '@configs': fileURLToPath(new URL('./core/configs', import.meta.url)),
    '@api': fileURLToPath(new URL('./core/api', import.meta.url)),
    '@services': fileURLToPath(new URL('./core/services', import.meta.url))
  },
  app: {
    pageTransition: { name: 'page' },
    layoutTransition: { name: 'layout' },
    head: {
      title: 'Виноградные саженцы - Качественные саженцы для вашего сада',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          name: 'description',
          content:
            'Качественные саженцы и черенки винограда. Выращено с любовью в экологически чистом районе. Ограниченные партии, каждый саженец уникален.'
        },
        { property: 'og:title', content: 'Виноградные саженцы - Качественные саженцы для вашего сада' },
        {
          property: 'og:description',
          content: 'Качественные саженцы и черенки винограда. Выращено с любовью в экологически чистом районе.'
        },
        { property: 'og:image', content: '/og-image.png' },
        { property: 'og:type', content: 'website' },
        { name: 'twitter:card', content: 'summary_large_image' }
      ],
      link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
    }
  },
  runtimeConfig: {
    public: {
      baseApiUrl: process.env.API_BASE_URL,
      nodeEnv: process.env.APP_NODE_ENV
    }
  },
  modules: ['@nuxt/fonts', '@nuxt/icon', '@nuxt/image', 'shadcn-nuxt', '@pinia/nuxt', '@nuxtjs/tailwindcss'],
  icon: {
    mode: 'css',
    cssLayer: 'base'
  },
  css: ['@/assets/css/main.css']
})
