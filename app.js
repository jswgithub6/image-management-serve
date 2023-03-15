const express = require('express')
const path = require('path')
const morgan = require('morgan')
const router = require('./router')
const errorHandler = require('./middleware/error-handler')
const app = express()
const env = process.env.NODE_ENV || "development";
const config = require("./config/server.json")[env];

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

app.listen(config.port, () => {
  console.log(`listen ${config.port} port`)
  console.log(`App running at: 
    http://${config.host}:${config.port}/app`
  )
})
