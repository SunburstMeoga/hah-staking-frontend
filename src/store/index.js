import Vue from "vue";
import Vuex from "vuex"

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        walletAddress: '',
        haveWallet: false,
        walletBalance: '',
        nodeAddress: '',
        isConnected: false,
        chainId: ''
    },
    mutations: {
        getWalletAddress(state, newVal) {
            state.walletAddress = newVal
        },
        changeConnectStatus(state, val) {
            state.isConnected = val
        },
        getNodeAddress(state, newVal) {
            state.nodeAddress = newVal
        },
        getWalletBalance(state, newVal) {
            state.walletBalance = newVal
        },
        getChainId(state, newVal) {
            state.chainId = newVal
        }
    }
})

export default store