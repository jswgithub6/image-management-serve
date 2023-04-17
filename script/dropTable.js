const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require('../config/dbconfig.json')[env];

(function() {
  const sequelize = new Sequelize(config.database, config.username, config.password, config); 
  async function dropTable() {
    try {
      await sequelize.getQueryInterface().dropTable('Files');
      await sequelize.query('DELETE FROM `sequelizemeta`')
      console.log('Table dropped successfully');
    } catch (error) {
      console.error('Error dropping table:', error);
    } finally {
      await sequelize.close();
    }
  }
  dropTable();
}());