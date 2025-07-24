<script setup lang="ts">
interface Props {
    timeline: boolean
}
const props = defineProps<Props>()

const { state } = useTwitterStore()
const showContent = ref(true)

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
    <div class="group flex flex-col items-end gap-2">
        <div
            :class="
                cn(
                    'divide-muted flex w-full flex-col divide-y overflow-hidden rounded-xl',
                    props.timeline && 'mask-t-from-60% mask-b-from-60%',
                    !props.timeline && !state.images?.length && 'mt-10'
                )
            "
        >
            <TwitterPost
                v-if="props.timeline"
                :data="{
                    username: 'Liria',
                    userId: 'liria_24',
                    avatarUrl:
                        'https://avatars.githubusercontent.com/u/172270941?s=200&v=4',
                    time: '1分',
                    content:
                        'Lorem ipsum dolor sit amet consectetur adipiscing elit. Dolor sit amet consectetur adipiscing elit quisque faucibus.',
                    like: 8,
                    view: 84,
                    repostedUsername: '',
                }"
            />

            <TwitterEditablePost :data="state" :show-content="showContent" />

            <TwitterPost
                v-if="props.timeline"
                :data="{
                    username: 'Presocial',
                    userId: 'pr3$0c1a/',
                    avatarUrl:
                        'https://avatars.githubusercontent.com/u/172270941?s=200&v=4',
                    time: '1時間',
                    content: 'We are dropped Presocial web app today!',
                    reply: 3,
                    repost: 7,
                    like: 15,
                    view: 200,
                    repostedUsername: '',
                }"
            />
        </div>

        <div
            class="flex items-center gap-1 opacity-0 transition-opacity group-hover:opacity-100"
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
    </div>
</template>
