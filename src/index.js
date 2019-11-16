const express = require('express')
require('./db/mongoose')
const User = require('./models/user')
const Task = require('./models/task')
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

const jwt = require('jsonwebtoken')

const myFunction = async () => {
  const token = jwt.sign({ _id: "dummyid"}, 'thisismytoken', { expiresIn: '0 seconds'})
  console.log(token)

  const data =  jwt.verify(token, 'thisismytoken')

  console.log(data)
}

myFunction()