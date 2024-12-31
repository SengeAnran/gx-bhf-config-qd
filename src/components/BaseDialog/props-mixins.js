export default {
  props: {
    /**
     * @description 是否显示弹框
     * **/
    visible: {
      type: Boolean,
      default: false
    },

    /**
     * @description 弹框标题（使用插槽时忽略此项）
     * **/
    title: {
      type: String,
      default: ''
    },
    titleIcon: {
      type: String,
      default: ''
    },

    /**
     * @description 是否需要遮罩层
     * **/
    modal: {
      type: Boolean,
      default: true
    },

    /**
     * @description 遮罩层是否插入至 body 元素上，若为 false，则遮罩层会插入至 Dialog 的父元素上
     * **/
    modalAppendToBody: {
      type: Boolean,
      default: true
    },

    /**
     * @description 弹框自身是否插入至 body 元素上。嵌套的 弹框 必须指定该属性并赋值为 true
     * **/
    appendToBody: {
      type: Boolean,
      default: false
    },

    /**
     * @description 是否在弹框出现时将 body 滚动锁定
     * **/
    lockScroll: {
      type: Boolean,
      default: true
    },

    /**
     * @description 是否可以通过点击遮罩层关闭弹框
     * **/
    closeOnClickModal: {
      type: Boolean,
      default: true
    },

    /**
     * @description 是否可以通过按下 ESC 关闭弹框
     * **/
    closeOnPressEscape: {
      type: Boolean,
      default: true
    },

    /**
     * @description 是否显示关闭按钮
     * **/
    showClose: {
      type: Boolean,
      default: true
    },

    /**
     * @description 弹框的宽度
     * **/
    width: String,

    /**
     * @description 弹框的自定义类名
     * **/
    customClass: {
      type: String,
      default: ''
    },

    /**
     * @description 是否显示全屏按钮
     * **/
    showFull: {
      type: Boolean,
      default: true
    },

    /**
     * @description 弹框 CSS 中的 margin-top 值
     **/
    top: {
      type: String,
      default: '10vh'
    },

    /**
     * @description 关闭前的回调，会暂停弹框的关闭
     **/
    beforeClose: Function,

    /**
     * @description 是否对头部和底部采用居中布局
     **/
    center: {
      type: Boolean,
      default: false
    },

    /**
     * @description 关闭时销毁弹框中的元素
     **/
    destroyOnClose: Boolean,

  }
}
