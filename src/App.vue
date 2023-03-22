<template>
  <div id="app" class="bg-gray-800 min-h-screen">
    <router-view />
    <!-- <chain-popup :showPopup="showPopup" /> -->
  </div>
</template>

<script>
import { Dialog } from 'vant'
export default {
  name: 'App',
  components: { [Dialog.name]: Dialog },
  data() {
    return {
      accounts: [],
      isMetaMaskConnected: false,
      showPopup: false
    }
  },
  mounted() {
    this.initMetaMask()
    window.ethereum.on('accountsChanged', (accounts) => {
      console.log(accounts, '---------------------')
      if (accounts.length === 0) {
        this.$store.commit('changeConnectStatus', false)
        this.$store.commit('getWalletAddress', '')
      }
    })
    window.ethereum.on('chainChanged', (chainChanged) => {
      console.log('chainChanged', chainChanged)
      if (chainChanged !== '0x11623') {
        Dialog.alert({
          title: '检查您的网络',
          message: '目前此页面仅在 HAH 中受支持',
          confirmButtonText: '在“钱包”中切换网络'
        }).then(() => {
          // on close
          this.switchNetwork()
        });

      }

    })
  },
  methods: {
    async getNetworkAndChainId() {
      try {
        const chainId = await ethereum.request({
          method: 'eth_chainId',
        })
        this.handleNewChain(chainId)

      } catch (err) {
        console.error(err)
      }
    },
    handleNewChain(chainId) {
      this.$store.commit('getChainId', chainId)
      console.log('getChainId', chainId)
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

    async switchNetwork() {
      try {
        const newAccounts = await ethereum.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: '0x11623' }],
        })
        this.handleNewAccounts(newAccounts)
        console.log('initMetaMask')
      } catch (error) {
        console.error(error)
      }
    },

    async initMetaMask() {
      try {
        const newAccounts = await ethereum.request({
          method: 'eth_requestAccounts',
        })
        this.handleNewAccounts(newAccounts)
        console.log('initMetaMask')
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
