<template>
    <div class="">
        <div class="border-b border-ligthborder px-2 sm:hidden">
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
                    <div class="text-clickable" @click="hanldAddress(item)">{{ addressFilter(item.address) }}</div>
                </div>
                <div class="node-item">
                    <div class="text-grayicon">{{ $t('table.apy') }}</div>
                    <div class="">{{ item.apy }}</div>
                </div>
                <div class="node-item">
                    <div class="text-grayicon">{{ $t('wallet.votedAmount') }}</div>
                    <div class="">{{ item.amount }}</div>
                </div>

                <div class="node-item">
                    <div class="text-grayicon">{{ $t('wallet.earnings') }}</div>
                    <div class="">{{ item.income }} HAH</div>
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
            <div class="border-b text-sm border-lightborder text-lighttable" v-for="(item, index) in dataList"
                :key="index">
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
                            <div @click="hanldAddress(item)" class="cursor-pointer ">{{ addressFilter(item.address) }}
                            </div>

                        </div>
                        <div class="w-80">
                            {{ Number(item.amount).toFixed(4) }}
                        </div>
                        <div class="w-80">
                            {{ item.rank }}
                        </div>
                        <div class="w-80">
                            {{ Number(item.income).toFixed(4) }}
                        </div>
                        <div class="w-80">
                            {{ item.apy }}
                        </div>
                    </div>
                </div>
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
            return [this.$t('table.name'), this.$t('table.address'), this.$t('wallet.votedAmount'), this.$t('table.nodeRank'), this.$t('wallet.earnings'), this.$t('table.apy')]
        }
    },
    methods: {
        addressFilter, amountFormat, timeFormat,
        hanldAddress(item) {
            this.toDetails(item.address, item.rank)
        },
        toDetails(address, rank) {
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
.node-item {
    @apply flex justify-between items-center text-sm
}
</style>