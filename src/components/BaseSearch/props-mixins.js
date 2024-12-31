export default {
  props: {
    /**
     * @type {string}
     * @description 关键字字段
     * **/
    keywordProp: {
      type: String,
      default: "keyWord"
    },
    /**
     * @type {string}
     * @description 关键字占位符
     * **/
    keywordPlaceholder: {
      type: String,
      default: "请输入关键字"
    },
    /**
     * @type {boolean}
     * @description 是否展示  重置按钮
     * **/
    showReset: {
      type: Boolean,
      default: false
    },
    /**
     * @type {object}
     * @description 搜索表单
     * **/
    formData: {
      type: Object,
      default: () => ({
        [this.keywordProp]: ""
      })
    }
  }
};
