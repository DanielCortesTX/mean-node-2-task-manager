const jwt = require('jsonwebtoken')
const User = require('../models/user')

const auth = async (req, res, next) => {
  try {
    // get request for header
    const token = req.header('Authorization').replace('Bearer ', '')

    // ensure token is valid
    const decoded = jwt.verify(token, 'thisisthenewcorse')

    const user = await User.findOne({ _id: decoded._id, 'tokens.token': token })

    if(!user){
      throw new Error()
    }

    req.user = user
    next()
  } catch (e) {
    res.status(401).send({ error: 'Please Authenticate'})
  }
}

module.exports = auth