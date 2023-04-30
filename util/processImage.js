const imageCompression = require("./imageCompression")
const uploadImageToImageHosting = require("./uploadImage")
const { parse } = require('path')
const { createFileURL, createThumbnailURL } = require('./createImageUrl.js')

// 压缩图片并生成图片的url
exports.processImage = async (imgPath) => {
  const { base: filename } = parse(imgPath)
  let url, thumbUrl
  try {
    // 将图片上传至图床 https://imgloc.com/
    // 图片会被压缩并储存在服务器上，返回图片的URL和缩略图的URL
    const { image, thumb } = await uploadImageToImageHosting(imgPath)
    url = image.url
    thumbUrl = thumb.url
  } catch {
    // 如果上传到图床失败，则使用 tinypng 压缩图片并存储在本地
    await imageCompression(imgPath)
    // 返回压缩后的图片的 URL 和缩略图的 URL
    url = createFileURL(filename)
    thumbUrl = createThumbnailURL(filename)
  }
  return {
    url, thumbUrl
  }
}
