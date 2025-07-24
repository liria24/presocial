<script setup lang="ts">
defineSeo({
    type: 'website',
    title: 'Presocial',
    titleTemplate: '%s',
    description: 'Free web app to preview X (Twitter) posts before sharing.',
    // image: 'https://presocial.vercel.app/ogp_2.png',
})
useSchemaOrg([
    defineWebSite({
        name: 'Presocial',
        description:
            'Free web app to preview X (Twitter) posts before sharing.',
        inLanguage: 'ja-JP',
    }),
])
</script>

<template>
    <div class="flex w-full flex-col items-center gap-8 pt-24">
        <div class="flex flex-col items-center gap-3">
            <h1 class="text-center text-7xl font-thin tracking-tighter">
                Presocial
            </h1>
            <p class="text-dimmed text-center text-sm">
                Simple tool to preview X/Twitter posts.
            </p>
        </div>

        <SocialPreview />
    </div>
</template>
