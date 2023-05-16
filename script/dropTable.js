const { baseConfig: config } = require('../config/dbconfig')
const Sequelize = require('sequelize');

(function() {
  const sequelize = new Sequelize(config.database, config.username, config.password, config); 
  async function dropTable() {
    try {
      await sequelize.getQueryInterface().dropTable('Files');
      await sequelize.query('DELETE FROM `SequelizeMeta`')
      console.log('Table dropped successfully');
    } catch (error) {
      console.error('Error dropping table:', error);
    } finally {
      await sequelize.close();
    }
  }
  dropTable();
}());