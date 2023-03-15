"use strict";
// 创建数据库
const env = process.env.NODE_ENV || "development";
const config = require("../config/dbconfig.json")[env];
const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: config.host,
  user: config.username,
  password: config.password,
});

// 数据库名
const database = config.database;
connection.execute(
  `create database if not exists ${database} default character set utf8mb4`,
  (err) => {
    if (err) throw err;
    console.log("Database created!");
    // 结束连接
    connection.end();
  }
);
