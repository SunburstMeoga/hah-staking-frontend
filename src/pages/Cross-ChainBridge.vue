<template>
    <div class="bg-#1F1F1F pb-9">
        <div class="w-11/12 mx-auto flex justify-center items-center py-8">
            <module-title title="跨鏈橋" />
        </div>
        <div class="w-full justify-start items-center flex flex-col transition-all duration-500">
            <div :class="{
                'order-1': !isSwapped,
                'order-3': isSwapped,
            }"
                class="w-11/12 bg-#282828 rounded-xl flex flex-col justify-center items-center h-32 mx-auto text-white card">
                <div class="flex justify-between items-center w-11/12 mb-8 ">
                    <div class="flex justify-start items-center">
                        <div class="w-7 h-7 rounded-full overflow-hidden">
                            <img class="w-7 h-7 rounded-full overflow-hidden" src="../assets/HAH.png" alt="">
                        </div>
                        <div class="font-medium text-xl  ml-2">HAH</div>
                        <!-- <div class="icon iconfont icon-down1 text-sm text-white  ml-2"></div> -->
                    </div>
                    <div class="text-#A5A5A5 text-xs font-light"> <span class="font-bold text-#00FFEA">
                            {{ isSwapped ? '到 ' : '從 ' }}</span> Hash
                        Ahead Mainnet</div>
                </div>
                <div class="w-11/12 h-9 rounded-lg border border-#EAAE36">
                    <input type="number" class="w-full h-9 border-none bg-transparent pl-2" v-model="inputValue"
                        @input="validateInput">
                </div>
            </div>
            <div @click="showDialog = !showDialog"
                class="mx-auto my-3 flex justify-center w-10 h-10 rounded-full bg-#282828 items-center order-2 text-2xl transition ease-in duration-100 active:translate-y-3">
                <!-- <div class="icon iconfont icon-Down- text-#00FFEA text-2xl duration-200 transition-transform transform"
                    :style="{ transform: `rotate(${rotation}deg)` }" @click="rotateIcon">
                </div> -->
                <div class="icon iconfont icon-Down- text-#00FFEA " />
            </div>
            <div :class="{
                'order-1': isSwapped,
                'order-3': !isSwapped,
            }"
                class="w-11/12 bg-#282828 rounded-xl flex flex-col justify-center items-center h-32 mx-auto text-white card">
                <div class="flex justify-between items-center w-11/12 mb-8 ">
                    <div class="flex justify-start items-center">
                        <div class="w-7 h-7 rounded-full overflow-hidden">
                            <img class="w-7 h-7 rounded-full overflow-hidden" src="../assets/HAH.png" alt="">
                        </div>
                        <div class="font-medium text-xl  ml-2">HAH</div>
                        <!-- <div class="icon iconfont icon-down1 text-sm text-white  ml-2"></div> -->
                    </div>
                    <div class="text-#A5A5A5 text-xs font-light"><span class="font-bold text-#00FFEA">
                            {{ isSwapped ? '從 ' : '到 ' }}</span>Hash
                        Ahead
                        ByteBloom</div>
                </div>
                <div class="w-11/12 h-9 rounded-lg border border-#EAAE36">
                    <input type="number" class="w-full h-9 border-none bg-transparent pl-2" v-model="inputValue"
                        @input="validateInput">
                </div>
            </div>
        </div>
        <div class="w-11/12 rounded-lg flex justify-center items-center text-white bg-#EAAE36 mx-auto h-12 mt-12 mb-7">
            確認跨鏈
        </div>
        <!-- <div class="w-11/12 mx-auto pb-9">
            <div class="w-full flex justify-between items-center text-#A5A5A5 h-9">
                <div class="">参考汇率</div>
                <div class="">1.0 HAH ≈ 1.0 HAH</div>
            </div>
            <div class="w-full flex justify-between items-center text-#A5A5A5 h-9">
                <div class="">网络费</div>
                <div class="">0.0 HAH</div>
            </div>
        </div> -->
        <!-- 是否确认转换跨出链dialog -->
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
                        是否切換為
                        <span class="text-#EAAE36 font-bold">
                            “{{ !isSwapped ? 'Hash Ahead ByteBloom' : 'Hash Ahead Mainnet' }}”
                        </span> 跨出HAH
                    </div>
                    <div class="w-8/12 flex justify-between items-center text-#EAAE36 mb-4">
                        <div
                            class="flex w-24 h-7 justify-center items-center border border-#EAAE361E rounded-lg text-sm bg-black ">
                            取 消</div>
                        <div class="flex w-24 h-7 justify-center items-center border text-black bg-#EAAE36 rounded-lg text-sm border-black"
                            @click="rotateIcon">
                            確 定</div>

                    </div>
                </div>
            </div>
        </van-popup>
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
            showDialog: false,
            rotation: 0, // 初始化旋转角度

            isSwapped: false, // 控制卡片是否交换位置  
            inputValue: '',  // 初始化输入值
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
        //跨链金额输入框
        validateInput() {
            // 只允许数字和壹个小数点
            let value = this.inputValue;

            // 使用正则表达式进行验证，只允许壹个小数点
            value = value.replace(/[^0-9.]/g, '') // 过滤掉非数字和小数点字符
                .replace(/(\..*)\./g, '$1'); // 只保留壹个小数点

            // 设置更新后的值
            this.inputValue = value;
        },
        async rotateIcon() {
            // await window.ethereum.request({
            //     method: 'wallet_switchEthereumChain',
            //     // params: [{ chainId: this.Config.chainId }],
            //     params: [{ chainId: this.isSwapped ? '0x11623' : '0x2bf' }],
            // })
            try {
                console.log('切换网络')
                await window.ethereum.request({
                    method: 'wallet_switchEthereumChain',
                    params: [{ chainId: this.isSwapped ? '0x329' : '0x2bf' }],
                })
            } catch (err) {
                console.error('切换自定义网络错误', err)
                // if (err.code === 4902) {
                console.log('自定义网络不存在，去添加自定义网络')
                console.log([this.isSwapped ? 'https://rpc.hashahead.org/mrpc' : 'https://rpc.hashahead.org'])
                try {
                    await ethereum.request({
                        method: 'wallet_addEthereumChain',
                        params: [
                            {
                                chainId: this.isSwapped ? '0x329' : '0x2bf',
                                chainName: this.isSwapped ? 'Hash Ahead Mainnet' : 'Hash Ahead ByteBloom',
                                rpcUrls: [this.isSwapped ? 'https://rpc.hashahead.org/mrpc' : 'https://rpc.hashahead.org'],
                                iconUrls: ['https://testnet.hashahead.org/logo.png'],
                                blockExplorerUrls: ['https://scan.hashahead.org/'],
                                nativeCurrency: {
                                    name: 'HAH',
                                    symbol: 'HAH',
                                    decimals: 18
                                }
                            },
                        ],
                    });
                } catch (addError) {
                    console.log('添加自定义网络错误', addError)
                }

                // }
            }
            this.rotation += 360; // 每次点击增加360度
            this.isSwapped = !this.isSwapped;
            this.showDialog = !this.showDialog
        },
        //获取節點列表数据
        getNodeList() {
            this.nodeListLoadStatus = 'loading'
            nodeList({ pageSize: 50, address: window.ethereum.selectedAddress }).then(async (res) => {
                console.log('節點列表----', res)
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
                console.log('節點列表', this.nodeDataList)
                let counts = { 0: 0, 1: 0, 2: 0 };
                this.nodeDataList.forEach(item => { //统计 进行中，已贖回，停止復投中的数据
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
<style>
.van-popup--center,
.van-popup {
    width: 100%;
    background-color: none;
    background: none;
}
</style>
