const mongodb = require('mongodb')
const MongoClient = mongodb.MongoClient
const connectionURL = require('./config/keys').mongoURI

const databaseName = 'task-manager'

MongoClient.connect(connectionURL, { useNewUrlParser: true }, (error, client) => {
  if(error){
    return console.log('Unable to connect to database')
  }

  console.log(`Connected to correctly!!`)
  const db = client.db(databaseName)

  db.collection('users').insertOne({
    name: 'post init',
    age: 30
  })
})