<template>
    <div class="pb-12 bg-#1F1F1F">
        <div v-for="(item, index) in dataList" :key="index" class="relative">

            <div @click="handleAddress(item)"
                class="w-full bg-#282828 rounded-xl overflow-hidden flex flex-col justify-start items-center pt-4 mb-4 card-shadow ">

                <div class="flex justify-between items-center mb-6 w-9/12">
                    <!-- <div class="text-2xl font-light text-#A5A5A5">{{ item.name }}</div> -->
                    <div class="text-2xl font-light text-white">{{ item.name }}</div>
                    <div class="flex justify-end items-center -mr-6">
                        <div class="icon iconfont icon-Right text-lg text-#EAAE36 duration-200 transition transform ease-linear "
                            :class="`${item.showMore ? 'rotate-90' : 'rotate-0'}`" @click.stop="handleShowMore(index)">
                        </div>
                    </div>
                </div>
                <div class="flex justify-between items-center w-9/12 mb-6">
                    <div class="w-1/2 flex flex-col justify-start items-start">
                        <div class="text-white mb-2">已投票數</div>
                        <div class="text-#EAAE36 text-2xl font-light">{{ item.details ? votedCount : '0.0' }}</div>
                    </div>
                    <div class="w-1/2 flex flex-col justify-start items-start ml-8">
                        <div class="text-white mb-2 ">APY</div>
                        <div class="text-#EAAE36 text-2xl font-light">{{ Math.floor(item.apy * 100) }}%</div>
                    </div>
                </div>
                <div class="duration-200 transition-all transform ease-linear overflow-hidden flex flex-col justify-start items-center w-9/12"
                    :class="{
            'max-h-96 mb-5': item.showMore,
            'max-h-0': !item.showMore
        }">
                    <div class="w-full flex justify-between items-center text-#A5A5A5 text-sm h-11 border-b border-dashed border-black"
                        @click.stop="copyContent(item.address)">
                        <div class="">節點地址</div>
                        <div class="">{{ addressFilter(item.address) }}</div>
                    </div>
                    <div
                        class="w-full flex justify-between items-center text-#A5A5A5 text-sm h-11 border-b border-dashed border-black">
                        <div class="">已投票數</div>
                        <div class="">{{ item.details ? votedCount : '0.0' }}</div>
                    </div>
                    <div
                        class="w-full flex justify-between items-center text-#A5A5A5 text-sm h-11 border-b border-dashed border-black">
                        <div class="">收益</div>
                        <div class="">{{ item.details ? nodeReward : '0.0' }} HAH</div>
                    </div>
                    <div
                        class="w-full flex justify-between items-center text-#A5A5A5 text-sm h-11 border-b border-dashed border-black">
                        <div class="">節點排名</div>
                        <div class="">{{ item.rank }}</div>
                    </div>
                    <div
                        class="w-full flex justify-between items-center text-#A5A5A5 text-sm h-11 border-b border-dashed border-black">
                        <div class="">百分比</div>
                        <div class="">{{ Number(item.scale * 100).toFixed(4) }}%</div>
                    </div>
                    <div
                        class="w-full flex justify-between items-center text-#A5A5A5 text-sm h-11 border-b border-dashed border-black">
                        <div class="">節點票數</div>
                        <div class="">{{ item.details ? delegateVotes : '0.0' }}</div>
                    </div>
                </div>
                <div class="w-full bg-#303030 flex justify-center items-center text-#EAAE36 py-2">投 票</div>
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
        },
        //节点收益
        nodeReward() {
            return this.dataList.reduce((total, item) => {
                // 如果 details 不为空，累加 voteAmount
                if (item.details && item.details.length > 0) {
                    const detailsSum = item.details.reduce((sum, detail) => {
                        return sum + parseFloat(detail.revoterewardamount || 0);
                    }, 0);
                    return total + detailsSum;
                }
                // 如果 details 为空，直接返回当前总和
                return total;
            }, 0).toFixed(2);
        },
        //节点票数
        delegateVotes() {
            return this.dataList.reduce((total, item) => {
                // 如果 details 不为空，累加 voteAmount
                if (item.details && item.details.length > 0) {
                    const detailsSum = item.details.reduce((sum, detail) => {
                        return sum + parseFloat(detail.stopedrewardamount || 0);
                    }, 0);
                    return total + detailsSum;
                }
                // 如果 details 为空，直接返回当前总和
                return total;
            }, 0).toFixed(2);
        },
        //用户对该节点已投票数
        votedCount() {

            return this.dataList.reduce((total, item) => {
                // 如果 details 不为空，累加 voteAmount
                if (item.details && item.details.length > 0) {
                    const detailsSum = item.details.reduce((sum, detail) => {
                        return sum + parseFloat(detail.voteamount || 0);
                    }, 0);
                    return total + detailsSum;
                }
                // 如果 details 为空，直接返回当前总和
                return total;
            }, 0).toFixed(2); // 保留两位小数
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
            this.toDetails(item.address, item.rank, item.name)
        },
        toDetails(address, rank, name) {
            console.log(address, rank, name)
            if (!localStorage.getItem('connectStatus') || localStorage.getItem('connectStatus') === 'disconnect') {
                Toast(this.$t('toast.linkWallet'))
                return
            }
            this.$router.push({
                path: '/node/' + address,
                query: {
                    rank: rank,
                    name: name
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