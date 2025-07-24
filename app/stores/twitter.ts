const defaults = {
    twitter: {
        en: {
            username: 'User',
            time: '24m',
        },
        ja: {
            username: 'ユーザー',
            time: '24分',
        },
    },
}

export const useTwitterStore = defineStore('twitterStore', () => {
    const { locale } = useI18n()

    const state = ref<Twitter>({
        username: defaults.twitter[locale.value].username,
        userId: 'user',
        avatarUrl: '',
        badge: undefined,
        organizationAvatarUrl: undefined,
        time: defaults.twitter[locale.value].time,
        content: '',
        images: [],
        reply: 2,
        repost: 3,
        like: 10,
        view: 1124,
        repostedUsername: '',
    })

    const options = ref<TwitterOptions>({
        timeline: false,
        showContent: true,
        theme: 'light',
    })

    return { state, options }
})
