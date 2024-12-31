import request from '@/utils/request'

//mqtt列表
export function listApi(data) {
    return request({
        url: '/kafkaConf/list',
        method: 'get',
        params: data
    })
}
//列表删除
export function delListApi(id) {
    return request({
        url: '/kafkaConf/' + id,
        method: 'delete'
    })
}

//mqtt新增
export function addApi(data) {
    return request({
        url: '/kafkaConf',
        method: 'post',
        data: data
    })
}
//详情
export function detailsApi(id) {
    return request({
        url: '/kafkaConf/' + id,
        method: 'get'
    })
}
//修改
export function updateApi(data) {
    return request({
        url: '/kafkaConf',
        method: 'put',
        data: data
    })
}
