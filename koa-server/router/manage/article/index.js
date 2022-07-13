const Router = require('koa-router')

const list = require('./list')
const info = require('./info')
const edit = require('./edit')
const deleteArticle = require('./delete')

const router = new Router()


// 文章添加
// manage/article/list/add
// router.post('/list/add')

router.use('/list', list.routes(), list.allowedMethods())
router.use('/info', info.routes(), info.allowedMethods())
router.use('/edit', edit.routes(), edit.allowedMethods())
router.use('/delete', deleteArticle.routes(), deleteArticle.allowedMethods())

module.exports = router
