const { validationResult, buildCheckFunction } = require('express-validator')
const { access } = require('fs/promises')

exports.validate = validations => {
  return async (req, res, next) => {
    for (let validation of validations) {
      const result = await validation.run(req)
      if (result.errors.length) break;
    }
    const errors = validationResult(req)
    if (errors.isEmpty()) {
      return next()
    }
    res.status(400).json({
      message: errors.array()[0].msg
    })
  }
}

exports.validatePageInfo = (fields) => {
  return buildCheckFunction(['query'])(fields).custom(async value => {
    // 如果有pageNumber和pageSize
    if(value) {
      // 验证pageNumber和pageSize是否合法
      const _value = Number(value)
      if(isNaN(_value) || _value <= 0) {
        return Promise.reject('非法参数')
      }
    }
  })
  .customSanitizer(value => {
    // 将pageNumber和pageSize转化为数字
    return (value ? Number(value) : value)
  })
}

exports.validateFileIsExist = async (req, res, next) => {
  try {
    // 验证文件是否存在
    await access(req.file.path)
    req.file.exist = true
  } catch {
    req.file.exist = false
  }
  next()
}


