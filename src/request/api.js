import request from './request'

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