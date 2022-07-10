// 用户信息接口
// 查询 + 修改
const Router = require('koa-router')
const jwt = require('jsonwebtoken')
const {returnMsg, queryFn, jwtVerify} = require('../../utils/utils')

const router = new Router()

// 查询用户信息
router.get('/', async (ctx) => {
  // 获取前端请求头携带过来的token
  let token = ctx.request.headers.authorization

  // 鉴权
  // 鉴权失败
  if (!jwtVerify(token)) {
    ctx.body = returnMsg(2, '查询用户信息失败', 'token过期或用户不存在')
    return
  }

  // 鉴权成功 - 查询数据库中token对应的用户
  let sqlSearch = `select username,token,avatar from user where token='${token}'`,
      res = await queryFn(sqlSearch)

  ctx.body = res[0]
})




module.exports = router

