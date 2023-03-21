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
    this.login()
  },
  methods: {
    handleNewAccounts(newAccounts) {
      this.accounts = newAccounts
      console.log(newAccounts, this.accounts)
    },
    login() {
      Toast.loading({
        message: '连接中...',
        forbidClick: true,
      });
      window.ethereum.request({
        method: 'eth_requestAccounts',
      }).then(newAccounts => {
        this.handleNewAccounts(newAccounts)
        this.$store.commit('getWalletAddress', this.accounts[0])
        this.Web3.eth.getBalance(newAccounts[0]).then((res) => {
          console.log('余额', this.Web3.utils.fromWei(res, 'ether'))
          this.$store.commit('getWalletBalance', this.Web3.utils.fromWei(res, 'ether'))
        })
        if (this.accounts && this.accounts.length > 0) {
          this.isMetaMaskConnected = true
        } else {
          this.isMetaMaskConnected = false
        }

        console.log('isMetaMaskConnected', this.isMetaMaskConnected)
        if (this.isMetaMaskConnected) {
          // window.ethereum.on('accountsChanged', this.handleNewAccounts)
          this.$store.commit('changeConnectStatus', true)
        }
        console.log('newAccounts', newAccounts)
      }).catch(error => {
        console.error(error)
      })

      Toast.clear()
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
