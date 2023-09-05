<template>
    <div>
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
                    <!-- <div class="text-clickable">{{ addressFilter(item.vote_addr) }}</div> -->
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
    </div>
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