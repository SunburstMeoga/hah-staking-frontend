<template>
  <van-popup
    v-model="visible"
    class="chain-popup-overlay"
    :overlay-style="overlayStyle"
    :close-on-click-overlay="closeOnClickOverlay"
    @click-overlay="handleOverlayClick"
  >
    <div class="w-full flex justify-center items-center bg-transparent min-h-screen">
      <div class="w-11/12 text-white flex flex-col justify-start items-center bg-black border border-#E6E6E620 rounded-2xl backdrop-blur-xl bg-opacity-50 relative">
        <!-- 顶部进度条 -->
        <div class="w-10/12 flex justify-start items-center pt-4">
          <div class="w-1/3 bg-#EAAE36 h-1 rounded-full"></div>
        </div>

        <!-- 关闭按钮 -->
        <div class="w-11/12 flex justify-end pt-4 mb-5" @click="handleClose">
          <div class="icon iconfont icon-close text-sm cursor-pointer hover:text-#EAAE36 transition-colors"></div>
        </div>

        <!-- 主要内容 -->
        <div class="w-10/12 mb-5 text-center">
          <span v-html="formattedMessage"></span>
        </div>

        <!-- 按钮组 -->
        <div class="w-8/12 flex justify-between items-center text-#EAAE36 mb-6">
          <div
            class="flex w-24 h-7 justify-center items-center border border-#EAAE361E rounded-lg text-sm bg-black cursor-pointer hover:bg-#EAAE361E transition-colors"
            @click="handleCancel"
          >
            {{ cancelText }}
          </div>
          <div
            class="flex w-24 h-7 justify-center items-center border text-black bg-#EAAE36 rounded-lg text-sm border-black cursor-pointer hover:bg-#EAAE36CC transition-colors"
            @click="handleConfirm"
            :class="{ 'opacity-50 cursor-not-allowed': loading }"
            :disabled="loading"
          >
            <span v-if="!loading">{{ confirmText }}</span>
            <div v-else class="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
          </div>
        </div>
      </div>
    </div>
  </van-popup>
</template>

<script>
import { Popup } from 'vant'

export default {
  name: 'ChainPopup',
  components: { [Popup.name]: Popup },
  props: {
    // 控制弹窗显示
    show: {
      type: Boolean,
      default: false
    },
    // 弹窗标题/主要消息
    message: {
      type: String,
      default: ''
    },
    // 目标链名称
    targetChain: {
      type: String,
      default: 'Hash Ahead Mainnet'
    },
    // 取消按钮文本
    cancelText: {
      type: String,
      default: '取 消'
    },
    // 确认按钮文本
    confirmText: {
      type: String,
      default: '確 定'
    },
    // 是否显示加载状态
    loading: {
      type: Boolean,
      default: false
    },
    // 是否允许点击遮罩关闭
    closeOnClickOverlay: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    visible: {
      get() {
        return this.show
      },
      set(value) {
        this.$emit('update:show', value)
      }
    },
    // 格式化消息，高亮目标链名称
    formattedMessage() {
      if (this.message.includes('{targetChain}')) {
        return this.message.replace(
          '{targetChain}',
          `<span class="text-#EAAE36 font-bold">"${this.targetChain}"</span>`
        )
      }
      return this.message
    },
    // 毛玻璃遮罩样式
    overlayStyle() {
      return {
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)'
      }
    }
  },
  methods: {
    handleClose() {
      this.$emit('close')
      this.visible = false
    },
    handleCancel() {
      this.$emit('cancel')
      this.visible = false
    },
    handleConfirm() {
      if (!this.loading) {
        this.$emit('confirm')
      }
    },
    handleOverlayClick() {
      if (this.closeOnClickOverlay) {
        this.handleClose()
      }
    }
  }
}
</script>

<style scoped>
.chain-popup-overlay {
  background: transparent;
}

/* 确保弹窗内容居中 */
.chain-popup-overlay >>> .van-popup {
  background: transparent;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* 加载动画 */
@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.animate-spin {
  animation: spin 1s linear infinite;
}

/* 悬停效果 */
.cursor-pointer:hover {
  transform: translateY(-1px);
}

/* 响应式设计 */
@media (max-width: 640px) {
  .w-11\/12 {
    width: 95%;
  }

  .w-8\/12 {
    width: 85%;
  }
}
</style>