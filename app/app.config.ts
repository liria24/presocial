export default defineAppConfig({
    app: {
        name: 'Presocial',
        version: '0.1.0',
        author: 'Liria',
        repo: 'https://github.com/liria24/presocial',
        ungh: 'https://ungh.cc/repos/liria24/presocial',
        liriaSite: 'https://liria.me',
        liriaAvatar: 'https://github.com/liria24.png',
    },
    external: {
        vercel: {
            name: 'Vercel',
            url: 'https://vercel.com',
            icon: 'simple-icons:vercel',
        },
        nuxt: {
            name: 'Nuxt',
            url: 'https://nuxt.com',
            icon: 'simple-icons:nuxt',
        },
        tailwind: {
            name: 'Tailwind CSS',
            url: 'https://tailwindcss.com',
            icon: 'simple-icons:tailwindcss',
        },
    },
    ui: {
        colors: {
            primary: 'zinc',
            neutral: 'zinc',
        },
        icons: {
            loading: 'svg-spinners:ring-resize',
        },
        accordion: {
            slots: {
                trigger: 'cursor-pointer',
                item: 'md:py-2',
            },
        },
        button: {
            slots: {
                base: 'cursor-pointer select-none',
            },
            compoundVariants: [
                {
                    loading: true,
                    leading: true,
                    class: {
                        leadingIcon: 'animate-none',
                    },
                },
                {
                    loading: true,
                    leading: false,
                    trailing: true,
                    class: {
                        trailingIcon: 'animate-none',
                    },
                },
            ],
        },
        commandPalette: {
            slots: {
                item: 'cursor-pointer',
            },
            variants: {
                loading: {
                    true: {
                        itemLeadingIcon: 'animate-none',
                    },
                },
            },
        },
        contextMenu: {
            variants: {
                loading: {
                    true: {
                        itemLeadingIcon: 'animate-none',
                    },
                },
            },
        },
        dropdownMenu: {
            slots: {
                item: 'cursor-pointer',
            },
        },
        fileUpload: {
            slots: {
                base: 'cursor-pointer',
            },
        },
        input: {
            compoundVariants: [
                {
                    loading: true,
                    leading: true,
                    class: {
                        leadingIcon: 'animate-none',
                    },
                },
                {
                    loading: true,
                    leading: false,
                    trailing: true,
                    class: {
                        trailingIcon: 'animate-none',
                    },
                },
            ],
        },
        inputMenu: {
            compoundVariants: [
                {
                    loading: true,
                    leading: true,
                    class: {
                        leadingIcon: 'animate-none',
                    },
                },
                {
                    loading: true,
                    leading: false,
                    trailing: true,
                    class: {
                        trailingIcon: 'animate-none',
                    },
                },
            ],
        },
        inputTags: {
            compoundVariants: [
                {
                    loading: true,
                    leading: true,
                    class: {
                        leadingIcon: 'animate-none',
                    },
                },
                {
                    loading: true,
                    leading: false,
                    trailing: true,
                    class: {
                        trailingIcon: 'animate-none',
                    },
                },
            ],
        },
        navigationMenu: {
            slots: {
                link: 'cursor-pointer',
            },
            variants: {
                disabled: {
                    true: {
                        link: 'cursor-text',
                    },
                },
            },
        },
        select: {
            slots: {
                base: 'cursor-pointer',
            },
            compoundVariants: [
                {
                    loading: true,
                    leading: true,
                    class: {
                        leadingIcon: 'animate-none',
                    },
                },
                {
                    loading: true,
                    leading: false,
                    trailing: true,
                    class: {
                        trailingIcon: 'animate-none',
                    },
                },
            ],
        },
        selectMenu: {
            compoundVariants: [
                {
                    loading: true,
                    leading: true,
                    class: {
                        leadingIcon: 'animate-none',
                    },
                },
                {
                    loading: true,
                    leading: false,
                    trailing: true,
                    class: {
                        trailingIcon: 'animate-none',
                    },
                },
            ],
        },
        switch: {
            slots: {
                base: 'cursor-pointer',
                label: 'cursor-pointer',
            },
            variants: {
                loading: {
                    true: {
                        icon: 'animate-none',
                    },
                },
            },
        },
        tabs: {
            slots: {
                trigger: 'cursor-pointer',
            },
        },
        textarea: {
            compoundVariants: [
                {
                    loading: true,
                    leading: true,
                    class: {
                        leadingIcon: 'animate-none',
                    },
                },
                {
                    loading: true,
                    leading: false,
                    trailing: true,
                    class: {
                        trailingIcon: 'animate-none',
                    },
                },
            ],
        },
    },
})
