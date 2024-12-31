import request from '@/utils/request'

//用户列表
export function userListApi(data) {
    return request({
        url: '/system/user/list',
        method: 'get',
        params: data
    })
}
//列表删除  
export function delListApi(id) {
    return request({
        url: '/system/user/' + id,
        method: 'delete'
    })
}

//用户新增
export function addUserApi(data) {
    return request({
        url: '/system/user',
        method: 'post',
        data: data
    })
}
//详情
export function detailsApi(id) {
    return request({
        url: '/system/user' + id,
        method: 'get'
    })
}
//用户修改  
export function updateUserApi(data) {
    return request({
        url: '/system/user',
        method: 'put',
        data: data
    })
}
