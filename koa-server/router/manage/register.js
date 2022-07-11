const Router = require('koa-router')
const {returnMsg, queryFn} = require("../../utils/utils");

const router = new Router()


router.post('/', async (ctx) => {

  const {username, password} = ctx.request.body

  if (username && password) {
    // 请求体携带参数格式正确，查询数据库是否有该用户
    let sqlSearch = `select * from user where username='${username}'`,
        res = await queryFn(sqlSearch)

    if (res.length > 0) { // res有长度，则这个用户，返回前端：该用户已注册
      ctx.body = returnMsg(2, '注册失败', '该用户已经注册')
    } else { // 没有该用户，则进行注册
      // 添加用户
      let sqlAdd = `insert into user values (null, '${username}', '${password}', null, 'avatar.jpg', 'normal', 0)`
      await queryFn(sqlAdd)
      ctx.body = returnMsg(0, '注册成功', '注册成功')
    }

  } else {
    ctx.body = returnMsg(1, '请求失败', '参数有错误')
  }

})

module.exports = router
