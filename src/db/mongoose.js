const mongoose = require('mongoose')
const validator = require('validator')
const connectionURL = require('../../config/keys').mongoURI

mongoose.connect(connectionURL, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
})

const User = mongoose.model('User', {
  name: {
    type: String,
    required: true,
    trim: true
  }, 
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    validate(value){
      if(!validator.isEmail(value)) {
        throw new Error('Email is invalid')
      }
    }
  },
  age: {
    type: Number,
    default: 0,
    validate(value){
      if(value < 0){
        throw new Error('Age must be a positive number')
      }
    }
  },
  password: {
    type: String,
    required: true,
    trim: true,
    minLength: 7,
    validate(value){
      if (value.toLowerCase().includes('password')){
        throw new Error('password cannot contain password')
      }
    }
  }
})

const Task = mongoose.model('Task', {
  description: {
    type: String,
    required: true,
    trim: true
  }, 
  completed: {
    type: Boolean,
    default: false
  }
})

const me = new User({
 name: 'Jean    ',
 password: 'njnjnjnj',
 email: 'mike@gmail.com'
})

const task = new Task({
  description: 'yes sir'
})

task.save().then((user) => {
  console.log(user)
}).catch((error) => {
  console.log('Error!', error)
})