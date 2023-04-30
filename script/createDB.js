const { baseConfig: config } = require('../config/dbconfig')
const mysql = require("mysql2")

const connection = mysql.createConnection({
  host: config.host,
  user: config.username,
  password: config.password,
  port: config.port
})

// 创建数据库
connection.execute(
  `create database if not exists ${config.database} default character set utf8mb4`,
  (err) => {
    if (err) throw err;
    console.log("Database created!")
    // 结束连接
    connection.end()
  }
)
