const express = require('express')
require('./db/mongoose')
const User = require('./models/user')
const Task = require('./models/task')
const userRouter = require('./router/user')
const taskRouter = require('./router/task')

const app = express()
const port = process.env.PORT || 3000

// parse incoming json to an object
app.use(express.json())
app.use(userRouter)
app.use(taskRouter)



app.listen(port, () => {
  console.log(`Server is up on port ${port}`)
})

const bcrypt = require('bcryptjs')

const myFunction = async () => {
  const password = 'Red12345!'
  // hashed password
  const hashedPassword = await bcrypt.hash(password, 8)

  console.log(password)
  console.log(hashedPassword)

  // figure if given password matches hashed in database
  const isMatch = await bcrypt.compare('Red12345!', hashedPassword)
  console.log(isMatch)
}

myFunction()