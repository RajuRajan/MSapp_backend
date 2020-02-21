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

app.use(bodyParser.raw());

class Server {
  constructor() {
    this.init()

  }
  init() {
    app.listen(port, () => console.log(`Example app listening on port ${port}!`))
    this.initRoutes();
    this.initControllers();
  }
  initControllers(){
      this.userControllers=require('./controllers/user')
  }
  initRoutes(){

          const index=require('./routes/index')(this.userControllers);
           app.use('/', index.getRouter())
          // const user=require('./route/user')(this.userControllers);
          // app.use( '/user', user.getRouter())
  }
}
const serve = new Server();