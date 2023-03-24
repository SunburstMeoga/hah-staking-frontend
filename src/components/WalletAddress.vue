<template>
    <div class="w-full">
        <div class="text-primary text-sm mb-1 sm:text-bold sm:text-2xl"> {{ $t('home.walletAddress') }}</div>
        <div
            class="bg-black rounded-md py-2 px-2 ml-auto mr-auto mb-4 sm:py-5 sm:px-4 sm:flex sm:justify-between sm:items-center">
            <div class="text-primary text-base font-semibold break-all mb-2 sm:mb-0 sm:text-xl">
                {{ $store.state.walletAddress }}
            </div>
            <div class="w-5/12 ml-auto mr-auto bg-second rounded-full text-white flex justify-center items-center py-1 text-sm sm:text-lg sm:w-1/12 sm:ml-0 sm:mr-0"
                @click="copyAddress">
                {{ $t('home.copyBtn') }}
            </div>
        </div>
    </div>
</template>

<script>
import { Toast } from 'vant';
export default {
    components: { Toast },
    methods: {
        copyAddress() {
            navigator.clipboard.writeText(this.$store.state.walletAddress).then(() => {
                Toast.success(this.$t('toast.copySuccess'))
            }, () => {
                Toast.fail(this.$t('toast.copyFail'))

            });
        }
    }
}
</script>

<style></style>