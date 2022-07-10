import request from "./request"

// 注册接口
const RegisterApi = (params) => {
  return request.post('/register', params)
}

// 登录接口
const LoginApi = (params) => {
  return request.post('/login', params)
}

// 获取用户信息接口
const UserInfoApi = () => {
  return request.get('/info')
}


export {
  RegisterApi,
  LoginApi,
  UserInfoApi
}
