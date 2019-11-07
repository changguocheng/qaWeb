import axios from '@/libs/api.request'

/**
 * @description 新增项目可用性信息
 * @returns {*|void|AxiosPromise<any>}
 */
export const addPerform = (params) => {
  return axios.request({
    url: 'perform/addPerform',
    params,
    method: 'get'
  })
}
