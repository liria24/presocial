<script setup lang="ts">
const { app } = useAppConfig()
const { state, options } = useTwitterStore()
</script>

<template>
    <div
        :class="
            cn(
                'flex w-full flex-col divide-y overflow-hidden',
                options.timeline
                    ? 'mask-t-from-70% mask-b-from-70%'
                    : 'rounded-xl',
                !options.timeline && !state.images?.length && 'mt-10',
                options.theme === 'light' && 'divide-twitter-light',
                options.theme === 'dark' && 'divide-twitter-dark',
                options.theme === 'black' && 'divide-twitter-black'
            )
        "
    >
        <TwitterPost
            v-if="options.timeline"
            :data="{
                username: 'Liria',
                userId: 'liria_24',
                avatarUrl: app.liriaAvatar,
                time: '1分',
                content:
                    'Lorem ipsum dolor sit amet consectetur adipiscing elit. Dolor sit amet consectetur adipiscing elit quisque faucibus.',
                like: 8,
                view: 84,
            }"
        />

        <TwitterEditablePost />

        <TwitterPost
            v-if="options.timeline"
            :data="{
                username: 'Presocial',
                userId: 'pr3$0c1a/',
                avatarUrl: '/maskable-icon-512x512.png',
                time: '1時間',
                content: 'We are dropped Presocial web app today!',
                reply: 3,
                repost: 7,
                like: 15,
                view: 200,
            }"
        />
    </div>
</template>
