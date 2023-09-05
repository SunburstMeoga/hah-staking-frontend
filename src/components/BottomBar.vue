<template>
    <div class="bg-lightprimary dark:bg-black400">
        <div class="w-11/12 sm:w-9/12 mr-auto ml-auto mb-10">
            <div class="py-6 border-b border-lightbottom dark:border-border100">
                <div class="flex justify-start items-center">
                    <div @click="openPage(item.path)"
                        class="cursor-pointer flex justify-center items-center w-8 h-8 rounded-full icon iconfont mr-2 bg-lightborder dark:text-white300 dark:bg-border100"
                        :class="item.icon" v-for="(item, index) in socialList" :key="index" />
                </div>
            </div>
        </div>

        <div
            class="w-11/12 sm:w-9/12 sm:flex sm:justify-between sm:items-start mr-auto ml-auto pb-6 border-b border-lightbottom dark:border-border100">
            <div class="mb-10 sm:w-2/5">
                <div class="flex justify-start items-center mb-2">
                    <div class="w-8 h-8 overflow-hidden rounded">
                        <img class="w-full h-full object-cover" src="../assets/logo.jpg" alt="">
                    </div>
                    <div class="pl-2 font-bold text-sm sm:text-lg text-lighttable dark:text-white200">
                        {{ $t('footBar.title') }}
                    </div>
                </div>
                <div class="leading-normal text-xs mb-2 text-lighttable dark:text-white200">
                    {{ $t('Index.h2') }}
                </div>
            </div>
            <div class="flex justify-between flex-wrap sm:flex-nowrap sm:justify-end sm:w-3/4">
                <div class="w-6/12 text-sm sm:w-1/4 mb-6 text-lighttable dark:text-white300"
                    v-for="(item, index) in tankList" :key="index">
                    <div class="font-bold text-sm mb-4">{{ item.title }}</div>
                    <div class="font-normal mb-4 cursor-pointer transition duration-300 ease-in-out transform hover:text-clickable hover:-translate-y-0.5 hover:scale-110"
                        @click="openPage(_item.path)" v-for="(_item, _index) in item.details" :key="_index">
                        {{ _item.title }}
                    </div>
                </div>
            </div>
        </div>

        <div class="w-11/12 sm:w-9/12 ml-auto mr-auto text-xs sm:text-sm sm:py-4 py-6 text-lighttable dark:text-white300">
            Hash Ahead © 2023
        </div>
    </div>
</template>

<script>
export default {
    name: "eFooterBar",
    data() {
        return {
            socialList: [
                {
                    path: 'https://twitter.com/hashahead',
                    icon: 'icon-twitter-fill'
                },
                {
                    path: 'https://github.com/hashahead',
                    icon: 'icon-github'
                },
                {
                    path: 'https://www.instagram.com/hashahead/',
                    icon: 'icon-instagram-fill'
                },
                {
                    path: 'https://www.linkedin.com/in/hashahead/',
                    icon: 'icon-a-ziyuan5'
                },
                {
                    path: 'https://discord.gg/2VCU4tB8',
                    icon: 'icon-discord3'
                },
                // {
                //     path: '',
                //     icon: 'icon-facebook'
                // },

            ]
        }
    },
    computed: {
        tankList() {
            return [
                {
                    title: this.$t('footBar.company'),
                    details: [
                        {
                            title: this.$t('footBar.aboutUs'),
                            path: 'https://blockway.io/'
                        },
                    ]
                },
                {
                    title: this.$t('footBar.Product'),
                    details: [
                        {
                            title: this.$t('footBar.browser'),
                            path: 'https://testnet.hashahead.org/'
                        },
                        {
                            title: 'Hash Ahead',
                            path: 'https://github.com/Block-Way'
                        },
                        {
                            title: this.$t('footBar.vote'),
                            path: 'https://test-vote.hashahead.org/ '
                        },
                        {
                            title: this.$t('footBar.faucet'),
                            path: 'https://testnet.hashahead.org/faucet-smart'

                        }
                    ]
                }
            ]
        }
    },
    methods: {
        openPage(path) {
            window.open(path, "_blank")
        }
    }
}
</script>
