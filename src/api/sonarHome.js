import axios from '@/libs/api.request'

/**
 * @description 获取单元测试覆盖率
 * @returns {*|void|AxiosPromise<any>}
 */
export const getCoverageBarList = () => {
  return axios.request({
    url: 'sonar/index/search/coverage',
    method: 'get'
  })
}
/**
 * @description 获取codeSmells
 * @returns {*|void|AxiosPromise<any>}
 */
export const getCodeSmellsBarList = () => {
  return axios.request({
    url: 'sonar/index/search/codesmells',
    method: 'get'
  })
}
/**
 * @description 获取注释率
 * @returns {*|void|AxiosPromise<any>}
 */
export const getCommentsBarList = () => {
  return axios.request({
    url: 'sonar/index/search/comments',
    method: 'get'
  })
}
/**
 * @description 获取千行代码重复率
 * @returns {*|void|AxiosPromise<any>}
 */
export const getRepetitionBarList = () => {
  return axios.request({
    url: 'sonar/index/search/repetition',
    method: 'get'
  })
}
/**
 * @description 获取行代码bugs
 * @returns {*|void|AxiosPromise<any>}
 */
export const getBugsBarList = () => {
  return axios.request({
    url: 'sonar/index/search/bugs',
    method: 'get'
  })
}
/**
 * @description 获取最新总得分
 * @returns {*|void|AxiosPromise<any>}
 */
export const getLatestTotalScoreList = (data) => {
  return axios.request({
    url: 'sonar/index/search/score',
    data,
    method: 'post'
  })
}
/**
 * @description 获取得分比重
 * @returns {*|void|AxiosPromise<any>}
 */
export const getProportionList = () => {
  return axios.request({
    url: 'sonar/ratio/proportion',
    method: 'get'
  })
}
/**
 * @description 获取阈值
 * @returns {*|void|AxiosPromise<any>}
 */
export const getAllProportionAndThresholdList = () => {
  return axios.request({
    url: 'sonar/ratio/search',
    method: 'get'
  })
}
