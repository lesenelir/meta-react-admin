import axios from "axios"

const axiosOption = {
  baseURL: 'http://localhost:9000/manage',
  timeout: 5000
}

// 创建axios实例
const instance = axios.create(axiosOption)

// 请求拦截器
instance.interceptors.request.use((config) => {
  let token = localStorage.getItem('token')
  if (token) {
    config.headers = { // 有token则每次请求的时给请求头带上token
      Authorization: token
    }
  }
  return config
}, (err) => {
  return Promise.reject(err)
})

// 响应拦截器
instance.interceptors.response.use((res) => {
  // 响应数据
  return res.data
}, (err) => {
  return Promise.reject(err)
})

export default instance
