const Router = require('koa-router')

const {query} = require('../../utils/utils')
const login = require('./login')
const register = require('./register')
const info = require('./info')
const upload = require('./upload')
const article = require('./article')
const namelist = require('./namelist')

const router = new Router()

// /manage
router.get('/', async (ctx) => {
  // 返回所有用户的数据 - 调用mysql
  // 调用query是异步的
  // 保证先在数据库中query函数调用完后再把结果值存入body中
  let res = await new Promise((resolve, reject) => {
    query(`select * from user`, (err, data) => {
      if (err) reject(err)
      resolve(data)
    })
  })
  ctx.body = res
})

router.use('/login', login.routes(), login.allowedMethods())
router.use('/register', register.routes(), register.allowedMethods())
router.use('/info', info.routes(), info.allowedMethods())
router.use('/upload', upload.routes(), upload.allowedMethods())
router.use('/article', article.routes(), article.allowedMethods())
router.use('/namelist', namelist.routes(), namelist.allowedMethods())


// /manage/list
router.get('/list', async (ctx) => {
  ctx.body = '管理后台列表页'
})

module.exports = router
