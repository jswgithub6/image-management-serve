const { Op } = require('sequelize');
const { File, sequelize } = require('../models')

exports.updateFileProperty = async (prop, value, insertAfter, insertBefore) => {
  const t = await sequelize.transaction();
  try {
    const [start, end, orderDir] = insertAfter !== undefined
      ? [value, insertAfter, 'ASC']
      : [insertBefore, value, 'DESC'];

    const filesToUpdate = await File.findAll({
      where: {
        [prop]: {
          [Op.between]: [start, end]
        }
      },
      order: [[prop, orderDir]],
      transaction: t,
      lock: t.LOCK.UPDATE
    });

    let newValue = insertAfter !== undefined ? insertAfter : insertBefore;
    for (const file of filesToUpdate) {
      const oldValue = file[prop];
      await file.update({ [prop]: newValue }, { transaction: t });
      newValue = oldValue;
    }

    await t.commit();
  } catch (error) {
    console.error(error);
    await t.rollback();
    throw new Error(`更新文件 ${prop} 失败`);
  }
}