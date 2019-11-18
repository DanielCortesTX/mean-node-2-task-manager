const express = require('express')
require('./db/mongoose')
const User = require('./models/user')
const userRouter = require('./router/user')
const taskRouter = require('./router/task')

const app = express()
const port = process.env.PORT || 3000

// app.use((req, res, next) => {
//   if(req.method === 'GET'){
//     res.send('GET requests are disabled')
//   } else {
//     next()
//   }
// })

// parse incoming json to an object
app.use(express.json())
app.use(userRouter)
app.use(taskRouter)


app.listen(port, () => {
  console.log(`Server is up on port ${port}`)
})

const Task = require('./models/task')

const main = async () => {
  // const task = await Task.findById('5dd1eb707a3aba09303a98a1')
  // // get entire owner from the task they made
  // await task.populate('owner').execPopulate()
  // console.log(task)

  const user = await User.findById('5dd1ea7966cdb746a4dcdc6d')
  await user.populate('tasks').execPopulate()
  console.log(user.tasks)
}
 
main()