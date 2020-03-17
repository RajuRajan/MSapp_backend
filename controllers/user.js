const modal = require('../models')

class User {


  loginUser(req) {
    return new Promise(async (resolve, reject) => {
      try {
        const { email, password } = req.body;
        const responce = await modal.user.findOne({ where: { email: email } })
        if (responce !== null) {
          if (responce.password === password) {
            resolve({ 'id': responce.id, code: 200 })
          }
          else {
            resolve({ error_message: "Wrong password... Try Again", code: 404 })
          }
        }
        else {
          resolve({ error_message: "Account not found", code: 404 })
        }
      }
      catch (err) {
        resolve({ error_message: "something went wrong", code: 500 })
      }
    })
  }

  signUpUser(req) {
    return new Promise(async (resolve, reject) => {
      try {
        const { firstName, lastName, email, password, phoneNo, workKnown, captain } = req.body;
        const responce = modal.user.create({ firstName, lastName, email, password, phoneNo, workKnown, captain })
        resolve({ res: responce, data: {}, code: 200 })
      }
      catch (err) {
        resolve({ error_message: "something went wrong", code: 500 })
      }
    })
  }
}

module.exports = () => {
  return new User()
}
