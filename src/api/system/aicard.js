import request from '@/utils/request'

//板卡列表
export function cardListApi(data) {
    return request({
        url: '/card/list',
        method: 'get',
        params: data
    })
}
//列表删除  
export function delListApi(id) {
    return request({
        url: '/card/' + id,
        method: 'delete'
    })
}

//板卡新增
export function addCardApi(data) {
    return request({
        url: '/card',
        method: 'post',
        data: data
    })
}
//详情
export function detailsApi(id) {
    return request({
        url: '/card/' + id,
        method: 'get'
    })
}
//修改  
export function updateCardApi(data) {
    return request({
        url: '/card',
        method: 'put',
        data: data
    })
}
//板卡配置列表  
export function cardConfListApi(data) {
    return request({
        url: '/cardConf/list',
        method: 'get',
        params: data
    })
}
