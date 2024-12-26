<template>
    <div class="">
        <div v-for="(item, index) in dataList" :key="index">
            <div class="absolute left-0 top-0 w-6 h-6" v-if="item.status === 2">
                <img src="../assets/stop.png" alt="">
            </div>
            <div class="absolute left-0 top-0 w-6 h-6" v-if="item.status === 0">
                <img src="../assets/redem.png" alt="">
            </div>
            <div class="absolute left-0 top-0 w-6 h-6" v-if="item.status === 1">
                <img src="../assets/ing.png" alt="">
            </div>
            <div
                class="w-full bg-#282828 rounded-xl overflow-hidden flex flex-col justify-start items-center pt-4 mb-4">
                <div class="flex justify-between items-center mb-6 w-9/12">
                    <!-- <div class="text-2xl font-light text-#A5A5A5">{{ item.name }}</div> -->
                    <div class="text-2xl font-light text-white">{{ item.name }}</div>

                    <div class="flex justify-end items-center -mr-6">
                        <div class="rounded-lg py-1 px-2 text-xs text-black bg-#EAAE36 mr-4" v-if="item.status === 1"
                            @click="userRedeem(item)">
                            停止复投</div>
                        <div class="icon iconfont icon-Right text-lg text-#EAAE36  duration-200 transition transform ease-linear "
                            :class="`${item.showMore ? 'rotate-90' : 'rotate-0'}`" @click="handleShowMore(index)"></div>
                    </div>
                </div>
                <div class="flex justify-between items-center w-9/12 mb-6">
                    <div class="w-1/2 flex flex-col justify-start items-start">
                        <div class="text-white mb-2">已投票數</div>
                        <div class="text-#EAAE36 text-2xl font-light">{{ Number(item.voteamount).toFixed(2) }}</div>
                    </div>
                    <div class="w-1/2 flex flex-col justify-start items-start ml-8">
                        <div class="text-white mb-2 ">收益</div>
                        <div class="text-#EAAE36 text-2xl font-light">{{ (Number(item.stopedrewardamount) +
            Number(item.revoterewardamount)).toFixed(2)
                            }}
                        </div>
                    </div>
                </div>
                <div class="duration-200 transition-all transform ease-linear overflow-hidden flex flex-col justify-start items-center w-9/12"
                    :class="{
            'max-h-96 mb-5': item.showMore,
            'max-h-0': !item.showMore
        }">
                    <div
                        class="w-full flex justify-between items-center text-#A5A5A5 text-sm h-11 border-b border-dashed border-black">
                        <div class="">投票状态</div>
                        <div class="">{{ getStatusText(item.status) }}</div>
                    </div>
                    <div
                        class="w-full flex justify-between items-center text-#A5A5A5 text-sm h-11 border-b border-dashed border-black">
                        <div class="">已投票數量</div>
                        <div class="">{{ Number(item.voteamount).toFixed(2) }} HAH</div>
                    </div>
                    <div
                        class="w-full flex justify-between items-center text-#A5A5A5 text-sm h-11 border-b border-dashed border-black">
                        <div class="">已产生收益</div>
                        <div class="">{{ (Number(item.stopedrewardamount) + Number(item.revoterewardamount)).toFixed(2)
                            }} HAH</div>
                    </div>
                    <div
                        class="w-full flex justify-between items-center text-#A5A5A5 text-sm h-11 border-b border-dashed border-black">
                        <div class="">复投数量</div>
                        <div class="">{{ Number(item.revoterewardamount).toFixed(2) }}</div>
                    </div>
                    <div
                        class="w-full flex justify-between items-center text-#A5A5A5 text-sm h-11 border-b border-dashed border-black">
                        <div class="">投票时间</div>
                        <div class="">{{ timeFormat(item.votetime) }}</div>
                    </div>
                    <div
                        class="w-full flex justify-between items-center text-#A5A5A5 text-sm h-11 border-b border-dashed border-black">
                        <div class="">投票周期</div>
                        <div class="">{{ getPledgeTypeDescription(item.pledgetype) }}</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { Toast } from 'vant'
import { timeFormat, addressFilter, amountFormat } from '../utils/format';

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
        addressFilter, timeFormat,
        getStatusText(status) {
            switch (status) {
                case 0:
                    return "已贖回";
                case 1:
                    return "復投進行中";
                case 2:
                    return "停止復投中";
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
        getPledgeTypeDescription(pledgetype) {
            switch (pledgetype) {
                case 1:
                    return '壹年';
                case 2:
                    return '半年';
                case 3:
                    return '叄个月';
                case 4:
                    return '壹个月';
                case 5:
                    return '壹周';
                default:
                    return '未知类型'; // 当 `pledgetype` 不在规则中时的默认值
            }
        },
        userRedeem(item) {
            this.$emit('userRedeem', item)
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
    }
}
</script>

<style scoped>
.node-item {
    @apply flex justify-between items-center text-sm
}
</style>