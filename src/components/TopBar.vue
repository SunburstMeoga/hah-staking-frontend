<template>
    <div class="h-14 shadow-md w-full bg-black mb-2 sm:h-20 sm:mb-4">
        <div class="flex justify-between items-center h-full text-black text-center w-11/12 ml-auto mr-auto" v-if="isHome">
            <a href="https://hashahead.org/home" target="_blank" class="w-5/12 sm:w-1/12">
                <div class="">
                    <img src="../assets/logo.png" alt="">
                </div>
            </a>
            <div class="flex justify-end items-center">
                <div class="icon iconfont icon-malllanguage text-primary text-2xl sm:text-3xl" @click="switchLanguage" />
                <div class="bg-second text-white rounded py-1 px-4 ml-2 text-sm sm:ml-8 sm:py-2 sm:px-7" @click="login()"
                    v-show="!$store.state.isConnected">
                    {{ $store.state.isConnected ? '断开连接' : $t('topBar.connect') }}
                </div>
            </div>

        </div>
        <div v-else class="h-full flex relative  justify-center items-center text-2xl text-primary font-bold">
            <div class="h-full absolute bottom-0 flex pl-2 justify-center items-center left-0 icon iconfont icon-mallleft-arrow text-primary text-xl"
                @click="goBackPage()">
            </div>
            {{ $t('details.pageTitle') }}
        </div>
    </div>
</template>

<script>
import { Toast } from 'vant';

export default {
    components: { Toast },
    props: {
        isHome: {
            default: false,
            type: Boolean
        }
    },
    data() {
        return {
            accounts: [],
            isMetaMaskConnected: false
        }
    },
    methods: {
        switchLanguage() {
            if (this.$i18n.locale === 'zh-CN') {
                this.$i18n.locale = 'en-US'
            } else {
                this.$i18n.locale = 'zh-CN'
            }
            localStorage.setItem('language', this.$i18n.locale)
        },
        //go back pre page
        goBackPage() {
            this.$router.back(1)
        },
        handleNewAccounts(newAccounts) {
            if (newAccounts && newAccounts.length > 0) {
                this.$store.commit('getWalletAddress', newAccounts[0])
                this.$store.commit('changeConnectStatus', true)
                this.Web3.eth.getBalance(newAccounts[0]).then((res) => {
                    console.log('余额', this.Web3.utils.fromWei(res, 'ether'))
                    this.$store.commit('getWalletBalance', this.Web3.utils.fromWei(res, 'ether'))
                })
            } else {
                this.$store.commit('getWalletAddress', '')
                this.$store.commit('changeConnectStatus', false)
            }
        },
        async login() {
            try {
                const newAccounts = await ethereum.request({
                    method: 'eth_requestAccounts',
                })
                this.handleNewAccounts(newAccounts)
            } catch (error) {
                console.error(error)
            }
            this.$emit('clickLogin')
        },
    },

}
</script>

<style scoped>
img {
    width: 100%;
    height: 100%;
    object-fit: contain;
}
</style>