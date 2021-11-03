const express = require('express')
const auth = require('../middleware/auth')
const router = new express.Router()

const Task = require('../models/task')

/*
    * Task
*/

// creates new task
router.post('/new-task', auth, async (req, res) => {
    const task = new Task({
        ...req.body,
        owner: req.user._id
    })

    try {
        await task.save()
        res.status(201).send(task)
    } catch (e) {
        res.status(400).send()
    }

})

// getting all tasks 
router.get('/tasks', auth, async (req, res) => {
    const match = {}
    const sort = {}

    if (req.query.completed) {
        match.status = req.query.completed === 'true'
    }

    if (req.query.sortBy) {
        const parts = req.query.sortBy.split(':')
        sort[parts[0]] = parts[1] === 'desc' ? -1 : 1
    }

    try {
        await req.user.populate({
            path: 'tasks',
            match,
            options: {
                limit: parseInt(req.query.limit),
                skip: parseInt(req.query.skip),
                // short syntax here: sort: sort
                sort
            }
        })
        res.send(req.user.tasks)
    } catch (e) {
        res.status(500).send(e)
    }
})

// getting task by its id
router.get('/tasks/:id', auth, async (req, res) => {
    const _id = req.params.id

    try {
        const task = await Task.findOne({ _id, owner: req.user._id })

        if (!task) {
            res.send(404).send()
        }

        res.send(task)
    } catch (e) {
        res.status(500).send()
    }
})

// updating tasks
router.patch('/tasks/:id', auth, async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['title', 'status']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({ error: 'invalid input' })
    }

    try {
        const task = await Task.findOne({ _id: req.params.id, owner: req.user._id })

        if (!task) {
            return res.status(404).send()
        }

        updates.forEach((update) => task[update] = req.body[update])
        await task.save()
        res.send(task)
    } catch (e) {
        res.status(500).send(e)
    }

})

//deleting task
router.delete('/tasks/:id', auth, async (req, res) => {
    const _id = req.params.id

    try {
        const deletedTask = await Task.findOne({ _id, owner: req.user._id })

        if (!deletedTask) {
            return res.status(404).send()
        }

        await deletedTask.remove()
        res.send(deletedTask)
    } catch (e) {
        res.status(500).send(e)
    }
})

module.exports = router