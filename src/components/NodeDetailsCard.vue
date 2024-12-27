<template>
    <div
        class="w-full bg-#282828 rounded-xl overflow-hidden flex flex-col  justify-start items-center pt-4 mb-4 card-shadow ">
        <div class="flex justify-between items-center mb-6 w-9/12">
            <!-- <div class="text-2xl font-light text-#A5A5A5"> {{ $store.state.nodeDetails.name }}</div> -->
            <div class="text-2xl font-light text-white"> {{ $store.state.nodeDetails.name }}</div>

            <div class="flex justify-end items-center -mr-6">
                <div class="icon iconfont icon-Right text-lg text-#EAAE36 duration-200 transition transform ease-linear "
                    :class="`${showMore ? 'rotate-90' : 'rotate-0'}`" @click="handleShowMore"></div>
            </div>
        </div>
        <div class="flex justify-between items-center w-9/12 mb-6">
            <div class="w-1/2 flex flex-col justify-start items-start">
                <div class="text-white mb-2">{{ $t('wallet.votedAmount') }}</div>
                <div class="text-#EAAE36 text-2xl font-light">{{ Number($store.state.nodeDetails.votes).toFixed(2) }}
                </div>
            </div>
            <div class="w-1/2 flex flex-col justify-start items-start ml-8">
                <div class="text-white mb-2 ">APY</div>
                <div class="text-#EAAE36 text-2xl font-light">{{ Number($store.state.nodeDetails.apy * 100).toFixed(2)
                    }}%</div>
            </div>
        </div>
        <div class="flex flex-col justify-start items-center w-9/12 duration-200 transition-all transform ease-linear overflow-hidden"
            :class="{
                'max-h-96 mb-5': showMore,
                'max-h-0': !showMore
            }">
            <div @click="copyContent($store.state.nodeDetails.address)"
                class="w-full flex justify-between items-center text-#A5A5A5 text-sm h-11 border-b border-dashed border-black">
                <div class="">{{ $t('table.address') }}</div>
                <div class="">{{ addressFilter($store.state.nodeDetails.address) }}</div>
            </div>
            <div
                class="w-full flex justify-between items-center text-#A5A5A5 text-sm h-11 border-b border-dashed border-black">
                <div class="">{{ $t('wallet.votedAmount') }}</div>
                <div class="">{{ Number($store.state.nodeDetails.votes).toFixed(2) }}</div>
            </div>
            <div
                class="w-full flex justify-between items-center text-#A5A5A5 text-sm h-11 border-b border-dashed border-black">
                <div class="">{{ $t('wallet.earnings') }}</div>
                <div class="">{{ Number($store.state.nodeDetails.income).toFixed(2) }} HAH</div>
            </div>
            <div
                class="w-full flex justify-between items-center text-#A5A5A5 text-sm h-11 border-b border-dashed border-black">
                <div class="">{{ $t('table.nodeRank') }}</div>
                <div class="">{{ $store.state.nodeDetails.rank }}</div>
            </div>
            <div
                class="w-full flex justify-between items-center text-#A5A5A5 text-sm h-11 border-b border-dashed border-black">
                <div class="">{{ $t('table.point') }}</div>
                <div class="">{{ Number($store.state.nodeDetails.apy * 100).toFixed(2)
                    }}%</div>
            </div>
            <div
                class="w-full flex justify-between items-center text-#A5A5A5 text-sm h-11 border-b border-dashed border-black">
                <div class="">{{ $t('newWord.votesCount') }}</div>
                <div class="">{{ Number($store.state.nodeDetails.votes).toFixed(2) }}</div>
            </div>
        </div>
    </div>
</template>

<script>
import { addressFilter } from '@/utils/format';
import { Toast } from 'vant'

export default {
    data() {
        return {
            showMore: false
        }
    },
    methods: {
        addressFilter,
        handleShowMore() {
            this.showMore = !this.showMore
        },
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
    },
    computed: {
        detailsInfo() {
            return this.$store.state.nodeDetails
        }
    },
}
</script>

<style></style>