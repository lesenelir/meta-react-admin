const Koa = require('koa2')
const Router = require('koa-router')
const cors = require('koa2-cors')
const staticKoa = require('koa-static')
const bodyParser = require('koa-bodyparser')
const path = require('node:path')

const app = new Koa()
const router = new Router()

const {host, port} = require('./utils/utils')
const manage = require('./router/manage/index')
const web = require('./router/web/index')
const PageError = require('./router/404/404')

router.get('/', async (ctx) => {
  ctx.body = '首页'
})

router.use('/manage', manage.routes(), manage.allowedMethods())
router.use('/web', web.routes(), web.allowedMethods())
router.use('/404', PageError.routes(), PageError.allowedMethods())

app.use(async (ctx, next) => {
  await next() // 先放行所有的路由
  // 重定向到404页面
  if (parseInt(ctx.status) === 404) {
    ctx.response.redirect('/404')
  }
})

app.use(cors())
app.use(bodyParser())
app.use(router.routes(), router.allowedMethods()) // 调用router中间件
// 读取静态资源的中间件要卸载路由的后面
app.use(staticKoa(path.join(__dirname, './assets')))

app.listen(port, () => {
  console.log(`Server is running at ${host}:${port}`)
})

