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
    <div class="flex w-full flex-col items-center gap-18">
        <div class="mt-16 flex flex-col items-center gap-3">
            <h1 class="text-center text-5xl font-extrabold">
                Visualize Post Preview
            </h1>
            <p class="text-muted text-center text-sm">
                A tool to visualize the post preview of X / Twitter.
            </p>
        </div>

        <Twitter class="w-full" />
    </div>
</template>
