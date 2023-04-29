const { Op } = require('sequelize');
const { File, sequelize } = require('../models')

exports.updateFileOrders = async (order, insertAfter, insertBefore) => {
  const t = await sequelize.transaction(); // 开启事务
  try {
    if(insertAfter !== undefined) {
      // 1. 获取 order 到 insertAfter 之间所有的文件
      const filesToUpdate = await File.findAll({
        where: {
          order: {
            [Op.between]: [order, insertAfter]
          }
        },
        order: [['order', 'ASC']],
        transaction: t,
        lock: t.LOCK.UPDATE // 使用排它锁，避免并发更新问题
      });
  
      // 2. 依次更新这些文件的 order 值为它前一个文件的 order 值
      let prevOrder = insertAfter;
      for (const file of filesToUpdate) {
        const o = file.order
        await file.update({ order: prevOrder }, { transaction: t });
        prevOrder = o;
      }
    } else {
      // 1. 获取 insertBefore 到 order 之间所有的文件
      const filesToUpdate = await File.findAll({
        where: {
          order: {
            [Op.between]: [insertBefore, order]
          }
        },
        order: [['order', 'DESC']],
        transaction: t,
        lock: t.LOCK.UPDATE // 使用排它锁，避免并发更新问题
      });
  
      // 2. 依次更新这些文件的 order 值为它前一个文件的 order 值
      let prevOrder = insertBefore;
      for (const file of filesToUpdate) {
        const o = file.order
        await file.update({ order: prevOrder }, { transaction: t });
        prevOrder = o;
      }      
    }
    await t.commit(); // 提交事务
  } catch (error) {
    await t.rollback(); // 回滚事务
    throw error
  }
}