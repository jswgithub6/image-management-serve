const multer = require('multer')
const path = require('path')
const crypto = require('crypto')

const upload = function (filed = '/') {
  return multer({
    storage: multer.diskStorage({
      destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '../public', filed))
      },
      filename: function (req, file, cb) {
        const name = file.originalname.split('.')
        const suffix = name[1] ? '.' + name[1] : ''
        crypto.randomBytes(16, function (err, raw) {
          cb(err, err ? undefined : raw.toString('hex') + suffix)
        })
      }
    })
  })
}

module.exports = upload