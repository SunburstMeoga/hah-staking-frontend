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
        chainId: '',
        walletInfo: {},
        earningsInfo: {},
        nodeDetails: {},
    },
    mutations: {
        getNodeDetails(state, newVal) {
            state.nodeDetails = newVal
        },
        getWalletInfo(state, newVal) {
            state.walletInfo = newVal
        },
        getEarningsInfo(state, newVal) {
            state.earningsInfo = newVal
        },
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