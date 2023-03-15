const util = require('util')

module.exports = () => {
  return (err, req, res, next) => {
    res.status(500).json({
      message: '服务器错误',
      code: 500
    })
    console.log(util.format(err))
  }
}
