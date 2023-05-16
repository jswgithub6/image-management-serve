'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Files', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      filename: {
        type: Sequelize.STRING
      },
      mimetype: {
        type: Sequelize.STRING
      },
      originalname: {
        type: Sequelize.STRING
      },
      path: {
        type: Sequelize.STRING
      },
      url: {
        type: Sequelize.STRING
      },
      thumbnailUrl: {
        type: Sequelize.STRING
      },
      reviewStatus: {
        type: Sequelize.STRING,
        defaultValue: 'pending'
      },
      size: {
        type: Sequelize.INTEGER.UNSIGNED
      },
      isTop: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      weight: {
        type: Sequelize.STRING,
        defaultValue: '0',
      },
      order: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
    // 添加 beforeCreate 钩子函数
    await queryInterface.sequelize.transaction(async transaction => {
      await queryInterface.sequelize.query('ALTER TABLE `Files` AUTO_INCREMENT = 1', { transaction });
      await queryInterface.sequelize.query(`
        CREATE TRIGGER Files_before_insert_trigger BEFORE INSERT ON Files FOR EACH ROW
        BEGIN
          DECLARE max_order INT;
          SELECT MAX(\`order\`) INTO max_order FROM Files;
          SET NEW.\`order\` = IFNULL(max_order, 0) + 1;
        END;
      `, { transaction });
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Files');
  }
};