const express = require('express')
require('./db/mongoose')
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