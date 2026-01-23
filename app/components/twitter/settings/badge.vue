<script setup lang="ts">
const { t } = useI18n({ useScope: 'local' })
const { state } = useTwitterStore()

const badgeItems = ref([
    {
        label: t('none'),
        value: undefined,
        icon: 'lucide:eye-off',
    },
    {
        label: t('blue'),
        value: 'blue',
        icon: 'presocial:twitter-badge-blue',
    },
    {
        label: t('gold'),
        value: 'gold',
        icon: 'presocial:twitter-badge-gold',
    },
    {
        label: t('gray'),
        value: 'gray',
        icon: 'presocial:twitter-badge-gray',
    },
])

const icon = computed(() => badgeItems.value.find((item) => item.value === state.badge)?.icon)
</script>

<template>
    <USelect
        v-model="state.badge"
        :items="badgeItems"
        :icon="icon"
        :placeholder="t('badge')"
        variant="soft"
        size="sm"
        :ui="{
            base: 'bg-primary/10 hover:bg-primary/15 focus:bg-accented/75 active:bg-primary/15 disabled:bg-primary/10',
        }"
        class="min-w-28 rounded-full"
    />
</template>

<i18n lang="json">
{
    "en": {
        "none": "None",
        "blue": "Blue",
        "gold": "Gold",
        "gray": "Gray",
        "badge": "Badge"
    },
    "ja": {
        "none": "なし",
        "blue": "ブルー",
        "gold": "ゴールド",
        "gray": "グレー",
        "badge": "バッジ"
    }
}
</i18n>
