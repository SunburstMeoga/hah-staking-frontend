<template>
  <div id="app" class="bg-lightsecond">
    <top-bar :isHome="isHome" />
    <div class="sm:pb-20">
      <router-view />
    </div>
    <bottom-bar />
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

            <div
              class="flex w-full h-10 justify-center items-center border text-black bg-#EAAE36 rounded-lg text-sm border-black"
              @click="showDialog = false">
              {{ $t('newWord.confirmBtn') }}</div>
          </div>
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script>
import TopBar from '@/components/TopBar'
import BottomBar from '@/components/BottomBar.vue'
import { amountFormat } from '@/utils/format'
import { nodeList } from '@/request/api'

import { Dialog, Toast, Popup } from 'vant'
export default {
  name: 'App',
  components: { [Dialog.name]: Dialog, [Popup.name]: Popup, Toast, TopBar, BottomBar },
  data() {
    return {
      showPopup: false,
      isHome: true,
      showDialog: false
    }
  },
  created() {
    if (!window.ethereum) {
      this.showDialog = true
    }
    this.getChainId()
    // const web3 = this.Web3(window.ethereum)
    console.log(window.ethereum)
    console.log('isConnected', this.Web3.currentProvider._state.isConnected)
    this.updateIsHome()
  },
  watch: {
    // 监听路由变化
    '$route.path'(newPath) {
      this.isHome = newPath === '/' // 如果路由是首页则设置为 true
    },
  },
  mounted() {
    this.Web3.currentProvider.on('connect', (status) => {
      console.log('小狐狸登录', status)
    })
    this.Web3.currentProvider.on('disconnect', (status) => {
      console.log('小狐狸', status)
    })
    if (localStorage.getItem('language')) {
      this.$i18n.locale = localStorage.getItem('language')
    } else {
      this.$i18n.locale = navigator.language
    }
    console.log('登录状态', localStorage.getItem('connectStatus'))

    if (localStorage.getItem('connectStatus') && localStorage.getItem('connectStatus') === 'connect') {
      this.initWallet()
    }
    // this.initWallet()
    this.accountHasChanged()
    this.networkHasChanged()
  },
  methods: {
    amountFormat,
    hasProvide() { //判断当前是否为钱包浏览器环境
      return window.ethereum ? true : false
    },
    updateIsHome() {
      // 初始化时判断当前路由是否为首页
      this.isHome = this.$route.path === '/'
    },
    getNodeList(address) {
      nodeList({ pageSize: 1, address: address }).then(res => {
        Toast.loading({
          duration: 0,
          forbidClick: true,
        })
        let earningsInfo = {
          ordinaryEarnings: res.income1 ? this.amountFormat(res.income1) : null,
          indexReturns: res.income0 ? this.amountFormat(res.income0) : null,
          totalEarnings: res.income0 || res.income1 ? (res.income0 + res.income1).toFixed(4) : null,
          ordinaryVote: res.vote0 ? this.amountFormat(res.vote0) : null,
          returnsVote: res.vote1 ? this.amountFormat(res.vote1) : null,
          totalVotes: res.vote0 || res.vote1 ? this.amountFormat(res.vote0 + res.vote1) : null,
        }
        localStorage.setItem('earningsInfo', JSON.stringify(earningsInfo))
        this.$store.commit('getEarningsInfo', JSON.parse(localStorage.getItem('earningsInfo')))
        console.log('vuex的值 在首页请求了 nodelist接口', res, this.$store.state.earningsInfo)
        Toast.clear()
      }).catch(err => {
        Toast.clear()
        console.log(err)
      })
    },

    getWalletBalance(address) {
      this.Web3.eth.getBalance(address).then((res) => {
        let walletInfo = {
          address: address,
          balance: this.Web3.utils.fromWei(res, 'ether')
        }

        localStorage.setItem('walletInfo', JSON.stringify(walletInfo))
        localStorage.setItem('connectStatus', 'connect')
        this.$store.commit('getWalletInfo', JSON.parse(localStorage.getItem('walletInfo')))
        // console.log('store', this.$store.state.walletInfo)
      }).catch(err => {
        console.log('getbalance err', err)
      })
    },

    async accountHasChanged() {
      window.ethereum.on('accountsChanged', (accounts) => {
        if (accounts.length !== 0) {
          this.getWalletBalance(accounts[0])
          // this.getNodeList(accounts[0])
          location.href = location.href;
          console.log('isConnected', this.Web3.currentProvider._state.isConnected)
        }
      })
    },

    async networkHasChanged() {
      // window.ethereum.on('chainChanged', (chainChanged) => {
      //   console.log('当前链id', chainChanged)
      //   this.$store.commit('getChainId', chainChanged)

      //   if (chainChanged !== this.Config.chainId) {
      //     Dialog.alert({
      //       title: this.$t('dialog.checkNetwork'),
      //       message: this.$t('dialog.checkMessage'),
      //       confirmButtonText: this.$t('dialog.confirmButtonText'),
      //     }).then(() => {
      //       this.switchNetwork()
      //     });
      //   }
      // })
    },

    async getChainId() {
      const { ethereum } = window;
      // try {
      //   const chainId = await ethereum.request({
      //     method: "eth_chainId"
      //   });
      //   console.log('当前链id', chainId)
      //   this.$store.commit('getChainId', chainId)
      //   if (chainId !== this.Config.chainId) {
      //     Dialog.alert({
      //       title: this.$t('dialog.checkNetwork'),
      //       message: this.$t('dialog.checkMessage'),
      //       confirmButtonText: this.$t('dialog.confirmButtonText'),
      //     }).then(() => {
      //       this.switchNetwork()
      //     });
      //   }
      // } catch (err) {
      //   console.error(err);
      // }
    },

    async switchNetwork() {
      // try {
      //   await window.ethereum.request({
      //     method: 'wallet_switchEthereumChain',
      //     params: [{ chainId: this.Config.chainId }],
      //   })
      // } catch (err) {
      //   console.error(err)
      //   if (err.code === 4902) {
      //     try {
      //       await ethereum.request({
      //         method: 'wallet_addEthereumChain',
      //         params: [
      //           {
      //             chainId: this.Config.chainId,
      //             chainName: this.Config.chainName,
      //             rpcUrls: [this.Config.rpcUrls,],
      //             iconUrls: ['https://testnet.hashahead.org/logo.png'],
      //             blockExplorerUrls: [this.Config.blockExplorerUrls,],
      //             nativeCurrency: {
      //               name: 'HAH',
      //               symbol: 'HAH',
      //               decimals: 18
      //             }
      //           },
      //         ],
      //       });
      //     } catch (addError) {
      //       console.log(addError)
      //     }

      //   }
      // }
    },

    async initWallet() {
      try {
        const accounts = await window.ethereum.request({
          method: 'eth_requestAccounts',
        })
        this.getWalletBalance(accounts[0])
        // this.getNodeList(accounts[0])
        console.log('initWallet')
      } catch (error) {
        console.error(error)
      }
    },
  },
}
</script>

<style>
* {
  padding: 0;
  margin: 0;
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
