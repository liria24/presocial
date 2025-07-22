<script setup lang="ts">
import { USwitch } from '#components'

const timeline = ref(false)
const state = reactive<Twitter>({
    username: 'User',
    userId: 'user',
    avatarUrl: '',
    badge: undefined,
    organizationAvatarUrl: '',
    time: '24分',
    content: '',
    reply: 2,
    repost: 3,
    like: 10,
    view: 1124,
    repostedUsername: '',
})

const badgeItems = ref([
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
    <div class="flex flex-col items-center gap-6">
        <USwitch v-model="timeline" label="Show Timeline" />

        <div
            :class="
                cn(
                    'divide-muted flex w-full max-w-xl flex-col divide-y overflow-hidden rounded-xl',
                    timeline && 'mask-t-from-60% mask-b-from-60%'
                )
            "
        >
            <TwitterPost
                v-if="timeline"
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
            <TwitterPost :data="state" />
            <TwitterPost
                v-if="timeline"
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

        <div class="flex flex-wrap items-center gap-3">
            <USelect
                v-model="state.badge"
                :items="badgeItems"
                :icon="icon"
                class="w-48"
            />
            <UInput
                v-model="state.organizationAvatarUrl"
                :placeholder="'Organization Avatar URL'"
                variant="soft"
            />
            <UInput
                v-model="state.repostedUsername"
                :placeholder="'Reposted Username'"
                variant="soft"
            />
        </div>
    </div>
</template>
