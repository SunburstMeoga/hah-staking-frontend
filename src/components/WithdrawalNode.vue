<template>
    <div class="pb-10">
        <div v-for="(item, index) in dataList" :key="index">
            <!-- <div class="absolute left-0 top-0 w-6 h-6" v-if="item.details.vote[0].status === 1">
                <img src="../assets/stop.png" alt="">
            </div>
            <div class="absolute left-0 top-0 w-6 h-6" v-if="item.details.vote[0].status === 2">
                <img src="../assets/redem.png" alt="">
            </div>
            <div class="absolute left-0 top-0 w-6 h-6" v-if="item.details.vote[0].status === 0">
                <img src="../assets/ing.png" alt="">
            </div> -->
            <div
                class="w-full bg-#282828 rounded-xl overflow-hidden flex flex-col justify-start items-center pt-4 mb-4">
                <div class="flex justify-between items-center mb-6 w-9/12">
                    <!-- <div class="text-2xl font-light text-#A5A5A5">{{ item.name }}</div> -->
                    <div class="text-2xl font-light text-white">{{ item.name }}</div>

                    <div class="flex justify-end items-center -mr-6">
                        <div class="rounded-lg py-1 px-2 text-xs text-black bg-#EAAE36 mr-4" @click="userRedeem(item)">
                            停止复投</div>
                        <div class="icon iconfont icon-Right text-lg text-#EAAE36" @click="handleShowMore(index)"></div>
                    </div>
                </div>
                <div class="flex justify-between items-center w-9/12 mb-6">
                    <div class="w-1/2 flex flex-col justify-start items-start">
                        <div class="text-white mb-2">已投票數</div>
                        <div class="text-#EAAE36 text-2xl font-light">{{ Number(item.amount).toFixed(4) }}</div>
                    </div>
                    <div class="w-1/2 flex flex-col justify-start items-start ml-8">
                        <div class="text-white mb-2 ">收益</div>
                        <div class="text-#EAAE36 text-2xl font-light">{{ Number(item.income).toFixed(4) }}</div>
                    </div>
                </div>
                <div class="flex flex-col justify-start items-center w-9/12 mb-5" v-show="item.showMore">
                    <div
                        class="w-full flex justify-between items-center text-#A5A5A5 text-sm h-11 border-b border-dashed border-black">
                        <div class="">投票状态</div>
                        <div class="">{{ getStatusText(item.status) }}</div>
                    </div>
                    <div
                        class="w-full flex justify-between items-center text-#A5A5A5 text-sm h-11 border-b border-dashed border-black">
                        <div class="">已投票數量</div>
                        <div class="">23</div>
                    </div>
                    <div
                        class="w-full flex justify-between items-center text-#A5A5A5 text-sm h-11 border-b border-dashed border-black">
                        <div class="">已产生收益</div>
                        <div class="">{{ Number(item.income).toFixed(4) }} HAH</div>
                    </div>
                    <div
                        class="w-full flex justify-between items-center text-#A5A5A5 text-sm h-11 border-b border-dashed border-black">
                        <div class="">复投数量</div>
                        <div class="">23234</div>
                    </div>
                    <div
                        class="w-full flex justify-between items-center text-#A5A5A5 text-sm h-11 border-b border-dashed border-black">
                        <div class="">投票时间</div>
                        <div class="">2024-12-10 20:09:10</div>
                    </div>
                    <div
                        class="w-full flex justify-between items-center text-#A5A5A5 text-sm h-11 border-b border-dashed border-black">
                        <div class="">投票周期</div>
                        <div class="">壹周</div>
                    </div>
                </div>
                <!-- <div class="w-full bg-#303030 flex justify-center items-center text-white py-2">领 取</div> -->
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
    <!-- <div>
        <div class="px-3 sm:hidden">
            <div v-for="(item, index) in dataList" :key="index" class="py-2 border-b border-lightborder">
                <div class="node-item">
                    <div class="text-grayicon">{{ $t('details.voteBtn') }}{{ $t('details.amount') }}</div>
                    <div class="">{{ Number(item.amount).toFixed(4) }} HAH</div>
                </div>
                <div class="node-item">
                    <div class="text-grayicon">{{ $t('wallet.earnings') }}</div>
                    <div class="">{{ Number(item.income).toFixed(4) }} HAH</div>
                </div>
                <div class="node-item">
                    <div class="text-grayicon">{{ $t('details.voteHeight') }}</div>
                    <div class="">{{ item.height }}</div>
                </div>

                <div class="node-item">
                    <div class="text-grayicon">{{ $t('details.voteType') }}</div>
                    <div class="">{{ getPledgeType(item.pledge_type) }}</div>
                </div>
                <div class="node-item">
                    <div class="text-grayicon">{{ $t('details.voteCycle') }}</div>
                    <div class="">{{ item.cycles }}</div>
                </div>

                <div class="node-item">
                    <div class="text-grayicon">{{ $t('details.voteNonce') }}</div>
                    <div class="">{{ item.nonce }} </div>
                </div>
                <div class="node-item">
                    <div class="text-grayicon">{{ $t('details.unLockHeight') }}</div>
                    <div class="">{{ item.unlock_height }}</div>
                </div>
                <div class="node-item">
                    <div class="text-grayicon">{{ $t('details.voteAddress') }}</div>
                    <div class="flex justify-start items-center text-clickable">
                        <div class="cursor-pointer icon iconfont icon-copy  pr-2" @click="copyContent(item.vote_addr)" />{{
                            addressFilter(item.vote_addr) }}

                    </div>
                </div>
                <div class="flex justify-end items-center mt-2">
                    <div class="bg-clickable rounded text-white py-1 px-4 text-sm" @click="userRedeem(item)">
                        {{ $t('details.pledgeReqRedeem') }}
                    </div>
                </div>
            </div>
        </div>
        <div class="hidden sm:block">
            <div class="flex w-full justify-start py-4 px-4 border-b border-lightborder">
                <div class="w-80 text-sm font-black text-lighttable" :class="index === 6 ? 'w-96' : ''"
                    v-for="(item, index) in tableTitleList" :key="index">
                    {{ item }}
                </div>
            </div>
            <div class="border-b text-sm border-lightborder text-lighttable" v-for="(item, index) in dataList" :key="index">
                <div class="transition duration-200 ease-in-out transform hover:bg-lightborder">
                    <div class="flex justify-start py-3 px-4">
                        <div class="w-80 flex items-center">
                            {{ Number(item.amount).toFixed(4) }}
                        </div>
                        <div class="w-80 flex items-center">
                            {{ Number(item.income).toFixed(4) }}
                        </div>
                        <div class="w-80 flex items-center">
                            {{ item.height }}
                        </div>

                        <div class="w-80 flex items-center">
                            {{ getPledgeType(item.pledge_type) }}
                        </div>
                        <div class="w-80 flex items-center">
                            {{ item.cycles }}
                        </div>
                        <div class="w-80 flex items-center">
                            {{ item.nonce }}
                        </div>
                        <div class="w-80 flex items-center">
                            {{ item.unlock_height }}
                        </div>
                        <div class="w-96 flex justify-start items-center text-clickable">
                            <div class="cursor-pointer icon iconfont icon-copy text-clickable pr-2"
                                @click="copyContent(item.vote_addr)" />
                            <div class="cursor-pointer ">{{ addressFilter(item.vote_addr) }}</div>

                        </div>
                        <div class="w-80 flex items-center justify-start">
                            <div class="bg-clickable rounded text-white py-1 px-4 text-sm cursor-pointer"
                                @click="userRedeem(item)">
                                {{ $t('details.pledgeReqRedeem') }}
                            </div>

                        </div>
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
    props: {
        dataList: {
            type: Array,
            default: () => []
        }
    },
    data() {
        return {

        }
    },
    computed: {
        tableTitleList() {
            return [this.$t('details.voteBtn') + this.$t('details.amount'), this.$t('wallet.earnings'), this.$t('details.voteHeight'), this.$t('details.voteType'), this.$t('details.voteCycle'), this.$t('details.voteNonce'), this.$t('details.unLockHeight'), this.$t('details.voteAddress'), this.$t('details.operating'),]
        },

    },
    methods: {
        addressFilter,
        getStatusText(status) {
            switch (status) {
                case 0:
                    return "正在进行";
                case 1:
                    return "已停止复投";
                case 2:
                    return "已贖回";
                default:
                    return "未知状态"; // 如果 status 不是 0, 1, 或 2，则返回 "未知状态"
            }
        },

        handleShowMore(index) { //点击查看更多
            this.$set(this.dataList, index, {
                ...this.dataList[index],
                showMore: !this.dataList[index].showMore
            });
        },
        getPledgeType(type) {
            switch (type) {
                case 1: return this.$t('details.oneYear')
                    break
                case 2: return this.$t('details.half')
                    break
                case 3: return this.$t('details.trimester')
                    break
                case 4: return this.$t('details.oneMonth')
                    break
                case 5: return this.$t('details.oneWeek')
                    break
            }
        },
        userRedeem(item) {
            this.$emit('userRedeem', item)
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

<style scoped>
.node-item {
    @apply flex justify-between items-center text-sm
}
</style>