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
                <div class="text-white mb-2">已投票數</div>
                <div class="text-#EAAE36 text-2xl font-light">{{ Math.floor($store.state.nodeDetails.votes) }}</div>
            </div>
            <div class="w-1/2 flex flex-col justify-start items-start ml-8">
                <div class="text-white mb-2 ">APY</div>
                <div class="text-#EAAE36 text-2xl font-light">{{ Number($store.state.nodeDetails.apy * 100).toFixed(4)
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
                <div class="">節點地址</div>
                <div class="">{{ addressFilter($store.state.nodeDetails.address) }}</div>
            </div>
            <div
                class="w-full flex justify-between items-center text-#A5A5A5 text-sm h-11 border-b border-dashed border-black">
                <div class="">已投票數</div>
                <div class="">{{ Math.floor($store.state.nodeDetails.votes) }}</div>
            </div>
            <div
                class="w-full flex justify-between items-center text-#A5A5A5 text-sm h-11 border-b border-dashed border-black">
                <div class="">收益</div>
                <div class="">0 HAH</div>
            </div>
            <div
                class="w-full flex justify-between items-center text-#A5A5A5 text-sm h-11 border-b border-dashed border-black">
                <div class="">節點排名</div>
                <div class="">1</div>
            </div>
            <div
                class="w-full flex justify-between items-center text-#A5A5A5 text-sm h-11 border-b border-dashed border-black">
                <div class="">百分比</div>
                <div class="">16.22323%</div>
            </div>
            <div
                class="w-full flex justify-between items-center text-#A5A5A5 text-sm h-11 border-b border-dashed border-black">
                <div class="">節點票數</div>
                <div class="">33</div>
            </div>
        </div>
    </div>
    <!-- <div class="px-2 py-2">
        <div>
            <div class="flex justify-between items-center font-bold py-1 text-lighttable  text-sm">
                <div class="text-lighttable">
                    {{ $t('details.name') }}
                </div>
                <div class="ml-2 text-clickable flex items-center">
                    <div>
                        {{ $store.state.nodeDetails.name }}
                    </div>
                    <div class="h-2 w-2 rounded-full ml-1"
                        :class="$store.state.nodeDetails.state === 1 ? 'bg-green-500 animate-pulse' : 'bg-red-600'" />
                </div>
            </div>
            <div class="flex justify-between items-center font-bold py-1 text-lighttable text-sm sm:flex-wrap">
                <div class="text-lighttable">
                    {{ $t('details.address') }}
                </div>
                <div class="ml-2 text-clickable flex items-center sm:ml-0">
                    <div class="icon iconfont icon-copy font-normal text-lg pr-2"
                        v-show="addressFilter($store.state.nodeDetails.address)"
                        @click="copyContent($store.state.nodeDetails.address)" />
                    <div class="sm:hidden">
                        {{ addressFilter($store.state.nodeDetails.address) }}
                    </div>
                    <div class="hidden sm:block">
                        {{ $store.state.nodeDetails.address }}
                    </div>
                </div>
            </div>
            <div class="flex justify-between items-center font-bold py-1 text-lighttable  text-sm">
                <div class="text-lighttable">
                    {{ $t('details.apy') }}
                </div>
                <div class="ml-2 text-clickable flex items-center">
                    <div>
                        {{ $store.state.nodeDetails.apy }}
                    </div>
                </div>
            </div>
            <div class="flex justify-between items-center font-bold py-1 text-lighttable  text-sm">
                <div class="text-lighttable">
                    {{ $t('table.votes') }}
                </div>
                <div class="ml-2 text-clickable flex items-center">
                    <div>
                        {{ $store.state.nodeDetails.votes }} HAH
                    </div>
                </div>
            </div>

            <div class="flex justify-between items-center font-bold py-1 text-lighttable  text-sm">
                <div class="text-lighttable">
                    {{ $t('details.time') }}
                </div>
                <div class="ml-2 text-clickable flex items-center">
                    <div>
                        {{ $store.state.nodeDetails.time }}
                    </div>
                </div>
            </div>
        </div>
    </div> -->
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
            if (!content) return
            navigator.clipboard.writeText(content).then(() => {
                Toast(this.$t('toast.copySuccess'))
            }, () => {
                // this.$message.error(this.$t('message.fail'));
            });
        },
    },
    computed: {
        detailsInfo() {
            return this.$store.state.nodeDetails
        }
    },
}
</script>

<style></style>