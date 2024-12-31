import request from '@/utils/request'
// 解码卡管理

// 列表
export function listApi(data) {
    return request({
        url: '/ipc/list',
        method: 'get',
        params: data
    })
}
// 列表
export function searchListApi(data) {
    return request({
        url: '/ipc/search',
        method: 'get',
        params: data
    })
}
//列表删除
export function delListApi(id) {
    return request({
        url: '/ipc/' + id,
        method: 'delete'
    })
}

//新增
export function addApi(data) {
    return request({
        url: '/ipc',
        method: 'post',
        data: data
    })
}
//详情
export function detailsApi(id) {
    return request({
        url: '/ipc' + id,
        method: 'get'
    })
}
//修改
export function updateApi(data) {
    return request({
        url: '/ipc',
        method: 'put',
        data: data
    })
}

//详情
export function getScreenChar(id) {
    return request({
        url: '/ipc/screenChar',
        method: 'get'
    })
}
//修改
export function updateScreenCharApi(data) {
    return request({
        url: '/ipc/screenChar',
        method: 'put',
        data: data
    })
}

// 新增【摄像机监控点】
export function addCamera(data) {
    return request({
        url: '/ipc/addCamera',
        method: 'post',
        data: data
    })
}


// 新增【本地采集卡监控点】
export function addCaptureCard(data) {
    return request({
        url: '/ipc/addCaptureCard',
        method: 'post',
        data: data
    })
}


// 新增【通用监控点】
export function addCommon(data) {
    return request({
        url: '/ipc/addCommon',
        method: 'post',
        data: data
    })
}


// 新增【IP地址批量监控点】
export function addIpBatch(data) {
    return request({
        url: '/ipc/addIpBatch',
        method: 'post',
        data: data
    })
}


// 新增【手动录入监控点】
export function addManual(data) {
    return request({
        url: '/ipc/addManual',
        method: 'post',
        data: data
    })
}


// 新增【NVR监控点】
export function addNvr(data) {
    return request({
        url: '/ipc/addNvr',
        method: 'post',
        data: data
    })
}


// 新增【流媒体服务器监控点】
export function addStreamServer(data) {
    return request({
        url: '/ipc/addStreamServer',
        method: 'post',
        data: data
    })
}
