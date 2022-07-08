import request from "./request"

// 注册接口
const RegisterApi = (params) => {
  return request.post('/register', params)
}

// 登录接口
const LoginApi = (params) => {
  return request.post('/login', params)
}


export {
  RegisterApi
}
