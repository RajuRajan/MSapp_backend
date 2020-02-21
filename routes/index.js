const route = require('express').Router();
const app = require('express')();


class Index{
    constructor(controller){
        this.userController=controller
        this.routes()
    }

    routes(){
        route.use("/",(req,res, next)=>{
            next();
        })
        const userRoute = require('./user')(this.userController)
        route.use("/user",userRoute.getRouter())
    }
    getRouter(){
        return route
    }

}

module.exports =(controller)=> new Index(controller);