export default {
  props: {
    tableDate: {
      type: Array,
      default: () => []
    },
    stripe: {
      type: Boolean,
      default: true
    },
    //表格高度
    tableHeight: {
      type: [Number, String],
      default: "calc(100% - 40px)" //默认高度
    },
    //最大高度
    maxheight: {
      type: [Number, String],
      default: "auto"
    },
    size: {
      type: String,
      default: "samll"
    },
    layout: {
      type: String,
      default: "total, sizes, prev, pager, next"

    },
    //表头相关配置
    columns: {
      type: Array,
      default: () => []
    },
    otherConfig: {
      type: Object,
      default: () => { }
    },
    //是否有分页，默认为true
    isPagintionShow: {
      type: Boolean,
      default: true
    },
    //分页基本数据
    pagination: {
      type: Object,
      default: () => ({
        total: 0,
        current: 1,
        size: 10
      })
    },
    // 是否展开，默认全部折叠
    isExpandAll: {
      type: Boolean,
      default: false
    },
    rowKeyId: {
      type: String,
      default: ''
    }
  },
}
