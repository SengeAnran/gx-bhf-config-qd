import request from '@/utils/request'

//告警列表
export function alarmListApi(data) {
    return request({
        url: '/alertLog/list',
        method: 'get',
        params: data
    })
}
//列表删除  
export function delListApi(id) {
    return request({
        url: '/alertLog/' + id,
        method: 'delete'
    })
}
//详情
export function detailsApi(id) {
    return request({
        url: '/alertLog/' + id,
        method: 'get'
    })
}

//标记已读
export function markRead(id) {
    return request({
        url: '/alertLog/markRead/' + id,
        method: 'get'
    })
}