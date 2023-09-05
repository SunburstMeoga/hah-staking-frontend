<template>
    <div v-if="loadStatus !== 'finished'">
        <div v-if="loadStatus !== 'error'"
            class="flex flex-col justify-center items-center pt-10 pb-10 text-lighticon dark:text-grayicon w-full h-full">
            <div>
                <div class="icon iconfont mb-2 text-4xl sm:text-6xl"
                    :class="loadStatus === 'loading' ? 'icon-loading2 animate-spin' : 'icon-wushuju'" />
            </div>
            <div>
                {{ loadStatus === 'loading' ? $t('loadStatus.loading') : $t('loadStatus.notData') }}
            </div>
        </div>
        <div v-else @click="reload"
            class="flex flex-col justify-center pt-10 pb-10 items-center text-lighticon dark:text-grayicon w-full h-full">
            <div>
                <div class="icon iconfont mb-2 text-4xl sm:text-6xl icon iconfont icon-error" />
            </div>
            <div>
                {{ $t('loadStatus.error') }}
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        loadStatus: {
            type: String,
            default: 'loading'
        },
    },
    methods: {
        reload() {
            this.$emit('reload')
        }
    }
}
</script>

<style></style>