// 接口地址
import config from '@/config'

const baseUrl = process.env.NODE_ENV === 'development' ? config.baseUrl.dev : config.baseUrl.pro

const path = {
  // 导出excel文件

  // 项目档案
  initProject: '/archives/listAll',
  selectProject: '/archives/search',
  addProject: '/archives/addArchives',
  deleteProject: '/archives/delete',
  updateProject: '/archives/update',
  exportProject: '/archives/export',
  importProject: '/archives/import',

  //可用性
  addPerform: '/perform/addPerform',
  initPerform: '',
  deletePerform: '',
}
export default path
