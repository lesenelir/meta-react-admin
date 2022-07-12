const Router = require('koa-router')
const moment = require("moment")
const {returnMsg, queryFn, jwtVerify} = require('../../../utils/utils')

const router = new Router()

// 文章编辑提交
// manage/article/edit
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
    let {id, title, subTitle, content} = ctx.request.body,
        sqlSearch = `select * from article where id=${id}` // 查询数据库中是否有该文章

    let res = await queryFn(sqlSearch)
    if (res.length > 0) {
      // 有该文章，进行修改这篇文章的值
      let myDate = moment().format('YYYY-MM-DD hh:mm:ss'),
          sqlEditArticle = `update article set title='${title}',subTitle='${subTitle || ''}',
                            content='${content || ''}',date='${myDate}',author='${resQuery[0].username}' where id=${id}`
      await queryFn(sqlEditArticle)
      // 修改完后，返回给前端最新列表
      ctx.body = returnMsg(0, '文章修改成功')
    } else {
      // 文章不存在
      ctx.body = returnMsg(1, '当前编辑的文章不存在')
      return
    }
  } else {
    // 没有编辑权限
    ctx.body = returnMsg(1, '没有编辑权限')
    return
  }

})


module.exports = router
