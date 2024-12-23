<template>
    <div class="bg-#1F1F1F w-full pt-6">
        <div class="w-9/12 mx-auto mb-14">
            <div class="w-full">
                <div class="flex justify-between items-center w-full">
                    <div @click="openPage(item.path)"
                        class="cursor-pointer flex justify-center items-center text-3xl rounded-full icon iconfont text-#E4E4E4"
                        :class="item.icon" v-for="(item, index) in socialList" :key="index" />
                </div>
            </div>
        </div>

        <div class="w-9/12 mx-auto text-#EAAE36">
            <div class="mb-10 text-sm">
                <div class="mb-2">
                    <div class="w-32 mb-4">
                        <img class="w-full h-full object-cover" src="../assets/logo.png" alt="">
                    </div>
                    <!-- <div class="font-bold">
                        {{ $t('footBar.title') }}
                    </div> -->
                </div>
                <!-- <div class="text-white font-light">
                    {{ $t('Index.h2') }}
                </div> -->
            </div>
            <div class="flex justify-between flex-wrap sm:flex-nowrap sm:justify-end sm:w-3/4">
                <div class="w-6/12 text-sm sm:w-1/4 mb-6 text-#EAAE36" v-for="(item, index) in tankList" :key="index">
                    <div class="font-bold text-sm mb-4">{{ item.title }}</div>
                    <div class=" mb-4 cursor-pointer transition font-light text-white duration-300 ease-in-out transform hover:text-clickable hover:-translate-y-0.5 hover:scale-110"
                        @click="openPage(_item.path)" v-for="(_item, _index) in item.details" :key="_index">
                        {{ _item.title }}
                    </div>
                </div>
            </div>
        </div>

        <div class="text-#747474 w-10/12 mx-auto h-14 flex justify-center items-center border-t border-#747474">
            <div class="w-10/12 text-sm">
                Hash Ahead © 2024
            </div>
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
                    icon: 'icon-tuite'
                },
                {
                    path: 'https://github.com/hashahead',
                    icon: 'icon-github'
                },
                {
                    path: 'https://www.instagram.com/hashahead/',
                    icon: 'icon-instagram'
                },
                {
                    path: 'https://www.linkedin.com/in/hashahead/',
                    icon: 'icon-linkedin'
                },
                {
                    path: 'https://discord.gg/2VCU4tB8',
                    icon: 'icon-discord'
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
                        // {
                        //     title: this.$t('footBar.faucet'),
                        //     path: 'https://testnet.hashahead.org/faucet-smart'

                        // }
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
