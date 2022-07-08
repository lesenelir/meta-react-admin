const mysql = require('mysql')

// 开发环境
const host = 'http://127.0.0.1'
const port = 9000

// 生产环境

// 创建数据库连接池
const pool = mysql.createPool({
  host: "localhost",
  port: 3306,
  database: "meta_react_admin",
  user: "root",
  password: "19970122",
})

//对数据库进行增删改查操作的基础
// 调用方式： query('select * from user', (srr, data) => {})
const query = (sql, callback) => {
  pool.getConnection(function(err,connection){
    connection.query(sql, function (err,rows) {
      callback(err,rows)
      connection.release()
    })
  })
}

/**
 *
 * 返回信息的结构
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

// 数据库操作的promise封装
const queryFn = (sql) => {
  return new Promise((resolve, reject) => {
    query(sql, (err, data) => {
      if (err) reject(er)
      resolve(data)
    })
  })
}


module.exports = {
  host,
  port,
  query,
  returnMsg,
  queryFn
}

