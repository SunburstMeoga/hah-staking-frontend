<template>
    <div class="pb-10">
        <div v-for="(item, index) in dataList" :key="index" class="relative">

            <div @click="handleAddress(item)"
                class="w-full bg-#282828 rounded-xl overflow-hidden flex flex-col justify-start items-center pt-4 mb-4">

                <div class="flex justify-between items-center mb-6 w-9/12">
                    <div class="text-2xl font-light text-#A5A5A5">{{ item.name }}</div>
                    <div class="flex justify-end items-center -mr-6">
                        <div class="icon iconfont icon-Right text-lg text-#EAAE36" @click.stop="handleShowMore(index)">
                        </div>
                    </div>
                </div>
                <div class="flex justify-between items-center w-9/12 mb-6">
                    <div class="w-1/2 flex flex-col justify-start items-start">
                        <div class="text-white mb-2">已投票数</div>
                        <div class="text-#EAAE36 text-2xl font-light">{{ Math.floor(item.votes) }}</div>
                    </div>
                    <div class="w-1/2 flex flex-col justify-start items-start ml-8">
                        <div class="text-white mb-2 ">APY</div>
                        <div class="text-#EAAE36 text-2xl font-light">{{ Math.floor(item.apy * 100) }}%</div>
                    </div>
                </div>
                <div class="flex flex-col justify-start items-center w-9/12 mb-5" v-show="item.showMore">
                    <div class="w-full flex justify-between items-center text-#A5A5A5 text-sm h-11 border-b border-dashed border-black"
                        @click.stop="copyContent(item.address)">
                        <div class="">节点地址</div>
                        <div class="">{{ addressFilter(item.address) }}</div>
                    </div>
                    <div
                        class="w-full flex justify-between items-center text-#A5A5A5 text-sm h-11 border-b border-dashed border-black">
                        <div class="">已投票数</div>
                        <div class="">{{ Number(item.votes).toFixed(0) }}</div>
                    </div>
                    <div
                        class="w-full flex justify-between items-center text-#A5A5A5 text-sm h-11 border-b border-dashed border-black">
                        <div class="">收益</div>
                        <div class="">{{ Math.floor(item.income) }} HAH</div>
                    </div>
                    <div
                        class="w-full flex justify-between items-center text-#A5A5A5 text-sm h-11 border-b border-dashed border-black">
                        <div class="">节点排名</div>
                        <div class="">{{ item.rank }}</div>
                    </div>
                    <div
                        class="w-full flex justify-between items-center text-#A5A5A5 text-sm h-11 border-b border-dashed border-black">
                        <div class="">百分比</div>
                        <div class="">{{ Number(item.scale * 100).toFixed(4) }}%</div>
                    </div>
                    <div
                        class="w-full flex justify-between items-center text-#A5A5A5 text-sm h-11 border-b border-dashed border-black">
                        <div class="">节点票数</div>
                        <div class="">{{ Number(item.votes).toFixed(0) }}</div>
                    </div>
                </div>
                <div class="w-full bg-#303030 flex justify-center items-center text-#EAAE36 py-2">投 票</div>
                <!-- <div class="border-b border-ligthborder px-2 sm:hidden">
                    <div v-for="(item, index) in dataList" :key="index" class="py-2 border-b border-lightborder">
                        <div class="node-item">
                            <div class="text-grayicon">{{ $t('table.name') }}</div>
                            <div class="flex justify-start items-center">
                                <div class="cursor-pointer icon iconfont icon-copy text-clickable pr-2"
                                    @click="copyContent(item.address)" />{{ item.name }}
                                <div class="h-2 w-2 rounded-full ml-1"
                                    :class="item.state === 1 ? 'bg-green-500 animate-pulse' : 'bg-red-600'" />
                            </div>
                        </div>
                        <div class="node-item">
                            <div class="text-grayicon">{{ $t('table.address') }}</div>
                            <div class="text-clickable" @click="handleAddress(item)">{{ addressFilter(item.address) }}</div>
                        </div>
                        <div class="node-item">
                            <div class="text-grayicon">{{ $t('table.apy') }}</div>
                            <div class="">{{ item.apy }}</div>
                        </div>
        
                        <div class="node-item">
                            <div class="text-grayicon">{{ $t('table.votes') }}</div>
                            <div class="">{{ Number(item.votes).toFixed(4) }}</div>
                        </div>
                        <div class="node-item">
                            <div class="text-grayicon">{{ $t('table.nodeRank') }}</div>
                            <div class="">{{ item.rank }}</div>
                        </div>
        
                        <div class="node-item">
                            <div class="text-grayicon">{{ $t('table.point') }}</div>
                            <div class="">{{ item.scale }} %</div>
                        </div>
                        <div class="node-item">
                            <div class="text-grayicon">{{ $t('details.time') }}</div>
                            <div class="">{{ timeFormat(item.uptime) }}</div>
                        </div>
                    </div>
                </div>
                <div class="hidden sm:block">
                    <div class="flex w-full justify-start py-4 px-4 border-b border-lightborder">
                        <div class="w-80 text-sm font-black text-lighttable" :class="index === 1 ? 'w-96' : ''"
                            v-for="(item, index) in tableTitleList" :key="index">
                            {{ item }}
                        </div>
                    </div>
                    <div class="border-b text-sm border-lightborder text-lighttable" v-for="(item, index) in dataList" :key="index">
                        <div class="transition duration-200 ease-in-out transform hover:bg-lightborder">
                            <div class="flex justify-start py-3 px-4">
                                <div class="w-80 flex items-center">
                                    <div class="h-2 w-2 rounded-full mr-1"
                                        :class="item.state === 1 ? 'bg-green-500 animate-pulse' : 'bg-red-600'" />
                                    <div>
                                        {{ item.name }}
                                    </div>
                                </div>
                                <div class="w-96 flex justify-start items-center text-clickable">
                                    <div class="cursor-pointer icon iconfont icon-copy text-clickable pr-2"
                                        @click="copyContent(item.address)" />
                                    <div @click="handleAddress(item)" class="cursor-pointer ">{{ addressFilter(item.address) }}</div>
        
                                </div>
                                <div class="w-80">
                                    {{ Number(item.votes).toFixed(4) }}
                                </div>
                                <div class="w-80">
                                    {{ item.rank }}
                                </div>
                                <div class="w-80">
                                    {{ item.scale }}%
                                </div>
                                <div class="w-80">
                                    {{ timeFormat(item.uptime) }}
                                </div>
                            </div>
                        </div>
                    </div>
                </div> -->
            </div>
        </div>
    </div>

</template>

<script>
import { addressFilter, amountFormat, timeFormat } from '@/utils/format';
import { Toast } from 'vant'

export default {
    props: {
        dataList: {
            type: Array,
            default: () => []
        }
    },
    computed: {
        tableTitleList() {
            return [this.$t('table.name'), this.$t('table.address'), this.$t('table.votes'), this.$t('table.nodeRank'), this.$t('table.point'), this.$t('details.time'),]
        }
    },
    methods: {
        addressFilter, amountFormat, timeFormat,
        handleShowMore(index) { //点击查看更多
            this.$set(this.dataList, index, {
                ...this.dataList[index],
                showMore: !this.dataList[index].showMore
            });
        },
        handleAddress(item) {
            console.log(item)
            this.toDetails(item.address, item.rank)
        },
        toDetails(address, rank) {
            console.log(address, rank)
            if (!localStorage.getItem('connectStatus') || localStorage.getItem('connectStatus') === 'disconnect') {
                Toast(this.$t('toast.linkWallet'))
                return
            }
            this.$router.push({
                path: '/node/' + address,
                query: {
                    rank: rank
                }
            })
        },
        copyContent(content) {
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
.node-item {
    @apply flex justify-between items-center text-sm
}
</style>