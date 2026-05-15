<script setup lang="ts">
const { app } = useAppConfig()
const { state } = useSiteStore()

const { t } = useI18n({ useScope: 'local' })

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
    <div class="flex w-full flex-col items-center gap-16 pt-6">
        <div v-if="state.showHero" class="flex flex-col items-center gap-3">
            <UButton
                to="/roadmap"
                :label="`v${app.version}`"
                trailing-icon="lucide:arrow-right"
                variant="outline"
                size="sm"
                :ui="{ label: 'leading-none pt-px' }"
                class="rounded-full pt-1.25 pr-2.5 pb-1.5 pl-3.5"
            />
            <h1 class="text-center text-7xl font-thin tracking-tighter">Presocial</h1>
            <p class="text-dimmed text-center text-sm">
                {{ t('site.description') }}
            </p>
        </div>

        <Twitter />
    </div>
</template>

<i18n lang="json">
{
    "en": {
        "site": {
            "description": "Simple tool to preview X/Twitter posts."
        }
    },
    "ja": {
        "site": {
            "description": "X/Twitterのポストをプレビューするシンプルなツール"
        }
    }
}
</i18n>
