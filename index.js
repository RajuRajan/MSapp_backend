const express = require('express')
const app = express();
const port = 5000;
const bodyParser = require('body-parser');
var jsonParser = bodyParser.json()
var cors = require('cors');
app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const modal = require('./models')
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const cron = require('node-cron');
const moment = require('moment');

app.use(bodyParser.raw());

class Server {
  constructor() {
    this.init()
  }
  init() {
    this.initControllers();
    this.initCron();
    this.initRoutes();
    app.listen(port, () => console.log(`Example app listening on port ${port}!`))
  }
  initControllers() {
    this.userControllers = require('./controllers/user.js')();
    this.bookingsControllers = require('./controllers/bookings')();
    this.bidsControllers = require('./controllers/bids')();
  }
  initRoutes() {

    const user = require('./routes/user')(this.userControllers, this.bookingsControllers, this.bidsControllers);
    app.use('/api/user', user.getRouter());
  }

  initCron() {
    cron.schedule('* */1 * * * *', () => {
      let data = [];
      modal.bookings.findAll().then(bidRes => {
                      data = bidRes;
                      for (let d of data) {
                        // if (d.dataValues.bidHour === moment().format("HH:mm")) {
                        console.log(d.dataValues)
                        modal.user.findOne({ where: { id: d.dataValues.userId } }).then(res =>{
                                  let value = res.dataValues
                                  let capatainCharge = "";
                                  let isappoinmentFixed = true;
                                  let isrejected = false;
                                  let capatainName = `${value.firstName} ${value.lastName}`;
                                  let captainNumber = value.phoneNo;
                                  console.log("map......", d.dataValues.bookingId)
                                  modal.bids.findOne({ where: { bookingId: d.dataValues.bookingId } }).then(resp =>{
                                          if (resp) {
                                            capatainCharge = resp.dataValues.bidAmount
                                            console.log("map......", capatainCharge, isappoinmentFixed, isrejected, capatainName, captainNumber)

                                            const updateBooking= modal.bookings.update({isappointmentFixed:true,where:{
                                              bookingId:value.bookingId
                                            }})
                                            updateBooking.save()
                                          }
                                         })
                                })
                        // }
                      }
      })
    })
  }
}
const serve = new Server();