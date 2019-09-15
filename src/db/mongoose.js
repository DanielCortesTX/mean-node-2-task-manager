const mongoose = require('mongoose')
const connectionURL = require('../../config/keys').mongoURI

mongoose.connect(connectionURL, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
})