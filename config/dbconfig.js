require('./loadEnv')();

const baseConfig = {
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  dialect: "mysql",
  timezone: "+08:00",
  dialectOptions: {
    dateStrings: true,
    typeCast: true
  }
}

module.exports = {
  baseConfig,
  development: baseConfig,
  production: baseConfig
}