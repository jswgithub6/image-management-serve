const tinify = require("tinify")
const path = require('path')
// tinypng在线图片压缩 
// 文档https://tinypng.com/developers/reference/nodejs
const apiKey = require(path.join(__dirname + '/../config/tinify.json')).key
tinify.key = apiKey
const { parse, join } = require('path')
const { copyFile } = require('fs/promises')

const regExp = /.(jpg|jpeg|png|WebP)$/i

module.exports = async (imgPath) => { 
  try {
    const { ext, base: filename } = parse(imgPath)
    const dest = join(__dirname, '../public/thumbnail', filename)
    // tinypng只能压缩png、jpg、webp
    const canCompression = regExp.test(ext) 
    if(canCompression) {
      const source = tinify.fromFile(imgPath)
      // 简单设置成固定大小
      // 和前端展示的大小保持一致
      const resized = source.resize({
        method: "thumb",
        width: 240,
        height: 165
      })
      await resized.toFile(dest)
    } else {
      await copyFile(imgPath, dest)
    }

  } catch (error) {
    throw error
  }
}
