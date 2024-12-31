import request from '@/utils/request'

//板卡列表
export function dataSourceListApi(data) {
    return request({
        url: '/dataSource/list',
        method: 'get',
        params: data
    })
}
//列表删除
export function delListApi(id) {
    return request({
        url: '/dataSource/' + id,
        method: 'delete'
    })
}

//板卡新增
export function addDataSourcedApi(data) {
    return request({
        url: '/dataSource',
        method: 'post',
        data: data
    })
}
//详情
export function detailsApi(id) {
    return request({
        url: '/dataSource/' + id,
        method: 'get'
    })
}
//修改
export function updateDataSourcedApi(data) {
    return request({
        url: '/dataSource',
        method: 'put',
        data: data
    })
}
//板卡配置列表
export function dataSourceConfListApi(data) {
  return request({
    url: '/dataSource/' + data.id,
    method: 'get'
  })
}
