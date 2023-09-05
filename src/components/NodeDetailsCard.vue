<template>
    <div class="px-2 py-2">
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
    </div>
</template>

<script>
import { addressFilter } from '@/utils/format';
import { Toast } from 'vant'

export default {
    methods: {
        addressFilter,

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