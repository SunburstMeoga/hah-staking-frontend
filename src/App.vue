<template>
  <div id="app" class="bg-lightsecond">
    <top-bar />
    <div class="sm:pb-20">
      <router-view />
    </div>
    <bottom-bar />
  </div>
</template>

<script>
import TopBar from '@/components/TopBar'
import BottomBar from '@/components/BottomBar.vue'
import { amountFormat } from '@/utils/format'
import { nodeList } from '@/request/api'

import { Dialog, Toast } from 'vant'
export default {
  name: 'App',
  components: { [Dialog.name]: Dialog, Toast, TopBar, BottomBar },
  data() {
    return {
      showPopup: false,
    }
  },
  created() {
    this.getChainId()
    // const web3 = this.Web3(window.ethereum)

    console.log('isConnected', this.Web3.currentProvider._state.isConnected)
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
          this.getNodeList(accounts[0])
          console.log('isConnected', this.Web3.currentProvider._state.isConnected)
        }
      })
    },

    async networkHasChanged() {
      window.ethereum.on('chainChanged', (chainChanged) => {
        console.log('当前链id', chainChanged)
        this.$store.commit('getChainId', chainChanged)

        if (chainChanged !== this.Config.chainId) {
          Dialog.alert({
            title: this.$t('dialog.checkNetwork'),
            message: this.$t('dialog.checkMessage'),
            confirmButtonText: this.$t('dialog.confirmButtonText'),
          }).then(() => {
            this.switchNetwork()
          });
        }
      })
    },

    async getChainId() {
      const { ethereum } = window;
      try {
        const chainId = await ethereum.request({
          method: "eth_chainId"
        });
        console.log('当前链id', chainId)
        this.$store.commit('getChainId', chainId)
        if (chainId !== this.Config.chainId) {
          Dialog.alert({
            title: this.$t('dialog.checkNetwork'),
            message: this.$t('dialog.checkMessage'),
            confirmButtonText: this.$t('dialog.confirmButtonText'),
          }).then(() => {
            this.switchNetwork()
          });
        }
      } catch (err) {
        console.error(err);
      }
    },

    async switchNetwork() {
      try {
        await window.ethereum.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: this.Config.chainId }],
        })
      } catch (err) {
        console.error(err)
        if (err.code === 4902) {
          try {
            await ethereum.request({
              method: 'wallet_addEthereumChain',
              params: [
                {
                  chainId: this.Config.chainId,
                  chainName: this.Config.chainName,
                  rpcUrls: [this.Config.rpcUrls,],
                  iconUrls: ['https://testnet.hashahead.org/logo.png'],
                  blockExplorerUrls: [this.Config.blockExplorerUrls,],
                  nativeCurrency: {
                    name: 'HAH',
                    symbol: 'HAH',
                    decimals: 18
                  }
                },
              ],
            });
          } catch (addError) {
            console.log(addError)
          }

        }
      }
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
