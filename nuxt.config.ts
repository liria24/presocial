import tailwindcss from '@tailwindcss/vite'
import { defineOrganization } from 'nuxt-schema-org/schema'

const baseUrl = import.meta.env.NUXT_PUBLIC_SITE_URL || 'http://localhost:3000'
const title = 'Presocial'
const description = 'Free web app to preview X (Twitter) posts before sharing.'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    compatibilityDate: '2024-11-01',

    devtools: { enabled: true, timeline: { enabled: true } },

    modules: [
        '@nuxt/eslint',
        '@nuxt/image',
        '@nuxt/ui',
        '@nuxtjs/device',
        '@nuxtjs/i18n',
        '@nuxtjs/robots',
        '@pinia/nuxt',
        '@vueuse/nuxt',
        'nuxt-link-checker',
        'nuxt-schema-org',
        'nuxt-seo-utils',
    ],

    plugins: [{ src: '~/plugins/axe.client.ts', mode: 'client' }],

    css: ['~/assets/css/main.css'],

    vite: {
        plugins: [tailwindcss()],
        optimizeDeps: {
            include: import.meta.dev ? ['axe-core'] : [],
        },
    },

    runtimeConfig: {
        liria: { accessToken: '' },
        vercel: { token: '', edgeConfig: { endpoint: '' } },
        public: {
            siteUrl: baseUrl,
        },
    },

    site: {
        url: baseUrl,
        name: title,
        description,
        trailingSlash: false,
    },

    app: {
        head: {
            htmlAttrs: { lang: 'ja', prefix: 'og: https://ogp.me/ns#' },
            title,
            meta: [
                { charset: 'utf-8' },
                {
                    name: 'viewport',
                    content: 'width=device-width, initial-scale=1',
                },
                { name: 'icon', content: '/favicon.ico' },
                { property: 'og:site_name', content: title },
                { property: 'og:type', content: 'website' },
                { property: 'og:url', content: 'https://presocial.vercel.app' },
                { property: 'og:title', content: title },
                // { property: 'og:image', content: 'https://presocial.vercel.app/ogp.png' },
                { name: 'description', content: description },
                { property: 'og:description', content: description },
                { name: 'twitter:site', content: '@liria_24' },
                { name: 'twitter:card', content: 'summary_large_image' },
            ],
        },
    },

    fonts: {
        families: [{ name: 'Geist', provider: 'google' }],
        defaults: {
            weights: [100, 200, 300, 300, 400, 500, 600, 700, 800, 900],
        },
    },

    i18n: {
        baseUrl,
        defaultLocale: 'en',
        locales: [
            {
                code: 'en',
                language: 'en-US',
                name: 'English (US)',
                file: 'en.json',
                icon: 'twemoji:flag-united-states',
            },
            {
                code: 'ja',
                language: 'ja-JP',
                name: '日本語',
                file: 'ja.json',
                icon: 'twemoji:flag-japan',
            },
        ],
        detectBrowserLanguage: {
            useCookie: true,
            cookieKey: 'i18n_redirected',
        },
    },

    icon: {
        customCollections: [{ prefix: 'presocial', dir: './app/assets/icons' }],
        clientBundle: {
            icons: [
                'lucide:plus',
                'lucide:x',
                'lucide:check',
                'svg-spinners:ring-resize',
                'lucide:sun',
                'lucide:moon',
                'lucide:palette',
                'lucide:bolt',
                'lucide:chevron-right',
                'lucide:chevron-left',
                'lucide:chevron-down',
                'lucide:chevron-up',
                'lucide:copy',
            ],
            scan: true,
            includeCustomCollections: true,
        },
    },

    robots: {
        allow: ['Twitterbot', 'facebookexternalhit'],
        blockNonSeoBots: true,
        blockAiBots: true,
    },

    schemaOrg: {
        identity: defineOrganization({
            name: 'Liria',
            description: 'Small Circle by Liry24',
            logo: {
                url: '/logo-liria.png',
                width: 460,
                height: 460,
            },
            email: 'hello@liria.me',
            sameAs: ['https://x.com/liria_24', 'https://github.com/liria24'],
        }),
    },

    nitro: {
        preset: 'vercel',
        compressPublicAssets: true,
        experimental: {
            asyncContext: true,
            openAPI: true,
        },
    },

    experimental: {
        scanPageMeta: true,
        payloadExtraction: true,
    },
})
