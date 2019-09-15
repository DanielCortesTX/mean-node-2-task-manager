// const mongodb = require('mongodb')
// const MongoClient = mongodb.MongoClient
// const ObjectID = mongodb.ObjectID
const { MongoClient, ObjectID } = require('mongodb')
const connectionURL = require('./config/keys').mongoURI
const databaseName = 'task-manager'

MongoClient.connect(connectionURL, { useNewUrlParser: true }, (error, client) => {
  if(error){
    return console.log('Unable to connect to database')
  }
  const db = client.db(databaseName)

  // db.collection('users').findOne({ _id: new ObjectID("5d7d24dd2b5b337744c59bc9") }, (error, user) => {
  //   if(error) {
  //     return console.log(error)
  //   }

  //   console.log(user)
  // })

  // db.collection('users').find({age: 30}).toArray((error, users) => {
  //   if(error) {
  //     return console.log(error)
  //   }

  //   console.log(users)
  // })

  // db.collection('users').find({age: 30}).count((error, count) => {
  //   if(error) {
  //     return console.log(error)
  //   }

  //   console.log(count)
  // })
  ///////////////////////////////////////

  db.collection('tasks').findOne({ _id: new ObjectID("5d7d8f2c77cf254d9ce63336") }, (error, task) => {
    if(error) {
      return console.log(error)
    }

    console.log(task)
  })

  db.collection('tasks').find({completed: true}).toArray((error, tasks) => {
    if(error) {
      return console.log(error)
    }

    console.log(tasks)
  })
})