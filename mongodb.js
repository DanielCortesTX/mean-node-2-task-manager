const { MongoClient, ObjectID } = require('mongodb')
const connectionURL = require('./config/keys').mongoURI
const databaseName = 'task-manager'

MongoClient.connect(connectionURL, { useNewUrlParser: true }, (error, client) => {
  if(error){
    return console.log('Unable to connect to database')
  }
  const db = client.db(databaseName)

  db.collection('tasks').deleteOne({ 
    description: 'Pick up sticks'
  }).then((result) => {
    console.log(result)
  }).catch((error) => {
    console.log(error)
  })
})