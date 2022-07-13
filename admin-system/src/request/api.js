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

/**
 * 获取文章列表接口
 * @param params
 * @returns {Promise<AxiosResponse<any>>}
 * @constructor
 */
const GetArticleListApi = (params) => {
  // return request.get('/article/list')
  return request.post('/article/list', params)
}

/**
 * 根据id获取文章
 * @param params id参数
 * @returns {Promise<AxiosResponse<any>>}
 * @constructor
 */
const GetArticleByIdApi = (params) => {
  // return request.post('/article/info', params)
  return request.get(`/article/info/${params.id}`)
}

/**
 * 文章编辑接口
 * @param params
 * @returns {Promise<AxiosResponse<any>>}
 * @constructor
 */
const EditArticleApi = (params) => {
  return request.post('/article/edit', params)
}

/**
 * 删除文章API
 * @param params
 * @returns {Promise<AxiosResponse<any>>}
 * @constructor
 */
const DeleteArticleApi = (params) => {
  return request.post('/article/delete', params)
}


export {
  RegisterApi,
  LoginApi,
  UserInfoApi,
  changeUserInfoApi,
  GetArticleListApi,
  GetArticleByIdApi,
  EditArticleApi,
  DeleteArticleApi
}
