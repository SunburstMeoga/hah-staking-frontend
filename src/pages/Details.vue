<template>
    <div>
        <div v-if="$store.state.walletInfo.address && $store.state.chainId === '0x11623'"
            class="w-11/12 ml-auto mr-auto rounded-lg mb-3 sm:mb-8 sm:w-9/12"
            style="box-shadow:0 0.5rem 1.2rem rgba(82, 85, 92, .15);">
            <wallet-info />
        </div>
        <div class="sm:hidden w-11/12 mr-auto ml-auto text-red-600 text-xs mb-2 mt-4">
            {{ $t('tips.amount') }}
        </div>

        <div class="w-11/12 ml-auto mr-auto sm:flex sm:justify-between sm:items-start sm:w-9/12">
            <div class="sm:w-5/12">
                <div class="flex justify-start items-center w-full ml-auto mr-auto mb-2 sm:mb-4">
                    <module-title :title="$t('details.pageTitle')" />
                    <div class="text-grayicon icon iconfont icon-updata1 cursor-pointer"
                        :class="detailsLoadStatus === 'loading' ? 'animate-spin' : ''" @click="getNodeDetails" />
                </div>

                <div class="w-full ml-auto mr-auto rounded-lg mb-3 sm:mb-6"
                    style="box-shadow:0 0.5rem 1.2rem rgba(82, 85, 92, .15);">

                    <h-loading :loadStatus="detailsLoadStatus" @reload="getNodeDetails" />
                    <div v-if="detailsLoadStatus === 'finished'">
                        <node-details-card ref="nodeDetails" :getDetailsInfo="nodeInfo" />
                    </div>
                </div>
            </div>

            <div class="sm:w-6/12">
                <div class="w-full ml-auto mr-auto mb-2 sm:mb-4">
                    <module-title :title="$t('rules.title')" />
                </div>
                <div class="w-full ml-auto mr-auto rounded-lg mb-3 sm:mb-6"
                    style="box-shadow:0 0.5rem 1.2rem rgba(82, 85, 92, .15);">
                    <voting-rules />
                </div>
            </div>
        </div>

        <div class="w-11/12 ml-auto mr-auto mb-2 sm:mb-4 sm:w-9/12">
            <module-title :title="$t('details.voteBtn')" />
        </div>

        <div class="w-11/12 ml-auto mr-auto rounded-lg sm:mb-6 sm:w-9/12"
            style="box-shadow:0 0.5rem 1.2rem rgba(82, 85, 92, .15);">
            <div class="sm:ml-auto sm:mr-auto">
                <div class="px-2 py-3 sm:py-4">
                    <div class="flex flex-nowrap justify-start items-center overflow-x-auto w-full pb-1">
                        <div v-for="(item, index) in operatingList" :key="index" @click="handleMode(item, index)">
                            <div :class="currentMode === index ? 'text-white bg-clickable' : 'text-clickable'"
                                class="cursor-pointer rounded-md border w-32 mr-4 mb-2 border-clickable text-sm py-1 flex flex-col justify-center items-center">
                                <div>
                                    {{ item.title }}
                                </div>
                                <div class="text-xs">
                                    {{ $t('details.yield') }}:{{ item.point.toFixed(6) }}%
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
            <div class="sm:flex sm:justify-between sm:items-center mr-auto ml-auto sm:px-4">
                <div class="w-11/12 ml-auto mr-auto rounded-lg mb-3 sm:mb-0 sm:ml-0 sm:mr-0 sm:w-5/12">
                    <div class="px-2 py-3">
                        <div class="flex justify-start items-center mb-6">
                            <div class="font-bold mr-2 text-lighttable text-sm">
                                {{ $t('details.voteNonce') }}
                            </div>
                            <div
                                class="flex-1 h-8 rounded-lg overflow-hidden flex justify-center items-center border border-lightborder">
                                <input type="number" class="text-center" v-model="pledgeNonce" @focus="amountFocus(0)"
                                    :placeholder="$t('details.voteNonce')">
                            </div>
                        </div>
                        <div class="flex justify-start items-center mb-6">
                            <div class="font-bold mr-2 text-lighttable text-sm">
                                {{ $t('details.voteCycle') }}
                            </div>
                            <van-stepper v-model="pledgeCycles" min="1" max="2147483647" integer />
                        </div>
                        <div class="flex justify-start items-center mb-6">
                            <div class="font-bold mr-2 text-lighttable text-sm">
                                {{ $t('details.amount') }}
                            </div>
                            <div
                                class="flex-1 h-8 rounded-lg overflow-hidden flex justify-center items-center border border-lightborder">
                                <input type="number" class="text-center" v-model="voteAmount" @focus="amountFocus(0)"
                                    :placeholder="$t('placeholder.inputAmount')">
                            </div>
                            <div class="font-bold ml-2 text-lighttable text-sm">
                                HAH
                            </div>
                        </div>
                        <div class="mb-4 w-11/12 mr-auto ml-auto sm:w-full">
                            <van-slider v-model="voteValue" @change="onChangeVotes">
                                <template #button>
                                    <div class="custom-button">{{ voteValue + '%' }}</div>
                                </template>
                            </van-slider>
                            <div class="w-full mr-auto ml-auto flex justify-between items-center mt-4">
                                <div class="point-item" @click="handleVotePoint(item, index)"
                                    :class="currentVotePoint === index ? 'bg-clickable text-gray-50 border-none' : ''"
                                    v-for="(item, index) in pointList" :key="index">
                                    {{ item.title }}
                                </div>
                            </div>

                        </div>
                        <div class="flex justify-between items-center">
                            <div class="operating-btn" @click="userVote">{{ $t('details.voteBtn') }}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- <div class="w-11/12 ml-auto mr-auto mb-2 sm:mb-4 sm:w-9/12">
            <module-title :title="$t('details.redeemBtn')" />
        </div> -->
        <div class="w-11/12 ml-auto mr-auto rounded-lg mb-3 sm:mb-6 sm:w-9/12"
            style="box-shadow:0 0.5rem 1.2rem rgba(82, 85, 92, .15);">
            <div class="">
                <withdrawal-node :dataList="dataList" @userRedeem="userRedeem" />
            </div>
        </div>


    </div>
