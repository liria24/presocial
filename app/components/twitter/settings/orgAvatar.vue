<script setup lang="ts">
const { app } = useAppConfig()
const { state } = useTwitterStore()

const avatarUrlPresets = ['/maskable-icon-512x512.png', app.liriaAvatar]

// ファイル選択時の処理
const handleFileChange = (event: Event) => {
    const target = event.target as HTMLInputElement
    const file = target.files?.[0]

    if (file) {
        // ファイルタイプのチェック
        if (!file.type.startsWith('image/')) {
            console.error('Selected file is not an image')
            return
        }

        // ファイルをData URLとして読み込む
        const reader = new FileReader()
        reader.onload = (e) => {
            if (e.target?.result)
                state.organizationAvatarUrl = e.target.result as string
        }
        reader.onerror = () => console.error('Error reading file')

        reader.readAsDataURL(file)
    }
}
</script>

<template>
    <UPopover
        :content="{
            align: 'end',
            side: 'top',
        }"
    >
        <UButton
            icon="lucide:building"
            :aria-label="$t('twitter.organizationAvatar')"
            variant="soft"
            size="sm"
            class="rounded-full"
        />

        <template #content>
            <div class="flex flex-col gap-2 p-3">
                <div class="flex items-center gap-2">
                    <UButton
                        v-for="(avatarUrl, index) in avatarUrlPresets"
                        :key="'avatar-preset-' + index"
                        variant="link"
                        class="rounded-full p-0"
                        @click="state.organizationAvatarUrl = avatarUrl"
                    >
                        <UAvatar :src="avatarUrl" />
                    </UButton>

                    <UButton
                        icon="lucide:x"
                        variant="ghost"
                        class="rounded-full"
                        @click="state.organizationAvatarUrl = ''"
                    />
                </div>

                <USeparator label="OR" :ui="{ label: 'text-muted' }" />

                <UFormField :label="$t('common.imageUrl')">
                    <UInput
                        v-model="state.organizationAvatarUrl"
                        :placeholder="$t('common.imageUrlPlaceholder')"
                        variant="soft"
                        :ui="{ trailing: 'pe-1' }"
                        class="w-full"
                    >
                        <template
                            v-if="state.organizationAvatarUrl?.length"
                            #trailing
                        >
                            <UButton
                                color="neutral"
                                variant="ghost"
                                size="sm"
                                icon="lucide:x"
                                :aria-label="$t('common.clearInput')"
                                @click="state.organizationAvatarUrl = ''"
                            />
                        </template>
                    </UInput>
                </UFormField>

                <UFormField
                    :label="$t('common.localImage')"
                    :hint="$t('common.localImageHint')"
                    :ui="{ hint: 'text-xs' }"
                >
                    <UInput
                        type="file"
                        variant="soft"
                        accept="image/*"
                        @change="handleFileChange"
                    />
                </UFormField>
            </div>
        </template>
    </UPopover>
</template>
