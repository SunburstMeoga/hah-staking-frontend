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
    // 安全地检查Web3连接状态
    try {
      if (this.Web3.currentProvider && this.Web3.currentProvider._state) {
        console.log('isConnected', this.Web3.currentProvider._state.isConnected)
      }
    } catch (error) {
      console.warn('Error checking Web3 connection state:', error)
    }
    this.updateIsHome()
  },
  watch: {
    // 监听路由变化
    '$route.path'(newPath) {
      this.isHome = newPath === '/' // 如果路由是首页则设置为 true
    },
  },
  mounted() {
    // 检查并处理MetaMask延迟加载
    this.checkAndInitializeEthereum()

    // 安全地设置Web3事件监听器
    try {
      if (this.Web3.currentProvider && typeof this.Web3.currentProvider.on === 'function') {
        this.Web3.currentProvider.on('connect', (status) => {
          console.log('小狐狸登录', status)
        })
        this.Web3.currentProvider.on('disconnect', (status) => {
          console.log('小狐狸', status)
        })
      }
    } catch (error) {
      console.warn('Error setting up Web3 event listeners:', error)
    }

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

    // 检查并初始化以太坊连接，处理MetaMask移动端延迟加载
    checkAndInitializeEthereum() {
      let attempts = 0
      const maxAttempts = 10
      const checkInterval = 500

      const checkEthereum = () => {
        attempts++

        if (window.ethereum) {
          console.log('Ethereum provider detected, reinitializing Web3')
          this.reinitWeb3()
          this.showDialog = false
          return
        }

        if (attempts < maxAttempts) {
          setTimeout(checkEthereum, checkInterval)
        } else {
          console.warn('Ethereum provider not detected after maximum attempts')
          // 在移动端MetaMask中，有时需要更长时间
          if (this.isMobile()) {
            setTimeout(() => {
              if (window.ethereum) {
                console.log('Ethereum provider detected on mobile after extended wait')
                this.reinitWeb3()
                this.showDialog = false
              }
            }, 2000)
          }
        }
      }

      checkEthereum()
    },

    // 检测是否为移动设备
    isMobile() {
      return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
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
      try {
        if (window.ethereum && typeof window.ethereum.on === 'function') {
          window.ethereum.on('accountsChanged', (accounts) => {
            if (accounts.length !== 0) {
              this.getWalletBalance(accounts[0])
              // this.getNodeList(accounts[0])
              location.href = location.href;
              try {
                if (this.Web3.currentProvider && this.Web3.currentProvider._state) {
                  console.log('isConnected', this.Web3.currentProvider._state.isConnected)
                }
              } catch (error) {
                console.warn('Error checking connection state:', error)
              }
            }
          })
        }
      } catch (error) {
        console.warn('Error setting up account change listener:', error)
      }
    },

    async networkHasChanged() {
      try {
        if (window.ethereum && typeof window.ethereum.on === 'function') {
          window.ethereum.on('chainChanged', (chainChanged) => {
            console.log('链已切换，当前链id:', chainChanged)
            this.$store.commit('getChainId', chainChanged)

            if (chainChanged !== this.Config.chainId) {
              console.log(`Network changed to wrong chain: ${chainChanged}`)
              this.showNetworkSwitchDialog()
            } else {
              console.log('Network changed to correct chain')
              Toast.success(this.$t('dialog.networkSwitched'));
            }
          })
        }
      } catch (error) {
        console.warn('Error setting up network change listener:', error)
      }
    },

    async getChainId() {
      try {
        if (!window.ethereum) {
          console.warn('Ethereum provider not available')
          return
        }

        const chainId = await window.ethereum.request({
          method: "eth_chainId"
        });

        console.log('当前链id', chainId)
        this.$store.commit('getChainId', chainId)

        // 检查是否为目标链
        if (chainId !== this.Config.chainId) {
          console.log(`Wrong network detected. Current: ${chainId}, Expected: ${this.Config.chainId}`)
          this.showNetworkSwitchDialog()
        } else {
          console.log('Correct network detected')
        }
      } catch (error) {
        console.error('Error getting chain ID:', error)
      }
    },

    // 显示网络切换对话框
    showNetworkSwitchDialog() {
      Dialog.confirm({
        title: this.$t('dialog.wrongNetwork'),
        message: this.$t('dialog.wrongNetworkMessage'),
        confirmButtonText: this.$t('dialog.switchNetwork'),
        cancelButtonText: this.$t('dialog.cancel'),
      }).then(() => {
        this.switchNetwork()
      }).catch(() => {
        console.log('User cancelled network switch')
      });
    },

    // 切换网络
    async switchNetwork() {
      try {
        console.log('Attempting to switch network...')
        Toast.loading({
          message: this.$t('dialog.switchingNetwork'),
          forbidClick: true,
          duration: 0
        });

        await window.ethereum.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: this.Config.chainId }],
        })

        Toast.clear();
        Toast.success(this.$t('dialog.networkSwitched'));
        console.log('Network switched successfully')

        // 重新获取链ID确认切换成功
        setTimeout(() => {
          this.getChainId()
        }, 1000);

      } catch (err) {
        Toast.clear();
        console.error('Switch network error:', err)

        // 错误代码4902表示链未添加到钱包
        if (err.code === 4902) {
          this.showAddNetworkDialog()
        } else {
          Toast.fail(this.$t('dialog.switchNetworkFailed'));
          console.error('Failed to switch network:', err.message)
        }
      }
    },

    // 显示添加网络对话框
    showAddNetworkDialog() {
      Dialog.confirm({
        title: this.$t('dialog.networkNotAdded'),
        message: this.$t('dialog.networkNotAddedMessage'),
        confirmButtonText: this.$t('dialog.addNetwork'),
        cancelButtonText: this.$t('dialog.cancel'),
      }).then(() => {
        this.addNetwork()
      }).catch(() => {
        console.log('User cancelled network addition')
      });
    },

    // 添加网络
    async addNetwork() {
      try {
        console.log('Attempting to add network...')
        Toast.loading({
          message: this.$t('dialog.addingNetwork'),
          forbidClick: true,
          duration: 0
        });

        await window.ethereum.request({
          method: 'wallet_addEthereumChain',
          params: [this.Config.chainConfig],
        });

        Toast.clear();
        Toast.success(this.$t('dialog.networkAdded'));
        console.log('Network added successfully')

        // 添加成功后尝试切换
        setTimeout(() => {
          this.switchNetwork()
        }, 1000);

      } catch (addError) {
        Toast.clear();
        Toast.fail(this.$t('dialog.addNetworkFailed'));
        console.error('Failed to add network:', addError)
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

        // 钱包连接成功后检查网络
        this.getChainId()
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
