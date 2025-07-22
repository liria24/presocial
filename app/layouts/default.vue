<script lang="ts" setup></script>

<template>
    <Html>
        <Head>
            <Title>Presocial</Title>
            <Link rel="icon" type="image/x-icon" href="/favicon.ico" />
            <Meta name="lang" content="ja" />
        </Head>
        <Body>
            <UContainer
                class="flex min-h-dvh flex-col items-center gap-6 pt-6 md:gap-8"
            >
                <Header />

                <div
                    class="hidden w-full items-center justify-center rounded-xl bg-red-100 p-4 text-sm text-red-800 ring-2 ring-red-500 noscript:flex"
                >
                    この Web サイトは JavaScript を使用しています。<br />
                    JavaScript が無効の場合、正しく表示されません。
                </div>

                <main class="grid w-full grow">
                    <slot />
                </main>

                <Footer />
            </UContainer>
        </Body>
    </Html>
</template>
