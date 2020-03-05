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
const cron = require('node-cron')

app.use(bodyParser.raw());

class Server {
  constructor() {
    this.init()
  }
  init() {
    this.initControllers();
    // this.initCron();
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
    cron.schedule('* */2 * * * *', () => {
      console.log("cron...........")
    })
  }
}
const serve = new Server();