const { baseConfig: config } = require('../config/dbconfig');
const Sequelize = require('sequelize');

// 测试与数据库的连接
(async function() {
  const sequelize = new Sequelize(config.database, config.username, config.password, config); 
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  } finally {
    sequelize.close();
  }
})();
