import request from '@/utils/request'
// 解码卡管理

// 列表
export function listApi(data) {
    return request({
        url: '/decodeCard/list',
        method: 'get',
        params: data
    })
}
// 列表
export function searchListApi(data) {
    return request({
        url: '/decodeCard/search',
        method: 'get',
        params: data
    })
}
//列表删除
export function delListApi(id) {
    return request({
        url: '/decodeCard/' + id,
        method: 'delete'
    })
}

//新增
export function addApi(data) {
    return request({
        url: '/decodeCard',
        method: 'post',
        data: data
    })
}
//详情
export function detailsApi(id) {
    return request({
        url: '/decodeCard' + id,
        method: 'get'
    })
}
//修改
export function updateApi(data) {
    return request({
        url: '/decodeCard',
        method: 'put',
        data: data
    })
}

//详情
export function getScreenChar(id) {
    return request({
        url: '/decodeCard/screenChar',
        method: 'get'
    })
}
//修改
export function updateScreenCharApi(data) {
    return request({
        url: '/decodeCard/setScreenChar',
        method: 'put',
        data: data
    })
}
