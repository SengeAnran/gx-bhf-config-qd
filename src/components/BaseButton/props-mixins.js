export default {
  props: {
    code: {
      type: String,
      default: "info"
    },
    content: {
      type: String,
      default: ""
    },
    size: {
      type: String,
      default: ""
    },
    className: {
      type: String,
      default: ""
    },
    icon: {
      type: String,
      default: ""
    },
    iconRight: {
      type: String,
      default: ""
    },
    btnToolTip: {
      type: String,
      default: ""
    },
    type: {
      type: String,
      default: ""
    },
    disabled: {
      type: Boolean,
      default: false
    },
    round: {
      type: Boolean,
      default: false
    },
    loading: {
      type: Boolean,
      default: false
    },
    circle: {
      type: Boolean,
      default: false
    },
    row: {
      type: Object | null,
      default: null
    },
    file: {
      type: Boolean,
      default: false
    },
    fileTypes: {
      type: Array,
      default: () => []
    },
    fileSize: {
      type: Number,
      default: 5 * 1024 * 1024
    },
    /** 导入前回调 */
    beforeImport: {
      default: null
    }
  }
};
