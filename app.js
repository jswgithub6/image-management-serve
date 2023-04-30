const loadEnv = require('./config/loadEnv')
loadEnv()
const express = require('express')
const path = require('path')
const morgan = require('morgan')
const router = require('./router')
const errorHandler = require('./middleware/error-handler')
const app = express()

const cors = require('cors')
app.use(cors())
app.use(morgan('dev'))
app.use(express.json())

const cacheTime = 5 * 60 * 1000
app.use(express.static(path.join(__dirname, 'public'), {
  maxAge: cacheTime
}))

app.use('/api', router)
app.use(errorHandler())

const config = {
  host: process.env.HOST,
  port: process.env.PORT
}
const ip = require('ip')

app.listen(config.port, () => {
  console.log(`App running at: 
  - Local:   http://${config.host}:${config.port}/app
  - Network: http://${ip.address()}:${config.port}/app`
  )
})
