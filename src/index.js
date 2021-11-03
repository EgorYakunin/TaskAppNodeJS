/* 
    Staring point for app file
*/

const express = require('express')
require('./db/mongoose')

const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')

const app = express()
const port = process.env.PORT

// server automaticaly parses incoming json
app.use(express.json())

// importing routers from other files
app.use(userRouter)
app.use(taskRouter)

// rendering title in browser
app.get('', (req, res) => {
    res.send('<h1 style="margin-top: 10em; text-align: center;">* Magic is happenig *</h1>')
})

// running the app
app.listen(port, () => {
    console.log('server is up on port: ' + port)
})