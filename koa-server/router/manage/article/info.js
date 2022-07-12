const Router = require('koa-router')
const {returnMsg, queryFn, jwtVerify} = require('../../../utils/utils')

const router = new Router()

// 根据前端传过来的id获取文章
// manage/article/info/{id}
router.get('/:id', async (ctx) => {
  let token = ctx.request.headers.authorization
  // 鉴权失败
  if (!jwtVerify(token)) {
    ctx.body = returnMsg(2, '查询用户信息失败', 'token过期或用户不存在')
    return
  }

  // let {id} = ctx.request.body
  let id = ctx.url.split('/')[ctx.url.split('/').length - 1]
  // 到数据库中搜索id对应的文章
  let sqlSearch = `select * from article where id=${id}`
  let res = await queryFn(sqlSearch)

  if (res.length > 0) {
    ctx.body = returnMsg(0, '文章请求成功', res[0])
  } else {
    ctx.body = returnMsg(1, '该文章已不存在')
  }

})


module.exports = router
