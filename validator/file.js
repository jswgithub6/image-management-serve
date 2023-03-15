const { param } = require('express-validator')
const { 
  validate, 
  validateFileIsExist, 
  validatePageInfo } = require('../middleware/validate')
const { File } = require('../models')

exports.delete = [validate([
  param('id').notEmpty().custom(async (id, {
    req
  }) => {
    const file = await File.findByPk(id)
    if (!file) {
      return Promise.reject('文件不存在')
    }
    req.file = file
  })
]), validateFileIsExist]


exports.updateStatus = [validate([
  param('id').notEmpty().custom(async (id, {
    req
  }) => {
    const file = await File.findByPk(id)
    if (!file) {
      return Promise.reject('图片不存在')
    }
    req.file = file
  }),
  param('status').notEmpty().custom(async (status, {
    req
  }) => {
    if(!['reject', 'pass'].includes(status)) {
      return Promise.reject('状态错误')
    }
    req.reviewStatus = status
  }),
])]

exports.get = validate([
  validatePageInfo('pageNumber'),
  validatePageInfo('pageSize')
])