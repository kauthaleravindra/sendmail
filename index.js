const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes')
const app = express();
const port = process.env.PORT || 8080;
app.use(bodyParser.urlencoded({extended:false}));
app.use(express.json())

app.use((req,res,next)=>{
   res.setHeader("Access-Control-Allow-Origin", "*");
   res.setHeader("Access-Control-Allow-Headers", "*");
   next();
})

 // Use the routing file for the specific methods

 app.use('/', routes);
app.get('/', (req, res)=>{
res.send(`${Date.now()}Getting started with node mailer!!!!!`)
})
 app.use((err, req, res, next)=>{
     res.status(err.status || 500);
     res.json({error:err})
 })

 // Starting the epress application
 app.listen(port, ()=>{
     console.log(`App is running on ${port}`)
 })
