// 用户信息接口
// 查询 + 修改
const Router = require('koa-router')
const jwt = require('jsonwebtoken')
const {returnMsg, queryFn, jwtVerify} = require('../../utils/utils')

const router = new Router()

// 获取用户信息
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


// 修改用户信息
router.post('/', async (ctx) => {
  let token = ctx.request.headers.authorization,
      {username, password} = ctx.request.body

  // 鉴权
  if (!jwtVerify(token)) {
    ctx.body = returnMsg(2, '查询用户信息失败', 'token过期或用户不存在')
    return
  }

  // 鉴权成功 - 修改数据库中对应的字段
  let sqlSearchSend = `select username,token,avatar from user where token='${token}'`,
      sqlSearchUser = `select username,password from user where token='${token}' `,
      sqlSearchExist = `select * from user where username='${username}'`,
      temp,
      whetherExistUserArr

  whetherExistUserArr = await queryFn(sqlSearchExist)

  if (whetherExistUserArr.length > 0) {
    // 当前这个数据库存在这个用户名
    ctx.body = returnMsg(1, '用户名已存在')
    return
  }

  temp = await queryFn(sqlSearchUser) // 通过token 检索数据库中 用户名和密码 旧值
  let sqlUpdate = `Update user set username='${username || temp[0].username}',password='${password || temp[0].password}' where token='${token}'`

  await queryFn(sqlUpdate) // 执行更新数据库操作

  // 数据库修改完后 - 重新查询数据库中的用户信息返回给前端
  let res = await queryFn(sqlSearchSend)
  ctx.body = returnMsg(0, '修改成功', {
    avatar: res[0].avatar,
    token: res[0].token,
    username: res[0].username
  })
})

module.exports = router
