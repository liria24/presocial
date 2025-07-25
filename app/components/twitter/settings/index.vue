<script setup lang="ts">
const { state, options } = useTwitterStore()
</script>

<template>
    <div
        :class="
            cn(
                'fixed right-5 bottom-15 flex flex-col items-end gap-3',
                'sm:static sm:flex-row sm:items-center'
            )
        "
    >
        <TwitterSettingsAddMedia />

        <TwitterSettingsBadge />

        <div class="flex items-center gap-3">
            <TwitterSettingsOrgAvatar />

            <UButton
                icon="lucide:repeat-2"
                :aria-label="$t('twitter.repostedUsername')"
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
                        label: $t('common.default'),
                        value: 'light',
                        onSelect: () => (options.theme = 'light'),
                    },
                    {
                        label: $t('common.darkBlue'),
                        value: 'dark',
                        onSelect: () => (options.theme = 'dark'),
                    },
                    {
                        label: $t('common.black'),
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
                                'data-[theme=black]:bg-twitter-black data-[theme=dark]:bg-twitter-dark data-[theme=light]:bg-twitter-light'
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
                                'data-[theme=black]:bg-twitter-black data-[theme=dark]:bg-twitter-dark data-[theme=light]:bg-twitter-light'
                            )
                        "
                    />
                </template>
            </UDropdownMenu>
        </div>
    </div>
</template>
