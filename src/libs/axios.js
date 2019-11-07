import axios from 'axios'
import store from '@/store'
// import { Spin } from 'iview'
const addErrorLog = errorInfo => {
  const {statusText, status, request: {responseURL}} = errorInfo
  let info = {
    type: 'ajax',
    code: status,
    mes: statusText,
    url: responseURL
  }
  if (!responseURL.includes('save_error_logger')) store.dispatch('addErrorLog', info)
}

class HttpRequest {
  constructor(baseUrl = baseURL) {
    this.baseUrl = baseUrl
    this.queue = {}
  }

  getInsideConfig() {
    const config = {
      baseURL: this.baseUrl,
      headers: {
        //
      }
    }
    return config
  }

  destroy(url) {
    delete this.queue[url]
    if (!Object.keys(this.queue).length) {
      // Spin.hide()
    }
  }

  interceptors(instance, url) {
    // 请求拦截
    instance.interceptors.request.use(config => {
      // 添加全局的loading...
      if (!Object.keys(this.queue).length) {
        // Spin.show() // 不建议开启，因为界面不友好
      }
      this.queue[url] = true
      return config
    }, error => {
      return Promise.reject(error)
    })
    // 响应拦截
    instance.interceptors.response.use(res => {
      this.destroy(url)
      const {data, status} = res
      return {data, status}
    }, error => {
      this.destroy(url)
      let errorInfo = error.response
      if (!errorInfo) {
        const {request: {statusText, status}, config} = JSON.parse(JSON.stringify(error))
        errorInfo = {
          statusText,
          status,
          request: {responseURL: config.url}
        }
      }
      addErrorLog(errorInfo)
      return Promise.reject(error)
    })
  }

  request(options) {
    const instance = axios.create()
    options = Object.assign(this.getInsideConfig(), options)
    this.interceptors(instance, options.url)
    return instance(options)
  }

  downFile(blob, fileName) {
    // 非IE下载
    if ('download' in document.createElement('a')) {
      let link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob); // 创建下载的链接
      link.download = fileName; // 下载后文件名
      link.style.display = 'none';
      document.body.appendChild(link);
      link.click(); // 点击下载
      window.URL.revokeObjectURL(link.href); // 释放掉blob对象
      document.body.removeChild(link); // 下载完成移除元素
    } else {
      // IE10+下载
      window.navigator.msSaveBlob(blob, fileName);
    }
  }

  downloadFile(url, data) {
    // 响应类型：arraybuffer, blob
    axios({
      url: this.baseUrl + url,
      params: data,
      responseType: 'blob'
    }).then(resp => {
      let headers = resp.headers;
      let contentType = headers['content-type'];
      if (!resp.data) {
        console.error('响应异常：', resp);
        return false;
      } else {
        const blob = new Blob([resp.data], {type: contentType});
        const contentDisposition = resp.headers['content-disposition'];
        let fileName = 'unknown';
        if (contentDisposition) {
          fileName = window.decodeURI(resp.headers['content-disposition'].split('=')[1]);
        }
        this.downFile(blob, fileName);
      }
    }).catch(function (error) {
      console.log(error);
    });
  }
}

export default HttpRequest
