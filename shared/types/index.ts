export interface Twitter {
    username: string
    userId: string
    avatarUrl: string
    badge?: 'blue' | 'gold' | 'gray'
    organizationAvatarUrl?: string
    time: string
    content: string
    images?: string[]
    reply?: number
    repost?: number
    like?: number
    view?: number
    repostedUsername: string
}
