<script setup lang="ts">
const { t } = useI18n({ useScope: 'local' })
const { state, options } = useTwitterStore()
</script>

<template>
    <div class="flex items-center gap-3">
        <TwitterSettingsAddMedia />

        <TwitterSettingsBadge />

        <div class="flex items-center gap-3">
            <TwitterSettingsOrgAvatar />

            <UButton
                icon="lucide:repeat-2"
                :aria-label="t('repostedUsername')"
                variant="soft"
                size="sm"
                :active="state.reposted"
                active-variant="solid"
                active-color="neutral"
                class="rounded-full"
                @click="state.reposted = !state.reposted"
            />

            <UDropdownMenu
                :content="{
                    align: 'end',
                }"
                :items="[
                    {
                        label: t('default'),
                        value: 'light',
                        onSelect: () => (options.theme = 'light'),
                    },
                    {
                        label: t('darkBlue'),
                        value: 'dark',
                        onSelect: () => (options.theme = 'dark'),
                    },
                    {
                        label: t('black'),
                        value: 'black',
                        onSelect: () => (options.theme = 'black'),
                    },
                ]"
            >
                <UButton variant="soft" size="sm" class="rounded-full p-1.5">
                    <div
                        :data-theme="options.theme"
                        :class="
                            cn(
                                'ring-muted size-4 rounded-full ring-2',
                                'data-[theme=black]:bg-twitter-black data-[theme=dark]:bg-twitter-dark data-[theme=light]:bg-twitter-light',
                            )
                        "
                    />
                </UButton>

                <template #item-leading="{ item }">
                    <div
                        :data-theme="item.value"
                        :class="
                            cn(
                                'ring-muted size-4 rounded-full ring-2',
                                'data-[theme=black]:bg-twitter-black data-[theme=dark]:bg-twitter-dark data-[theme=light]:bg-twitter-light',
                            )
                        "
                    />
                </template>
            </UDropdownMenu>
        </div>
    </div>
</template>

<i18n lang="json">
{
    "en": {
        "repostedUsername": "Reposted Username",
        "default": "Default",
        "darkBlue": "Dark Blue",
        "black": "Black"
    },
    "ja": {
        "repostedUsername": "リポストしたユーザー名",
        "default": "デフォルト",
        "darkBlue": "ダークブルー",
        "black": "ブラック"
    }
}
</i18n>
