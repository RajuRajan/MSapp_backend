const route = require('express').Router()
const modal = require('../models') 
// const controller = require('../controllers')
class User{
    constructor(usercontroller){
        // super()
        this.usercontroller=usercontroller;
        this.routes();
    }
    getRouter(){
        return route;
    }

    routes(){
        route.get("/",(req,res)=>res.send("/user/ hi "))
        route.post("/signup", (req, res) => {
            try {
              const { firstName,lastName,email,password,phoneNo,workKnown,captain } = req.body;
              const responce = modal.user.create({firstName,lastName,email,password,phoneNo,workKnown,captain})
              res.send({ res: responce, data: {}, code: 200 })
            }
            catch (err) {
              res.send({ error_message: err, code: 500 })
            }
          })   
          route.post("/signin", async (req, res) => {
            await this.usercontroller.loginUser;
          })
    }
}

module.exports =(controller)=> new User(controller);