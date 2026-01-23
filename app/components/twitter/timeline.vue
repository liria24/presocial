<script setup lang="ts">
const { t } = useI18n({ useScope: 'local' })
const { app } = useAppConfig()
const { state, options } = useTwitterStore()
</script>

<template>
    <div
        :class="
            cn(
                'flex w-full flex-col divide-y overflow-hidden',
                options.timeline ? 'mask-t-from-70% mask-b-from-70%' : 'rounded-xl',
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
                time: `1 ${t('min')}`,
                content: t('example1'),
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
                time: `1 ${t('hour')}`,
                content: t('example2'),
                reply: 3,
                repost: 7,
                like: 15,
                view: 200,
            }"
        />
    </div>
</template>

<i18n lang="json">
{
    "en": {
        "min": "min",
        "hour": "hour",
        "example1": "Lorem ipsum dolor sit amet consectetur adipiscing elit. Dolor sit amet consectetur adipiscing elit quisque faucibus.",
        "example2": "We are dropped Presocial web app today!"
    },
    "ja": {
        "min": "分",
        "hour": "時間",
        "example1": "あのイーハトーヴォのすきとおった風、夏でも底に冷たさをもつ青いそら、うつくしい森で飾られたモリーオ市、郊外のぎらぎらひかる草の波。",
        "example2": "「Presocial」は、X/Twitterの投稿をプレビューできるWebアプリです!"
    }
}
</i18n>
