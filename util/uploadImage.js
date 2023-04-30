const { fileToString } = require('./fileToString')
const axios = require('axios').default
const key =
  "chv_lt3c_4ad8c125fde4e17be63834d5bbaa502210729d0669c55664357ab006dde7d5b9a9a4294eb3a5775c1faf8730ead9e7b30feb13eb46013e7c6c5925ede18403c5";

const qs = require('qs');

exports.uploadImageToImageHosting = async (imagePath) => {
  try {
    const source = await fileToString(imagePath)
    const payload = qs.stringify({ source, key }) 
    const { data } = await axios({
      baseURL: 'https://imgloc.com',
      url: '/api/1/upload',
      method: 'post',
      timeout: 0,
      headers: {
        'X-API-Key': key,
      },
      data: payload
    })
    if(data.status_code !== 200) {
      throw data
    }
    return data.image
  } catch (error) {
    throw error
  }
}
