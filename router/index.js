const express = require('express')
const router = express.Router()

// 文件相关路由
router.use('/file', require('./file'))

module.exports = router