<template>
    <div class="bg-black rounded-md w-full ml-auto mr-auto py-2 px-2 sm:py-5 sm:px-4">
        <div class="flex justify-between items-center">
            <div class="w-11/12">
                <div class="w-full text-primary font-semibold">
                    <div class="w-full truncate mb-1 sm:text-xl">
                        {{ nodeAddress }}
                    </div>
                    <!-- <div
                        class="w-full flex justify-between font-extrabold text-xs mb-2 sm:justify-start sm:text-lg sm:font-normal">
                        <div>复利：<span class="text-second">{{ rewardMode }} HAH</span></div>
                        <div class="sm:ml-8">普通：<span class="text-second">{{ ordinary }} HAH</span></div>
                    </div> -->
                </div>
                <div class="flex justify-start items-center text-second sm:font-semibold">
                    <div class="text-base sm:text-lg">总金额： </div>
                    <div class="text-xl font-bold text-second truncate sm:text-2xl">{{ voteTotal }} HAH</div>
                </div>
            </div>
            <div class="text-primary text-sm pl-3 icon iconfont icon-mallright sm:text-xl" />
        </div>

    </div>
</template>

<script>
export default {
    props: {
        nodeAddress: {
            type: String,
            default: '-'
        },
        voteTotal: {
            type: String,
            default: '0.0000'
        },
        rewardMode: {
            type: String,
            default: '-'
        },
        ordinary: {
            type: String,
            default: '-'
        }
    },
}
</script>

<style></style>