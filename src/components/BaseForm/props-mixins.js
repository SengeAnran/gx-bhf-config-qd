export default {
  props: {
    labelPosition: {
      type: String,
      default: "right"
    },
    isRealTimeOptions: {
      type: Boolean,
      default: false
    },
    rules: {
      type: Object,
      default: () => ({})
    },
    formModel: {
      type: Object,
      default: () => ({})
    },
    code: {
      type: String,
      default: "add" // add,info ,update
    },
    config: {
      type: Array,
      default: () => []
    }
  }
};
