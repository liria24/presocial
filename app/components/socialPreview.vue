<script setup lang="ts">
const { state } = useTwitterStore()
const showContent = ref(true)

const twitterOptions = reactive({
    timeline: false,
})

const badgeItems = ref([
    {
        label: 'None',
        value: undefined,
        icon: 'lucide:eye-off',
    },
    {
        label: 'Blue',
        value: 'blue',
        icon: 'presocial:twitter-badge-blue',
    },
    {
        label: 'Gold',
        value: 'gold',
        icon: 'presocial:twitter-badge-gold',
    },
    {
        label: 'Gray',
        value: 'gray',
        icon: 'presocial:twitter-badge-gray',
    },
])

const icon = computed(
    () => badgeItems.value.find((item) => item.value === state.badge)?.icon
)

const { onChange, open, reset } = useFileDialog({
    accept: 'image/*',
    directory: false,
})

onChange((files) => {
    const currentImagesLength = state.images?.length || 0
    if (!files?.length || currentImagesLength > 4) return

    const fileList = Array.from(files)
    const urls = fileList
        .slice(0, 4 - currentImagesLength)
        .map((file) => URL.createObjectURL(file))
    for (const url of urls) {
        if (state.images) state.images.push(url)
        else state.images = [url]
    }
    reset()
})

const initializeRepostedUsername = () => {
    if (!state.repostedUsername.length) state.repostedUsername = 'Presocial'
}
</script>

<template>
    <div class="flex w-full flex-col items-center gap-8">
        <div class="flex items-center gap-4">
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

        <div
            :class="
                cn(
                    'fixed right-5 bottom-15 flex flex-col items-end gap-3',
                    'sm:static sm:flex-row sm:items-center'
                )
            "
        >
            <UButton
                icon="lucide:plus"
                label="Media"
                variant="soft"
                size="sm"
                class="rounded-full pr-3"
                @click="open()"
            />

            <USelect
                v-model="state.badge"
                :items="badgeItems"
                :icon="icon"
                :placeholder="'Badge'"
                variant="soft"
                size="sm"
                class="min-w-28 rounded-full"
            />

            <UButton
                :icon="showContent ? 'lucide:pen-off' : 'lucide:pen'"
                aria-label="Toggle content visibility"
                variant="soft"
                size="sm"
                class="rounded-full"
                @click="showContent = !showContent"
            />

            <UPopover
                :content="{
                    align: 'end',
                }"
            >
                <UButton
                    icon="lucide:building"
                    aria-label="Organization Avatar"
                    variant="soft"
                    size="sm"
                    class="rounded-full"
                />
                <template #content>
                    <UInput
                        v-model="state.organizationAvatarUrl"
                        :placeholder="'Organization Avatar URL'"
                        variant="soft"
                    />
                </template>
            </UPopover>

            <UPopover
                :content="{
                    align: 'end',
                }"
            >
                <UButton
                    icon="lucide:repeat-2"
                    aria-label="Reposted Username"
                    variant="soft"
                    size="sm"
                    class="rounded-full"
                    @click="initializeRepostedUsername"
                />
                <template #content>
                    <UInput
                        v-model="state.repostedUsername"
                        :placeholder="'Reposted Username'"
                        variant="soft"
                        :ui="{ trailing: 'pe-1' }"
                    >
                        <template
                            v-if="state.repostedUsername.length"
                            #trailing
                        >
                            <UButton
                                color="neutral"
                                variant="ghost"
                                size="sm"
                                icon="lucide:x"
                                aria-label="Clear input"
                                @click="state.repostedUsername = ''"
                            />
                        </template>
                    </UInput>
                </template>
            </UPopover>
        </div>

        <Twitter
            :timeline="twitterOptions.timeline"
            :show-content="showContent"
            class="mt-4 w-full max-w-xl"
        />
    </div>
</template>
