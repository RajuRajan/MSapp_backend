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

          const user=require('./routes/user')(this.userControllers);
          //  app.use('/user', user.getRouter())

          app.post("/api/user/signup", (req, res) => {
            try {
              const { firstName,lastName,email,password,phoneNo,workKnown,captain } = req.body;
              const responce = modal.user.create({firstName,lastName,email,password,phoneNo,workKnown,captain})
              res.send({ res: responce, data: {}, code: 200 })
            }
            catch (err) {
              res.send({ error_message: err, code: 500 })
            }
          }) 

          app.post("/api/user/signin",async (req,res)=>{
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


          app.post("/api/user/bookService",async (req,res)=>{
            try { 
              const {  bidHour,city,pincode,address,serviceTime,subCategory,user_id ,bookingStatus,bookingId,bookingTime,phoneNo } = req.body;
              console.log(req.body)
              const responce = await modal.bookings.create({bidHour,city,pincode,address,subCategory ,serviceTime,userId:user_id,bookingStatus,bookingId,bookingTime,phoneNo})
              res.send({ res: responce, data: {}, code: 200 })
            }
            catch (err) {
              console.log(err)
              res.send({ error_message: "something went wrong", code: 500 })
            }
          })

          app.post("/api/user/getBookings",async (req,res)=>{
            try { 
              const { user_id} = req.body;
              const responce = await modal.bookings.findAll({ where: { userId:user_id } })
              res.send({  data: responce, code: 200 })
            }
            catch (err) {
              console.log(err)
              res.send({ error_message: "something went wrong", code: 500 })
            }
          })
          app.post("/api/user/getBids",async (req,res)=>{
            try { 
              const { user_id} = req.body;
              const responce = await modal.user.findOne({ where: { id:user_id } })
              if(responce.workKnown){
                const bidRes= await modal.bookings.findAll({where:{subCategory:responce.workKnown,userId:{[Op.not]:user_id}}})
                res.send({  data: bidRes, code: 200 })
              }
             
            }
            catch (err) {
              console.log(err)
              res.send({ error_message: "something went wrong", code: 500 })
            }
          })


  }
}
const serve = new Server();