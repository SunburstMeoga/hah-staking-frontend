<template>
    <div class="bg-#1F1F1F">
        <div class="mb-8 w-full bg-#282828" v-if="$store.state.walletInfo.address"
            style="box-shadow:0 0.5rem 1.2rem rgba(82, 85, 92, .15);">
            <wallet-info :totalIncome="totalIncome" :totalVotes="totalVotes" :counts="counts" />
        </div>
        <div class="w-11/12 mx-auto flex justify-center items-center pb-4 ">
            <module-title :title="$t('home.nodeList')" :count="$t('home.totalNode', { count: delegateCount })" />
        </div>
        <div class="w-11/12 mx-auto c ">
            <h-loading :loadStatus="nodeListLoadStatus" @reload="getDelegateList" />
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

import { delegateList, delegateDetails } from '@/request/api'
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
            nodeListLoadStatus: 'loading',

            counts: {}
        }
    },
    activated() {
        this.fetchNodeDataList(); // 每次激活时重新加载数据
    },
    mounted() {
        // console.log('init ........')
        // console.log('登录状态', localStorage.getItem('connectStatus'))
        // this.getNodeList()

        // 检查MetaMask是否可用，如果不可用则立即加载数据
        if (!window.ethereum) {
            console.warn('MetaMask not detected, loading data immediately')
            this.getDelegateList()
        } else {
            // 如果MetaMask可用，等待一段时间确保完全初始化
            setTimeout(() => {
                this.getDelegateList()
            }, 3000);
        }
    },
    computed: {
        //总投票量
        totalVotes() {
            return this.nodeDataList.reduce((total, item) => {
                // 如果 details 不为空，累加 voteAmount
                if (item.details && item.details.length > 0) {
                    const detailsSum = item.details.reduce((sum, detail) => {
                        return sum + parseFloat(detail.voteamount || 0);
                    }, 0);
                    return total + detailsSum;
                }
                // 如果 details 为空，直接返回当前总和
                return total;
            }, 0).toFixed(2);
        },
        //总收益
        totalIncome() {
            return this.nodeDataList.reduce((total, item) => {
                // 如果 details 不为空，累加 voteAmount
                if (item.details && item.details.length > 0) {
                    const detailsSum = item.details.reduce((sum, detail) => {
                        return sum + parseFloat(detail.totalrewardamount || 0);
                    }, 0);
                    return total + detailsSum;
                }
                // 如果 details 为空，直接返回当前总和
                return total;
            }, 0).toFixed(2);
        },
    },
    methods: {
        amountFormat,

        //投票节点列表数据
        async getDelegateList() {
            this.nodeListLoadStatus = 'loading'
            try {
                let res = await delegateList({ "jsonrpc": "2.0", "method": "listdelegate", "params": {}, "id": 83 })
                let { result } = res.data

                console.log('投票节点列表', result)
                if (result.length === 0) {
                    this.nodeListLoadStatus = 'empty'
                    return
                }
                // 确保数组赋值是响应式的
                this.nodeDataList = result.map((item, index) => {
                    return {
                        ...item,
                        showMore: false,
                        rank: index + 1,
                        details: [],
                    };
                });
                await Promise.all(this.nodeDataList.map(async (item, index) => {
                    item.showMore = false
                    item.rank = index + 1
                    //当前用户在该节点的投票信息
                    try {
                        // 安全地获取用户地址
                        let userAddress = null
                        if (window.ethereum && window.ethereum.selectedAddress) {
                            userAddress = window.ethereum.selectedAddress
                        } else if (this.$store.state.walletInfo && this.$store.state.walletInfo.address) {
                            userAddress = this.$store.state.walletInfo.address
                        }

                        if (userAddress) {
                            let details = await delegateDetails({ "jsonrpc": "2.0", "method": "listpledgevotes", "params": { "owneraddress": userAddress }, "id": 83 })
                            details.data.result.map((_item, _index) => {
                                if (_item.delegateaddress == item.address) {
                                    item.details = details.data.result
                                }
                            })
                            console.log(details)
                            let counts = { 0: 0, 1: 0, 2: 0 };
                            details.data.result.forEach(vote => { //统计 进行中，已贖回，停止復投中的数据
                                if (counts.hasOwnProperty(vote.status)) {
                                    counts[vote.status]++;
                                }
                            });
                            console.log(details)
                            this.counts = counts
                        } else {
                            console.warn('User address not available, skipping vote details fetch')
                        }
                    } catch (error) {
                        console.error('Error fetching delegate details:', error)
                    }
                }))
                // this.totalVotes = this.nodeDataList.reduce((sum, item) => sum + parseInt(item.votes, 10), 0);
                // this.totalIncome = this.nodeDataList.reduce((sum, item) => sum + parseInt(item.reward, 10), 0);
                console.log('节点列表', this.nodeDataList)
                this.nodeDataList.map((item) => {
                    if (item.details && item.details.length > 0) {
                        item.votedList = item.details.filter(_item => _item.delegateaddress === item.address)
                        item.nodeReward = item.votedList.reduce((sum, detail) => {
                            console.log(detail.revoterewardamount)
                            return sum + parseFloat(detail.revoterewardamount || 0);
                        }, 0)
                        item.delegateVotes = item.votedList.reduce((sum, detail) => {
                            console.log(detail.stopedrewardamount)
                            return sum + parseFloat(detail.stopedrewardamount || 0);
                        }, 0)
                        item.votedCount = item.votedList.reduce((sum, detail) => {
                            console.log(detail.voteamount)
                            return sum + parseFloat(detail.voteamount || 0);
                        }, 0)
                    }

                    // nodeReward delegateVotes votedCount
                    // revoterewardamount  stopedrewardamount  voteamount
                })
                console.log('节点列表', this.nodeDataList)

                this.nodeListLoadStatus = 'finished'
            } catch (err) {
                this.nodeListLoadStatus = 'error'
                console.log(err)
                Toast.clear()
            }
        },

        //获取節點列表数据
        getNodeList() {
            // this.nodeListLoadStatus = 'loading'
            // nodeList({ pageSize: 50, address: window.ethereum.selectedAddress }).then(async (res) => {
            //     console.log('節點列表----', res)
            //     res.data.map((item, index) => {
            //         item.rank = index + 1
            //     })
            //     if (res.data.length === 0) {
            //         this.nodeListLoadStatus = 'empty'
            //         return
            //     }
            //     this.nodeDataList = res.data
            //     await Promise.all(this.nodeDataList.map(async (item, index) => {
            //         item.showMore = false
            //         console.log(item)
            //         //当期那用户在该节点的投票信息
            //         let details = await nodeDetails({ dposAddress: item.address, address: window.ethereum.selectedAddress })
            //         item.votesList = details.vote
            //         item.dpos = details.dpos
            //         console.log(details)
            //         console.log(item)
            //     }))
            //     this.nodeDataList[0].name = 'HashGuardian'
            //     this.nodeDataList[1].name = 'BlockSentinel'
            //     this.nodeDataList[2].name = 'ChainPioneer'
            //     this.nodeDataList[3].name = 'NodeTitan'
            //     this.nodeDataList[4].name = 'CryptoHaven'
            //     this.nodeDataList[5].name = 'AnchorCore'
            //     this.totalVotes = this.nodeDataList.reduce((sum, item) => sum + parseInt(item.votes, 10), 0);
            //     this.totalIncome = this.nodeDataList.reduce((sum, item) => sum + parseInt(item.reward, 10), 0);
            //     console.log('votes', this.totalVotes)
            //     console.log('incone', this.totalIncome)

            //     this.delegateCount = res.total
            //     let earningsInfo = {
            //         ordinaryEarnings: res.income1 ? this.amountFormat(res.income1) : null,
            //         indexReturns: res.income0 ? this.amountFormat(res.income0) : null,
            //         totalEarnings: res.income0 || res.income1 ? (res.income0 + res.income1).toFixed(4) : null,
            //         ordinaryVote: res.vote1 ? this.amountFormat(res.vote1) : null,
            //         returnsVote: res.vote0 ? this.amountFormat(res.vote0) : null,
            //         totalVotes: res.vote0 || res.vote1 ? this.amountFormat(res.vote0 + res.vote1) : null,
            //         amount: res.amount ? this.amountFormat(res.amount) : null,
            //         income: res.income ? this.amountFormat(res.income) : null,
            //     }
            //     res.data.map((item, index) => {
            //         if (item.amount !== '0') {
            //             this.votedDataList.push(item)
            //         }
            //     })
            //     localStorage.setItem('earningsInfo', JSON.stringify(earningsInfo))
            //     this.$store.commit('getEarningsInfo', JSON.parse(localStorage.getItem('earningsInfo')))
            //     console.log('vuex的值', this.$store.state.earningsInfo)
            //     console.log('節點列表', this.nodeDataList)
            //     let counts = { 0: 0, 1: 0, 2: 0 };
            //     this.nodeDataList.forEach(item => { //统计 进行中，已贖回，停止復投中的数据
            //         item.votesList.forEach(vote => {
            //             if (counts.hasOwnProperty(vote.status)) {
            //                 counts[vote.status]++;
            //             }
            //         });
            //     });
            //     this.counts = counts
            //     console.log(counts)

            //     this.nodeListLoadStatus = 'finished'
            // }).catch(err => {
            //     this.nodeListLoadStatus = 'error'

            //     console.log(err)
            //     Toast.clear()
            // })
        },
    }
}
</script>

<style></style>