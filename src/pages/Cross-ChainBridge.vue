<template>
    <div class="bg-#1F1F1F">
        <div class="w-11/12 mx-auto flex justify-center items-center py-8">
            <module-title title="跨链桥" />
        </div>
        <div class="w-full justify-start items-center flex flex-col transition-all duration-500">
            <div :class="{
                'order-1': !isSwapped,
                'order-3': isSwapped,
            }"
                class="w-11/12 bg-#282828 rounded-xl flex flex-col justify-center items-center h-32 mx-auto text-white card">
                <div class="flex justify-between items-center w-11/12 mb-8 " @click="showList = !showList">
                    <div class="flex justify-start items-center">
                        <div class="w-7 h-7 rounded-full overflow-hidden">
                            <img class="w-7 h-7 rounded-full overflow-hidden" src="../assets/logo.jpg" alt="">
                        </div>
                        <div class="font-medium text-xl  ml-2">HAH</div>
                        <div class="icon iconfont icon-down1 text-sm text-white  ml-2"></div>
                    </div>
                    <div class="text-#A5A5A5 text-xs font-light">Hash Ahead Mainnet</div>
                </div>
                <div class="w-11/12 h-9 rounded-lg border border-#EAAE36">
                    <input type="number" class="w-full h-9 border-none bg-transparent">
                </div>
            </div>
            <div class="mx-auto my-3 flex justify-center items-center order-2">
                <div class="icon iconfont icon-arrow-up-down-line text-#00FFEA text-2xl duration-200 transition-transform transform"
                    :style="{ transform: `rotate(${rotation}deg)` }" @click="rotateIcon">
                </div>
            </div>
            <div :class="{
                'order-1': isSwapped,
                'order-3': !isSwapped,
            }"
                class="w-11/12 bg-#282828 rounded-xl flex flex-col justify-center items-center h-32 mx-auto text-white card">
                <div class="flex justify-between items-center w-11/12 mb-8 " @click="showList = !showList">
                    <div class="flex justify-start items-center">
                        <div class="w-7 h-7 rounded-full overflow-hidden">
                            <img class="w-7 h-7 rounded-full overflow-hidden" src="../assets/logo.jpg" alt="">
                        </div>
                        <div class="font-medium text-xl  ml-2">HAH222</div>
                        <div class="icon iconfont icon-down1 text-sm text-white  ml-2"></div>
                    </div>
                    <div class="text-#A5A5A5 text-xs font-light">Hash Ahead Mainnet</div>
                </div>
                <div class="w-11/12 h-9 rounded-lg border border-#EAAE36">
                    <input type="number" class="w-full h-9 border-none bg-transparent">
                </div>
            </div>
        </div>
        <div class="w-11/12 rounded-lg flex justify-center items-center text-white bg-#EAAE36 mx-auto h-12 mt-12 mb-7">
            确认跨链
        </div>
        <div class="w-11/12 mx-auto pb-9">
            <div class="w-full flex justify-between items-center text-#A5A5A5 h-9">
                <div class="">参考汇率</div>
                <div class="">1.0 ≈ 1.0</div>
            </div>
            <div class="w-full flex justify-between items-center text-#A5A5A5 h-9">
                <div class="">网络费</div>
                <div class="">0.0 HAH</div>
            </div>
        </div>

        <!-- 跨链桥token列表 -->
        <van-popup v-model="showList" position="bottom">
            <div class="h-80 w-full overflow-x-scroll bg-#282828 pt-2 pb-10">
                <!-- <div class="w-11/12 mx-auto py-4 font-bold text-white">Select Token</div> -->
                <div @click="showList = !showList"
                    class="w-11/12 bg-transparent rounded-xl flex justify-between items-center mx-auto p-2 hover:bg-black transition-colors duration-150"
                    v-for="(item, index) in 4" :key="index">
                    <div class="flex justify-start items-center h-9">
                        <div class="flex justify-start items-end ">
                            <div class="w-7 h-7 rounded-full ">
                                <img class="w-7 h-7 rounded-full" src="../assets/3AT.png" alt="">
                            </div>
                            <div class="-ml-2.5">
                                <img class="w-4 h-4 rounded-full border border-#1F1F1F" src="../assets/HAH.png" alt="">
                            </div>
                        </div>
                        <div class="flex flex-col justify-between items-start ml-4 h-9">
                            <div class="text-white font-semibold">HAH</div>
                            <div class="text-#747474 text-xs">Hash Ahead Mainnet</div>
                        </div>
                    </div>
                    <div class="flex flex-col justify-between items-end h-9">
                        <div class="text-#747474 text-sm">0.999234234</div>
                        <div class="text-#747474 text-sm">$0.0992</div>
                    </div>
                </div>
            </div>
        </van-popup>
    </div>
</template>

