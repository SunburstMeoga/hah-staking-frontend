<template>
    <div>
        <div class="flex justify-start items-baseline">
            <div class="font-black">
                {{ title }}
            </div>
            <div class="pl-2 text-sm text-lightmoreword">
                {{ count }}
            </div>
        </div>
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