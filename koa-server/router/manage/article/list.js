const Router = require('koa-router')
const {returnMsg, queryFn} = require('../../../utils/utils')

const router = new Router()

// manage/article/list
router.post('/', async (ctx) => {
  // 查询数据库中有多少条数据total
  let sql = `SELECT COUNT(*) AS 'ROWS' FROM article`
  let res = await queryFn(sql)
  let total = res[0].ROWS

  // 获取前端传过来的当前页码(current)和每页显示个数(counts)
  let {current, counts} = ctx.request.body
  // 确认前端传的参数
  if (!current || !counts) {
    ctx.body = returnMsg(1, '参数错误')
    return
  }
  // 去数据库查询对应的10条数据给前 端
  // 前端传过来页码 - 第2页数据 index=10 (current-1)*10
  let sqlSearch = `select id,title,subTitle,date from article LIMIT ${(current-1)*counts},${counts}`
  let resArr = await queryFn(sqlSearch)
  ctx.body = returnMsg(0, '分页查询成功', {
    current,
    counts,
    total,
    arr: resArr
  })


  // let sqlSearchAll = `select id,title,subTitle,date from article`
  // let res = await queryFn(sqlSearchAll)
  //
  // ctx.body = returnMsg(0, '文章列表获取成功', res)
})

module.exports = router
