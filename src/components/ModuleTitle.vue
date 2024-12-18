<template>
    <div class="flex justify-start items-baseline w-full">
        <div class="text-2xl text-#EAAE36 font-light">
            {{ title }}
        </div>
        <!-- <div class="pl-2 text-sm text-lightmoreword">
            {{ count }}
        </div> -->
    </div>
</template>

<script>
export default {
    props: {
        title: {
            type: String,
            default: ''
        },
        count: {
            type: String,
            default: ''
        }
    }
}
</script>

<style></style>