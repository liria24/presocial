<script setup lang="ts">
interface Props {
    timeline: boolean
}
const props = defineProps<Props>()

const { state } = useTwitterStore()

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
</script>

<template>
    <div class="group flex flex-col items-end gap-2">
        <div
            :class="
                cn(
                    'divide-muted flex w-full flex-col divide-y overflow-hidden rounded-xl',
                    props.timeline ? 'mask-t-from-60% mask-b-from-60%' : 'mt-10'
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

            <TwitterEditablePost :data="state" />

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
            <!-- <UButton
                icon="lucide:plus"
                label="Media"
                variant="soft"
                size="sm"
                class="rounded-full pr-3"
            /> -->

            <USelect
                v-model="state.badge"
                :items="badgeItems"
                :icon="icon"
                :placeholder="'Badge'"
                variant="soft"
                size="sm"
                class="min-w-28 rounded-full"
            />

            <UPopover>
                <UButton
                    icon="lucide:building"
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

            <UPopover>
                <UButton
                    icon="lucide:repeat-2"
                    variant="soft"
                    size="sm"
                    class="rounded-full"
                />
                <template #content>
                    <UInput
                        v-model="state.repostedUsername"
                        :placeholder="'Reposted Username'"
                        variant="soft"
                    />
                </template>
            </UPopover>
        </div>
    </div>
</template>
