const Router = require('koa-router')

const list = require('./list')
const info = require('./info')
const edit = require('./edit')
const deleteArticle = require('./delete')
const {queryFn} = require("../../../utils/utils")

const router = new Router()

// /article
router.get('/', async ctx => {
  // let sql = `select * from article limit ${8},${10}` // 从第8条开始，查询10条记录
  // for (let i = 0; i < 100; i++) {
  //   let sql = `INSERT INTO article VALUES (null, '你好${i}', '世界${i}', 'lesenelir', '2022-07-13 17:00:00', '内容${i}')`
  //   await queryFn(sql)
  // }
  // ctx.body = 1
})


// 文章添加
// manage/article/list/add
// router.post('/list/add')

router.use('/list', list.routes(), list.allowedMethods())
router.use('/info', info.routes(), info.allowedMethods())
router.use('/edit', edit.routes(), edit.allowedMethods())
router.use('/delete', deleteArticle.routes(), deleteArticle.allowedMethods())

module.exports = router
