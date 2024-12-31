import request from '@/utils/request'

//mqtt列表
export function mqttListApi(data) {
    return request({
        url: '/mqttConf/list',
        method: 'get',
        params: data
    })
}
//列表删除  
export function delListApi(id) {
    return request({
        url: '/mqttConf/' + id,
        method: 'delete'
    })
}

//mqtt新增
export function addMqttApi(data) {
    return request({
        url: '/mqttConf',
        method: 'post',
        data: data
    })
}
//详情
export function detailsApi(id) {
    return request({
        url: '/mqttConf/' + id,
        method: 'get'
    })
}
//修改 
export function updateMqttApi(data) {
    return request({
        url: '/mqttConf',
        method: 'put',
        data: data
    })
}