<template>
  <div id="app" class="bg-gray-800 min-h-screen">
    <router-view />
  </div>
</template>

<script>
import { Dialog } from 'vant'
export default {
  name: 'App',
  components: { Dialog },
  mounted() {
    console.log(window.ethereum.selectedAddress)
    if (window.ethereum.selectedAddress) {
      this.$store.commit('changeConnectStatus', true)
      this.$store.commit('getWalletAddress', window.ethereum.selectedAddress)
      this.Web3.eth.getBalance(window.ethereum.selectedAddress).then((res) => {
        console.log('余额', this.Web3.utils.fromWei(res, 'ether'))
        this.$store.commit('getWalletBalance', this.Web3.utils.fromWei(res, 'ether'))
      })
    } else {
      // this.$store.commit('getWalletAddress', '0xe8b6Fb9ab773cA3A12Cce9F871E4f7b7bFc0084d02000000000000000000')

      this.$store.commit('changeConnectStatus', false)
      Dialog.alert({
        title: '提示',
        message: '已失去连接，请重新连接',
        theme: 'round-button',
      }).then(() => {
        // on close
        this.$router.push({
          path: '/'
        })
      });
    }
  },
}
</script>

<style>
* {
  padding: 0;
  margin: 0;
}
</style>
