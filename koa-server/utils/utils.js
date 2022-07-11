const mysql = require('mysql')
const jwt = require('jsonwebtoken')

// 开发环境
const host = 'http://127.0.0.1'
const port = 9000

// 生产环境
// const host = 'http://xxx'
// const port = xxx


/**
 * 创建数据库连接池
 * @type {Pool}
 */
const pool = mysql.createPool({
  host: "localhost",
  port: 3306,
  database: "meta_react_admin",
  user: "root",
  password: "19970122",
})


/**
 * 数据库进行增删改查操作的基础
 * @param sql
 * @param callback
 */
const query = (sql, callback) => {
  pool.getConnection(function(err,connection){
    connection.query(sql, function (err,rows) {
      callback(err,rows)
      connection.release()
    })
  })
}
// 调用方式： query('select * from user', (srr, data) => {})


/**
 *
 * 后端返回给前端的信息结构
 * @param errCode -  0代表请求成功， 1代表参数错误 2 代表请求错误
 * @param message - 请求结果信息
 * @param data - 返回给前端的数据
 */
const returnMsg = (errCode, message, data) => {
  return {
    errCode: errCode || 0,
    message: message || '',
    data: data || {}
  }
}


/**
 * 数据库操作的promise封装
 * @param sql
 * @returns {Promise<unknown>}
 */
const queryFn = (sql) => {
  return new Promise((resolve, reject) => {
    query(sql, (err, data) => {
      if (err) reject(err)
      resolve(data)
    })
  })
}


/**
 * 验证token是否合效
 * @param token
 * @returns {boolean}
 */
const jwtVerify = (token) => {
  try {
    // 解密token，得到username 和 password 和 token
    jwt.verify(token, 'lesenelir')
  } catch (e) {
    return false
  }
  return true
}


module.exports = {
  host,
  port,
  query,
  returnMsg,
  queryFn,
  jwtVerify
}

