const Router = require('koa-router')
const path = require("path")
const multer = require('@koa/multer')
const jwt = require('jsonwebtoken')
const {returnMsg, queryFn, jwtVerify} = require('../../utils/utils')


const router = new Router()


// 存储文件的名称
let myFileName = ''

const storage = multer.diskStorage({
  //文件保存路径
  destination: path.join(__dirname, 'upload/'),
  //修改文件名称
  filename: (req, file, cb) => {
    myFileName = `${file.fieldname}-${Date.now().toString(16)}.${file.originalname.split('.').splice(-1)}`
    cb(null, myFileName)
  }
})

// 限制上传图片文件的规格
const limits = {
  fieldSize: 1024 * 1024, // 1mb
  fields: 1,
  files: 1
}

let upload = multer({storage, limits})

router.post('/', upload.single('avatar'), async (ctx) => {
  let token = ctx.request.headers.authorization

  // 鉴权
  if (!jwtVerify(token)) {
    ctx.body = returnMsg(2, '查询用户信息失败', 'token过期或用户不存在')
    return
  }

  // 鉴权成功
  let sqlUpdate = `update user set avatar='${myFileName}' where token='${token}'`
  await queryFn(sqlUpdate)

  // 重新查找数据，返回给前端
  let sqlSearchAll = `select username,avatar,token from user where token='${token}'`,
      res = await queryFn(sqlSearchAll)

  ctx.body = returnMsg(0, '上传成功', {
    avatar: res[0].avatar,
    token: res[0].token,
    username: res[0].username
  })
})


module.exports = router
