<template>
    <div>
        <div class="px-2 py-1">
            <div class="sm:flex sm:items-start justify-between items-center">
                <div class="border-b pb-2 mb-2 border-ligthborder sm:border-none sm:mb-0 sm:flex-1 sm:mr-20">
                    <div class="flex sm:flex-wrap justify-between items-center font-bold py-1 text-lighttable text-sm"
                        v-for="(item, index) in walletInfoList" :key="index">
                        <div class="text-lighttable">
                            {{ item.title }}
                        </div>
                        <div class="text-clickable flex items-center sm:justify-start" :class="index !== 0 ? 'ml-2' : ''">
                            <div v-show="index === 0 && item.content" class="mr-2">
                                <div class="icon iconfont icon-copy font-normal text-lg" @click="copyContent(item.copy)" />
                            </div>
                            <div v-if="index !== 0">
                                {{ item.content }}
                            </div>
                            <div v-else class="">
                                <div class="hidden sm:block">
                                    {{ item.content }}
                                </div>
                                <div class="sm:hidden">
                                    {{ addressFilter(item.content) }}
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
                <div class="sm:w-7/12">
                    <div class="flex justify-around items-center text-grayicon">
                        <!-- <div
                            class="flex flex-col justify-center items-center sm:border sm:border-ligthborder sm:rounded-lg sm:h-32 sm:w-3/12 transition duration-300 ease-in-out transform hover:-translate-y-0.5 hover:scale-110 cursor-pointer">
                            <div class="font-bold sm:mb-2">
                                {{ $t('wallet.ordinaryEarnings') }}
                            </div>
                            <div class="text-lighttable sm:pl-4">
                                {{ earningsInfo.ordinaryEarnings || $t('wallet.notEarning') }}
                            </div>
                        </div>
                        <div class="h-8 border-l border-ligthborder sm:hidden" /> -->
                        <div
                            class="flex flex-col justify-center items-center sm:border sm:border-ligthborder sm:rounded-lg sm:h-32 sm:w-3/12 transition duration-300 ease-in-out transform hover:-translate-y-0.5 hover:scale-110 cursor-pointer">
                            <div class="font-bold sm:mb-2">
                                {{ $t('wallet.totalRevenue') }}
                            </div>
                            <div class="text-lighttable">
                                {{ earningsInfo.totalEarnings || $t('wallet.notEarning') }}
                            </div>
                        </div>
                        <!-- <div class="h-8 border-l border-ligthborder sm:hidden" />
                        <div
                            class="flex flex-col justify-center items-center sm:border sm:border-ligthborder sm:rounded-lg sm:h-32 sm:w-3/12 transition duration-300 ease-in-out transform hover:-translate-y-0.5 hover:scale-110 cursor-pointer">
                            <div class="font-bold sm:mb-2">
                                {{ $t('wallet.indexReturns') }}
                            </div>
                            <div class="text-lighttable">
                                {{ earningsInfo.indexReturns || $t('wallet.notEarning') }}
                            </div>
                        </div> -->
                    </div>
                    <div class="hidden sm:block w-11/12 mr-auto ml-auto text-red-600 text-xs mb-2 mt-4">
                        {{ $t('tips.amount') }}
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
    data() {
        return {

        }
    },
    computed: {
        walletInfoList() {
            return [
                { title: this.$t('wallet.address'), copy: this.$store.state.walletInfo.address, content: this.$store.state.walletInfo.address || '-' },
                { title: this.$t('wallet.balance'), content: this.amountFormat(this.$store.state.walletInfo.balance) + ' HAH' || '00000000' },
                // { title: this.$t('wallet.ordinaryVote'), content: this.earningsInfo.ordinaryVote ? this.earningsInfo.ordinaryVote + ' HAH' : this.$t('wallet.notVotes') },
                // { title: this.$t('wallet.returnsVote'), content: this.earningsInfo.returnsVote ? this.earningsInfo.returnsVote + ' HAH' : this.$t('wallet.notVotes') },
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