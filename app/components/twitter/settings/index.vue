<script setup lang="ts">
const { state, options } = useTwitterStore()

const initializeRepostedUsername = () => {
    if (!state.repostedUsername?.length) state.repostedUsername = 'Presocial'
}
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
            <UButton
                :icon="options.showContent ? 'lucide:pen-off' : 'lucide:pen'"
                :aria-label="$t('twitter.toggleContentVisibility')"
                variant="soft"
                size="sm"
                class="rounded-full"
                @click="options.showContent = !options.showContent"
            />

            <TwitterSettingsOrgAvatar />

            <UPopover
                :content="{
                    align: 'end',
                }"
            >
                <UButton
                    icon="lucide:repeat-2"
                    :aria-label="$t('twitter.repostedUsername')"
                    variant="soft"
                    size="sm"
                    class="rounded-full"
                    @click="initializeRepostedUsername"
                />
                <template #content>
                    <UInput
                        v-model="state.repostedUsername"
                        :placeholder="$t('twitter.repostedUsername')"
                        variant="soft"
                        :ui="{ trailing: 'pe-1' }"
                    >
                        <template
                            v-if="state.repostedUsername?.length"
                            #trailing
                        >
                            <UButton
                                color="neutral"
                                variant="ghost"
                                size="sm"
                                icon="lucide:x"
                                :aria-label="$t('common.clearInput')"
                                @click="state.repostedUsername = ''"
                            />
                        </template>
                    </UInput>
                </template>
            </UPopover>
        </div>
    </div>
</template>
