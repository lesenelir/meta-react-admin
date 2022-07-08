const Router = require('koa-router')

const router = new Router()

router.post('/', async (ctx) => {
  console.log(ctx.request.body)

  // ctx.request.body 写入数据库，并由数据库返回相关信息token等


  ctx.body = '后台管理的登录接口'
})

module.exports = router
