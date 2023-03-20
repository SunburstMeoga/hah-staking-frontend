import Vue from "vue";
import Vuex from "vuex"

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        walletAddress: '',
        haveWallet: false,
        walletBalance: '',
        nodeAddress: ''
    },
    mutations: {
        getWalletAddress(state, newVal) {
            state.walletAddress = newVal
        },
        changeConnectStatus(state, val) {
            state.haveWallet = val
        },
        getNodeAddress(state, newVal) {
            state.nodeAddress = newVal
        },
        getWalletBalance(state, newVal) {
            state.walletBalance = newVal
        }
    }
})

export default store