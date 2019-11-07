import axios from '@/libs/api.request'

/**
 * @description 获取项目档案名列表
 * @returns {*|void|AxiosPromise<any>}
 */
export const getNameList = () => {
  return axios.request({
    url: 'archives/getNameList',
    method: 'get'
  })
}
