/**
 *  配置环境变量
 *
 *  npm start -> NODE_ENV: development
 *  npm build -> NODE_ENV: production
 *  npm test  -> NODE_ENV: test
 *
 *
 *  SERVER_PORT      服务器+端口
 *  SERVER_PORT_IMG  图片的前缀路径
 *
 */
const env = process.env.NODE_ENV,
      urlDev = 'http://localhost:9000',
      urlDevImg = 'http://localhost:9000/images/'

let SERVER_PORT,
    SERVER_PORT_IMG


if (env === 'development') {
  // 生产环境
  SERVER_PORT = urlDev
  SERVER_PORT_IMG = urlDevImg
} else if (env === 'production') {
  // 开发环境
}

export {
  SERVER_PORT,
  SERVER_PORT_IMG
}
