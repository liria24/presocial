<script setup lang="ts">
const { state, options } = useTwitterStore()

const avatarUrlPresets = [
    '/twitter-default.jpg',
    '/maskable-icon-512x512.png',
    'https://avatars.githubusercontent.com/u/172270941?s=200&v=4',
]

const handleAvatarFileUpload = (event: Event) => {
    const input = event.target as HTMLInputElement
    if (input.files && input.files[0]) {
        const file = input.files[0]

        if (!file.type.match('image.*')) {
            console.error('Selected file is not an image')
            return
        }

        const reader = new FileReader()
        reader.onload = (e) => {
            if (e.target && typeof e.target.result === 'string')
                state.avatarUrl = e.target.result
        }
        reader.onerror = () => console.error('Error reading file')

        reader.readAsDataURL(file)
    }
}

const removeImage = (index: number) => {
    if (state.images && state.images.length > index)
        state.images.splice(index, 1)
}
</script>

<template>
    <div class="flex min-h-12 flex-col gap-1 bg-black p-3.5">
        <div
            v-if="state.repostedUsername?.length"
            class="text-muted flex items-center gap-2 pl-6"
        >
            <Icon name="presocial:twitter-repost" size="16" />
            <span class="text-xs leading-none font-semibold">
                {{ state.repostedUsername + $t('twitter.reposted') }}
            </span>
        </div>

        <div class="flex items-start gap-3">
            <UPopover
                :content="{
                    align: 'start',
                }"
            >
                <button
                    type="button"
                    class="shrink-0 cursor-pointer rounded-full"
                >
                    <img
                        :src="
                            state.avatarUrl?.length
                                ? state.avatarUrl
                                : '/twitter-default.jpg'
                        "
                        :alt="state.username"
                        class="aspect-square size-10 rounded-full object-cover"
                    />
                </button>

                <template #content>
                    <div class="flex flex-col gap-2 p-3">
                        <div class="flex items-center gap-2">
                            <UButton
                                v-for="(avatarUrl, index) in avatarUrlPresets"
                                :key="'avatar-preset-' + index"
                                variant="link"
                                class="rounded-full p-0"
                                @click="state.avatarUrl = avatarUrl"
                            >
                                <UAvatar :src="avatarUrl" />
                            </UButton>
                        </div>

                        <USeparator label="OR" :ui="{ label: 'text-muted' }" />

                        <UFormField :label="$t('common.imageUrl')">
                            <UInput
                                v-model="state.avatarUrl"
                                :placeholder="$t('common.imageUrlPlaceholder')"
                                variant="soft"
                                :ui="{ trailing: 'pe-1' }"
                                class="w-full"
                            >
                                <template
                                    v-if="state.avatarUrl?.length"
                                    #trailing
                                >
                                    <UButton
                                        color="neutral"
                                        variant="ghost"
                                        size="sm"
                                        icon="lucide:x"
                                        :aria-label="$t('common.clearInput')"
                                        @click="state.avatarUrl = ''"
                                    />
                                </template>
                            </UInput>
                        </UFormField>

                        <USeparator label="OR" :ui="{ label: 'text-muted' }" />

                        <UFormField
                            :label="$t('common.localImage')"
                            :hint="$t('common.localImageHint')"
                            :ui="{ hint: 'text-xs' }"
                        >
                            <UInput
                                type="file"
                                variant="soft"
                                accept="image/*"
                                @change="handleAvatarFileUpload"
                            />
                        </UFormField>
                    </div>
                </template>
            </UPopover>

            <div class="flex grow flex-col gap-1.5">
                <div class="flex items-center gap-1">
                    <div class="flex grow items-center gap-1">
                        <span
                            aria-label="Username"
                            contenteditable="true"
                            role="textbox"
                            spellcheck="false"
                            class="inline-block min-w-[1ch] cursor-text pt-px text-[15px] leading-none font-bold text-nowrap outline-none"
                        >
                            {{ state.username }}
                        </span>
                        <Icon
                            v-if="state.badge === 'blue'"
                            name="presocial:twitter-badge-blue"
                            size="18"
                        />
                        <Icon
                            v-else-if="state.badge === 'gold'"
                            name="presocial:twitter-badge-gold"
                            size="18"
                        />
                        <Icon
                            v-else-if="state.badge === 'gray'"
                            name="presocial:twitter-badge-gray"
                            size="18"
                        />
                        <img
                            v-if="state.organizationAvatarUrl?.length"
                            :src="state.organizationAvatarUrl"
                            :alt="$t('twitter.organizationAvatar')"
                            class="border-muted size-[15px] border"
                        />
                        <p
                            class="text-dimmed text-[15px] leading-none text-nowrap"
                        >
                            <span>@</span>
                            <span
                                aria-label="User ID"
                                contenteditable="true"
                                role="textbox"
                                spellcheck="false"
                                class="inline-block min-w-[1h] cursor-text pb-0.5 outline-none"
                            >
                                {{ state.userId }}
                            </span>
                        </p>
                        <Icon
                            name="lucide:dot"
                            size="10"
                            class="text-dimmed -mx-0.5 pb-0.5"
                        />
                        <span
                            aria-label="Time"
                            contenteditable="true"
                            role="textbox"
                            spellcheck="false"
                            class="text-dimmed inline-block min-w-[1ch] cursor-text pb-0.5 text-[15px] leading-none text-nowrap outline-none"
                        >
                            {{ state.time }}
                        </span>
                    </div>

                    <Icon
                        name="lucide:ellipsis"
                        size="18"
                        class="text-dimmed"
                    />
                </div>

                <UTextarea
                    v-if="options.showContent"
                    v-model="state.content"
                    :placeholder="$t('twitter.contentPlaceholder')"
                    variant="none"
                    autoresize
                    :rows="1"
                    spellcheck="false"
                    :ui="{
                        base: 'p-0 text-[15px] rounded-none text-toned',
                    }"
                    class="-mt-0.5"
                />

                <template v-if="state.images?.length">
                    <div
                        :class="
                            cn(
                                'grid aspect-video w-full gap-1 overflow-clip rounded-xl',
                                state.images?.length === 1
                                    ? 'grid-cols-1'
                                    : 'grid-cols-2'
                            )
                        "
                    >
                        <button
                            v-for="(image, index) in state.images"
                            :key="index"
                            tyepe="button"
                            :class="
                                cn(
                                    'aspect-auto w-full cursor-pointer transition-opacity hover:opacity-60',
                                    state.images?.length === 3 &&
                                        'not-first:aspect-video first:row-span-2 first:aspect-auto',
                                    state.images?.length === 4 && 'aspect-video'
                                )
                            "
                            @click="removeImage(index)"
                        >
                            <NuxtImg
                                :src="image"
                                :alt="$t('twitter.postImage')"
                                class="size-full object-cover"
                            />
                        </button>
                    </div>
                </template>

                <div
                    class="text-dimmed flex w-full items-center justify-between gap-3 pt-1"
                >
                    <div class="flex items-center gap-1">
                        <Icon name="presocial:twitter-reply" size="18" />
                        <span
                            aria-label="Replies"
                            contenteditable="true"
                            role="textbox"
                            spellcheck="false"
                            class="inline-block min-w-[1ch] cursor-text pt-px text-[13px] leading-none text-nowrap outline-none"
                        >
                            {{ state.reply }}
                        </span>
                    </div>

                    <div class="flex items-center gap-1">
                        <Icon name="presocial:twitter-repost" size="18" />
                        <span
                            aria-label="Reposts"
                            contenteditable="true"
                            role="textbox"
                            spellcheck="false"
                            class="inline-block min-w-[1ch] cursor-text pt-px text-[13px] leading-none text-nowrap outline-none"
                        >
                            {{ state.repost }}
                        </span>
                    </div>

                    <div class="flex items-center gap-1">
                        <Icon name="presocial:twitter-like" size="18" />
                        <span
                            aria-label="Likes"
                            contenteditable="true"
                            role="textbox"
                            spellcheck="false"
                            class="inline-block min-w-[1ch] cursor-text pt-px text-[13px] leading-none text-nowrap outline-none"
                        >
                            {{ state.like }}
                        </span>
                    </div>

                    <div class="flex items-center gap-1">
                        <Icon name="presocial:twitter-view" size="18" />
                        <span
                            aria-label="Views"
                            contenteditable="true"
                            role="textbox"
                            spellcheck="false"
                            class="inline-block min-w-[1ch] cursor-text pt-px text-[13px] leading-none text-nowrap outline-none"
                        >
                            {{ state.view }}
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
