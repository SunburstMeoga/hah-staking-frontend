<template>
    <div class="bg-#1F1F1F pb-9">
        <div class="w-11/12 mx-auto flex justify-center items-center py-8">
            <module-title :title="$t('newWord.crossBridge')" />
        </div>
        <div class="w-full justify-start items-center flex flex-col transition-all duration-500 ">
            <div :class="{
                'order-1': !isSwapped,
                'order-3': isSwapped,
            }"
                class="w-11/12 bg-#282828 rounded-xl flex flex-col justify-center items-center h-32 mx-auto text-white card card-shadow">
                <div class="flex justify-between items-center w-11/12 mb-4">
                    <div class="flex justify-start items-center">
                        <div class="w-7 h-7 rounded-full overflow-hidden">
                            <img class="w-7 h-7 rounded-full overflow-hidden" src="../assets/HAH.png" alt="">
                        </div>
                        <div class="font-medium text-xl  ml-2">HAH</div>
                        <!-- <div class="icon iconfont icon-down1 text-sm text-white  ml-2"></div> -->
                    </div>
                    <div class="text-#A5A5A5 text-xs font-light"> <span class="font-bold text-#00FFEA">
                            {{ isSwapped ? $t('newWord.to') : $t('newWord.from') }}</span> Hash
                        Ahead Mainnet</div>
                </div>
                <div class="w-11/12 flex justify-end items-center text-#A5A5A5 text-xs font-light mb-1"
                    v-if="!isSwapped && isMainNetOut">
                    {{ $t('wallet.balance') }}:{{ $store.state.walletInfo.balance }} HAH</div>
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
                class="w-11/12 bg-#282828 rounded-xl flex flex-col justify-center items-center h-32 mx-auto text-white card card-shadow">
                <div class="flex justify-between items-center w-11/12 mb-4 ">
                    <div class="flex justify-start items-center">
                        <div class="w-7 h-7 rounded-full overflow-hidden">
                            <img class="w-7 h-7 rounded-full overflow-hidden" src="../assets/HAH.png" alt="">
                        </div>
                        <div class="font-medium text-xl  ml-2">HAH</div>
                        <!-- <div class="icon iconfont icon-down1 text-sm text-white  ml-2"></div> -->
                    </div>
                    <div class="text-#A5A5A5 text-xs font-light"><span class="font-bold text-#00FFEA">
                            {{ isSwapped ? $t('newWord.from') : $t('newWord.to') }}</span>Hash
                        Ahead
                        ByteBloom</div>
                </div>
                <div class="w-11/12 flex justify-end items-center text-#A5A5A5 text-xs font-light mb-1"
                    v-if="isSwapped && !isMainNetOut">
                    {{ $t('wallet.balance') }}:{{ $store.state.walletInfo.balance }} HAH</div>
                <div class="w-11/12 h-9 rounded-lg border border-#EAAE36">
                    <input type="number" class="w-full h-9 border-none bg-transparent pl-2" v-model="inputValue"
                        @input="validateInput">
                </div>
            </div>
        </div>
        <div class="w-11/12 rounded-lg flex justify-center items-center text-white bg-#EAAE36 mx-auto h-12 mt-12 mb-7"
            @click="handleConfirmCross">
            {{ $t('newWord.confirmCross') }}
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
                        {{ $t('newWord.confirmChangeChainOne') }}
                        <span class="text-#EAAE36 font-bold">
                            “{{ !isSwapped ? 'Hash Ahead ByteBloom' : 'Hash Ahead Mainnet' }}”
                        </span> {{ $t('newWord.confirmChangeChainTwo') }}
                    </div>
                    <div class="w-8/12 flex justify-between items-center text-#EAAE36 mb-4">
                        <div class="flex w-24 h-7 justify-center items-center border border-#EAAE361E rounded-lg text-sm bg-black "
                            @click="showDialog = !showDialog">
                            {{ $t('newWord.cancelBtn') }}</div>
                        <div class="flex w-24 h-7 justify-center items-center border text-black bg-#EAAE36 rounded-lg text-sm border-black"
                            @click="rotateIcon">
                            {{ $t('newWord.confirmBtn') }}</div>

                    </div>
                </div>
            </div>
        </van-popup>

        <!-- 链切换提示dialog -->
        <van-popup v-model="showNetworkSwitchDialog">
            <div class="w-full flex justify-center items-center bg-transparent">
                <div
                    class="w-11/12 text-white flex flex-col justify-start items-center bg-black border border-#E6E6E620 rounded-2xl backdrop-blur-xl bg-opacity-50">
                    <div class="w-10/12 flex justify-start items-center pt-4">
                        <div class="w-1/3 bg-#EAAE36 h-1 rounded-full"></div>
                    </div>
                    <div class="w-11/12 flex justify-end pt-4 mb-5" @click="showNetworkSwitchDialog = false">
                        <div class="icon iconfont icon-close text-sm"></div>
                    </div>
                    <div class="w-10/12 mb-5">
                        請切換到 <span class="text-#EAAE36 font-bold">"{{ targetChainName }}"</span> 網絡以進行跨鏈操作
                    </div>
                    <div class="w-8/12 flex justify-between items-center text-#EAAE36 mb-6">
                        <div class="flex w-24 h-7 justify-center items-center border border-#EAAE361E rounded-lg text-sm bg-black"
                            @click="showNetworkSwitchDialog = false">
                            取消</div>
                        <div class="flex w-24 h-7 justify-center items-center border text-black bg-#EAAE36 rounded-lg text-sm border-black"
                            @click="switchToCorrectChain">
                            切換</div>
                    </div>
                </div>
            </div>
        </van-popup>

        <!-- 跨鏈成功dialog -->
        <van-popup v-model="showSuccessDialog">
            <div class="w-full flex justify-center items-center bg-transparent">
                <div
                    class="w-11/12 text-white flex flex-col justify-start items-center bg-black border border-#E6E6E620 rounded-2xl backdrop-blur-xl bg-opacity-50">
                    <div class="w-10/12 flex justify-start items-center">
                        <div class="w-1/3 bg-#EAAE36 h-1 rounded-full"></div>
                    </div>
                    <div class="w-11/12 flex justify-end pt-4 mb-5" @click="showSuccessDialog = false">
                        <div class="icon iconfont icon-close text-sm"></div>
                    </div>
                    <div class="w-10/12 mb-5">
                        <span class="text-xl">{{ $t('newWord.success') }}</span> !<br /> <br />
                        {{ $t('newWord.from') }} <span class="text-#EAAE36 font-bold">
                            “{{ isSwapped ? 'Hash Ahead ByteBloom' : 'Hash Ahead Mainnet' }}”
                        </span> {{ $t('newWord.cross') }}，<span class="text-#EAAE36 font-bold">
                            “{{ !isSwapped ? 'Hash Ahead ByteBloom' : 'Hash Ahead Mainnet' }}”
                        </span>{{ $t('newWord.receive') }}<span class="text-#00FFEA"> {{ inputValue }} HAH</span>
                    </div>
                    <div class="w-8/12 flex justify-between items-center text-#EAAE36 mb-4">

                        <div class="flex w-full h-10 justify-center items-center border text-black bg-#EAAE36 rounded-lg text-sm border-black"
                            @click="showSuccessDialog = false">
                            {{ $t('newWord.confirmBtn') }}</div>
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
                    v-for="(_, index) in 4" :key="index">
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

            // 从环境变量获取链ID（支持新旧变量名）
            mainnetChainId: process.env.VUE_APP_MAINNET_CHAIN_ID, // 主链
            appChainId: process.env.VUE_APP_SUBCHAIN_CHAIN_ID || process.env.VUE_APP_APPCHAIN_CHAIN_ID, // 子链（兼容旧变量名）
            showSuccessDialog: false,
            isMainNetOut: true, // 當前跨出鏈是否為主網
            outChainBalance: '0.00',

            // 链切换相关状态
            showNetworkSwitchDialog: false,
            targetChainId: '',
            targetChainName: ''
        }
    },
    created() {
        console.log('init ........')
        console.log('登录状态', localStorage.getItem('connectStatus'))
        console.log('环境配置:')
        console.log('主链ID:', this.mainnetChainId)
        console.log('应用链ID:', this.appChainId)
        console.log('主链RPC:', process.env.VUE_APP_MAINNET_RPC_URL)
        console.log('应用链RPC:', process.env.VUE_APP_APPCHAIN_RPC_URL)
    },
    computed: {

    },
    methods: {
        amountFormat,
        //獲取當前跨出鏈餘額
        getOutChainBalance(address) {
            Toast.loading({
                forbidClick: true,
                duration: 0
            });
            this.Web3.eth.getBalance(address).then((res) => {
                let walletInfo = {
                    address: address,
                    balance: this.Web3.utils.fromWei(res, 'ether')
                }

                localStorage.setItem('walletInfo', JSON.stringify(walletInfo))
                localStorage.setItem('connectStatus', 'connect')
                this.$store.commit('getWalletInfo', JSON.parse(localStorage.getItem('walletInfo')))
                console.log('store', this.$store.state.walletInfo.balance)
                Toast.clear()
            }).catch(err => {
                console.log('getbalance err', err)
            })
        },
        // 检查当前链是否是正确的from链
        async checkCurrentChain() {
            try {
                if (!window.ethereum) {
                    Toast.fail('請先連接錢包');
                    return false;
                }

                const currentChainId = await window.ethereum.request({
                    method: 'eth_chainId'
                });

                // 确定应该在哪条链上（from链）
                const expectedChainId = !this.isSwapped ? this.mainnetChainId : this.appChainId;
                const expectedChainName = !this.isSwapped ?
                    process.env.VUE_APP_MAINNET_CHAIN_NAME :
                    process.env.VUE_APP_SUBCHAIN_CHAIN_NAME;

                if (currentChainId !== expectedChainId) {
                    console.log(`Wrong chain detected. Current: ${currentChainId}, Expected: ${expectedChainId}`);

                    // 显示切换链的提示
                    this.showChainSwitchDialog(expectedChainId, expectedChainName);
                    return false;
                }

                return true;
            } catch (error) {
                console.error('Error checking chain:', error);
                Toast.fail('檢查網絡失敗');
                return false;
            }
        },

        // 显示链切换对话框
        showChainSwitchDialog(targetChainId, targetChainName) {
            this.targetChainId = targetChainId;
            this.targetChainName = targetChainName;
            this.showNetworkSwitchDialog = true;
        },

        // 切换到正确的链
        async switchToCorrectChain() {
            try {
                const targetChainId = this.targetChainId;

                await window.ethereum.request({
                    method: 'wallet_switchEthereumChain',
                    params: [{ chainId: targetChainId }],
                });

                Toast.success('網絡切換成功');
                this.showNetworkSwitchDialog = false;

                // 切换成功后重新检查并执行跨链
                setTimeout(() => {
                    this.handleConfirmCross();
                }, 1000);

            } catch (error) {
                console.error('Switch chain error:', error);

                if (error.code === 4902) {
                    // 链不存在，尝试添加
                    this.addCorrectChain();
                } else {
                    Toast.fail('網絡切換失敗');
                }
            }
        },

        // 添加正确的链
        async addCorrectChain() {
            try {
                const targetChainId = this.targetChainId;
                const isMainnet = targetChainId === this.mainnetChainId;
                const targetChainConfig = isMainnet ? this.Config.chainConfig : this.Config.subchainConfig;

                await window.ethereum.request({
                    method: 'wallet_addEthereumChain',
                    params: [targetChainConfig],
                });

                Toast.success('網絡添加成功');
                this.showNetworkSwitchDialog = false;

                // 添加成功后重新检查并执行跨链
                setTimeout(() => {
                    this.handleConfirmCross();
                }, 1000);

            } catch (error) {
                console.error('Add chain error:', error);
                Toast.fail('網絡添加失敗');
            }
        },

        //点击确认跨链按钮
        async handleConfirmCross() {
            if (!this.inputValue) {
                Toast.fail('請輸入跨鏈金額');
                return
            }

            // 首先检查当前链是否正确
            const isCorrectChain = await this.checkCurrentChain();
            if (!isCorrectChain) {
                return; // 如果链不正确，等待用户切换
            }

            Toast.loading({
                forbidClick: true,
                duration: 0
            });

            try {
                let web3Contract = new this.Web3.eth.Contract(this.Config.cross_abi, this.Config.con_addr)
                console.log('参数', !this.isSwapped ? this.appChainId : this.mainnetChainId, this.Web3.utils.toWei(this.inputValue.toString(), 'ether'))

                const result = await web3Contract.methods.transferCoin(
                    !this.isSwapped ? this.appChainId : this.mainnetChainId,
                    this.Web3.utils.toWei(this.inputValue.toString(), 'ether')
                ).send({
                    from: JSON.parse(localStorage.getItem('walletInfo')).address,
                });

                this.showSuccessDialog = true
                this.getOutChainBalance(window.ethereum.selectedAddress)
                console.log('跨链成功', result)
                Toast.clear()
            } catch (err) {
                Toast.fail('跨鏈失敗，請重試');
                console.log('跨链错误', err)
                Toast.clear()
            }
        },
        //跨链金额输入框
        validateInput() {
            let value = this.inputValue;
            // 使用正则表达式进行验证，只允许壹个小数点
            value = value.replace(/[^0-9.]/g, '') // 过滤掉非数字和小数点字符
                .replace(/(\..*)\./g, '$1'); // 只保留壹个小数点
            // 设置更新后的值
            this.inputValue = value;
        },
        async rotateIcon() {
            try {
                // 确定要切换到的目标链ID（与当前显示相反）
                const targetChainId = !this.isSwapped ? this.mainnetChainId : this.appChainId;
                console.log('切换网络', [{ chainId: targetChainId }])
                await window.ethereum.request({
                    method: 'wallet_switchEthereumChain',
                    params: [{ chainId: targetChainId }],
                })

                this.rotation += 360; // 每次点击增加360度
                this.isSwapped = !this.isSwapped;
                this.showDialog = !this.showDialog
                this.isMainNetOut = !this.isSwapped
                this.getOutChainBalance(window.ethereum.selectedAddress)

            } catch (err) {
                console.error('切换自定义网络错误', err)
                if (err.code === 4902) {
                    console.log('自定义网络不存在，去添加自定义网络')
                    try {
                        // 根据要切换的链选择正确的配置（与当前显示相反）
                        const targetChainConfig = !this.isSwapped ? this.Config.chainConfig : this.Config.subchainConfig;
                        console.log('目标链配置:', targetChainConfig)

                        await ethereum.request({
                            method: 'wallet_addEthereumChain',
                            params: [targetChainConfig],
                        });

                        this.rotation += 360; // 每次点击增加360度
                        this.isSwapped = !this.isSwapped;
                        this.showDialog = !this.showDialog
                        this.isMainNetOut = !this.isSwapped
                        this.getOutChainBalance(window.ethereum.selectedAddress)
                    } catch (addError) {
                        console.log('添加自定义网络错误', addError)
                        Toast.fail('添加自定义网络错误');
                    }

                }
            }

        }
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