</template>

<script>
import VotingRules from '@/components/VotingRules';
import ModuleTitle from '@/components/ModuleTitle'
import WalletInfo from '@/components/WalletInfo'
import NodeDetailsCard from '@/components/NodeDetailsCard';
import HLoading from '@/components/HLoading'
import WithdrawalNode from '@/components/WithdrawalNode'

import { timeFormat, addressFilter, amountFormat } from '../utils/format';
import { nodeDetails, nodeList } from '@/request/api'
import { Toast, Slider, Stepper } from 'vant';
export default {
    components: {
        WalletInfo,
        ModuleTitle,
        Toast,
        NodeDetailsCard,
        VotingRules,
        HLoading, WithdrawalNode,
        [Slider.name]: Slider,
        [Stepper.name]: Stepper

    },
    data() {
        return {
            isRewardMode: 0,
            rewardMode: 0,
            ordinary: 0,
            dposAddress: '',
            walletAddress: '',
            voteAmount: null,
            redeemAmount: null,
            calculateOrdinary: 0,
            calculateRewardMode: 0,
            currentMode: 0,
            nodeRank: 0,
            nodeInfo: {},
            detailsLoadStatus: 'loading',
            voteValue: 0,
            redeemValue: 0,
            vote0Original: '0',
            vote1Original: '0',
            pointList: [{ title: '25%', value: 25 },
            { title: '50%', value: 50 }, { title: '75%', value: 75 }, { title: '100%', value: 100 }],
            currentVotePoint: null,

            currentRedeemPoint: null,
            locked0: '',
            locked1: '',
            dataList: [],
            pledgeType: 5,
            pledgeNonce: null,
            pledgeCycles: 1,
            showRedeem: false
        }
    },
    computed: {
        operatingList() {
            return [{ title: this.$t('details.oneYear'), point: 100, type: 1 }, { title: this.$t('details.half'), point: 90, type: 2 }, { title: this.$t('details.trimester'), point: 80, type: 3 }, { title: this.$t('details.oneMonth'), point: 70, type: 4 }, { title: this.$t('details.oneWeek'), point: 60, type: 5 }]
        }
    },
    created() {
        this.dposAddress = this.$route.params.address
        this.nodeRank = this.$route.query.rank
        console.log(this.dposAddress, this.nodeRank)
        if (localStorage.getItem('walletInfo')) {
            this.walletAddress = JSON.parse(localStorage.getItem('walletInfo')).address
            // this.getNodeVotes()
            this.getNodeDetails()
        }
    },

    methods: {
        timeFormat, addressFilter, amountFormat,
        amountFocus(index) {
            index === 0 ? this.currentVotePoint = null : this.currentRedeemPoint = null
        },
        handleRedeemPoint(item, index) {
            this.redeemValue = item.value
            this.onChangeRedeem(this.redeemValue)
            this.currentRedeemPoint = index

        },
        handleVotePoint(item, index) {
            this.voteValue = item.value
            this.onChangeVotes(this.voteValue)
            this.currentVotePoint = index

        },
        onChangeVotes(value) {
            this.currentVotePoint = null
            this.voteAmount = ((this.$store.state.walletInfo.balance * value / 100).toFixed(4)).toString()
            // Toast(this.$t('details.currentValue') + this.voteAmount);
        },
        onChangeRedeem(value) {
            this.currentRedeemPoint = null
            if (this.currentMode === 0) {
                if (value === 100) {
                    this.redeemAmount = this.fromatETH(this.vote0Original)
                    return
                }
                this.redeemAmount = (Number(this.fromatETH((Number(this.vote0Original) * (value * 0.01)).toString())).toFixed(4)).toString()
            } else {
                this.redeemAmount = (Number(this.fromatETH((Number(this.vote1Original) * (value * 0.01)).toString())).toFixed(4)).toString()
            }

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
                    ordinaryVote: res.vote1 ? this.amountFormat(res.vote1) : null,
                    returnsVote: res.vote0 ? this.amountFormat(res.vote0) : null,
                    totalVotes: res.vote0 || res.vote1 ? this.amountFormat(res.vote0 + res.vote1) : null,
                }
                localStorage.setItem('earningsInfo', JSON.stringify(earningsInfo))
                this.$store.commit('getEarningsInfo', JSON.parse(localStorage.getItem('earningsInfo')))
                Toast.clear()
            }).catch(err => {
                Toast.clear()

                console.log(err)
            })
        },

        handleMode(item, index) {
            this.pledgeType = item.type
            this.currentMode = index
            this.isRewardMode = index
            this.voteAmount = null
            this.redeemAmount = null
            this.currentVotePoint = null
            this.currentRedeemPoint = null
            this.redeemValue = 0
            this.voteValue = 0
        },
        getUserCalculateBalance() {
            if (localStorage.getItem('walletInfo')) {
                return (this.Web3.utils.toWei(JSON.parse(localStorage.getItem('walletInfo')).balance, 'ether')) * 1
            } else {
                return 0
            }
        },
        getInputValue(value) {
            return (this.Web3.utils.toWei(value, 'ether')) * 1
        },
        fromatETH(value) {
            return this.Web3.utils.fromWei(value, 'ether')
        },
        getWalletBalance(address) {
            this.Web3.eth.getBalance(address).then((res) => {
                let walletInfo = {
                    address: address,
                    balance: this.Web3.utils.fromWei(res, 'ether')
                }
                localStorage.setItem('walletInfo', JSON.stringify(walletInfo))
                localStorage.setItem('connectStatus', 'connect')
                this.isConnect = true
                this.$store.commit('getWalletInfo', JSON.parse(localStorage.getItem('walletInfo')))
                console.log('store', this.$store.state.walletInfo)
            }).catch(err => {
                console.log('getbalance err', err)
            })
        },
        getNodeDetails() {
            this.detailsLoadStatus = 'loading'
            console.log(this.dposAddress, window.ethereum.selectedAddress)
            nodeDetails({ dposAddress: this.dposAddress, address: window.ethereum.selectedAddress }).then(res => {
                const { vote, dpos } = res
                console.log(vote, dpos)
                if (vote.length === 0) {
                    this.showRedeem = true
                }
                this.nodeInfo.name = dpos.name
                this.nodeInfo.address = dpos.address
                this.nodeInfo.apy = dpos.apy
                this.nodeInfo.state = dpos.state
                this.nodeInfo.votes = dpos.votes
                this.nodeInfo.time = this.timeFormat(dpos.uptime)
                this.$store.commit('getNodeDetails', this.nodeInfo)
                this.dataList = vote
                this.detailsLoadStatus = 'finished'
                this.operatingList[0].point = this.getAPY(dpos.apy) * 1
                this.operatingList[1].point = this.getAPY(dpos.apy) * 0.9
                this.operatingList[2].point = this.getAPY(dpos.apy) * 0.8
                this.operatingList[3].point = this.getAPY(dpos.apy) * 0.7
                this.operatingList[4].point = this.getAPY(dpos.apy) * 0.6

                this.getAPY(dpos.apy)
                this.getNodeList(this.walletAddress)
                this.getWalletBalance(this.walletAddress)
                Toast.clear()
            }).catch(err => {
                this.detailsLoadStatus = 'error'
                console.log(err)
                Toast.clear()
            })
        },
        getAPY(basic) {
            basic = basic.substring(0, basic.length - 1);
            console.log(basic)
            return Number(basic)
        },
        //投票
        userVote() {
            if (!this.pledgeNonce) {
                if (!this.voteAmount) {
                    Toast.fail(this.$t('details.voteNonce'));
                    return;
                }
            }
            if (!this.voteAmount) {
                Toast.fail(this.$t('toast.amount'));
                return;
            }
            console.log(this.getUserCalculateBalance(), this.getInputValue(this.voteAmount))
            if (this.getUserCalculateBalance() < this.voteAmount) {
                console.log('余额不足')
                Toast.fail(this.$t('toast.notBalance'));
                return
            }
            Toast.loading({
                forbidClick: true,
                duration: 0
            });
            let web3Contract = new this.Web3.eth.Contract(this.Config.erc20_abi, this.Config.con_addr)
            console.log(this.dposAddress, this.pledgeType, this.pledgeCycles, this.pledgeNonce, this.Web3.utils.toWei(this.voteAmount.toString(), 'ether'))
            web3Contract.methods.pledgeVote(this.dposAddress, this.pledgeType, this.pledgeCycles, this.pledgeNonce, this.Web3.utils.toWei(this.voteAmount.toString(), 'ether')).send({
                from: JSON.parse(localStorage.getItem('walletInfo')).address,
            }).then(res => {
                console.log('res', res)
                this.getNodeDetails()
                // this.getNodeVotes()
                Toast.fail(this.$t('toast.voteSuccess'));
                console.log('res', res)
            }).catch(err => {
                Toast.fail(this.$t('toast.voteFail'));
                console.log('err', err)
            })
        },
        //撤投
        userRedeem(item) {
            console.log('撤投的item', item)
            Toast.loading({
                forbidClick: true,
                duration: 0
            });
            let web3Contract = new this.Web3.eth.Contract(this.Config.erc20_abi, this.Config.con_addr)
            console.log('参数', item.vote_addr, item.pledge_type, item.cycles, item.nonce)
            web3Contract.methods.pledgeReqRedeem(item.vote_addr, item.pledge_type, item.cycles, item.nonce).send({
                from: JSON.parse(localStorage.getItem('walletInfo')).address,
            }).then(res => {
                this.getNodeDetails()
                // this.getNodeVotes()
                this.voteAmount = null
                this.redeemAmount = null
                Toast.fail(this.$t('toast.redeemSuccess'));
                console.log('res', res)
            }).catch(err => {
                Toast.fail(this.$t('toast.redeemFail'));
                console.log('err', err)
            })

        },
        clickAddress(isRewardMode) {
            this.isRewardMode = isRewardMode
        }
    }
}
</script>

<style>
.operating-btn {
    @apply py-2 text-center rounded-full border bg-clickable text-gray-50 w-full;
}

input {
    border: none;
    width: 100%;
}

input:focus {
    outline: none;
}

.custom-button {
    width: 40px;
    color: #fff;
    font-size: 10px;
    line-height: 20px;
    text-align: center;
    background-color: #6ab5db;
    border-radius: 100px;
}

.point-item {
    @apply rounded-lg w-3/12 text-sm text-center border border-lightborder;
}
</style>