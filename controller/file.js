const { File } = require('../models')
const { unlink } = require('fs/promises')
const Sequelize = require('sequelize')
const { updateFileProperty } = require('./sort')
const { processImage } = require('../util/processImage')

// 文件上传
exports.uploadFile = async (req, res, next) => {
  try {
  const filePath = req.file.path
  const { url, thumbUrl } = await processImage(filePath)
  // 原图url和缩略图url
  req.file.url = url
  req.file.thumbnailUrl = thumbUrl
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
      order: [
        Sequelize.literal('isTop DESC'), // isTop 为 true 的在前面
        Sequelize.literal('CASE WHEN isTop THEN weight ELSE NULL END DESC'), // isTop 为 true 时按照 weight 排序
        ['order', 'DESC'] // isTop 为 false 时，按照 order 排序
      ],
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
      order: [
        Sequelize.literal('isTop DESC'), // isTop 为 true 的在前面
        Sequelize.literal('CASE WHEN isTop THEN weight ELSE NULL END DESC'), // isTop 为 true 时按照 weight 排序
        ['order', 'DESC'] // isTop 为 false 时，按照 id 排序
      ],
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

// 图片置顶
exports.setTop = async (req, res, next) => {
  try {
    await req.file.update({
      isTop: true,
      // 如果多张图都被置顶了
      // 后置顶的权重应该更大
      weight: Date.now().toString()
    })
    res.status(201).json({
      message: '置顶成功'
    })
  } catch (err) {
    next(err)
  }
}

// 取消置顶
exports.cancelTop = async (req, res, next) => {
  try {
    await req.file.update({
      isTop: false,
      weight: 0
    })
    res.status(201).json({
      message: '取消置顶'
    })
  } catch (err) {
    next(err)
  }
}


exports.sortFile = async (req, res, next) => {
  try {
    const { id, order, insertBefore, insertAfter } = req.body
    const file = await File.findByPk(id, { raw: true })
    const isTop = file.isTop
    const prop = isTop ? 'weight' : 'order'
    const value = isTop ? file.weight : order

    const insertValue = insertBefore ?? insertAfter
    const insertFile = await File.findOne({ where: { order: insertValue }, raw: true })
    const insertBeforeValue = insertBefore !== undefined ? insertFile[prop] : undefined;
    const insertAfterValue = insertBefore === undefined ? insertFile[prop] : undefined;

    await updateFileProperty(prop, value, insertAfterValue, insertBeforeValue)

    res.status(201).json({
      message: '排序成功'
    })
  } catch (err) {
    next(err)
  }
}

