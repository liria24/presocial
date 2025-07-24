export const useSiteStore = defineStore(
    'siteStore',
    () => {
        const state = ref({
            showHero: true,
        })

        return { state }
    },
    {
        persist: true,
    }
)
