import axios from '@/libs/api.request'

/**
 * @description 获取覆盖率按月分布
 * @returns {*|void|AxiosPromise<any>}
 */
export const getCoverageList = (data, params) => {
  return axios.request({
    url: 'sonar/detail/distribution/coverage',
    data,
    params,
    method: 'post'
  })
}
/**
 * @description 获取覆盖率按月分布
 * @returns {*|void|AxiosPromise<any>}
 */
export const getCommentsList = (data, params) => {
  return axios.request({
    url: 'sonar/detail/distribution/comments',
    data,
    params,
    method: 'post'
  })
}
/**
 * @description 获取codeSmells按月分布
 * @returns {*|void|AxiosPromise<any>}
 */
export const getCodeSmellsList = (data, params) => {
  return axios.request({
    url: 'sonar/detail/distribution/codesmells',
    data,
    params,
    method: 'post'
  })
}
/**
 * @description 获取千行代码重复率按月分布
 * @returns {*|void|AxiosPromise<any>}
 */
export const getRepetitionList = (data, params) => {
  return axios.request({
    url: 'sonar/detail/distribution/repetition',
    data,
    params,
    method: 'post'
  })
}
/**
 * @description 获取bugs按月分布
 * @returns {*|void|AxiosPromise<any>}
 */
export const getBugsMoonsList = (data, params) => {
  return axios.request({
    url: 'sonar/detail/distribution/bugs',
    data,
    params,
    method: 'post'
  })
}
/**
 * @description 获取sonar项目信息
 * @returns {*|void|AxiosPromise<any>}
 */
export const getKeyList = () => {
  return axios.request({
    url: 'sonar/detail/distribution/key',
    method: 'get'
  })
}
/**
 * @description 获取代码质量得分分布 年、月、日
 * @returns {*|void|AxiosPromise<any>}
 */
export const postHistoryScoreDistributionList = (data, params) => {
  return axios.request({
    url: 'sonar/detail/distribution//history/score',
    data,
    params,
    method: 'post'
  })
}
