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
    <div class="h-16 bg-#313131 sticky top-0 z-50">
        <div class=" h-16 flex justify-between items-center w-11/12 mr-auto ml-auto text-lighttable sm:w-10/12">
            <div class="w-28" @click="openPage" v-if="isHome">
                <img class="w-full" src="../assets/logo.png" alt="">
            </div>
            <div v-else class="text-white text-lg icon iconfont icon-back" @click="toHome"></div>
            <div class="flex justify-end items-center">

                <!-- <div class="border rounded-sm border-lightborder h-8 px-3 flex justify-center items-center"
                    @click="handleConnect">
                    {{ $store.state.walletInfo.address ? $t('topBar.disconnect') :
                        $t('topBar.connect') }}
                </div> -->
                <!-- <div class="h-8 w-8 py-1 px-2 ml-2 flex justify-center items-center" @click="handleCrossChain">
                    <div class="text-xl icon iconfont icon-kualianqiao text-white" />
                </div> -->
                <div class="h-8 w-8 py-1 px-2 ml-2 flex justify-center items-center" @click="handleConnect">
                    <div class="text-xl icon iconfont icon-duankailianjie text-white" />
                </div>
                <!-- <div class="h-8 w-8 py-1 px-2 ml-2 flex justify-center items-center" @click="switchLanguage">
                    <div class="text-xl icon iconfont icon-duoyuyan text-white" />
                </div> -->
            </div>
        </div>
        <van-popup v-model="showDialog">
            <div class="w-full flex justify-center items-center bg-transparent">
                <div
                    class="w-11/12 text-white flex flex-col justify-start items-center bg-black border border-#E6E6E620 rounded-2xl backdrop-blur-xl bg-opacity-50">
                    <div class="w-10/12 flex justify-start items-center">
                        <div class="w-1/3 bg-#EAAE36 h-1 rounded-full"></div>
                    </div>
                    <div class="w-11/12 flex justify-end pt-4 mb-5" @click="showDialog = !showDialog">
                        <div class="icon iconfont icon-close text-sm"></div>
                    </div>
                    <div class="w-10/12 mb-5">
                        {{ $t('newWord.web3Tips') }}
                    </div>
                    <div class="w-8/12 flex justify-between items-center text-#EAAE36 mb-4">

                        <div class="flex w-full h-10 justify-center items-center border text-black bg-#EAAE36 rounded-lg text-sm border-black"
                            @click="showDialog = false">
                            {{ $t('newWord.confirmBtn') }}</div>
                    </div>
                </div>
            </div>
        </van-popup>
    </div>
</template>

<script>
import { Toast, Popup } from 'vant';
import { nodeList } from '@/request/api'
import { amountFormat } from '@/utils/format'

export default {

    components: { Toast, [Popup.name]: Popup },
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
            isConnect: false,
            showDialog: false

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
            console.log(window.ethereum)
            if (!window.ethereum) {
                this.showDialog = true
                console.log(this.showDialog)
                return
            }
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
        toHome() {
            this.$router.push({
                path: '/'
            })

        },
        openPage() {
            window.open('https://blockway.io/', "_blank")
        },
        handleCrossChain() { //跨鏈橋
            if (!window.ethereum) {
                this.showDialog = true
                return
            }
            this.$router.push({
                path: '/cross-chain-bridge'
            })
        },
        handleConnect() {
            console.log(window.ethereum)
            if (!window.ethereum) {
                this.showDialog = true
                console.log(this.showDialog)
                return
            }
            console.log(localStorage.getItem('connectStatus'))
            if (localStorage.getItem('connectStatus') === 'connect') {
                this.loginOut()
            } else if (!localStorage.getItem('connectStatus') || localStorage.getItem('connectStatus') === 'disconnect') {
                this.login()
            }

        },

        loginOut() {
            if (!window.ethereum) {
                this.showDialog = true
                return
            }
            console.log('Login out')
            localStorage.removeItem('walletInfo')
            // localStorage.removeItem('earningsInfo')
            localStorage.setItem('connectStatus', 'disconnect')
            this.isConnect = false
            this.$store.commit('getWalletInfo', {})
        },

        async login() {
            console.log('Login')
            if (!window.ethereum) {
                this.showDialog = true
                return
            }
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
<style>
.van-popup--center,
.van-popup {
    width: 100%;
    background-color: none;
    background: none;
}
</style>