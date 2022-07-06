const Router = require('koa-router')
const router = new Router()

// /web
router.get('/', async (ctx) => {
  ctx.body = 'web首页'
})

module.exports = router
