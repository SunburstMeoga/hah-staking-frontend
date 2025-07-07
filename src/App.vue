<template>
  <div id="app" class="bg-lightsecond vue-app-started">
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

    <!-- 链切换弹窗 -->
    <chain-popup :show.sync="showChainSwitchPopup" :message="$t('newWord.switchToTargetChain')"
      :target-chain="Config.chainName" :cancel-text="$t('newWord.cancelBtn')" :confirm-text="$t('dialog.switchNetwork')"
      :loading="chainSwitchLoading" @confirm="handleSwitchNetwork" @cancel="handleCancelSwitchNetwork"
      @close="handleCancelSwitchNetwork" />

    <!-- 链添加弹窗 -->
    <chain-popup :show.sync="showChainAddPopup" :message="$t('newWord.addTargetChain')" :target-chain="Config.chainName"
      :cancel-text="$t('newWord.cancelBtn')" :confirm-text="$t('dialog.addNetwork')" :loading="chainAddLoading"
      @confirm="handleAddNetwork" @cancel="handleCancelAddNetwork" @close="handleCancelAddNetwork" />
  </div>
</template>

<script>
import TopBar from '@/components/TopBar'
import BottomBar from '@/components/BottomBar.vue'
import ChainPopup from '@/components/ChainPopup.vue'
import { amountFormat } from '@/utils/format'
import { nodeList } from '@/request/api'

import { Dialog, Toast, Popup } from 'vant'
export default {
  name: 'App',
  components: { [Dialog.name]: Dialog, [Popup.name]: Popup, Toast, TopBar, BottomBar, ChainPopup },
  data() {
    return {
      showPopup: false,
      isHome: true,
      showDialog: false,
      // 链切换弹窗相关
      showChainSwitchPopup: false,
      showChainAddPopup: false,
      chainSwitchLoading: false,
      chainAddLoading: false
    }
  },
  created() {
    console.log('App created, checking wallet environment...');

    // 检测钱包环境
    const isTPWallet = this.detectTPWallet();
    const hasEthereum = !!(window.ethereum || window.tpWallet);

    console.log('TP Wallet detected:', isTPWallet);
    console.log('Ethereum provider available:', hasEthereum);

    if (!hasEthereum) {
      this.showDialog = true;
    } else {
      // 延迟执行链ID检查，给钱包更多时间初始化
      setTimeout(() => {
        this.getChainId();
      }, isTPWallet ? 1000 : 100);
    }

    // 安全地检查Web3连接状态
    try {
      if (this.Web3.currentProvider && this.Web3.currentProvider._state) {
        console.log('isConnected', this.Web3.currentProvider._state.isConnected);
      }
    } catch (error) {
      console.warn('Error checking Web3 connection state:', error);
    }

    this.updateIsHome();
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

    // 检查并初始化以太坊连接，处理各种钱包环境
    checkAndInitializeEthereum() {
      let attempts = 0;
      const maxAttempts = this.detectTPWallet() ? 20 : 10; // TP钱包需要更多时间
      const checkInterval = this.detectTPWallet() ? 300 : 500;

      const checkEthereum = () => {
        attempts++;

        const provider = window.ethereum || window.tpWallet;

        if (provider) {
          console.log('Ethereum provider detected:', provider.constructor.name || 'Unknown');
          this.reinitWeb3();
          this.showDialog = false;

          // TP钱包需要额外的初始化时间
          if (this.detectTPWallet()) {
            setTimeout(() => {
              this.getChainId();
            }, 500);
          }
          return;
        }

        if (attempts < maxAttempts) {
          setTimeout(checkEthereum, checkInterval);
        } else {
          console.warn('Ethereum provider not detected after maximum attempts');

          // 移动端需要更长时间
          if (this.isMobile()) {
            setTimeout(() => {
              const provider = window.ethereum || window.tpWallet;
              if (provider) {
                console.log('Ethereum provider detected on mobile after extended wait');
                this.reinitWeb3();
                this.showDialog = false;
              } else {
                console.log('No provider found, showing connection dialog');
                this.showDialog = true;
              }
            }, 2000);
          } else {
            this.showDialog = true;
          }
        }
      };

      checkEthereum();
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

            // 忽略大小写比较链ID
            if (chainChanged.toLowerCase() !== this.Config.chainId.toLowerCase()) {
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
        const provider = window.ethereum || window.tpWallet;

        if (!provider) {
          console.warn('Ethereum provider not available');
          return;
        }

        // TP钱包可能需要特殊处理
        let chainId;
        if (this.detectTPWallet() && window.tpWallet && window.tpWallet.request) {
          chainId = await window.tpWallet.request({
            method: "eth_chainId"
          });
        } else {
          chainId = await provider.request({
            method: "eth_chainId"
          });
        }

        console.log('当前链id', chainId);
        this.$store.commit('getChainId', chainId);

        // 检查是否为目标链（忽略大小写）
        if (chainId.toLowerCase() !== this.Config.chainId.toLowerCase()) {
          console.log(`Wrong network detected. Current: ${chainId}, Expected: ${this.Config.chainId}`);
          this.showNetworkSwitchDialog();
        } else {
          console.log('Correct network detected');
        }
      } catch (error) {
        console.error('Error getting chain ID:', error);
        // TP钱包可能在某些情况下无法获取链ID，不要因此阻塞应用
        if (this.detectTPWallet()) {
          console.log('TP Wallet chain ID detection failed, continuing...');
        }
      }
    },

    // 显示网络切换对话框
    showNetworkSwitchDialog() {
      this.showChainSwitchPopup = true
    },

    // 处理切换网络确认
    async handleSwitchNetwork() {
      this.chainSwitchLoading = true
      try {
        console.log('Attempting to switch network...')

        await window.ethereum.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: this.Config.chainId }],
        })

        Toast.success(this.$t('dialog.networkSwitched'));
        console.log('Network switched successfully')
        this.showChainSwitchPopup = false

        // 重新获取链ID确认切换成功
        setTimeout(() => {
          this.getChainId()
        }, 1000);

      } catch (err) {
        console.error('Switch network error:', err)

        // 错误代码4902表示链未添加到钱包
        if (err.code === 4902) {
          this.showChainSwitchPopup = false
          this.showAddNetworkDialog()
        } else {
          Toast.fail(this.$t('dialog.switchNetworkFailed'));
          console.error('Failed to switch network:', err.message)
        }
      } finally {
        this.chainSwitchLoading = false
      }
    },

    // 处理取消切换网络
    handleCancelSwitchNetwork() {
      this.showChainSwitchPopup = false
      console.log('User cancelled network switch')
    },

    // 显示添加网络对话框
    showAddNetworkDialog() {
      this.showChainAddPopup = true
    },

    // 处理添加网络确认
    async handleAddNetwork() {
      this.chainAddLoading = true
      try {
        console.log('Attempting to add network...')

        await window.ethereum.request({
          method: 'wallet_addEthereumChain',
          params: [this.Config.chainConfig],
        });

        Toast.success(this.$t('dialog.networkAdded'));
        console.log('Network added successfully')
        this.showChainAddPopup = false

        // 添加成功后尝试切换
        setTimeout(() => {
          this.showNetworkSwitchDialog()
        }, 1000);

      } catch (addError) {
        Toast.fail(this.$t('dialog.addNetworkFailed'));
        console.error('Failed to add network:', addError)
      } finally {
        this.chainAddLoading = false
      }
    },

    // 处理取消添加网络
    handleCancelAddNetwork() {
      this.showChainAddPopup = false
      console.log('User cancelled network addition')
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
