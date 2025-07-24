<script lang="ts" setup>
const { data: repo } = useFetch<{ repo: GithubRepo }>(
    'https://ungh.cc/repos/liria24/presocial'
)

const colorMode = useColorMode()

const themeMenu = [
    {
        label: 'システム',
        icon: 'lucide:monitor',
        onSelect: () => {
            colorMode.preference = 'system'
        },
    },
    {
        label: 'ライト',
        icon: 'lucide:sun',
        onSelect: () => {
            colorMode.preference = 'light'
        },
    },
    {
        label: 'ダーク',
        icon: 'lucide:moon',
        onSelect: () => {
            colorMode.preference = 'dark'
        },
    },
]

const builtTools = [
    {
        name: 'Vercel',
        icon: 'simple-icons:vercel',
        url: 'https://vercel.com',
    },
    {
        name: 'Nuxt',
        icon: 'simple-icons:nuxt',
        url: 'https://nuxt.com',
    },
    {
        name: 'Tailwind CSS',
        icon: 'simple-icons:tailwindcss',
        url: 'https://tailwindcss.com',
    },
]
</script>

<template>
    <footer
        class="flex w-full items-end justify-between gap-4 pb-3 sm:items-center"
    >
        <div class="flex flex-col gap-x-6 gap-y-2 sm:flex-row sm:items-center">
            <div class="flex items-center gap-1.5">
                <p class="text-dimmed text-sm leading-none text-nowrap">
                    © 2025
                </p>
                <UButton
                    to="https://liria.me"
                    target="_blank"
                    label="Liria"
                    trailing-icon="presocial:liria"
                    variant="link"
                    size="sm"
                    :ui="{ trailingIcon: 'size-3.5' }"
                    class="text-dimmed gap-1 p-0 text-sm font-bold"
                />
            </div>

            <div class="flex items-center gap-2">
                <p
                    class="text-dimmed text-sm leading-none font-light text-nowrap"
                >
                    built on
                </p>
                <UButton
                    v-for="tool in builtTools"
                    :key="tool.name"
                    :to="tool.url"
                    target="_blank"
                    :aria-label="tool.name"
                    :icon="tool.icon"
                    size="sm"
                    variant="link"
                    class="text-dimmed p-0"
                />
            </div>

            <div class="flex items-center gap-2">
                <p
                    class="text-dimmed text-sm leading-none font-light text-nowrap"
                >
                    opened source on
                </p>
                <UPopover mode="hover" :open-delay="100">
                    <UButton
                        to="https://github.com/liria24/presocial"
                        target="_blank"
                        icon="simple-icons:github"
                        aria-label="GitHub"
                        variant="link"
                        size="sm"
                        class="text-dimmed p-0"
                    />

                    <template #content>
                        <div v-if="repo" class="flex items-center gap-3 p-2">
                            <NuxtImg
                                v-slot="{ src, imgAttrs, isLoaded }"
                                src="https://avatars.githubusercontent.com/u/172270941?v=4"
                                alt="Liria"
                                loading="lazy"
                                :width="48"
                                :height="48"
                                format="webp"
                                custom
                                class="aspect-square size-12 rounded-lg object-cover"
                            >
                                <img
                                    v-if="isLoaded"
                                    v-bind="imgAttrs"
                                    :src="src"
                                />
                                <USkeleton
                                    v-else
                                    class="aspect-square size-12 rounded-lg"
                                />
                            </NuxtImg>

                            <div class="flex flex-col gap-2 font-[Geist]">
                                <span
                                    class="text-sm leading-none font-semibold text-nowrap"
                                >
                                    {{ repo.repo.repo }}
                                </span>
                                <div class="flex items-center gap-1">
                                    <Icon
                                        name="lucide:star"
                                        size="14"
                                        class="text-muted"
                                    />
                                    <span
                                        class="text-muted text-xs leading-none text-nowrap"
                                    >
                                        {{ repo.repo.stars }}
                                    </span>

                                    <Icon
                                        name="lucide:git-pull-request-arrow"
                                        size="14"
                                        class="text-muted ml-2"
                                    />
                                    <NuxtTime
                                        :datetime="repo.repo.updatedAt"
                                        date-style="short"
                                        time-style="short"
                                        class="text-muted text-xs leading-none text-nowrap"
                                    />
                                </div>
                            </div>
                        </div>
                    </template>
                </UPopover>
            </div>
        </div>

        <div class="flex items-center gap-3">
            <ClientOnly>
                <UDropdownMenu
                    :items="themeMenu"
                    :content="{
                        align: 'end',
                        side: 'top',
                        sideOffset: 8,
                    }"
                >
                    <UButton
                        :icon="
                            colorMode.value === 'dark'
                                ? 'lucide:moon'
                                : 'lucide:sun'
                        "
                        aria-label="テーマ"
                        variant="ghost"
                    />
                </UDropdownMenu>

                <template #fallback>
                    <UButton
                        icon="lucide:palette"
                        aria-label="テーマ"
                        variant="ghost"
                    />
                </template>
            </ClientOnly>
        </div>
    </footer>
</template>
