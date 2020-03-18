const express = require('express')
const app = express()
const port = 5000
const bodyParser = require('body-parser')
var jsonParser = bodyParser.json()
var cors = require('cors')
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
const modal = require('./models')
const Sequelize = require('sequelize')
const Op = Sequelize.Op
const cron = require('node-cron')
const moment = require('moment')
var logger = require('logger').createLogger('development.log');

app.use(bodyParser.raw())

class Server {
    constructor() {
        this.init()
    }
    init() {
        this.initControllers()
        this.initCron()
        this.initRoutes()
        app.listen(port, () =>
            console.log(`Example app listening on port ${port}!`)
        )
    }
    initControllers() {
        this.userControllers = require('./controllers/user.js')()
        this.bookingsControllers = require('./controllers/bookings')()
        this.bidsControllers = require('./controllers/bids')()
    }
    initRoutes() {
        const user = require('./routes/user')(
            this.userControllers,
            this.bookingsControllers,
            this.bidsControllers
        )
        app.use('/api/user', user.getRouter())
    }

    initCron() {
        cron.schedule('1 * * * * *', () => {
            let data = []
            modal.bookings.findAll().then(bidRes => {
                data = bidRes
                for (let d of data) {
                  logger.info("bidhours=============",d.dataValues.bidHour)
                  logger.info("Currenthours=============", moment().format("HH:mm"))
                    if (d.dataValues.bidHour === moment().format("HH:mm")) {
                      logger.info("in@@@@@@@@@@@@@@@@@")
                    modal.bids
                        .findOne({
                            where: { bookingId: d.dataValues.bookingId },
                        })
                        .then(resp => {
                            if (resp) {
                                modal.user
                                    .findOne({
                                        where: { id: resp.dataValues.userId },
                                    })
                                    .then(res => {
                                      logger.info("in@@@@@@@ res",res.dataValues)
                                        let value = res.dataValues
                                        let captainCharge = ''
                                        let isappointmentFixed = true
                                        let isrejected = false
                                        let captainName = `${value.firstName} ${value.lastName}`
                                        let captainNumber = value.phoneNo
                                        captainCharge = resp.dataValues.bidAmount;

                                                  var values = { captainCharge,isappointmentFixed,isrejected,captainName,captainNumber };
                                                  var selector = { 
                                                    where:{
                                                      bookingId:d.dataValues.bookingId
                                                    }
                                                  };
                                                  modal.bookings.update(values, selector).catch(
                                                    err=>
                                                    logger.info("booking update error %%%%%%%%%%%%%%%%",err)
                                                  )
                                                  .then(function(res) {console.log(res)});
                                    })
                            }
                        })
                    }
                }
            })
        })
    }
}
const serve = new Server()
