<template>
    <div>
        <div class="sticky top-0 left-0">
            <top-bar isHome @clickLogin="clickLogin" />
        </div>
        <div class="w-11/12 ml-auto mr-auto mb-1 sm:w-9/12" v-if="$store.state.walletAddress">
            <wallet-address />
        </div>
        <div class="text-primary text-sm w-11/12 ml-auto mr-auto mb-1 sm:text-xl sm:w-9/12"> 节点列表: 共({{ delegateCount }})个
        </div>
        <div class="w-11/12 ml-auto mr-auto flex flex-col justify-start items-center sm:w-9/12">
            <div class="w-full mb-2 shadow-xl" v-for="(item, index) in nodeList" :key="index"
                @click="toDetails(item, index)">
                <vote-node-card :nodeAddress="item" :voteTotal="voteTotal" :ordinary="ordinary" :rewardMode="rewardMode" />
            </div>
        </div>
        <bottom-bar></bottom-bar>
    </div>
</template>

<script>
import TopBar from '@/components/TopBar'
import VoteNodeCard from '@/components/VoteNodeCard'
import WalletAddress from '@/components/WalletAddress'
import BottomBar from '@/components/BottomBar'
import { Toast } from 'vant'
export default {
    components: { TopBar, VoteNodeCard, WalletAddress, BottomBar },
    data() {
        return {
            nodeList: [],
            voteTotal: '',
            delegateCount: 0,
            rewardMode: '-',
            ordinary: '-'
        }
    },
    created() {
        this.getNodeInfo()
    },
    methods: {
        //跳转详情页面
        toDetails(item) {
            if (!this.$store.state.walletAddress) {

                Toast.fail('请先链接钱包');
                return
            }

            this.$store.commit('getNodeAddress', item)
            this.$router.push({
                path: '/details',
                query: {
                    'nodeAddress': item
                }
            })
        },
        clickLogin() {
            this.getNodeInfo()
        },
        //获取节点列表数据
        getNodeInfo() {
            Toast.loading({
                forbidClick: true,
                duration: 0
            });
            let web3Contract = new this.Web3.eth.Contract(this.Config.erc20_abi, this.Config.con_addr)
            web3Contract.methods.getDelegateAddress(0).call().then((result) => {
                console.log('节点列表', result)
                this.nodeList = result
                web3Contract.methods.getDelegateTotalVotes(this.nodeList[0]).call().then((result) => {
                    console.log('地址的投票总额', result)
                    this.voteTotal = ((this.Web3.utils.fromWei(result, 'ether')) * 1).toFixed(4)
                    if (this.$store.state.isConnected) {
                        web3Contract.methods.getUserVotes(this.nodeList[0], this.$store.state.walletAddress, 0).call().then((result) => {
                            console.log('复利', result)
                            this.rewardMode = ((this.Web3.utils.fromWei(result, 'ether')) * 1).toFixed(4)
                        })
                        web3Contract.methods.getUserVotes(this.nodeList[0], this.$store.state.walletAddress, 1).call().then((result) => {
                            console.log('普通', result)
                            this.ordinary = ((this.Web3.utils.fromWei(result, 'ether')) * 1).toFixed(4)
                        })
                    }
                })
            }).catch(err => {
                console.log("节点列表", err)
                Toast.clear()
            })
            web3Contract.methods.getPageSize().call().then((result) => {
                console.log('每页投票地址数量', result)
                Toast.clear()
            })
            web3Contract.methods.getDelegateCount().call().then((result) => {
                console.log('投票地址总数', result)
                this.delegateCount = result
                Toast.clear()
            })

        },
    }
}
</script>

<style></style>