<script>
import ModuleTitle from '@/components/ModuleTitle'
import WalletInfo from '@/components/WalletInfo'
import VoteNodeCard from '@/components/VoteNodeCard'
import VotedNodeCard from '@/components/VotedNodeCard'

import HLoading from '@/components/HLoading'

import { nodeList, nodeDetails } from '@/request/api'
import { amountFormat } from '@/utils/format'
import { Toast, Popup } from 'vant'
export default {
    components: { WalletInfo, ModuleTitle, VoteNodeCard, VotedNodeCard, HLoading, [Popup.name]: Popup, },
    data() {
        return {
            nodeDataList: [],
            votedDataList: [],
            voteTotal: '',
            delegateCount: 0,
            rewardMode: '-',
            ordinary: '-',
            nodeListLoadStatus: 'loading',
            totalIncome: 0,
            totalVotes: 0,
            counts: {},

            showList: false, //列表弹窗
            rotation: 0, // 初始化旋转角度

            isSwapped: false, // 控制卡片是否交换位置
        }
    },
    created() {
        console.log('init ........')
        console.log('登录状态', localStorage.getItem('connectStatus'))
        this.getNodeList()
    },
    computed: {

    },
    methods: {
        amountFormat,
        rotateIcon() {
            this.rotation += 180; // 每次点击增加360度
            this.isSwapped = !this.isSwapped;

        },
        //获取节点列表数据
        getNodeList() {
            this.nodeListLoadStatus = 'loading'
            nodeList({ pageSize: 50, address: window.ethereum.selectedAddress }).then(async (res) => {
                console.log('节点列表----', res)
                res.data.map((item, index) => {
                    item.rank = index + 1
                })
                if (res.data.length === 0) {
                    this.nodeListLoadStatus = 'empty'
                    return
                }
                this.nodeDataList = res.data
                await Promise.all(this.nodeDataList.map(async (item, index) => {
                    item.showMore = false
                    console.log(item)

                    let details = await nodeDetails({ dposAddress: item.address, address: window.ethereum.selectedAddress })
                    item.votesList = details.vote
                    item.dpos = details.dpos
                    console.log(details)
                    console.log(item)
                }))
                this.nodeDataList[0].name = 'HashGuardian'
                this.nodeDataList[1].name = 'BlockSentinel'
                this.nodeDataList[2].name = 'ChainPioneer'
                this.nodeDataList[3].name = 'NodeTitan'
                this.nodeDataList[4].name = 'CryptoHaven'
                this.nodeDataList[5].name = 'AnchorCore'
                this.totalVotes = this.nodeDataList.reduce((sum, item) => sum + parseInt(item.votes, 10), 0);
                this.totalIncome = this.nodeDataList.reduce((sum, item) => sum + parseInt(item.income, 10), 0);
                console.log('votes', this.totalVotes)
                console.log('incone', this.totalIncome)

                this.delegateCount = res.total
                let earningsInfo = {
                    ordinaryEarnings: res.income1 ? this.amountFormat(res.income1) : null,
                    indexReturns: res.income0 ? this.amountFormat(res.income0) : null,
                    totalEarnings: res.income0 || res.income1 ? (res.income0 + res.income1).toFixed(4) : null,
                    ordinaryVote: res.vote1 ? this.amountFormat(res.vote1) : null,
                    returnsVote: res.vote0 ? this.amountFormat(res.vote0) : null,
                    totalVotes: res.vote0 || res.vote1 ? this.amountFormat(res.vote0 + res.vote1) : null,
                    amount: res.amount ? this.amountFormat(res.amount) : null,
                    income: res.income ? this.amountFormat(res.income) : null,
                }
                res.data.map((item, index) => {
                    if (item.amount !== '0') {
                        this.votedDataList.push(item)
                    }
                })
                localStorage.setItem('earningsInfo', JSON.stringify(earningsInfo))
                this.$store.commit('getEarningsInfo', JSON.parse(localStorage.getItem('earningsInfo')))
                console.log('vuex的值', this.$store.state.earningsInfo)
                console.log('节点列表', this.nodeDataList)
                let counts = { 0: 0, 1: 0, 2: 0 };
                this.nodeDataList.forEach(item => { //统计 进行中，已赎回，停止复投中的数据
                    item.votesList.forEach(vote => {
                        if (counts.hasOwnProperty(vote.status)) {
                            counts[vote.status]++;
                        }
                    });
                });
                this.counts = counts
                console.log(counts)

                this.nodeListLoadStatus = 'finished'
            }).catch(err => {
                this.nodeListLoadStatus = 'error'

                console.log(err)
                Toast.clear()
            })
        },
    }
}
</script>
<style scoped>
.card {
    transition: all 0.5s ease;
    /* 平滑过渡 */
}
</style>
