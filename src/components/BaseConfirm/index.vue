<template>
  <BaseDialog
    :title="options.title"
    :close-on-click-modal="false"
    :visible.sync="isShow"
    :width="options.width"
    :show-full="false"
    custom-class="base-confirm"
  >
    <div class="base-confirm-body">
      <slot name="body">
        <BaseIcon class-name="icon" :icon="options.icon"/>
        <span class="tip-text" v-html="options.message">{{ options.message }}</span>
      </slot>
    </div>
    <div slot="footer" class="dialog-footer">
      <BaseButton v-if="options.yesBtn" code="sure" :content="options.yesBtn" @click="sure"/>
      <BaseButton v-if="options.noBtn" code="cancel" :content="options.noBtn" @click="cancel"/>
    </div>
  </BaseDialog>
</template>

<script>
/** png **/
import AskPng from "@/assets/base/ask.png";
export default {
  name: "BaseConfirm",
  data() {
    return {
      isShow: false,
      /*
       * width：(String)弹框宽度
       * title：(String)弹框标题
       * icon：(String)弹框图标
       * message：(String)弹框提示文字为必传，其他参数有默认值
       * yesBtn：(String)确认按钮文字
       * noBtn：(String)取消按钮文字
       * */
      options: {
        width: "420px",
        title: "提示",
        icon: AskPng,
        message: "是否删除？",
        yesBtn: "是",
        noBtn: "否"
      }
    };
  },
  methods: {
    init() {
      this.isShow = true;
    },
    sure() {
      this.isShow = false;
    },
    cancel() {
      this.isShow = false;
    }
  }
};
</script>
<style lang="scss" scoped>
.base-confirm {
  &-body {
    height: 115px;
    display: flex;
    justify-content: center;
    align-items: center;
    .icon {
      width: 50px;
      height: 50px;
      margin-right: 22px;
    }
    i {
      font-size: 30px;
      margin-right: 10px;
    }
  }
}
</style>
<style lang="scss">
.base-confirm {
  .el-dialog {
    &__body {
      padding: 0;
      font-size: 16px;
      // color: #ffffff;
    }
  }
}
</style>

