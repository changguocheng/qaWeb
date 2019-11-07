import axios from '@/libs/api.request'

/**
 * @description 新增项目可用性信息
 * @returns {*|void|AxiosPromise<any>}
 */
export const addArchives = (data) => {
  return axios.request({
    url: 'archives/addArchives',
    data,
    method: 'post'
  })
}
/**
 * @description 根据项目交付要求时间年份和研制状态查询匹配的项目
 * @returns {*|void|AxiosPromise<any>}
 */
export const initArchives = (params) => {
  return axios.request({
    url: 'archives/siftArchives',
    params,
    method: 'get'
  })
}
/**
 * @description 批量删除项目档案
 * @returns {*|void|AxiosPromise<any>}
 */
export const deleteArchives = (data) => {
  return axios.request({
    url: 'archives/delete',
    data,
    method: 'post'
  })
}
/**
 * @description 更新项目档案
 * @returns {*|void|AxiosPromise<any>}
 */
export const updateArchives = (data) => {
  return axios.request({
    url: 'archives/update',
    data,
    method: 'put'
  })
}
/**
 * @description   项目档案根据项目名称进行模糊搜索
 * @returns {*|void|AxiosPromise<any>}
 */
export const searchArchives = (params) => {
  return axios.request({
    url: 'archives/search',
    params,
    method: 'get'
  })
}
/**
 * @description  根据项目研制状态匹配项目数量
 * @returns {*|void|AxiosPromise<any>}
 */
export const devCounts = (params) => {
  return axios.request({
    url: 'archives/devCounts',
    params,
    method: 'get'
  })
}
/**
 * @description  根据项目交付要求时间年份和研制状态查询匹配的项目
 * @returns {*|void|AxiosPromise<any>}
 */
export const siftArchives = (params) => {
  return axios.request({
    url: 'archives/siftArchives',
    params,
    method: 'get'
  })
}
/**
 * @description 导出
 * @returns {*|void|AxiosPromise<any>}
 */
export const exportArchives = () => {
  return axios.downloadFile('/archives/export')
}
/**
 * @description  根据项目研制状态和年份分页查询项目可维护性得分信息
 * @returns {*|void|AxiosPromise<any>}
 */
export const siftScore = (params) => {
  return axios.request({
    url: 'maintain/siftScore',
    params,
    method: 'get'
  })
}
/**
 * @description  根据项目名查询
 * @returns {*|void|AxiosPromise<any>}
 */
export const getMainTainNames = () => {
  return axios.request({
    url: 'maintain/getMainTainNames',
    method: 'get'
  })
}
/**
 * @description  根据项目名查找项目可维护信息
 * @returns {*|void|AxiosPromise<any>}
 */
export const getByName = (params) => {
  return axios.request({
    url: 'maintain/getByName',
    params,
    method: 'get'
  })
}
/**
 * @description 查询sonar同步过来的项目名和key值
 * @returns {*|void|AxiosPromise<any>}
 */
export const syncSonarKey = () => {
  return axios.request({
    url: 'maintain/syncSonarKey',
    method: 'get'
  })
}
/**
 * @description 查询sonar同步过来的项目名和key值
 * @returns {*|void|AxiosPromise<any>}
 */
export const updateKey = (params) => {
  return axios.request({
    url: 'maintain/updateKey',
    params,
    method: 'post'
  })
}
