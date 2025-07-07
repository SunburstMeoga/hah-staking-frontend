// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import './assets/css/iconfont.css'
import './assets/css/global.css'
import 'tailwindcss/tailwind.css'
import 'vant/lib/index.css';
import i18n from './i18n';

import store from './store'
import router from './router'
import '@vant/touch-emulator';

import Web3 from 'web3'
import { config } from './const/config'

// 检测TP钱包环境
function detectTPWallet() {
  return window.tpWallet || window.tokenpocket ||
         (window.ethereum && window.ethereum.isTokenPocket) ||
         navigator.userAgent.includes('TokenPocket');
}

// 检测和处理钱包冲突
function handleWalletConflicts() {
  try {
    const walletInfo = {
      ethereum: !!window.ethereum,
      solana: !!window.solana,
      phantom: !!window.phantom,
      tronWeb: !!window.tronWeb,
      tpWallet: !!window.tpWallet
    };

    console.log('Detected wallets:', walletInfo);

    // 处理 Solana 钱包冲突
    if (window.solana) {
      try {
        // 检查 solana 属性是否可写
        const descriptor = Object.getOwnPropertyDescriptor(window, 'solana');
        if (descriptor && !descriptor.writable) {
          console.warn('Solana property is read-only, this may cause conflicts');

          // 创建一个安全的访问方法
          window.getSolanaWallet = function() {
            return window.solana || window._solanaBackup;
          };
        }
      } catch (error) {
        console.warn('Error checking Solana wallet:', error);
      }
    }

    return walletInfo;
  } catch (error) {
    console.error('Error in wallet conflict handling:', error);
    return {};
  }
}

// 安全地初始化Web3，处理各种钱包环境
function initWeb3() {
  try {
    if (typeof window !== 'undefined') {
      // TP钱包环境
      if (detectTPWallet()) {
        console.log('Initializing Web3 for TP Wallet');
        if (window.ethereum) {
          return new Web3(window.ethereum);
        } else if (window.tpWallet) {
          return new Web3(window.tpWallet);
        }
      }
      // 其他钱包环境
      else if (window.ethereum) {
        console.log('Initializing Web3 for standard wallet');
        return new Web3(window.ethereum);
      }
    }

    // 如果没有找到provider，创建一个空的Web3实例，避免应用崩溃
    console.warn('No Ethereum provider found, creating fallback Web3 instance');
    return new Web3();
  } catch (error) {
    console.error('Error initializing Web3:', error);
    return new Web3();
  }
}

Vue.prototype.Web3 = initWeb3()
Vue.prototype.Config = config

// 添加Web3重新初始化方法
Vue.prototype.reinitWeb3 = function() {
  try {
    const provider = window.ethereum || window.tpWallet;
    if (provider && (!this.Web3.currentProvider || this.Web3.currentProvider !== provider)) {
      this.Web3 = new Web3(provider);
      console.log('Web3 reinitialized with provider:', provider.constructor.name || 'Unknown');
    }
  } catch (error) {
    console.error('Error reinitializing Web3:', error);
  }
}

// 添加钱包检测方法
Vue.prototype.detectTPWallet = detectTPWallet;
Vue.prototype.handleWalletConflicts = handleWalletConflicts;

Vue.config.productionTip = false

// 等待ethereum准备就绪后再启动Vue应用
function startVueApp() {
  try {
    // 隐藏加载指示器
    const loadingIndicator = document.getElementById('loading-indicator');
    if (loadingIndicator) {
      loadingIndicator.style.display = 'none';
    }

    /* eslint-disable no-new */
    new Vue({
      el: '#app',
      router,
      store,
      i18n,
      components: { App },
      template: '<App/>',
      mounted() {
        // 应用启动后的额外检查
        console.log('Vue app mounted');
        console.log('TP Wallet detected:', detectTPWallet());
        console.log('Ethereum available:', !!window.ethereum);
        console.log('Web3 provider:', this.Web3.currentProvider ? 'Available' : 'Not available');

        // 执行钱包冲突检测
        const walletInfo = handleWalletConflicts();
        console.log('Wallet conflict check completed:', walletInfo);
      },
      errorCaptured(err, instance, info) {
        console.error('Vue error captured:', err, info);
        console.log('Error in component:', instance.$options.name || 'Unknown');
        // 返回false阻止错误继续传播
        return false;
      }
    });
  } catch (error) {
    console.error('Error starting Vue app:', error);
    // 即使启动失败，也要隐藏加载指示器
    const loadingIndicator = document.getElementById('loading-indicator');
    if (loadingIndicator) {
      loadingIndicator.style.display = 'none';
    }
    // 显示错误信息
    document.body.innerHTML = `
      <div style="padding: 20px; text-align: center; color: white; background: #1a1a1a; min-height: 100vh;">
        <h2>应用启动失败</h2>
        <p>请刷新页面重试</p>
        <p style="font-size: 12px; color: #666;">${error.message}</p>
      </div>
    `;
  }
}

// 监听ethereum准备就绪事件
window.addEventListener('ethereumReady', startVueApp);

// 备用启动机制，防止事件未触发
setTimeout(() => {
  if (!document.querySelector('.vue-app-started')) {
    console.log('Starting Vue app via fallback mechanism');
    startVueApp();
  }
}, 3000);
