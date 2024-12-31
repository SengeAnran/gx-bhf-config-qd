import request from '@/utils/request'

/**
 * 网络设置
 */
// 获取默认设置详情
export function getNetwork(data) {
    return request({
        url: '/network',
        method: 'get',
        params: data
    })
}

//修改
export function updateApi(data) {
    return request({
        url: '/network',
        method: 'put',
        data: data
    })
}

// 测试
export function networkTest(data) {
    return request({
        url: '/network/test',
        method: 'post',
        data: data
    })
}

