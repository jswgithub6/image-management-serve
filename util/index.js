const env = process.env.NODE_ENV || "development";
const config = require('../config/server.json')[env]

exports.createFileURL = (filename) => {
  return `http://${config.host}:${config.port}/files/${filename}`
}

exports.createThumbnailURL = (filename) => {
  return `http://${config.host}:${config.port}/thumbnail/${filename}`
}
