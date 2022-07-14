const Router = require('koa-router')
const {returnMsg, queryFn, jwtVerify} = require('../../utils/utils')

const router = new Router()


// 获取小编列表
// /manage/namelist
router.get('/', async (ctx) => {
  let token = ctx.request.headers.authorization
  // 鉴权
  if (!jwtVerify(token)) {
    ctx.body = returnMsg(2, '查询用户信息失败', 'token过期或用户不存在')
    return
  }

  // 读取数据库中所有的用户
  let sqlSearchAll = `select avatar,editable,id,username from user where role!='vip'`
  let res = await queryFn(sqlSearchAll)
  ctx.body = returnMsg(0, '列表请求成功', res)
})


// 修改编辑权限
// /manage/namelist
router.post('/', async (ctx) => {
  let token = ctx.request.headers.authorization
  // 鉴权
  if (!jwtVerify(token)) {
    ctx.body = returnMsg(2, '查询用户信息失败', 'token过期或用户不存在')
    return
  }
  // 根据前端传递过来的id，修改用户的编辑权限
  // 开通编辑权限 open===1  关闭编辑权限 open===2
  let {id, open} = ctx.request.body
  if (!id || !open) {
    ctx.body = returnMsg(1, '参数错误')
  }
  // 根据id查询
  let sqlSearchEditable = `select editable from user where id=${id}`
  let res = await queryFn(sqlSearchEditable)
  // 如果该用户已经有编辑权限，同时前端还想开通该用户的编辑权限open===1
  if (res[0].editable === 1 && open === 1) {
    ctx.body = returnMsg(2, '该用户已有编辑权限')
    return
  }
  // 如果用户没有编辑权限，同时前端不想开通该用户的编辑权限open=== 2
  if (res[0].editable === 0 && open === 2) {
    ctx.body = returnMsg(2, '该用户没有编辑权限')
    return
  }
  // 修改用户编辑权限
  let sqlUpdate = `update user set editable=${open}`
  await queryFn(sqlUpdate)
  ctx.body = returnMsg(0, '用户编辑权限修改成功')

})

module.exports = router
