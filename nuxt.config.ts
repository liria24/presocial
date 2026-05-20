import { defineOrganization } from 'nuxt-schema-org/schema'

const baseUrl = import.meta.env.NUXT_PUBLIC_SITE_URL || 'http://localhost:3000'
const title = 'Presocial'
const description = 'Simple tool to preview X/Twitter posts.'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    compatibilityDate: '2024-11-01',

    devtools: { enabled: true, timeline: { enabled: true } },

    modules: [
        '@nuxt/image',
        '@nuxt/ui',
        '@nuxtjs/device',
        '@nuxtjs/i18n',
        '@nuxtjs/robots',
        '@pinia/nuxt',
        '@vite-pwa/nuxt',
        '@vueuse/nuxt',
        'nuxt-link-checker',
        'nuxt-schema-org',
        'nuxt-seo-utils',
        'pinia-plugin-persistedstate/nuxt',
        '@nuxt/hints',
        '@nuxt/a11y',
    ],

    css: ['~/assets/css/main.css'],

    vite: {
        vue: {
            features: {
                optionsAPI: false,
            },
        },
        optimizeDeps: {
            include: [
                '@nuxt/ui > prosemirror-state',
                '@nuxt/ui > prosemirror-transform',
                '@nuxt/ui > prosemirror-model',
                '@nuxt/ui > prosemirror-view',
                '@nuxt/ui > prosemirror-gapcursor',
            ],
        },
    },

    routeRules: {
        '/roadmap': { prerender: true },
        '/sw.js': { headers: { 'Cache-Control': 'public, max-age=0, must-revalidate' } },
        '/manifest.webmanifest': {
            headers: {
                'Cache-Control': 'public, max-age=0, must-revalidate',
                'Content-Type': 'application/manifest+json',
            },
        },
    },

    runtimeConfig: {
        public: {
            siteUrl: baseUrl,
        },
    },

    nitro: {
        preset: 'cloudflare_module',
        cloudflare: {
            deployConfig: true,
            nodeCompat: true,
            wrangler: {
                name: 'presocial',
            },
        },
        compressPublicAssets: true,
        experimental: {
            asyncContext: true,
        },
    },

    typescript: {
        typeCheck: true,
        tsConfig: {
            compilerOptions: {
                noUncheckedIndexedAccess: true,
            },
        },
    },

    experimental: {
        crossOriginPrefetch: true,
        extractAsyncDataHandlers: true,
        inlineRouteRules: true,
        sharedPrerenderData: true,
        typescriptPlugin: true,
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
                { name: 'viewport', content: 'width=device-width, initial-scale=1' },
                { property: 'og:site_name', content: title },
                { property: 'og:type', content: 'website' },
                { property: 'og:url', content: 'https://presocial.vercel.app' },
                { property: 'og:title', content: title },
                // { property: 'og:image', content: 'https://presocial.vercel.app/ogp.png' },
                { name: 'description', content: description },
                { property: 'og:description', content: description },
                { name: 'twitter:site', content: '@liria_24' },
                { name: 'twitter:card', content: 'summary_large_image' },
                { name: 'theme-color', content: '#DDDDDD' },
            ],
            link: [
                { rel: 'icon', href: `/favicon.ico`, sizes: '48x48' },
                { rel: 'apple-touch-icon', href: `/apple-touch-icon-180x180.png` },
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
                icon: 'twemoji:flag-united-states',
            },
            {
                code: 'ja',
                language: 'ja-JP',
                name: '日本語',
                icon: 'twemoji:flag-japan',
            },
        ],
        detectBrowserLanguage: {
            redirectOn: 'root',
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
            ],
            scan: true,
            includeCustomCollections: true,
        },
    },

    image: {
        provider: 'cloudflare',
        cloudflare: {
            baseURL: 'https://liria.me',
        },
        domains: [
            'avatars.githubusercontent.com', // GitHub User Avatars
        ],
    },

    pwa: {
        registerType: 'autoUpdate',
        manifest: {
            name: 'Presocial',
            description: 'Simple tool to preview X/Twitter posts.',
            theme_color: '#DDDDDD',
            lang: 'en',
            short_name: 'Presocial',
            start_url: '/',
            display: 'standalone',
            background_color: '#000000',
            icons: [
                {
                    src: 'pwa-64x64.png',
                    sizes: '64x64',
                    type: 'image/png',
                },
                {
                    src: 'pwa-192x192.png',
                    sizes: '192x192',
                    type: 'image/png',
                },
                {
                    src: 'pwa-512x512.png',
                    sizes: '512x512',
                    type: 'image/png',
                },
                {
                    src: 'maskable-icon-512x512.png',
                    sizes: '512x512',
                    type: 'image/png',
                    purpose: 'maskable',
                },
            ],
        },
        workbox: {
            navigateFallback: null,
        },
        devOptions: {
            enabled: true,
            type: 'module',
        },
    },

    robots: {
        blockNonSeoBots: true,
        blockAiBots: true,
    },

    schemaOrg: {
        identity: defineOrganization({
            name: 'Liria',
            description: 'Small Circle by Liry24',
            logo: {
                url: 'https://liria.me/avatar.png',
                width: 460,
                height: 460,
            },
            email: 'hello@liria.me',
            sameAs: ['https://x.com/liria_24', 'https://github.com/liria24'],
        }),
    },
})
