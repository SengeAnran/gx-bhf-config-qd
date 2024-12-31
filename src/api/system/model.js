import request from '@/utils/request'

//模型列表
export function modelListApi(data) {
    return request({
        url: '/model/list',
        method: 'get',
        params: data
    })
}
//列表删除
export function delListApi(id) {
    return request({
        url: '/model/' + id,
        method: 'delete'
    })
}

//模型新增
export function addModelApi(data) {
    return request({
        url: '/model',
        method: 'post',
        data: data
    })
}
//详情
export function detailsApi(id) {
    return request({
        url: '/model/' + id,
        method: 'get'
    })
}
//修改  /model
export function updateModelApi(data) {
    return request({
        url: '/model',
        method: 'put',
        data: data
    })
}
//推送模型  /model
export function upgradeModelApi(data) {
    return request({
        url: '/manage/upgradeModel',
        method: 'post',
        data: data
    })
}
//根据模型id查询可选板卡
export function getBoardIdByModel(modelId) {
    return request({
        url: `/manage/getBoardIdByModel/${modelId}`,
        method: 'get',
    })
}
//开关控制 开始
export function modelStateStartApi(data) {
  // console.log("start model")
  return request({
    url: `/model`,
    method: 'put',
    data,
  })
}

//开关控制 关闭
export function modelStateStopApi(modelId) {
  console.log("stop model")
  return request({
    url: `/manage/stopModel/${modelId}`,
    method: 'get',
  })
}
