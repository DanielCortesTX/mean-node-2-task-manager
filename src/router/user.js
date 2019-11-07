const express = require('express')
const User = require('../models/user')
const bcrypt = require('bcryptjs')
const router = new express.Router()

// make a user
router.post('/users', async (req, res) => {
  const user = new User(req.body)

  try {
    await user.save()
    res.status(201).send(user)
  } catch (e) {
    res.status(400).send(e)
  }
})

// get all users

router.get('/users', async (req, res) => {
  try {
    const users = await User.find({})
    res.send(users)
  } catch (e) {
    res.status(500).send(e)
  }
})


// get a specific user by id
router.get('/users/:id', async (req, res) => {
  const _id = req.params.id

  try {
    const user = await User.findById(_id)
    if(!user) {
      return res.status(404).send()
    }

    res.send(user)
  } catch (e) {
    res.status(500).send(e)
  }
})

// Update read and updte methods

router.patch('/users/:id', async (req, res) => {
  const updates = Object.keys(req.body)
  const allowedUpdates = ['name', 'email', 'password', 'age']
  const isValidUpdate = updates.every((update) => allowedUpdates.includes(update))

  if(!isValidUpdate){
    return res.status(400).send({ error: 'Invalid updates'})
  }

  try {
    // find by id and update bypasses mongoose
    const user = await User.findById(req.params.id)

    updates.forEach((update) => user[update] = req.body[update])
    await user.save()

    // const user = await User.findByIdAndUpdate(req.params.id, req.body, { 
    //   new: true
    // })

    if(!user){
      return res.status(404).send()
    }

    res.send(user)
  } catch (e) {
    res.status(400).send(e)
  }
})

// Delete a user

router.delete('/users/:id', async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id)

    if(!user){
      return res.status(404).send()
    }

    res.send(user)
  } catch (e) {
    res.status(500).send()
  }
})



module.exports = router