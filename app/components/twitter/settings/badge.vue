<script setup lang="ts">
const { state } = useTwitterStore()

const badgeItems = ref([
    {
        label: 'None',
        value: undefined,
        icon: 'lucide:eye-off',
    },
    {
        label: 'Blue',
        value: 'blue',
        icon: 'presocial:twitter-badge-blue',
    },
    {
        label: 'Gold',
        value: 'gold',
        icon: 'presocial:twitter-badge-gold',
    },
    {
        label: 'Gray',
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
        :placeholder="'Badge'"
        variant="soft"
        size="sm"
        class="min-w-28 rounded-full"
    />
</template>
