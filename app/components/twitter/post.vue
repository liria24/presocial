<script setup lang="ts">
interface Props {
    data: Twitter
}
const props = defineProps<Props>()
</script>

<template>
    <div class="flex min-h-12 flex-col gap-1 bg-neutral-950 p-3.5">
        <div
            v-if="props.data.repostedUsername.length"
            class="text-muted flex items-center gap-2 pl-6"
        >
            <Icon name="presocial:twitter-repost" size="16" />
            <span class="text-xs leading-none font-semibold">
                {{ props.data.repostedUsername }}さんがリポスト
            </span>
        </div>

        <div class="flex items-start gap-3">
            <UPopover>
                <button type="button" class="cursor-pointer">
                    <img
                        v-if="props.data.avatarUrl?.length"
                        :src="props.data.avatarUrl"
                        :alt="props.data.username"
                        class="aspect-square size-10 rounded-full"
                    />
                    <img
                        v-else
                        src="/twitter-default.jpg"
                        alt="Default Avatar"
                        class="aspect-square size-10 rounded-full"
                    />
                </button>

                <template #content>
                    <div class="flex flex-col gap-2 p-3">
                        <UInput
                            v-model="props.data.avatarUrl"
                            :placeholder="'Enter avatar image URL...'"
                            variant="soft"
                        />
                        <USeparator label="OR" />
                        <UInput type="file" variant="soft" />
                    </div>
                </template>
            </UPopover>

            <div class="flex grow flex-col gap-1.5">
                <div class="flex items-center gap-1">
                    <div class="flex grow items-center gap-1">
                        <span
                            contenteditable="true"
                            role="textbox"
                            spellcheck="false"
                            class="inline-block min-w-[1ch] cursor-text pt-px text-[15px] leading-none font-bold text-nowrap outline-none"
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
                        <NuxtImg
                            v-if="props.data.organizationAvatarUrl?.length"
                            :src="props.data.organizationAvatarUrl"
                            alt="Organization Avatar"
                            :width="15"
                            :height="15"
                            format="webp"
                            class="border-muted size-[15px] border"
                        />
                        <p
                            class="text-dimmed text-[15px] leading-none text-nowrap"
                        >
                            <span>@</span>
                            <span
                                contenteditable="true"
                                role="textbox"
                                spellcheck="false"
                                class="inline-block min-w-[1h] cursor-text pb-0.5 outline-none"
                            >
                                {{ props.data.userId }}
                            </span>
                        </p>
                        <Icon
                            name="lucide:dot"
                            size="10"
                            class="text-dimmed -mx-0.5 pb-0.5"
                        />
                        <span
                            contenteditable="true"
                            role="textbox"
                            spellcheck="false"
                            class="text-dimmed inline-block min-w-[1ch] cursor-text pb-0.5 text-[15px] leading-none text-nowrap outline-none"
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

                <UTextarea
                    v-model="props.data.content"
                    :placeholder="'Enter your post content...'"
                    variant="none"
                    autoresize
                    :rows="1"
                    spellcheck="false"
                    :ui="{
                        base: 'p-0 text-[15px] rounded-none text-toned',
                    }"
                    class="-mt-0.5"
                />

                <div
                    class="text-dimmed flex w-full items-center justify-between gap-3 pt-1"
                >
                    <div class="flex items-center gap-1">
                        <Icon name="presocial:twitter-reply" size="18" />
                        <span
                            contenteditable="true"
                            role="textbox"
                            spellcheck="false"
                            class="inline-block min-w-[1ch] cursor-text pt-px text-[13px] leading-none text-nowrap outline-none"
                        >
                            {{ props.data.reply }}
                        </span>
                    </div>

                    <div class="flex items-center gap-1">
                        <Icon name="presocial:twitter-repost" size="18" />
                        <span
                            contenteditable="true"
                            role="textbox"
                            spellcheck="false"
                            class="inline-block min-w-[1ch] cursor-text pt-px text-[13px] leading-none text-nowrap outline-none"
                        >
                            {{ props.data.repost }}
                        </span>
                    </div>

                    <div class="flex items-center gap-1">
                        <Icon name="presocial:twitter-like" size="18" />
                        <span
                            contenteditable="true"
                            role="textbox"
                            spellcheck="false"
                            class="inline-block min-w-[1ch] cursor-text pt-px text-[13px] leading-none text-nowrap outline-none"
                        >
                            {{ props.data.like }}
                        </span>
                    </div>

                    <div class="flex items-center gap-1">
                        <Icon name="presocial:twitter-view" size="18" />
                        <span
                            contenteditable="true"
                            role="textbox"
                            spellcheck="false"
                            class="inline-block min-w-[1ch] cursor-text pt-px text-[13px] leading-none text-nowrap outline-none"
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
