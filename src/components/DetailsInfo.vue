<template>
    <div class="">
        <div class="w-full flex flex-col justify-start items-center ">
            <div class="w-11/12 flex flex-col justify-start items-start">
                <div class="w-full flex justify-between items-center text-base my-4">
                    <div class="text-#00FFEA">錢包地址：{{ addressFilter($store.state.walletInfo.address) || '-' }}</div>
                    <div class="icon iconfont icon-fuzhi text-white text-lg"
                        @click="copyContent($store.state.walletInfo.address)"></div>
                </div>
                <div class="w-full flex justify-between items-center pb-2 mb-2">
                    <div class="flex flex-col justify-start items-start w-1/2">
                        <div class="text-#FFFFFF73 mb-1 text-xs">該節點投票量</div>
                        <div class="flex justify-start items-baseline">
                            <div class="text-#EAAE36 text-4xl font-bold">{{ Number(votes).toFixed(2) }}</div>
                            <div class="text-#846934 ml-1 text-sm" v-if="!Math.floor(votes)">暫無投票</div>
                        </div>
                    </div>
                    <div class="border-l border-#00000061 h-10 w-1"></div>
                    <div class="flex flex-col justify-start items-start w-1/2 pl-6">
                        <div class="text-#FFFFFF73 mb-1 text-xs">收益</div>
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
            if (!content) return
            navigator.clipboard.writeText(content).then(() => {
                Toast(this.$t('toast.copySuccess'))
            }, () => {
                // this.$message.error(this.$t('message.fail'));
            });
        },
    }
}
</script>
<style>
.earning {}
</style>