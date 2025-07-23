export const useTwitterStore = defineStore('twitterStore', () => {
    const state = ref({
        username: 'User',
        userId: 'user',
        avatarUrl: '',
        badge: undefined,
        organizationAvatarUrl: '',
        time: '24分',
        content: '',
        reply: 2,
        repost: 3,
        like: 10,
        view: 1124,
        repostedUsername: '',
    })

    return { state }
})
