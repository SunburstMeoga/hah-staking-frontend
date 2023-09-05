<template>
    <div>
        <div v-if="$store.state.walletInfo.address && $store.state.chainId === '0x11623'"
            class="w-11/12 ml-auto mr-auto rounded-lg mb-3 sm:mb-8 sm:w-9/12"
            style="box-shadow:0 0.5rem 1.2rem rgba(82, 85, 92, .15);">
            <wallet-info />
        </div>
        <div class="w-11/12 ml-auto mr-auto mb-2 sm:mb-4 sm:w-9/12" v-if="votedDataList.length !== 0">
            <module-title :title="$t('home.votedCount')" :count="$t('home.votedNode', { count: votedDataList.length })" />
        </div>
        <div class="w-11/12 ml-auto mr-auto rounded-lg mb-3 sm:mb-6 sm:w-9/12" v-if="votedDataList.length !== 0"
            style="box-shadow:0 0.5rem 1.2rem rgba(82, 85, 92, .15);">
            <h-loading :loadStatus="nodeListLoadStatus" @reload="getNodeList" />
            <div v-if="nodeListLoadStatus === 'finished'">
                <voted-node-card :dataList="votedDataList" />
            </div>
        </div>
        <div class="w-11/12 ml-auto mr-auto mb-2 sm:mb-4 sm:w-9/12">
            <module-title :title="$t('home.nodeList')" :count="$t('home.totalNode', { count: delegateCount })" />
        </div>
        <div class="w-11/12 ml-auto mr-auto rounded-lg mb-3 sm:mb-6 sm:w-9/12"
            style="box-shadow:0 0.5rem 1.2rem rgba(82, 85, 92, .15);">
            <h-loading :loadStatus="nodeListLoadStatus" @reload="getNodeList" />
            <div v-if="nodeListLoadStatus === 'finished'">
                <vote-node-card :dataList="nodeDataList" />
            </div>
        </div>
    </div>
</template>

<script>
import ModuleTitle from '@/components/ModuleTitle'
import WalletInfo from '@/components/WalletInfo'
import VoteNodeCard from '@/components/VoteNodeCard'
import VotedNodeCard from '@/components/VotedNodeCard'

import HLoading from '@/components/HLoading'

import { nodeList } from '@/request/api'
import { amountFormat } from '@/utils/format'
import { Toast } from 'vant'
export default {
    components: { WalletInfo, ModuleTitle, VoteNodeCard, VotedNodeCard, HLoading },
    data() {
        return {
            nodeDataList: [],
            votedDataList: [],
            voteTotal: '',
            delegateCount: 0,
            rewardMode: '-',
            ordinary: '-',
            nodeListLoadStatus: 'loading'
        }
    },
    created() {
        console.log('init ........')
        console.log('登录状态', localStorage.getItem('connectStatus'))
        this.getNodeList()
    },
    methods: {
        amountFormat,
        //获取节点列表数据
        getNodeList() {
            this.nodeListLoadStatus = 'loading'
            nodeList({ pageSize: 50, address: window.ethereum.selectedAddress }).then(res => {
                console.log('节点列表----', res)
                res.data.map((item, index) => {
                    item.rank = index + 1
                })
                if (res.data.length === 0) {
                    this.nodeListLoadStatus = 'empty'
                    return
                }
                this.nodeDataList = res.data
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

<style></style>