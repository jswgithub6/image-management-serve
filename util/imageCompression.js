const tinify = require("tinify")
const { parse, join } = require('path')
const { copyFile } = require('fs/promises')

const apiKey = process.env.TINIFY_API_KEY
tinify.key = apiKey
const regExp = /.(jpg|jpeg|png|WebP)$/i

// tinypng在线图片压缩  https://tinypng.com/developers/reference/nodejs
async function imageCompression(imgPath) { 
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

module.exports = imageCompression