const Router = require('koa-router')
const {returnMsg, queryFn, jwtVerify} = require('../../../utils/utils')

const router = new Router()


router.post('/', async (ctx) => {
  let token = ctx.request.headers.authorization
  // 鉴权
  if (!jwtVerify(token)) {
    ctx.body = returnMsg(2, '查询用户信息失败', 'token过期或用户不存在')
    return
  }
  // 获取要删除的文章id
  let {id} = ctx.request.body
  if (!id) {
    ctx.body = returnMsg(1, '参数错误')
    return
  }

  // // 判断用户是否有删除的权限
  let sqlEditable = `select editable from user where token='${token}'`
  let editableArr = await queryFn(sqlEditable)
  if (editableArr[0].editable === 0) {
    // 没有删除权限
    ctx.body = returnMsg(2, '用户没有删除权限')
    return
  }

  // 判断文章是否存在
  let sqlArticleExist = `select * from article where id=${id}`
  let res = await queryFn(sqlArticleExist)
  if (res.length === 0) {
    // 文章不存在
    ctx.body = returnMsg(2, '文章不存在')
    return
  }

  // // 删除文章
  let sqlDelete = `delete from article where id=${id}`
  await queryFn(sqlDelete)
  ctx.body = returnMsg(0, '删除成功')

})



module.exports = router
