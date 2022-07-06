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
const query = (sql, callback) => {
  pool.getConnection(function(err,connection){
    connection.query(sql, function (err,rows) {
      callback(err,rows)
      connection.release()
    })
  })
}

// query('select * from user', (srr, data) => {})

module.exports = {
  host,
  port,
  query
}

