<script setup lang="ts">
const { state } = useTwitterStore()

const twitterOptions = reactive({
    timeline: false,
})

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
    <div class="flex w-full flex-col items-center gap-24 pt-24">
        <div class="flex flex-col items-center gap-3">
            <h1 class="text-center text-7xl font-thin tracking-tighter">
                Presocial
            </h1>
            <p class="text-dimmed text-center text-sm">
                Simple tool to preview X/Twitter posts.
            </p>

            <div class="mt-3 flex items-center gap-4">
                <USwitch
                    v-model="twitterOptions.timeline"
                    label="Show Timeline"
                    :ui="{ label: 'text-muted' }"
                />
                <div class="group/post relative">
                    <UButton
                        :to="`https://x.com/intent/post?text=${encodeURIComponent(state.content)}`"
                        target="_blank"
                        icon="lucide:send"
                        label="Post on X"
                        variant="soft"
                        :ui="{ leadingIcon: 'size-4' }"
                        class="gap-2 rounded-full pr-4 pl-3"
                    />
                    <span
                        class="text-dimmed absolute -bottom-4 left-1.5 text-xs leading-none text-nowrap opacity-0 transition-opacity group-hover/post:opacity-100"
                    >
                        The images are not attached.
                    </span>
                </div>
            </div>
        </div>

        <Twitter :timeline="twitterOptions.timeline" class="w-full max-w-xl" />
    </div>
</template>
