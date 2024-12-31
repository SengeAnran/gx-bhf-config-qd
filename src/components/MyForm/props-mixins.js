export default {
    props: {
        //弹窗配置
        dialogConfig: {
            type: Object,
            default: () => ({
                visible: true,
                // title: "我是标题",
                // width: "600px"
            })
        },
        //弹窗标题
        title: {
            type: String,
            default: "title"
        },

        //表单数据
        formData: {
            type: Object,
            default: () => { }
        },
        //验证规则
        rules: {
            type: Object,
            default: () => ({
                // name: [{ required: true, message: "请输入活动名称", trigger: "blur" }],
                // grade: [
                //     { required: true, message: "请输入活动名称", trigger: "change" }
                // ]
            })
        },
        // add,info ,update
        code: {
            type: String,
            default: "add"
        },

        //表单配置
        formConfig: {
            type: Array,
            default: () => [
                //输入框
                // {
                //     label: "姓名",
                //     type: "input",
                //     params: "name",
                //     labelWidth: "80px",
                //     span: 24
                // },
                // //选择框
                // {
                //     label: "级别",
                //     type: "select",
                //     params: "grade",
                //     labelWidth: "80px",
                //     span: 24,

                //     selectOptions: [
                //         {
                //             label: "标签1",
                //             value: "1111"
                //         },
                //         {
                //             label: "标签2",
                //             value: "2222"
                //         }
                //     ],
                //     multiple: false
                // },
                // //日期范围
                // {
                //     label: "日期",
                //     type: "daterange",
                //     params: "time",
                //     labelWidth: "80px",
                //     span: 24,
                //     valueFormat: "yyyy-MM-dd HH:mm:ss",
                //     startPlaceholder: "开始日期",
                //     endPlaceholder: "结束日期"
                // },
                // //插槽
                // {
                //     label: "说明1",
                //     type: "slot",
                //     slotName: 'slot1',
                //     params: "time",
                //     labelWidth: "80px",
                //     span: 24,
                //     // valueFormat: "yyyy-MM-dd HH:mm:ss",
                //     // startPlaceholder: "开始日期",
                //     // endPlaceholder: "结束日期"
                // },
                // {
                //     label: "说明2",
                //     type: "slot",
                //     slotName: 'slot2',
                //     params: "time",
                //     labelWidth: "80px",
                //     span: 24,
                //     // valueFormat: "yyyy-MM-dd HH:mm:ss",
                //     // startPlaceholder: "开始日期",
                //     // endPlaceholder: "结束日期"
                // },
            ]
        }
    },
}