const tinify = require("tinify")
const path = require('path')
// tinypng在线图片压缩 
// 文档https://tinypng.com/developers/reference/nodejs
const apiKey = require(path.join(__dirname + '/../config/tinify.json')).key
tinify.key = apiKey

module.exports = function(origin, dest) { 
  return new Promise((resolve, reject) => {
    const source = tinify.fromFile(origin)
    // 这里先简单设置成固定大小
    // 和前端展示的大小保持一致
    const resized = source.resize({
      method: "thumb",
      width: 240,
      height: 165
    })
    resized.toFile(dest).then(resolve).catch(reject)
  })
}
