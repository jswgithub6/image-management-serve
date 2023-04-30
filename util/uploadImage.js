const axios = require('axios').default
const qs = require('qs');
const { fileToString } = require('./fileToString')
const apiKey = process.env.IMGLOC_API_KEY

async function uploadImageToImageHosting(imagePath) {
  try {
    const source = await fileToString(imagePath)
    const payload = qs.stringify({ source, key: apiKey }) 
    const { data } = await axios({
      baseURL: 'https://imgloc.com',
      url: '/api/1/upload',
      method: 'post',
      timeout: 0,
      headers: {
        'X-API-Key': apiKey,
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

module.exports = uploadImageToImageHosting