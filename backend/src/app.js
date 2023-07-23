const express = require('express')
const app = express()
const cors = require('cors');

require('./db/mongoos')

const imageRouter = require('./routers/imageRouter');
const userRouter = require('./routers/userRouter')
const albumRouter = require('./routers/albumRouter')

app.use(cors())
app.use(express.json())
app.use(express.urlencoded())
app.use(express.static('uploads'));
app.use(imageRouter)
app.use(userRouter)
app.use(albumRouter)

module.exports = app