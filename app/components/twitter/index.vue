<script setup lang="ts">
const { state, options } = useTwitterStore()
</script>

<template>
    <div class="flex w-full flex-col items-center gap-8">
        <div class="flex items-center gap-4">
            <USwitch
                v-model="options.timeline"
                :label="$t('twitter.showTimeline')"
                :ui="{ label: 'text-muted' }"
            />
            <div class="group/post-on-x relative">
                <UButton
                    :to="`https://x.com/intent/post?text=${encodeURIComponent(state.content)}`"
                    target="_blank"
                    icon="lucide:send"
                    :label="$t('twitter.postOnX')"
                    variant="soft"
                    :ui="{ leadingIcon: 'size-4' }"
                    class="gap-2 rounded-full px-3"
                />
                <span
                    class="text-dimmed absolute -bottom-4 left-1.5 text-xs leading-none text-nowrap opacity-0 transition-opacity group-hover/post-on-x:opacity-100"
                >
                    {{ $t('twitter.postOnXWarning') }}
                </span>
            </div>
        </div>

        <TwitterSettings />

        <TwitterTimeline class="mt-4 w-full max-w-xl" />
    </div>
</template>
