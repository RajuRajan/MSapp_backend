const route = require('express').Router()
const modal = require('../models')
// const controller = require('../controllers')
class User {
  constructor(userController, bookingController ,bidController) {
    // super()
    this.userController = userController;
    this.bookingController = bookingController;
    this.bidController=bidController;
    this.routes();
  }
  getRouter() {
    return route;
  }

  routes() {
    route.get("/", (req, res) => res.send("/user/ hi "))

    route.post("/signup", async (req, res) => {
      const data = await this.userController.signUpUser(req);
      res.json(data)
    })

    route.post("/signin", async (req, res) => {
      const data = await this.userController.loginUser(req);
      res.json(data)
    })

    route.post("/bookService", async (req, res) => {
      const data = await this.bookingController.bookService(req);
      res.json(data)
    })

    route.post("/getBookings", async (req, res) => {
      const data = await this.bookingController.getBookings(req);
      res.json(data)
    })

    route.post("/getBids", async (req, res) => {
      const data = await this.bidController.getBids(req);
      res.json(data)
    })

    route.post("/getMyBids", async (req, res) => {
      const data = await this.bidController.getMyBids(req);
      res.json(data)
    })

    route.post("/bidService", async (req, res) => {
      const data = await this.bidController.bidService(req);
      res.json(data)
    })
  }
}

module.exports = (userController, bookingController , bidController) => { return new User(userController, bookingController , bidController); }

