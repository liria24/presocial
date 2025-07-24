<script setup lang="ts">
import type { TimelineItem } from '@nuxt/ui'

const items = ref<TimelineItem[]>([
    {
        title: 'Stable Release',
        icon: 'presocial:presocial',
    },
    {
        title: 'More Social Platforms',
        icon: 'presocial:presocial',
    },
    {
        title: 'Polls',
        icon: 'simple-icons:x',
        platform: 'X',
    },
    {
        title: 'Link OGP Preview',
        icon: 'simple-icons:x',
        platform: 'X',
    },
    {
        title: 'Attach Video',
        icon: 'simple-icons:x',
        platform: 'X',
    },
    {
        title: 'Attach Gif',
        icon: 'simple-icons:x',
        platform: 'X',
    },
    {
        title: 'Replies',
        icon: 'simple-icons:x',
        platform: 'X',
    },
    {
        title: 'Quote Repost',
        icon: 'simple-icons:x',
        platform: 'X',
    },
    {
        title: 'More Information in Post',
        description: 'People tagged in images, Source user, Location',
        icon: 'simple-icons:x',
        platform: 'X',
    },
    {
        title: 'Styling of Post Body Text',
        description:
            'Display mentions and hashtags in blue. Support extended styles for premium users.',
        icon: 'simple-icons:x',
        platform: 'X',
    },
    {
        date: '2025-7-24',
        title: 'Support PWA',
        icon: 'presocial:presocial',
    },
    {
        date: '2025-7-24',
        title: 'Attach Images',
        icon: 'simple-icons:x',
        platform: 'X',
    },
    {
        date: '2025-7-24',
        title: 'i18n Support',
        description: 'Now supports English and Japanese.',
        icon: 'presocial:presocial',
    },
    {
        date: '2025-7-22',
        title: 'First Release',
        icon: 'presocial:presocial',
    },
])

defineSeo({
    title: 'Roadmap',
    description: 'Development roadmap for Presocial.',
})
</script>

<template>
    <div class="flex w-full flex-col items-center gap-8 pt-6 sm:pt-24">
        <div class="flex flex-col items-center gap-3">
            <h1 class="text-center text-5xl font-thin tracking-tighter">
                Roadmap
            </h1>

            <UButton
                :to="$localePath('/')"
                icon="lucide:arrow-left"
                :label="$t('common.backToHome')"
                variant="link"
                size="sm"
            />
        </div>

        <div class="w-fit max-w-sm">
            <UTimeline
                :default-value="3"
                :items="items"
                reverse
                color="neutral"
                size="xs"
            >
                <template #title="{ item }">
                    <div class="flex items-center gap-2">
                        <span
                            v-if="item.platform?.length"
                            class="text-muted font-bold"
                        >
                            {{ item.platform }}:
                        </span>
                        <span>{{ item.title }}</span>
                    </div>
                </template>
            </UTimeline>
        </div>
    </div>
</template>
