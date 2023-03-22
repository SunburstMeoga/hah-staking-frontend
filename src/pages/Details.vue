<template>
    <div class="sm:pt-6">
        <div class="sticky top-0 left-0 sm:hidden">
            <top-bar />
        </div>
        <div class="w-11/12 ml-auto mr-auto mb-1 sm:w-9/12" v-if="$store.state.isConnected">
            <wallet-address />
        </div>
        <div class="w-11/12 ml-auto mr-auto text-primary text-sm mb-1 sm:text-bold sm:text-2xl sm:w-9/12"> 节点地址：</div>
        <div class="w-11/12 bg-black rounded-md py-2 px-2 ml-auto mr-auto mb-4 sm:py-5 sm:px-4 sm:w-9/12">
            <div class="text-primary text-base text-bold break-all sm:text-bold sm:text-xl sm:font-semibold">
                {{ nodeAddress }}
            </div>
        </div>
        <div class="w-11/12 ml-auto mr-auto text-primary text-sm mb-2 sm:text-2xl sm:w-9/12"> 复利：</div>
        <div class="w-11/12 bg-black rounded-md py-2 px-2 ml-auto mr-auto mb-2 sm:py-5 sm:px-4 sm:w-9/12"
            @click="clickAddress(0)">
            <div class="flex justify-start items-center">
                <div class="border rounded-full w-5 h-5 border-primary flex justify-center items-center">
                    <div v-show="isRewardMode === 0" class="w-4 h-4 rounded-full bg-primary" />
                </div>
                <div class="text-primary flex-1 flex justify-between items-start sm:text-xl sm:font-semibold">
                    <div class="text-bold h-5 pl-4">已投金额: </div>
                    <div class="text-bold text-second">{{ rewardMode }} <span class="text-primary">HAH</span> </div>
                </div>
            </div>
        </div>
        <div class="w-11/12 ml-auto mr-auto text-primary text-sm mb-2 sm:text-2xl sm:w-9/12"> 普通：</div>
        <div class="w-11/12 bg-black rounded-md py-2 px-2 ml-auto mr-auto mb-2 sm:py-5 sm:px-4 sm:w-9/12"
            @click="clickAddress(1)">
            <div class="flex justify-start items-center">
                <div class="border rounded-full w-5 h-5 border-primary flex justify-center items-center">
                    <div v-show="isRewardMode === 1" class="w-4 h-4 rounded-full bg-primary" />
                </div>
                <div class="text-primary flex-1 flex justify-between items-start sm:text-xl sm:font-semibold">
                    <div class="text-bold h-5 pl-4">已投金额: </div>
                    <div class="text-bold text-second">{{ ordinary }} <span class="text-primary">HAH</span> </div>
                </div>
            </div>
        </div>
        <div class="w-11/12 ml-auto mr-auto text-primary text-sm mb-2 sm:text-2xl sm:w-9/12"> 金额：</div>
        <div class="w-11/12 bg-black rounded-md py-2 px-2 ml-auto mr-auto sm:py-5 sm:px-4 sm:w-9/12">
            <div class="flex justify-start items-center">
                <div class="text-primary flex-1 flex justify-between items-start">
                    <div class="text-bold h-5 flex-1 text-second">
                        <input type="number" v-model="amount" placeholder="请输入金额" />
                    </div>
                    <div class="text-bold ">HAH</div>
                </div>
            </div>
        </div>
        <div class="fixed bottom-0 left-0 w-full py-3 bg-black sm:bg-gray-800">
            <div class="w-11/12 mr-auto ml-auto flex justify-between sm:w-9/12 sm:justify-around">
                <div class="w-2/5 flex justify-center bg-primary text-white rounded-full py-3 sm:py-4 sm:text-2xl sm:w-1/5"
                    @click="userVote()">
                    投票</div>
                <div class="w-2/5 flex justify-center bg-second text-white rounded-full py-3 sm:py-4 sm:text-2xl sm:w-1/5"
                    @click="userRedeem()">
                    撤投</div>
            </div>
        </div>
    </div>
</template>

