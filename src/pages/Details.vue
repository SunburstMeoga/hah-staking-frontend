<template>
    <div class="bg-#1F1F1F pt-5 ">
        <div class="mb-3 w-11/12 mx-auto bg-#282828 rounded-2xl overflow-hidden" v-if="$store.state.walletInfo.address"
            style="box-shadow:0 0.5rem 1.2rem rgba(82, 85, 92, .15);">
            <details-info :votes="votes" :income="income" />
        </div>
        <div class="w-11/12 ml-auto mr-auto mb-5">
            <div v-if="detailsLoadStatus === 'finished'"
                class="w-full duration-150 transition transform ease-linear active:scale-95">
                <node-details-card ref="nodeDetails" :getDetailsInfo="nodeInfo" />
            </div>
        </div>
        <div class="w-11/12 mx-auto rounded-2xl overflow-hidden bg-#282828 card-shadow mb-4"
            style="box-shadow:0 0.5rem 1.2rem rgba(82, 85, 92, .15);">
            <div class="w-11/12 mx-auto pt-6 mb-6">
                <module-title :title="$t('details.voteBtn')" />
            </div>
            <div
                class="w-full border-b border-#C2B9D01E flex flex-nowrap justify-start items-center overflow-x-auto mb-10">
                <div class="flex flex-col justify-start items-start w-32 border-b-2 ml-7 pb-2"
                    :class="`${currentMode === index ? 'border-#EAAE36' : 'border-transparent'}`"
                    v-for="(item, index) in operatingList" :key="index" @click="handleMode(item, index)">
                    <div class="text-xs font-light mb-2"
                        :class="`${currentMode === index ? 'text-#EAAE36' : 'text-#A5A5A5'}`">{{
            item.title }}</div>
                    <div class="text-2xl" :class="`${currentMode === index ? 'text-#EAAE36' : 'text-#A5A5A5'}`">
                        {{ item.point.toFixed(0) }}%
                    </div>
                </div>
            </div>
            <div class="w-11/12 mx-auto flex justify-between items-center mb-6">
                <div class=" text-white">
                    {{ $t('details.amount') }}
                </div>
                <div
                    class="h-10 w-56 rounded-lg overflow-hidden flex justify-center items-center bg-black border border-#FFD667">
                    <input type="number" v-model="voteAmount" @focus="amountFocus(0)" @input="validateAmount"
                        :placeholder="$t('placeholder.inputAmount')"
                        class="text-left bg-transparent w-full indent-4 text-white ml-4" :min="100" step="0.01" />
                </div>
                <div class="text-white">
                    HAH
                </div>
            </div>
            <div class="mb-11 w-11/12 mx-auto">
                <van-slider v-model="voteValue" @change="onChangeVotes">
                    <template #button>
                        <div class="custom-button">{{ voteValue + '%' }}</div>
                    </template>
                </van-slider>
                <div class="w-full my-auto flex justify-between items-center mt-6">
                    <div class="text-white rounded-lg w-1/5 h-7 text-sm flex justify-center items-center border-2"
                        @click="handleVotePoint(item, index)"
                        :class="currentVotePoint === index ? 'bg-#EAAE36 border-#FFD667' : 'bg-transparent border-#A5A5A536'"
                        v-for="(item, index) in pointList" :key="index">
                        {{ item.title }}
                    </div>
                </div>
            </div>
            <div class="w-11/12 rounded-lg flex justify-center items-center text-white bg-#EAAE36 mx-auto h-9 mb-7"
                @click="userVote">{{ $t('details.voteBtn') }}
            </div>
            <div class="w-11/12 flex justify-center items-center mx-auto text-white mb-3" @click="showRole = !showRole">
                <div class="underline font-light text-sm mr-2.5">{{ $t('newWord.ruleTitle') }}</div>
                <div class="icon iconfont icon-down2 text-xs"></div>
            </div>
            <div class="w-full mt-6" v-show="showRole">
                <div class="w-11/12 mx-auto mb-6">
                    <module-title :title="$t('newWord.ruleTitle')" />
                </div>
                <div class="w-11/12 mx-auto  mb-6">
                    <voting-rules />
                </div>
            </div>
        </div>
        <div class="w-11/12 mx-auto bg-#1F1F1F">
            <div class="pb-10">
                <withdrawal-node :dataList="dataList" @userRedeem="userRedeem" />
            </div>
        </div>
        <!-- 余额不足，弹出跨链桥dialog -->
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
                        {{ $t('newWord.toCross') }}
                        <!-- <span class="text-#EAAE36 font-bold">
                            “{{ !isSwapped ? 'Hash Ahead ByteBloom' : 'Hash Ahead Mainnet' }}”
                        </span> 跨出HAH -->
                    </div>
                    <div class="w-8/12 flex justify-between items-center text-#EAAE36 mb-4">
                        <div
                            class="flex w-24 h-7 justify-center items-center border border-#EAAE361E rounded-lg text-sm bg-black ">
                            {{ $t('newWord.cancelBtn') }}</div>
                        <div class="flex w-24 h-7 justify-center items-center border text-black bg-#EAAE36 rounded-lg text-sm border-black"
                            @click="toCross">
                            {{ $t('newWord.confirmBtn') }}</div>

                    </div>
                </div>
            </div>
        </van-popup>
    </div>
