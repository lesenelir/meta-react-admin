const Router = require('koa-router')
const {returnMsg, queryFn, jwtVerify} = require('../../../utils/utils')
const moment = require("moment");

const router = new Router()

// 文章添加
// manage/article/list/add
router.post('/', async (ctx) => {
  let token = ctx.request.headers.authorization
  // 鉴权失败
  if (!jwtVerify(token)) {
    ctx.body = returnMsg(2, '查询用户信息失败', 'token过期或用户不存在')
    return
  }

  // 从token中查看是否有编辑权限
  let sqlEditable = `select editable,username from user where token='${token}'`,
      resQuery = await queryFn(sqlEditable)

  if (resQuery[0].editable === 1) {
    // 有编辑权限
    let {title, subTitle, content} = ctx.request.body
    if (!title || !content) {
      ctx.body = returnMsg(1, '参数错误')
      return
    }
    let myDate = moment().format('YYYY-MM-DD hh:mm:ss')
    let sqlInsert = `insert into article values (null, '${title}', '${subTitle || ''}',
                     '${resQuery[0].username}', '${myDate}', '${content}')`
    await queryFn(sqlInsert)
    ctx.body = returnMsg(0, '文章添加成功')
  } else {
    // 没有权限编辑
    ctx.body = returnMsg(1, '用户没有编辑权限')
    return
  }

})


module.exports = router
