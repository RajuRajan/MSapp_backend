const express = require('express')
const app = express();
const port = 5001;
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
    this.initControllers();
    
    app.listen(port, () => console.log(`Example app listening on port ${port}!`))
    this.initRoutes();
  }
  initControllers(){
      this.userControllers=require('./controllers/user.js')
  }
  initRoutes(){
console.log("....here")
          const user=require('./routes/user')(this.userControllers);
          //  app.use('/user', user.getRouter())

          app.post("/user/signup", (req, res) => {
            try {
              const { firstName,lastName,email,password,phoneNo,workKnown,captain } = req.body;
              const responce = modal.user.create({firstName,lastName,email,password,phoneNo,workKnown,captain})
              res.send({ res: responce, data: {}, code: 200 })
            }
            catch (err) {
              res.send({ error_message: err, code: 500 })
            }
          }) 

          app.post("/user/signin",async (req,res)=>{
            try {
              const { email, password } = req.body;
              const responce = await modal.user.findOne({ where: { email: email } })
              if (responce.password === password) {
                res.send({ 'id': responce.id, code: 200 })
              }
              else {
                res.send({ error_message:"account not found", code: 404 })
              }
            }
            catch (err) {
              res.send({ error_message: "account not found", code: 500 })
            }
          })
          app.post("/user/getBookings",async(req,res)=>{
            const myBooking=[{booking_id:"#123456",
            booking_type:"Refridgerator",
            booking_category:"pec",
            booking_status:"Rejected",
            appointment_ime:"1:00pm",
            booking_time:"4:00pm",
            captain_charge:"$35",
            isappointment_fixed:false,
            isrejected:true,
            captain_name:"john",
            captain_number:"123456789"}];
            res.status(200).json(myBooking);

          })

          app.get("/",(req,res)=>{
            res.send("vanthu tholada")
          });
  } 
}
const serve = new Server();