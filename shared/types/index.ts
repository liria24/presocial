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
    reposted?: boolean
    repostedUsername?: string
}

export interface TwitterOptions {
    timeline: boolean
    theme: 'light' | 'dark' | 'black'
}
