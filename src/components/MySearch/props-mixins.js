export default {
    props: {
        //表单数据
        formData: {
            type: Object,
            default: () => { }
        },

        //表单配置
        formConfig: {
            type: Array,
            default: () => [
                //输入框
                // {
                //     label: "姓名：",
                //     type: "input",
                //     params: "name",
                //     labelWidth: "80px",
                //     span: 5,
                //     offset: 0
                // },
                // //选择框
                // {
                //     label: "级别：",
                //     type: "select",
                //     params: "grade",
                //     labelWidth: "80px",
                //     span: 5,
                //     offset: 0,

                //     selectOptions: [
                //         {
                //             label: "111111",
                //             value: "1111"
                //         },
                //         {
                //             label: "222222",
                //             value: "2222"
                //         }
                //     ],
                //     multiple: false
                // },
                // //日期范围
                // {
                //     label: "日期：",
                //     type: "datetimerange",
                //     params: "time",
                //     labelWidth: "80px",
                //     span: 8,
                //     offset: 0,

                //     valueFormat: "yyyy-MM-dd HH:mm:ss",
                //     startPlaceholder: "开始日期",
                //     endPlaceholder: "结束日期"
                // }
            ]
        }
    },
}