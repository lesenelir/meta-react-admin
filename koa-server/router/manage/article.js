const Router = require('koa-router')
const moment = require('moment')
const {returnMsg, queryFn, jwtVerify} = require('../../utils/utils')

const router = new Router()

// manage/article/list
router.get('/list', async (ctx) => {
  let sqlSearchAll = `select id,title,subTitle,date from article`
  let res = await queryFn(sqlSearchAll)

  ctx.body = returnMsg(0, '文章列表获取成功', res)
})


// 文章编辑提交
// manage/article/list/edit
router.post('/list/edit', async (ctx) => {
  let token = ctx.request.headers.authorization
  // 鉴权失败
  if (!jwtVerify(token)) {
    ctx.body = returnMsg(2, '查询用户信息失败', 'token过期或用户不存在')
    return
  }
  // 从token中查看是否有编辑权限
  let sqlEditable = `select editable from user where token='${token}'`,
      res = await queryFn(sqlEditable)

  if (res[0].editable === 1) {
    // 有编辑权限
    let {id} = ctx.request.body,
        sqlSearch = `select * from article where id=${id}` // 查询数据库中是否有该文章

    let res = await queryFn(sqlSearch)
    if (res.length > 0) {
      // 有该文章，进行修改这篇文章的值
      let myDate = moment().format('YYYY-MM-DD hh:mm:ss'),
          sqlEditArticle = `update article set title='${title}',subTitle='${subTitle}',
                            content='${content}',date='${myDate}',author='${author}' where id=${id}`
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


// 文章添加
// manage/article/list/add
// router.post('/list/add')



module.exports = router
