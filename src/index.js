/* 
    Staring point for app file
*/

const express = require('express')
require('./db/mongoose')
const User = require('./models/user')
const Task = require('./models/task')

const app = express()
const port = process.env.PORT || 6969

// server automaticaly parses incoming json
app.use(express.json())

// rendering title in browser
app.get('', (req, res) => {
    res.send('<h1 style="margin-top: 10em; text-align: center;">* Magic is happenig *</h1>')
})

// response is the list of all users
app.get('/users', (req, res) => {
    User.find({}).then((users) => {
        res.send(users)
    }).catch(() => {
        res.status(500).send()
    })
})

// getting user by its id
app.get('/users/:id', (req, res) => {
    // req.params.id -> :id from line above
    const _id = req.params.id
    
    User.findById(_id).then((user) => {
        if (!user) {
            return res.status(404).send()
        }

        res.send(user)
    }).catch((e) => {
        res.status(500).send()
    })
})

// getting all tasks 
app.get('/tasks', (req, res) => {
    Task.find({}).then((tasks) => {
        res.send(tasks)
    }).catch(() => {
        res.status(500).send()
    })
})

// getting task by its id
app.get('/tasks/:id', (req, res) => {
    const _id = req.params.id
    
    Task.findById(_id).then((task) => {
        if (!task) {
            return res.status(404).send()
        }
        res.send(task)
    }).catch(() => {
        res.status(500).send()
    })
})

// creates new user
app.post('/users', (req, res) => {
    const user = new User(req.body)

    user.save().then(() => {
        res.status(201).send(user)
    }).catch((e) => {
        res.status(400).send(e)
    })
})

// creates new task
app.post('/new-task', (req, res) => {
    const task = new Task(req.body)

    task.save().then(() => {
        res.status(201).send(task)
    }).catch((e) => {
        res.status(400).send(e)
    })
})

// running the app
app.listen(port, () => {
    console.log('server is up on port: ' + port)
})
