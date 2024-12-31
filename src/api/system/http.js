import request from '@/utils/request'

//http列表
export function httpListApi(data) {
    return request({
        url: '/httpConf/list',
        method: 'get',
        params: data
    })
}
//列表删除
export function delListApi(id) {
    return request({
        url: '/httpConf/' + id,
        method: 'delete'
    })
}

//http新增
export function addHttpApi(data) {
    return request({
        url: '/httpConf',
        method: 'post',
        data: data
    })
}
//详情
export function detailsApi(id) {
    return request({
        url: '/httpConf/' + id,
        method: 'get'
    })
}
//修改
export function updateHttpApi(data) {
    return request({
        url: '/httpConf',
        method: 'put',
        data: data
    })
}
