<template>
  <van-popup v-model="showPopup" class="w-full">
    <div class="w-11/12 h-8 bg-primary py-0 px-0">
      sfsdfsdfsadf
    </div>
  </van-popup>
</template>

<script>
import { Popup } from 'vant'

export default {
  components: { [Popup.name]: Popup },
  props: {
    showPopup: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style></style>