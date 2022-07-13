const Router = require('koa-router')

const list = require('./list')
const info = require('./info')
const edit = require('./edit')
const add = require('./add')
const deleteArticle = require('./delete')

const router = new Router()

// /article
// router.get('/', async ctx => {
  // let sql = `select * from article limit ${8},${10}` // 从第8条开始，查询10条记录
  // for (let i = 0; i < 100; i++) {
  //   let sql = `INSERT INTO article VALUES (null, '你好${i}', '世界${i}', 'lesenelir', '2022-07-13 17:00:00', '内容${i}')`
  //   await queryFn(sql)
  // }
  // ctx.body = 1
// })


router.use('/list', list.routes(), list.allowedMethods())
router.use('/info', info.routes(), info.allowedMethods())
router.use('/edit', edit.routes(), edit.allowedMethods())
router.use('/delete', deleteArticle.routes(), deleteArticle.allowedMethods())
router.use('/add', add.routes(), add.allowedMethods())

module.exports = router