</template>

<script>
import VotingRules from '@/components/VotingRules';
import ModuleTitle from '@/components/ModuleTitle'
import DetailsInfo from '@/components/DetailsInfo'
import NodeDetailsCard from '@/components/NodeDetailsCard';
import HLoading from '@/components/HLoading'
import WithdrawalNode from '@/components/WithdrawalNode'

import { timeFormat, addressFilter, amountFormat } from '../utils/format';
import { nodeDetails, nodeList, delegateDetails, delegateList } from '@/request/api'
import { Toast, Slider, Stepper, Popup } from 'vant';
export default {
    components: {
        DetailsInfo,
        ModuleTitle,
        Toast,
        NodeDetailsCard,
        VotingRules,
        HLoading, WithdrawalNode,
        [Slider.name]: Slider,
        [Stepper.name]: Stepper,
        [Popup.name]: Popup,
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
            pledgeType: 1,
            pledgeNonce: null,
            pledgeCycles: 1,
            showRedeem: false,
            showRole: false,

            showDialog: false,
            nodeName: ''
        }
    },
    computed: {
        operatingList() {
            return [{ title: this.$t('details.oneYear'), point: 100, type: 1 }, { title: this.$t('details.half'), point: 90, type: 2 }, { title: this.$t('details.trimester'), point: 80, type: 3 }, { title: this.$t('details.oneMonth'), point: 70, type: 4 }, { title: this.$t('details.oneWeek'), point: 60, type: 5 }]
        },
        //当前用户在该节点的投票量
        votes() {
            return this.dataList.reduce((sum, item) => {
                return sum + parseFloat(item.voteamount || 0);
            }, 0).toFixed(2); // 保留两位小数
        },
        //当前用户在该节点的收益
        income() {
            return this.dataList.reduce((sum, item) => {
                return sum + parseFloat(item.revoterewardamount || 0);
            }, 0).toFixed(2); // 保留两位小数
        }
    },
    created() {
        this.dposAddress = this.$route.params.address
        this.nodeRank = this.$route.query.rank
        this.nodeName = this.$route.query.name
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
        //余额不足，前往跨链桥
        toCross() {
            this.$router.push({
                path: '/cross-chain-bridge'
            })
        },
        validateAmount(event) {
            let value = event.target.value;

            // 确保最小值为100
            // if (parseFloat(value) < 100) {
            //     this.voteAmount = 100;
            //     return;
            // }

            // 允许只有壹個小数点
            let regex = /^\d*\.?\d{0,2}$/;  // 数字和最多两個小数点
            if (!regex.test(value)) {
                this.voteAmount = value.slice(0, -1); // 如果不符合规则，去掉最后壹個字符
            }

            // 确保无负数输入
            if (value < 0) {
                this.voteAmount = 0;
            }
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
            console.log(this.currentMode)
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
        getNameByValue(value) {
            switch (value) {
                case "1":
                    return "HashGuardian";
                case "2":
                    return "BlockSentinel";
                case "3":
                    return "ChainPioneer";
                case "4":
                    return "NodeTitan";
                case "5":
                    return "CryptoHaven";
                case "6":
                    return "AnchorCore";
                default:
                    return "Unknown"; // 如果传入的值不在 1-6 之间
            }
        },
        async getNodeDetails() {
            this.detailsLoadStatus = 'loading'
            try {
                console.log(this.dposAddress, window.ethereum.selectedAddress)
                let delegateDetailsInfo = await delegateDetails({ "jsonrpc": "2.0", "method": "listpledgevotes", "params": { "owneraddress": window.ethereum.selectedAddress }, "id": 83 })
                console.log('节点详情', delegateDetailsInfo)
                this.dataList = delegateDetailsInfo.data.result
                let res = await delegateList({ "jsonrpc": "2.0", "method": "listdelegate", "params": {}, "id": 83 })
                let { result } = res.data

                const filteredList = this.dataList.filter(item => item.delegateaddress == this.dposAddress)
                this.dataList = filteredList
                this.dataList.map(item => {
                    item.name = this.nodeName
                })
                result.map(item => {

                    if (item.address === this.dposAddress) {
                        console.log(item)
                        this.nodeInfo.name = this.nodeName
                        this.nodeInfo.address = item.address
                        this.nodeInfo.apy = item.apy
                        this.nodeInfo.state = item.state
                        this.nodeInfo.votes = item.votes
                        this.nodeInfo.time = this.timeFormat(item.uptime)
                        this.nodeInfo.income = item.reward
                        this.nodeInfo.rank = this.nodeRank
                        this.operatingList[0].point = this.getAPY(item.apy) * 1 * 100
                        this.operatingList[1].point = this.getAPY(item.apy) * 0.9 * 100
                        this.operatingList[2].point = this.getAPY(item.apy) * 0.8 * 100
                        this.operatingList[3].point = this.getAPY(item.apy) * 0.7 * 100
                        this.operatingList[4].point = this.getAPY(item.apy) * 0.6 * 100
                        this.getAPY(item.apy)
                    }
                })
                this.$store.commit('getNodeDetails', this.nodeInfo)

                console.log(this.dataList)
                this.detailsLoadStatus = 'finished'
            } catch (err) {
                this.detailsLoadStatus = 'error'
                console.log(err)
                Toast.clear()
            }

            console.log(this.dataList)
            return
            nodeDetails({ dposAddress: this.dposAddress, address: window.ethereum.selectedAddress }).then(res => {
                const { vote, dpos } = res
                console.log(vote, dpos)
                if (vote.length === 0) {
                    this.showRedeem = true
                }
                // this.nodeInfo.name = dpos.name
                console.log(this.nodeRank, '-======')
                this.nodeInfo.name = this.getNameByValue(this.nodeRank)
                this.nodeInfo.address = dpos.address
                this.nodeInfo.apy = item.apy
                this.nodeInfo.state = dpos.state
                this.nodeInfo.votes = dpos.votes
                this.nodeInfo.time = this.timeFormat(dpos.uptime)
                this.$store.commit('getNodeDetails', this.nodeInfo)
                this.dataList = vote
                this.dataList.map(item => {
                    item.showMore = false
                })
                this.detailsLoadStatus = 'finished'
                this.operatingList[0].point = this.getAPY(item.apy) * 1 * 100
                this.operatingList[1].point = this.getAPY(item.apy) * 0.9 * 100
                this.operatingList[2].point = this.getAPY(item.apy) * 0.8 * 100
                this.operatingList[3].point = this.getAPY(item.apy) * 0.7 * 100
                this.operatingList[4].point = this.getAPY(item.apy) * 0.6 * 100
                this.getAPY(item.apy)
                this.getNodeList(this.walletAddress)
                this.getWalletBalance(this.walletAddress)
                console.log('object', this.nodeInfo)
                this.votes = dpos.votes
                this.income = dpos.income
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
            if (this.voteAmount < 100) {
                Toast.fail('最小投票金额为100HAH');
                return;
            }
            if (!this.voteAmount) {
                Toast.fail(this.$t('toast.amount'));
                return;
            }
            console.log(this.getUserCalculateBalance(), this.getInputValue(this.voteAmount))
            if (this.getUserCalculateBalance() < this.voteAmount) {
                this.showDialog = !this.showDialog
                return
            }
            Toast.loading({
                forbidClick: true,
                duration: 0
            });
            let web3Contract = new this.Web3.eth.Contract(this.Config.erc20_abi, this.Config.con_addr)
            console.log(this.dposAddress, this.pledgeType, 0, 0, this.Web3.utils.toWei(this.voteAmount.toString(), 'ether'))
            web3Contract.methods.pledgeVote(this.dposAddress, this.pledgeType, 0, 0, this.Web3.utils.toWei(this.voteAmount.toString(), 'ether')).send({
                from: JSON.parse(localStorage.getItem('walletInfo')).address,
            }).then(res => {
                console.log('res', res)
                // this.dataList = []
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
            console.log('参数', item.delegateaddress, item.pledgetype, item.cycles, item.nonce)
            web3Contract.methods.pledgeReqRedeem(item.delegateaddress, item.pledgetype, item.cycles, item.nonce).send({
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
    background-color: #EAAE36;
    border-radius: 100px;
}

.point-item {
    @apply rounded-lg w-3/12 text-sm text-center border border-lightborder;
}

.van-slider__bar {
    background-color: #EAAE36 !important;
}

.van-slider {
    background: #000 !important;
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