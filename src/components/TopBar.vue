<template>
    <!-- <div class="h-14 shadow-md w-full bg-black mb-2 sm:h-20 sm:mb-4">
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
    </div> -->
    <div class="py-3 border-b bg-white border-ligthborder mb-3 sm:mb-10">
        <div class="flex justify-between items-center w-11/12 mr-auto ml-auto text-lighttable sm:w-10/12">
            <div class="w-28">
                <img class="w-full" src="../assets/logo.png" alt="">
            </div>
            <div class="flex justify-end items-center">
                <div class="border rounded-sm border-lightborder h-8 px-3 flex justify-center items-center"
                    @click="handleConnect">
                    {{ $store.state.walletInfo.address && $store.state.chainId === '0x11623' ? $t('topBar.disconnect') :
                        $t('topBar.connect') }}
                </div>
                <div class="border rounded border-lightborder h-8 w-8 py-1 px-2 ml-2 flex justify-center items-center"
                    @click="switchLanguage">
                    <div class="text-xl icon iconfont icon-language" />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { Toast } from 'vant';
import { nodeList } from '@/request/api'
import { amountFormat } from '@/utils/format'

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
            isMetaMaskConnected: false,
            isConnect: false
        }
    },
    methods: {
        amountFormat,
        getNodeList() {
            Toast.loading({
                duration: 0,
                forbidClick: true,
            })
            nodeList({ pageSize: 1, address: window.ethereum.selectedAddress }).then(res => {
                let earningsInfo = {
                    ordinaryEarnings: res.income1 ? this.amountFormat(res.income1) : null,
                    indexReturns: res.income0 ? this.amountFormat(res.income0) : null,
                    totalEarnings: res.income0 || res.income1 ? (res.income0 + res.income1).toFixed(4) : null,
                    ordinaryVote: res.vote1 ? this.amountFormat(res.vote1) : null,
                    returnsVote: res.vote0 ? this.amountFormat(res.vote0) : null,
                    totalVotes: res.vote0 || res.vote1 ? this.amountFormat(res.vote0 + res.vote1) : null,
                }
                localStorage.setItem('earningsInfo', JSON.stringify(earningsInfo))
                this.$store.commit('getEarningsInfo', JSON.parse(localStorage.getItem('earningsInfo')))
                console.log('vuex的值', this.$store.state.earningsInfo)
                Toast.clear()
            }).catch(err => {
                console.log(err)
                Toast.clear()

            })
        },
        switchLanguage() {
            if (this.$i18n.locale === 'zh-CN') {
                this.$i18n.locale = 'en-US'
            } else {
                this.$i18n.locale = 'zh-CN'
            }
            localStorage.setItem('language', this.$i18n.locale)
        },
        getWalletBalance(address) {
            this.Web3.eth.getBalance(address).then((res) => {
                let walletInfo = {
                    address: address,
                    balance: this.Web3.utils.fromWei(res, 'ether')
                }
                // this.getNodeList()
                localStorage.setItem('walletInfo', JSON.stringify(walletInfo))
                localStorage.setItem('connectStatus', 'connect')
                this.isConnect = true
                this.$store.commit('getWalletInfo', JSON.parse(localStorage.getItem('walletInfo')))
                console.log('store', this.$store.state.walletInfo)
            }).catch(err => {
                console.log('getbalance err', err)
            })
        },

        handleConnect() {
            console.log(localStorage.getItem('connectStatus'))
            if (localStorage.getItem('connectStatus') === 'connect') {
                this.loginOut()
            } else if (!localStorage.getItem('connectStatus') || localStorage.getItem('connectStatus') === 'disconnect') {
                this.login()
            }

        },

        loginOut() {
            console.log('Login out')
            localStorage.removeItem('walletInfo')
            // localStorage.removeItem('earningsInfo')
            localStorage.setItem('connectStatus', 'disconnect')
            this.isConnect = false
            this.$store.commit('getWalletInfo', {})
        },

        async login() {
            console.log('Login')
            try {
                const accounts = await ethereum.request({
                    method: 'eth_requestAccounts',
                })
                this.getWalletBalance(accounts[0])
            } catch (error) {
                console.error(error)
            }
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