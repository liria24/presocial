<script setup lang="ts">
const { state } = useSiteStore()

defineSeo({
    type: 'website',
    title: 'Presocial',
    titleTemplate: '%s',
    description: 'Simple tool to preview X/Twitter posts.',
    // image: 'https://presocial.vercel.app/ogp_2.png',
})
useSchemaOrg([
    defineWebSite({
        name: 'Presocial',
        description: 'Simple tool to preview X/Twitter posts.',
        inLanguage: 'ja-JP',
    }),
])
</script>

<template>
    <div class="flex w-full flex-col items-center gap-8 pt-6 sm:pt-24">
        <div v-if="state.showHero" class="flex flex-col items-center gap-3">
            <h1 class="text-center text-7xl font-thin tracking-tighter">
                Presocial
            </h1>
            <p class="text-dimmed text-center text-sm">
                {{ $t('site.description') }}
            </p>
        </div>

        <Twitter />
    </div>
</template>
