const express=require('express')
const app=express();
const port = 5000;
const bodyParser=require('body-parser');
var jsonParser = bodyParser.json()
var cors = require('cors');
app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const modal =require('./models')

app.use(bodyParser.raw());

class Server {
constructor(){
   this.init()
    
}
init(){
    // this.initControllers();
    app.listen(port, () => console.log(`Example app listening on port ${port}!`))
    app.post("/create",(req,res)=>{
      const responce=  modal.test.create({
        name:req.body.name
        })
        res.send({data:responce,msg:"ok"})
    })
    // this.initRoutes();
}
// initControllers(){
//     this.userControllers=require('./controller/user')
// }
// initRoutes(){

//         const index=require('./route/index')();
//         app.use('/', index.getRouter())
//         const user=require('./route/user')(this.userControllers);
//         app.use( '/user', user.getRouter())
       
      
// }


}
const serve= new Server();