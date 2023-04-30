const { join } = require('path')
const config = {
  host: process.env.HOST,
  port: process.env.PORT
}

exports.createFileURL = (filename) => {
  const relativePath = join('files', filename);
  const url = `http://${config.host}:${config.port}/${relativePath}`
  return url
}

exports.createThumbnailURL = (filename) => {
  const relativePath = join('thumbnail', filename);
  const url = `http://${config.host}:${config.port}/${relativePath}`
  return url
}
