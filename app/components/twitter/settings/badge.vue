<script setup lang="ts">
const { t } = useI18n()
const { state } = useTwitterStore()

const badgeItems = ref([
    {
        label: t('common.none'),
        value: undefined,
        icon: 'lucide:eye-off',
    },
    {
        label: t('common.blue'),
        value: 'blue',
        icon: 'presocial:twitter-badge-blue',
    },
    {
        label: t('common.gold'),
        value: 'gold',
        icon: 'presocial:twitter-badge-gold',
    },
    {
        label: t('common.gray'),
        value: 'gray',
        icon: 'presocial:twitter-badge-gray',
    },
])

const icon = computed(
    () => badgeItems.value.find((item) => item.value === state.badge)?.icon
)
</script>

<template>
    <USelect
        v-model="state.badge"
        :items="badgeItems"
        :icon="icon"
        :placeholder="t('common.badge')"
        variant="soft"
        size="sm"
        class="min-w-28 rounded-full"
    />
</template>
