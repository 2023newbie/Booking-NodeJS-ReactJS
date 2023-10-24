const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

const clientRoutes = require('./routes/client')
const adminRoutes = require('./routes/admin')

const app = express()

app.use(express.json())
app.use(cors())

// route
app.use('/admin', adminRoutes)
app.use(clientRoutes)

// connect database
mongoose
  .connect(
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster1.opblshg.mongodb.net/${process.env.DB_DEFAULT_DATABASE}?retryWrites=true&w=majority`
  )
  .then(() => app.listen(5000))
  .catch(err => console.log(err))
