const express = require('express')
require('./db/mongoose')
const User = require('./models/user')
const Task = require('./models/task')

const app = express()
const port = process.env.PORT || 3000

// parse incoming json to an object
app.use(express.json())

// make a user
app.post('/users', async (req, res) => {
  const user = new User(req.body)

  try {
    await user.save()
    res.status(201).send(user)
  } catch (e) {
    res.status(400).send(e)
  }
})

// get all users

app.get('/users', async (req, res) => {
  try {
    const users = await User.find({})
    res.send(users)
  } catch (e) {
    res.status(500).send(e)
  }
})


// delete a specific user by id
app.get('/users/:id', async (req, res) => {
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

app.patch('/users/:id', async (req, res) => {
  const updates = Object.keys(req.body)
  const allowedUpdates = ['name', 'email', 'password', 'age']
  const isValidUpdate = updates.every((update) => allowedUpdates.includes(update))

  if(isValidUpdate){
    return res.status(400).send({ error: 'Invalid updates'})
  }

  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, { 
      new: true
    })

    if(!user){
      return res.status(404).send()
    }

    res.send(user)
  } catch (e) {
    res.status(400).send(e)
  }
})

// Delete a user

app.delete('/users/:id', async (req, res) => {
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

// make a task

app.post('/tasks', async (req, res) => {
  const task = new Task(req.body)

  try {
    await task.save()
    res.status(201).send(task)
  } catch (e) {
    res.status(400).send(e)
  }

})

// get all tasks

app.get('/tasks', async (req, res) => {
  try {
    const tasks = await Task.find({})
    res.send(tasks)
  } catch (e) {
    res.status(500).send(e)
  }
})

// get a task by id

app.get('/tasks/:id', async (req, res) => {
  const _id = req.params.id

  try {
    const task = await Task.findById(_id)
    if(!task){
      return res.status(404).send()
    }
    res.send(task)
  } catch (e) {
    res.status(500).send(e)
  }

})

// Update read and updte methods

app.patch('/tasks/:id', async (req, res) => {
  const updates = Object.keys(req.body)
  const allowedUpdates = ['description', 'completed']
  const isValidUpdate = updates.every((update) => allowedUpdates.includes(update))

  if(!isValidUpdate){
    return res.status(400).send({ error: 'Invalid updates'})
  }

  try {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, { 
      new: true,
      runValidators: true,
      useFindAndModify: false 
    })

    if(!task){
      return res.status(404).send()
    }

    await task.save()
    res.send(task)
  } catch (e) {
    res.status(400).send(e)
  }
})

app.delete('/tasks/:id', async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id)

    if(!task){
      return res.status(404).send()
    }

    res.send(task)
  } catch (e) {
    res.status(500).send()
  }
})

app.listen(port, () => {
  console.log(`Server is up on port ${port}`)
})