export const useTwitterStore = defineStore('twitterStore', () => {
    const state = ref<Twitter>({
        username: 'User',
        userId: 'user',
        avatarUrl: '',
        badge: undefined,
        organizationAvatarUrl: undefined,
        time: '24m',
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
