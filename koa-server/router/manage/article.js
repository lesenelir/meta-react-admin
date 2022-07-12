const Router = require('koa-router')
const {returnMsg, queryFn, jwtVerify} = require('../../utils/utils')

const router = new Router()

// manage/article/list
router.get('/list', async (ctx) => {
  let sqlSearchAll = `select id,title,subTitle,date from article`
  let res = await queryFn(sqlSearchAll)

  ctx.body = returnMsg(0, '文章列表获取成功', res)
})

module.exports = router
