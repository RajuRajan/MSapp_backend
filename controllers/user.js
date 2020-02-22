const modal = require('../models')

class User {

  constructor() {

  }
    loginUser() {
    return new Promise(async (resolve, reject) => {
      try {
        const { email, password } = req.body;
        const responce = await modal.user.findOne({ where: { email: email } })
        if (responce.password === password) {
          res.send({ 'id': responce.id , code: 200 })
        }
        else {
          res.send({ msg: "account not found", code: 404 })
        }
      }
      catch (err) {
        res.send({ error_message: err, code: 500 })
      }

    })
  }
}

module.exports = () => {
  return new User()
}
