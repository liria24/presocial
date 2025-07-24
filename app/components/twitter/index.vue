<script setup lang="ts">
interface Props {
    timeline: boolean
    showContent?: boolean
}
const props = defineProps<Props>()

const { state } = useTwitterStore()
</script>

<template>
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

        <TwitterEditablePost :data="state" :show-content="props.showContent" />

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
</template>
