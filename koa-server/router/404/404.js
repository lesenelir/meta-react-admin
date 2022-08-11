const fs = require('node:fs')
const path = require('node:path')
const mime = require('mime-types')
const Router = require('koa-router')

const router = new Router()

// /404
router.get('/', async (ctx) => {
  // 读取静态资源返回给前端
  let filePath = path.join(__dirname, '../../assets/images/404.png'),
      file = fs.readFileSync(filePath),
      mimeTypes = mime.lookup(filePath) // 查看读取文件的类型
  ctx.set("content-type", mimeTypes) // 后端返回的类型
  ctx.body = file
})

module.exports = router
