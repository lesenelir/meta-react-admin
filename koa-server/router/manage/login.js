const Router = require('koa-router')
const jwt = require('jsonwebtoken')
const {returnMsg, queryFn} = require("../../utils/utils");

const router = new Router()

// /manage/login
router.post('/', async (ctx) => {

  const {username, password} = ctx.request.body

  if (username && password) {
    // 请求体body中参数正确
    // 查询数据库中有没有该账号
    let sqlSearch = `select * from user where username='${username}'`,
        res = await queryFn(sqlSearch)

    if (res.length > 0) {
      // 查询后用户存在
      let token = jwt.sign({
            username,
            password
          }, 'lesenelir', {expiresIn: 60 * 60}),
          sqlUpdate = `update user set token='${token}' where username='${username}'`

      await queryFn(sqlUpdate) // 插入token到数据库
      let res = await queryFn(sqlSearch) // 重新查询数据库，更新数据，
      ctx.body = returnMsg(0, '登录成功', res)
    } else {
      // 查询后用户不存在
      ctx.body = returnMsg(2, '用户不存在', '用户不存在，请先注册')
    }
  } else {
    // 前端请求体body中有参数的错误
    ctx.body = returnMsg(1, '参数错误', '用户名或密码出错')
  }

})

module.exports = router
