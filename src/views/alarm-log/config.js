export const formData = {
    level: '',
    sceneName: '',
    linkDeviceId: '',
    time: []
}

export const FORM_CONFIG = [
    {
        label: "告警等级：",
        type: "select",
        params: "level",
        labelWidth: "100px",
        span: 4,
        selectOptions: [
            {
                label: "高",
                value: "高"
            },
            {
                label: "中",
                value: "中"
            },
            {
                label: "低",
                value: "低"
            }
        ],

    },
    {
        label: "场景：",
        type: "select",
        params: "sceneName",
        labelWidth: "80px",
        span: 4,
        selectOptions: [],
    },
    {
        label: "板卡：",
        type: "select",
        params: "linkDeviceId",
        labelWidth: "80px",
        span: 4,
        selectOptions: [],
    },
    {
        label: "时间：",
        type: "datetimerange",
        params: "time",
        labelWidth: "80px",
        span: 7,
        valueFormat: "yyyy-MM-dd HH:mm:ss",
        startPlaceholder: "开始日期",
        endPlaceholder: "结束日期"
    }
]

