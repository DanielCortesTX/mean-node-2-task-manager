const express = require('express')
const Task = require('../models/task')
const auth  = require("../middleware/auth")
const router = new express.Router()

// make a task

router.post('/tasks', auth, async (req, res) => {
  const task = new Task({
    ...req.body,
    owner: req.user._id
  })

  try {
    await task.save()
    res.status(201).send(task)
  } catch (e) {
    res.status(400).send(e)
  }

})

// get all tasks

router.get('/tasks', auth, async (req, res) => {
  try {
    const tasks = await Task.find({ owner: req.user._id})
    // or
    // await req.user.populate('tasks').execPopulate()
    // es.send(req.user.tasks)
    res.send(tasks)
  } catch (e) {
    res.status(500).send(e)
  }
})

// get a task by id

router.get('/tasks/:id', auth, async (req, res) => {
  const _id = req.params.id

  try {
    // make sure person logged in made the task.
    const task = await Task.findOne({ _id, owner: req.user._id})

    if(!task){
      return res.status(404).send()
    }
    res.send(task)
  } catch (e) {
    res.status(500).send(e)
  }

})

// Update read and updte methods

router.patch('/tasks/:id', auth, async (req, res) => {
  const updates = Object.keys(req.body)
  const allowedUpdates = ['description', 'completed']
  const isValidUpdate = updates.every((update) => allowedUpdates.includes(update))

  if(!isValidUpdate){
    return res.status(400).send({ error: 'Invalid updates'})
  }

  try {
    const task = await Task.findOne({ _id: req.params.id, owner: req.user._id})

    if(!task){
      return res.status(404).send()
    }

    updates.forEach((update) => user[update] = req.body[update])
    await task.save()
    res.send(task)

    // const task = await Task.findByIdAndUpdate(req.params.id, req.body, { 
    //   new: true,
    //   runValidators: true,
    //   useFindAndModify: false 
    // })
  } catch (e) {
    res.status(400).send(e)
  }
})

router.delete('/tasks/:id', auth, async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({ _id: req.params.id, owner: req.user._id})

    if(!task){
      return res.status(404).send()
    }

    res.send(task)
  } catch (e) {
    res.status(500).send()
  }
})

module.exports = router