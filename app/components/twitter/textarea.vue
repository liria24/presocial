<script setup lang="ts">
type SegmentType = 'normal' | 'hashtag' | 'mention' | 'url'

interface TextSegment {
    text: string
    type: SegmentType
}

// 定数定義
const MIN_HEIGHT = 20 // 最小テキストエリア高さ (px)

// Twitterストアと同期
const { state } = useTwitterStore()

// テキストはストアの content と同期する computed プロパティ
const text = computed({
    get: () => state.content,
    set: (value) => {
        state.content = value
    },
})

const composingText = ref('')
const isComposing = ref(false)
const textareaRef = ref<HTMLTextAreaElement | null>(null)
const overlayRef = ref<HTMLDivElement | null>(null)

// 共通スタイル
const commonTextStyles = {
    'font-size': '15px',
    'line-height': '24px',
    'letter-spacing': '0',
    'word-spacing': '0',
    'white-space': 'pre-wrap' as const,
    'overflow-wrap': 'break-word' as const,
    'word-break': 'break-word' as const,
    'box-sizing': 'border-box' as const,
    padding: '0',
    margin: '0',
}

// パターン定義を関数外に移動して一度だけ初期化
const patterns = [
    {
        regex: /#[a-zA-Z0-9_\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FAF]+/g,
        type: 'hashtag' as const,
    },
    { regex: /@[a-zA-Z0-9_]+/g, type: 'mention' as const },
    {
        // URLのパターンをより厳密に
        regex: /https?:\/\/[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/g,
        type: 'url' as const,
    },
]

// テキストを解析してセグメントに分割（簡略化版）
const parseText = (input: string): TextSegment[] => {
    if (!input) return [{ text: '', type: 'normal' }]

    const matches: Array<{ match: string; type: SegmentType; index: number }> =
        []

    // すべてのパターンにマッチする部分を収集
    patterns.forEach(({ regex, type }) => {
        // 正規表現をリセット
        const regexCopy = new RegExp(regex.source, regex.flags)
        let match

        while ((match = regexCopy.exec(input)) !== null) {
            matches.push({
                match: match[0],
                type,
                index: match.index,
            })
        }
    })

    // マッチがなければ通常テキストとして返す
    if (matches.length === 0) return [{ text: input, type: 'normal' }]

    // インデックス順にソート
    matches.sort((a, b) => a.index - b.index)

    const segments: TextSegment[] = []
    let lastIndex = 0

    // セグメントを構築
    matches.forEach(({ match, type, index }) => {
        // 既に処理された範囲と重複する場合はスキップ
        if (index < lastIndex) return

        // マッチ前の通常テキスト
        if (index > lastIndex) {
            segments.push({
                text: input.slice(lastIndex, index),
                type: 'normal',
            })
        }

        // マッチした特殊テキスト
        segments.push({ text: match, type })
        lastIndex = index + match.length
    })

    // 残りの通常テキスト
    if (lastIndex < input.length) {
        segments.push({ text: input.slice(lastIndex), type: 'normal' })
    }

    return segments
}

// 表示用の完全なテキスト（確定テキスト+未確定テキスト）
const displayText = computed(() =>
    isComposing.value ? text.value + composingText.value : text.value
)

// 表示用のスタイル付きセグメント
const displaySegments = computed(() => parseText(displayText.value))

// テキストが空かどうか
const isEmpty = computed(() => displayText.value.length === 0)

// IME入力関連のイベントハンドラ
const handleCompositionStart = () => {
    isComposing.value = true
}

const handleCompositionUpdate = (e: CompositionEvent) => {
    composingText.value = e.data || ''
}

const handleCompositionEnd = () => {
    isComposing.value = false
    composingText.value = ''
}

// テキストエリアの高さを自動調整
const adjustTextareaHeight = () => {
    if (!textareaRef.value) return

    // 一時的にheightをautoにして正確なscrollHeightを取得
    textareaRef.value.style.height = 'auto'
    textareaRef.value.style.overflow = 'hidden'

    const scrollHeight = textareaRef.value.scrollHeight
    const newHeight = `${Math.max(scrollHeight, MIN_HEIGHT)}px`

    textareaRef.value.style.height = newHeight

    // オーバーレイの高さも同期
    if (overlayRef.value) {
        overlayRef.value.style.height = newHeight
    }
}

// オーバーレイとテキストエリアのスクロール同期
const syncScroll = () => {
    if (!textareaRef.value || !overlayRef.value) return

    overlayRef.value.scrollTop = textareaRef.value.scrollTop
    overlayRef.value.scrollLeft = textareaRef.value.scrollLeft
}

// テキスト変更時に高さを調整
watch([() => state.content, composingText], () => {
    nextTick(adjustTextareaHeight)
})

// 初期レンダリング後に高さを調整
onMounted(adjustTextareaHeight)
</script>

<template>
    <div class="relative">
        <!-- スタイル付きテキストのオーバーレイ -->
        <div
            ref="overlayRef"
            :style="{
                ...commonTextStyles,
                background: 'transparent',
                color: 'transparent',
                overflow: 'hidden',
                resize: 'none',
            }"
            class="pointer-events-none absolute inset-0"
        >
            <div style="color: #111827; height: 100%">
                <template v-if="!isEmpty">
                    <span
                        v-for="(segment, index) in displaySegments"
                        :key="index"
                        :class="
                            cn(
                                {
                                    'text-blue-500':
                                        segment.type === 'hashtag' ||
                                        segment.type === 'mention',
                                    'text-blue-500 underline':
                                        segment.type === 'url',
                                },
                                segment.type === 'normal' && [
                                    'group-data-[theme=light]:text-twitter-primary-light',
                                    'group-data-[theme=dark]:text-twitter-primary-dark',
                                    'group-data-[theme=black]:text-twitter-primary-black',
                                ]
                            )
                        "
                    >
                        {{ segment.text }}
                    </span>
                </template>
                <span
                    v-else
                    :class="
                        cn(
                            'group-data-[theme=light]:text-twitter-secondary-light',
                            'group-data-[theme=dark]:text-twitter-secondary-dark',
                            'group-data-[theme=black]:text-twitter-secondary-black'
                        )
                    "
                >
                    {{ $t('twitter.whatsHappening') }}
                </span>
            </div>
        </div>

        <!-- 実際のテキストエリア -->
        <textarea
            ref="textareaRef"
            v-model="text"
            :placeholder="$t('twitter.whatsHappening')"
            rows="1"
            :style="{
                ...commonTextStyles,
                'min-height': `${MIN_HEIGHT}px`,
                color: 'transparent',
                background: 'transparent',
                overflow: 'hidden',
                caretColor: '#111827',
            }"
            class="relative z-10 w-full resize-none bg-transparent text-transparent focus:outline-none"
            @scroll="syncScroll"
            @compositionstart="handleCompositionStart"
            @compositionupdate="handleCompositionUpdate"
            @compositionend="handleCompositionEnd"
            @input="adjustTextareaHeight"
        />
    </div>
</template>
