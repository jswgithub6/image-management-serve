const dotenv = require('dotenv')
const path = require('path')

function loadEnv() {
  let envFilePath
  switch (process.env.NODE_ENV) {
    case 'development':
      envFilePath = '.env.development';
      break;
    case 'production':
      envFilePath = '.env.production';
      break;
    default:
      envFilePath = '.env';
  }
  const result = dotenv.config({ path: path.resolve(__dirname, envFilePath) });
  
  if (result.error) {
    throw result.error
  }
}

module.exports = loadEnv;