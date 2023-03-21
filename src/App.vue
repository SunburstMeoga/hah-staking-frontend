<template>
  <div id="app" class="bg-gray-800 min-h-screen">
    <router-view />
  </div>
</template>

<script>
import { Toast } from 'vant'
export default {
  name: 'App',
  data() {
    return {
      accounts: [],
      isMetaMaskConnected: false
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
  },
  methods: {
    handleNewAccounts(newAccounts) {
      if (newAccounts && newAccounts.length > 0) {
        this.$store.commit('getWalletAddress', newAccounts[0])
        this.$store.commit('changeConnectStatus', true)
      } else {
        this.$store.commit('getWalletAddress', '')
        this.$store.commit('changeConnectStatus', false)
      }
    },
    async initMetaMask() {
      try {
        const newAccounts = await ethereum.request({
          method: 'eth_requestAccounts',
        })
        this.handleNewAccounts(newAccounts)
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