<script>
import TopBar from '@/components/TopBar.vue';
import WalletAddress from '@/components/WalletAddress'
import { Toast } from 'vant';
export default {
    components: {
        TopBar,
        WalletAddress,
        Toast
    },
    data() {
        return {
            isRewardMode: 0,
            rewardMode: 0,
            ordinary: 0,
            nodeAddress: '',
            amount: null,
            calculateOrdinary: 0,
            calculateRewardMode: 0
        }
    },
    created() {
        console.log('this.$store.state.walletAddress', this.$store.state.walletAddress)
        this.nodeAddress = this.$route.query.nodeAddress
        if (this.$store.state.walletAddress) {
            this.getNodeDetails()
        }

    },
    methods: {
        getUserCalculateBalance() {
            if (this.$store.state.walletBalance) {
                return (this.Web3.utils.toWei(this.$store.state.walletBalance, 'ether')) * 1
                // return this.Web3.utils.toWei(this.$store.state.walletBalance, 'ether')

            } else {
                return 0
            }

        },
        getInputValue() {
            return (this.Web3.utils.toWei(this.amount, 'ether')) * 1
        },
        getNodeDetails() {
            Toast.loading({
                forbidClick: true,
                duration: 0
            });
            let web3Contract = new this.Web3.eth.Contract(this.Config.erc20_abi, this.Config.con_addr)
            web3Contract.methods.getUserVotes(this.nodeAddress, this.$store.state.walletAddress, 0).call().then((result) => {
                console.log('复利', result)
                this.calculateRewardMode = result
                this.rewardMode = ((this.Web3.utils.fromWei(result, 'ether')) * 1).toFixed(4)
                Toast.clear()
            }).catch((err) => {
                Toast.clear()
            })
            web3Contract.methods.getUserVotes(this.nodeAddress, this.$store.state.walletAddress, 1).call().then((result) => {
                console.log('普通', result)
                this.calculateOrdinary = result
                this.ordinary = ((this.Web3.utils.fromWei(result, 'ether')) * 1).toFixed(4)
                this.amount = null
                Toast.clear()
            }).catch((err) => {
                Toast.clear()
            })
        },
        //投票
        userVote() {
            if (!this.amount) {
                Toast.fail('请输入金额');
                return;
            }
            console.log(this.getUserCalculateBalance(), this.getInputValue())
            if (this.getUserCalculateBalance() < this.getInputValue()) {
                console.log('余额不足')
                Toast.fail('余额不足');
                return
            }
            Toast.loading({
                forbidClick: true,
                duration: 0
            });
            let web3Contract = new this.Web3.eth.Contract(this.Config.erc20_abi, this.Config.con_addr)
            web3Contract.methods.userVote(this.nodeAddress, this.isRewardMode, this.Web3.utils.toWei(this.amount.toString(), 'ether')).send({
                from: window.ethereum.selectedAddress,
            }).then(res => {
                this.getNodeDetails()
                Toast.success('投票成功');
                console.log('res', res)
            }).catch(err => {
                Toast.fail('投票失败');
                console.log('err', err)
            })
        },
        //撤投
        userRedeem() {
            if (!this.amount) {
                Toast.fail('请输入金额');
                return;
            }
            if (this.isRewardMode === 0) {
                if (this.calculateRewardMode < this.getInputValue()) {
                    console.log('撤投金额不能大于你已投票的金额')
                    Toast.fail('撤投金额不能大于你已投票的金额');
                    return
                }
            } else {
                if (this.calculateOrdinary < this.getInputValue()) {
                    console.log('撤投金额不能大于你已投票的金额')
                    Toast.fail('撤投金额不能大于你已投票的金额');
                    return
                }
            }
            Toast.loading({
                forbidClick: true,
                duration: 0
            });
            let web3Contract = new this.Web3.eth.Contract(this.Config.erc20_abi, this.Config.con_addr)
            console.log('参数', this.nodeAddress, this.isRewardMode, this.Web3.utils.toWei(this.amount.toString(), 'ether'))
            web3Contract.methods.userRedeem(this.nodeAddress, this.isRewardMode, this.Web3.utils.toWei(this.amount.toString(), 'ether')).send({
                from: window.ethereum.selectedAddress,
            }).then(res => {
                this.getNodeDetails()
                Toast.success('撤投成功');
                console.log('res', res)
            }).catch(err => {
                Toast.fail('撤投失败');
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
input {
    border: none;
    caret-color: #f1b434;
    width: 90%;
    background-color: #000;
    border-radius: 2px;
}

input:focus {
    outline: none;
}

input::placeholder {
    color: #612591;
}
</style>