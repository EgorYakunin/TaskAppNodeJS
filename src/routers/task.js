const express = require('express')
const router = new express.Router()

const Task = require('../models/task')

/*
    * Task
*/

// creates new task
router.post('/new-task', async (req, res) => {
    const task = new Task(req.body)

    try {
        await task.save()
        res.status(201).send(task)
    } catch (e) {
        res.status(400).send()
    }

})

// getting all tasks 
router.get('/tasks', async (req, res) => {
    try {
        const tasks = await Task.find({})
        res.send(tasks)
    } catch (e) {
        res.status(500).send(e)
    }
})

// getting task by its id
router.get('/tasks/:id', async (req, res) => {
    const _id = req.params.id

    try {
        const task = await Task.findById(_id)

        if (!task) {
            res.send(404).send()
        }

        res.send(task)
    } catch (e) {
        res.status(500).send()
    }
})

// updating tasks
router.patch('/tasks/:id', async (req, res) => {
    const _id = req.params.id

    const updates = Object.keys(req.body)
    const allowedUpdates = ['title', 'status']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({ error: 'invalid input' })
    }

    try {
        const task = await Task.findByIdAndUpdate(_id, req.body, { new: true, runValidators: true })

        if (!task) {
            return res.status(404).send()
        }

        res.send(task)
    } catch (e) {
        res.status(500).send(e)
    }

})

//deleting task
router.delete('/tasks/:id', async (req, res) => {
    const _id = req.params.id

    try {
        const deletedTask = await Task.findByIdAndDelete(_id)

        if (!deletedTask) {
            res.status(404).send()
        }

        res.send(deletedTask)
    } catch (e) {
        res.status(500).send(e)
    }
})

module.exports = router