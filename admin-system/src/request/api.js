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
 * @param params current当前页码 counts每页的个数
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
 * @param params title subTitle? content id
 * @returns {Promise<AxiosResponse<any>>}
 * @constructor
 */
const EditArticleApi = (params) => {
  return request.post('/article/edit', params)
}

/**
 * 删除文章API
 * @param params params title subTitle? content id
 * @returns {Promise<AxiosResponse<any>>}
 * @constructor
 */
const DeleteArticleApi = (params) => {
  return request.post('/article/delete', params)
}

/**
 * 文章添加接口
 * @param params title subTitle? content id?
 * @returns {Promise<AxiosResponse<any>>}
 * @constructor
 */
const AddArticleApi = (params) => {
  return request.post('/article/add', params)
}

/**
 * 获取小编名单接口
 * @returns {Promise<AxiosResponse<any>>}
 * @constructor
 */
const EditorApi = () => {
  return request.get('/namelist')
}

/**
 * 修改小编的编辑权限
 * @param params id用户id open是否开通用户编辑权限
 * @returns {Promise<AxiosResponse<any>>}
 * @constructor
 */
const IChangeEditorApi = (params) => {
  return request.post('/namelist', params)
}


export {
  RegisterApi,
  LoginApi,
  UserInfoApi,
  changeUserInfoApi,
  GetArticleListApi,
  GetArticleByIdApi,
  EditArticleApi,
  DeleteArticleApi,
  AddArticleApi,
  EditorApi,
  IChangeEditorApi
}
