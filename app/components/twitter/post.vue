<script setup lang="ts">
interface Props {
    data: Twitter
}
const props = defineProps<Props>()
</script>

<template>
    <div class="flex min-h-12 flex-col gap-1 bg-black p-3.5">
        <div
            v-if="props.data.repostedUsername?.length"
            class="text-muted flex items-center gap-2 pl-6"
        >
            <Icon name="presocial:twitter-repost" size="16" />
            <span class="text-xs leading-none font-semibold">
                {{ props.data.repostedUsername + $t('twitter.reposted') }}
            </span>
        </div>

        <div class="flex items-start gap-3">
            <NuxtImg
                :src="
                    props.data.avatarUrl?.length
                        ? props.data.avatarUrl
                        : '/twitter-default.jpg'
                "
                :alt="props.data.username"
                class="aspect-square size-10 rounded-full"
            />

            <div class="flex grow flex-col gap-1.5">
                <div class="flex items-center gap-1">
                    <div class="flex grow items-center gap-1">
                        <span
                            class="pt-px text-[15px] leading-none font-bold text-nowrap"
                        >
                            {{ props.data.username }}
                        </span>
                        <Icon
                            v-if="props.data.badge === 'blue'"
                            name="presocial:twitter-badge-blue"
                            size="18"
                        />
                        <Icon
                            v-else-if="props.data.badge === 'gold'"
                            name="presocial:twitter-badge-gold"
                            size="18"
                        />
                        <Icon
                            v-else-if="props.data.badge === 'gray'"
                            name="presocial:twitter-badge-gray"
                            size="18"
                        />
                        <img
                            v-if="props.data.organizationAvatarUrl?.length"
                            :src="props.data.organizationAvatarUrl"
                            :alt="$t('twitter.organizationAvatar')"
                            class="border-muted size-[15px] border"
                        />
                        <p
                            class="text-dimmed text-[15px] leading-none text-nowrap"
                        >
                            @{{ props.data.userId }}
                        </p>
                        <Icon
                            name="lucide:dot"
                            size="10"
                            class="text-dimmed -mx-0.5 pb-0.5"
                        />
                        <span
                            class="text-dimmed pb-0.5 text-[15px] leading-none text-nowrap"
                        >
                            {{ props.data.time }}
                        </span>
                    </div>

                    <Icon
                        name="lucide:ellipsis"
                        size="18"
                        class="text-dimmed"
                    />
                </div>

                <p class="text-toned text-[15px]">{{ props.data.content }}</p>

                <template v-if="props.data.images?.length">
                    <div
                        :class="
                            cn(
                                'grid aspect-video w-full gap-1 overflow-clip rounded-xl',
                                props.data.images?.length === 1
                                    ? 'grid-cols-1'
                                    : 'grid-cols-2'
                            )
                        "
                    >
                        <div
                            v-for="(image, index) in props.data.images"
                            :key="index"
                            :class="
                                cn(
                                    'aspect-auto w-full',
                                    props.data.images?.length === 3 &&
                                        'not-first:aspect-video first:row-span-2 first:aspect-auto',
                                    props.data.images?.length === 4 &&
                                        'aspect-video'
                                )
                            "
                        >
                            <img
                                :src="image"
                                :alt="$t('twitter.postImage')"
                                class="size-full object-cover"
                            />
                        </div>
                    </div>
                </template>

                <div
                    class="text-dimmed flex w-full items-center justify-between gap-3 pt-1"
                >
                    <div class="flex items-center gap-1">
                        <Icon name="presocial:twitter-reply" size="18" />
                        <span
                            class="pt-px text-[13px] leading-none text-nowrap"
                        >
                            {{ props.data.reply }}
                        </span>
                    </div>

                    <div class="flex items-center gap-1">
                        <Icon name="presocial:twitter-repost" size="18" />
                        <span
                            class="pt-px text-[13px] leading-none text-nowrap"
                        >
                            {{ props.data.repost }}
                        </span>
                    </div>

                    <div class="flex items-center gap-1">
                        <Icon name="presocial:twitter-like" size="18" />
                        <span
                            class="pt-px text-[13px] leading-none text-nowrap"
                        >
                            {{ props.data.like }}
                        </span>
                    </div>

                    <div class="flex items-center gap-1">
                        <Icon name="presocial:twitter-view" size="18" />
                        <span
                            class="pt-px text-[13px] leading-none text-nowrap"
                        >
                            {{ props.data.view }}
                        </span>
                    </div>

                    <div class="flex items-center gap-3">
                        <Icon name="lucide:bookmark" size="18" />
                        <Icon name="lucide:upload" size="18" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
