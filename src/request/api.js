import request from './request'
import { post } from './axiosInstance';


export function nodeList(params) {
    return request({
        url: 'vote/list',
        method: 'get',
        params,
    })
}

export function nodeDetails(params) {
    return request({
        url: 'vote/dpos',
        method: 'get',
        params
    })
}

//投票节点列表
export const delegateList = (data) => {
    return post('', data)
}

//节点详情
export const delegateDetails = (data) => {
    return post('', data)
}