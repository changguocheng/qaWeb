import axios from '@/libs/api.request'

/**
 * @description 获取缺陷概况
 * @returns {*|void|AxiosPromise<any>}
 */
export const getBugSurveyList = () => {
  return axios.request({
    url: 'api/bugSurvey',
    method: 'get'
  })
}
/**
 * @description 获取缺陷等级分布
 * @returns {*|void|AxiosPromise<any>}
 */
export const getBugGradeList = () => {
  return axios.request({
    url: 'api/bugGrade',
    method: 'get'
  })
}
/**
 * @description 获取缺陷概况表格统计
 * @returns {*|void|AxiosPromise<any>}
 */
export const getBugDistributionList = (params) => {
  return axios.request({
    url: 'api/bugDistribution',
    params,
    method: 'post'
  })
}
/**
 * @description 获取缺陷平均关闭时间
 * @returns {*|void|AxiosPromise<any>}
 */
export const getMeanCloseTimeList = (params) => {
  return axios.request({
    url: 'api/meanCloseTime',
    params,
    method: 'get'
  })
}
/**
 * @description 获取严重缺陷占比
 * @returns {*|void|AxiosPromise<any>}
 */
export const getSeriousBugRatioList = (params) => {
  return axios.request({
    url: 'api/seriousRatio',
    params,
    method: 'get'
  })
}
/**
 * @description 获取缺陷燃尽图
 * @returns {*|void|AxiosPromise<any>}
 */
export const getBugBurnoutList = (params) => {
  return axios.request({
    url: 'api/bugBurnout',
    params,
    method: 'get'
  })
}
/**
 * @description 获取缺陷得分比重
 * @returns {*|void|AxiosPromise<any>}
 */
export const getProportionToPieList = () => {
  return axios.request({
    url: 'issues/quality/proportion',
    method: 'get'
  })
}
/**
 * @description 获取千行代码缺陷率
 * @returns {*|void|AxiosPromise<any>}
 */
export const getThousandLineCodeDefectRateList = () => {
  return axios.request({
    url: 'issues/quality/defectRate',
    method: 'get'
  })
}
/**
 * @description 获取三个指标最新总得分
 * @returns {*|void|AxiosPromise<any>}
 */
export const getLatestList = () => {
  return axios.request({
    url: 'issues/quality/latest',
    method: 'post'
  })
}
/**
 * @description 查询项目名和archivesId
 * @returns {*|void|AxiosPromise<any>}
 */
export const getProductList = () => {
  return axios.request({
    url: 'issues/quality/product',
    method: 'get'
  })
}
/**
 * @description 查询缺陷历史总得分分布
 * @returns {*|void|AxiosPromise<any>}
 */
export const getScoresList = (data, params) => {
  return axios.request({
    url: 'issues/quality/scores',
    data,
    params,
    method: 'post'
  })
}
/**
 * @description 查询三个指标得分的历史分布情况
 * @returns {*|void|AxiosPromise<any>}
 */
export const getTargetList = (data, params) => {
  return axios.request({
    url: 'issues/quality/target',
    data,
    params,
    method: 'post'
  })
}
