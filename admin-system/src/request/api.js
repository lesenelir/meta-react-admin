import request from "./request"

/**
 * 注册接口
 * @param params {username, password}
 * @returns {Promise<AxiosResponse<any>>}
 * @constructor
 */
const RegisterApi = (params) => {
  return request.post('/register', params)
}

/**
 * 登录接口
 * @param params {username, password}
 * @returns {Promise<AxiosResponse<any>>}
 * @constructor
 */
const LoginApi = (params) => {
  return request.post('/login', params)
}

/**
 * 获取用户信息接口
 * @returns {Promise<AxiosResponse<any>>}
 * @constructor
 */
const UserInfoApi = () => {
  return request.get('/info')
}

/**
 * 修改用户信息接口
 * @param params {username, password} params 可传可不传
 * @returns {Promise<AxiosResponse<any>>}
 */
const changeUserInfoApi = (params) => {
  return request.post('/info', params)
}


export {
  RegisterApi,
  LoginApi,
  UserInfoApi,
  changeUserInfoApi
}
