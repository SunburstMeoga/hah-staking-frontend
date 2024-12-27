<template>
    <div class="">
        <div class="w-full flex flex-col justify-start items-center ">
            <div class="w-11/12 flex flex-col justify-start items-start">
                <div class="w-full flex justify-between items-center text-base my-4">
                    <div class="text-#00FFEA">{{ $t('wallet.address') }}：{{
                        addressFilter($store.state.walletInfo.address) || '-' }}</div>
                    <div class="icon iconfont icon-fuzhi text-white text-lg"
                        @click="copyContent($store.state.walletInfo.address)"></div>
                </div>
                <div class="w-full flex justify-between items-center pb-2 mb-2">
                    <div class="flex flex-col justify-start items-start w-1/2">
                        <div class="text-#FFFFFF73 mb-1 text-xs">{{ $t('newWord.targetNodeVote') }}</div>
                        <div class="flex justify-start items-baseline">
                            <div class="text-#EAAE36 text-4xl font-bold">{{ Number(votes).toFixed(2) }}</div>
                            <div class="text-#846934 ml-1 text-sm" v-if="!Math.floor(votes)">{{ $t('wallet.notVotes') }}
                            </div>
                        </div>
                    </div>
                    <div class="border-l border-#00000061 h-10 w-1"></div>
                    <div class="flex flex-col justify-start items-start w-1/2 pl-6">
                        <div class="text-#FFFFFF73 mb-1 text-xs">{{ $t('wallet.earnings') }}</div>
                        <div class="flex justify-start items-baseline">
                            <div class="text-#EAAE36 text-4xl font-bold">{{ Number(income).toFixed(2) }}</div>
                            <div class="text-#846934 ml-1 text-sm">HAH</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { addressFilter, amountFormat } from '@/utils/format'
import { Toast } from 'vant'

export default {
    props: {
        votes: {
            type: String,
            default: '0'
        },
        income: {
            type: String,
            default: '0'
        }
    },
    data() {
        return {

        }
    },
    mounted() {
        console.log(this.walletInfoList)
    },
    computed: {
        walletInfoList() {
            return [
                { title: this.$t('wallet.address'), copy: this.$store.state.walletInfo.address, content: this.$store.state.walletInfo.address || '-' },
                { title: this.$t('wallet.balance'), content: this.amountFormat(this.$store.state.walletInfo.balance) + ' HAH' || '00000000' },
                { title: this.$t('wallet.totalVotes'), content: this.earningsInfo.totalVotes ? this.earningsInfo.totalVotes + ' HAH' : this.$t('wallet.notVotes') },
                { title: this.$t('table.votes'), content: this.earningsInfo.amount ? this.earningsInfo.amount + ' HAH' : this.$t('wallet.notVotes') },
                { title: this.$t('wallet.earnings'), content: this.earningsInfo.income ? this.earningsInfo.income + ' HAH' : this.$t('wallet.notEarning') },
            ]
        },
        earningsInfo() {
            return this.$store.state.earningsInfo
        }
    },
    methods: {
        addressFilter, amountFormat,
        copyContent(content) {
            if (!content) return;

            // 检查 Clipboard API 是否支持
            if (!navigator.clipboard || !navigator.clipboard.writeText) {
                Toast(this.$t('toast.copyNotSupported')); // 显示不支持提示
                return;
            }

            // 调用 Clipboard API
            navigator.clipboard.writeText(content).then(() => {
                Toast(this.$t('toast.copySuccess'));
            }).catch(() => {
                Toast(this.$t('toast.copyFail')); // 处理复制失败
            });
        }
    }
}
</script>
<style>
.earning {}
</style>