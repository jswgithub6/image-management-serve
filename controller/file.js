const { File } = require('../models')
const { unlink } = require('fs/promises')
const { createFileURL, createThumbnailURL } = require('../util')
const imageCompression = require('../util/imageCompression')
const path = require('path')
// 文件上传
exports.uploadFile = async (req, res, next) => {
  try {
    const filename = req.file.filename
    // 原图片的url
    req.file.url = createFileURL(filename)
    let thumbnailUrl = req.file.url
    // 如果图片格式满足tinypng的压缩要求
    // 调用tinypng的api压缩图片
    if((/.(jpg|jpeg|png|WebP)$/i).test(filename)) {
      await imageCompression(req.file.path, path.join(__dirname, '../public/thumbnail', filename))
      thumbnailUrl = createThumbnailURL(filename)
    }
    // 压缩后图片的url
    req.file.thumbnailUrl = thumbnailUrl
    // 表示图片待审核
    req.file.reviewStatus = 'pending' 
    const file = await File.create(req.file)
    res.status(201).json({
      message: '文件上传成功',
      file
    })
  } catch (err) {
    next(err)
  }
}

// 获取文件列表
exports.fetchFileList = async (req, res, next) => {
  try {
    const { pageNumber, pageSize } = req.query
    const options = {
      order: [['id', 'DESC']]
    }
    if(pageNumber && pageSize) {
      Object.assign(options, {
        offset: (pageNumber - 1) * pageSize,
        limit: pageSize
      })
    }
    const { count, rows: files } = await File.findAndCountAll(options)
    res.status(200).json({
      message: 'ok',
      data: { files, count }
    })
  } catch (err) {
    next(err)
  }
}
// 获取文件列表
exports.fetchAllPassFileList = async (req, res, next) => {
  try {
    const { pageNumber, pageSize } = req.query
    const options = {
      order: [['id', 'DESC']],
      where: {
        reviewStatus: 'pass'
      }
    }
    if(pageNumber && pageSize) {
      Object.assign(options, {
        offset: (pageNumber - 1) * pageSize,
        limit: pageSize
      })
    }
    const { count, rows: files } = await File.findAndCountAll(options)
    res.status(200).json({
      message: 'ok',
      data: { files, count }
    })
  } catch (err) {
    next(err)
  }
}

// 删除文件接口
exports.deleteFile = async (req, res, next) => {
  try {
    const path = req.file.path
    if(req.file.exist) {
      // 删除文件
      await unlink(path)
    }
    // 删除数据库记录
    await req.file.destroy()
    res.status(204).end()
  } catch (err) {
    next(err)
  }
}

// 更新图片状态接口
exports.updateStatus = async (req, res, next) => {
  try {
    const reviewStatus = req.reviewStatus
    await req.file.update({
      reviewStatus
    })
    res.status(201).json({
      message: '审核状态更新成功'
    })
  } catch (err) {
    next(err)
  }
}