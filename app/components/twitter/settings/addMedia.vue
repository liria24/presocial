<script setup lang="ts">
const { state } = useTwitterStore()

const { onChange, open, reset } = useFileDialog({
    accept: 'image/*',
    directory: false,
})

onChange((files) => {
    const currentImagesLength = state.images?.length || 0
    if (!files?.length || currentImagesLength > 4) return

    const fileList = Array.from(files)
    const urls = fileList
        .slice(0, 4 - currentImagesLength)
        .map((file) => URL.createObjectURL(file))
    for (const url of urls) {
        if (state.images) state.images.push(url)
        else state.images = [url]
    }
    reset()
})
</script>

<template>
    <UButton
        icon="lucide:plus"
        :label="$t('common.media')"
        variant="soft"
        size="sm"
        class="rounded-full pr-3"
        @click="open()"
    />
</template>
