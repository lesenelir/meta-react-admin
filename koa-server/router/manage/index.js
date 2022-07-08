const Router = require('koa-router')
const login = require('./login')
const register = require('./register')

const router = new Router()

const {query} = require('../../utils/utils')

// /manage
router.get('/', async (ctx) => {
  // 返回所有用户的数据 - 调用mysql
  // 调用query是异步的
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


// /manage/list
router.get('/list', async (ctx) => {
  ctx.body = '管理后台列表页'
})

module.exports = router
