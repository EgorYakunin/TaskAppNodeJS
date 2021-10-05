const express = require('express')
const router = new express.Router()

const User = require('../models/user')

/*
    * User
*/

// creates new user
router.post('/users', async (req, res) => {
    const user = new User(req.body)

    try {
        await user.save()
        res.status(201).send(user)
    } catch (e) {
        res.status(400).send(e)
    }
})

// response is the list of all users
router.get('/users', async (req, res) => {
    try {
        const users = await User.find({})
        res.send(users)
    } catch (e) {
        res.status(500).send()
    }
})

// getting user by its id
router.get('/users/:id', async (req, res) => {
    // req.params.id -> :id from line above
    const _id = req.params.id

    try {
        const user = await User.findById(_id)

        if (!user) {
            return res.status(404).send()
        }
        res.send(user)
    } catch (e) {
        res.status(500).send()
    }
})

// updating users
router.patch('/users/:id', async (req, res) => {
    const _id = req.params.id

    // getting what was provided in req.body in array of strings with Object.keys()
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'email', 'password', 'age']
    // checking if provided in req.body properties are included in allowedUpdates array
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    // actual check, returns error if input data is invalid
    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' })
    }

    try {
        const user = await User.findById(_id)
        updates.forEach((update) => user[update] = req.body[update])
        await user.save()

        if (!user) {
            return res.status(404).send()
        }
        res.send(user)
    } catch (e) {
        res.status(400).send(e)
    }
})

// deleting users
router.delete('/users/:id', async (req, res) => {
    const _id = req.params.id

    try {
        const deletedUser = await User.findByIdAndDelete(_id)

        if (!deletedUser) {
            return res.status(404).send()
        }
        res.send(deletedUser)
    } catch (e) {
        res.status(500).send()
    }
})

module.exports = router