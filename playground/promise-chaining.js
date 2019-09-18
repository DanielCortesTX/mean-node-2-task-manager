require('../src/db/mongoose')
const User = require('../src/models/user')

// User.findByIdAndUpdate('idmmmm', { age: 1 }).then((user) => {
//   console.log(user)
//   return User.countDocuments({ age: 1 })
// }).then((result) => {
//   console.log(result)
// }).catch((e) => {
//      console.log(e)
// })



// const add = (a,b) => {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       resolve(a +b)
//     }, 2000)
//   })
// }

// add(1,2).then((sum) => {
//   console.log(sum)

//   add(sum, 5).then((sum2) => {
//     console.log(sum2)
//   }).catch((e) => {
//   console.log(e)
// })
// }).catch((e) => {
//   console.log(e)
// })

// add(1,2).then((sum) => { 
//   console.log(sum)
//   return add(sum,4)
// }).then((sum2) => {
//   console.log(sum2)
// }).catch((e) => {
//   console.log(e)
// })