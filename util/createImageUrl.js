const env = process.env.NODE_ENV || "development";
const config = require('../config/server.json')[env]
const { join } = require('path')

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
