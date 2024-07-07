const app=require("express")();
const { hostname } = require("os");
const database=require("./database/db");
const urlController=require("./controllers/urlService");
const { config } = require("process");
require("dotenv").config();


app.get("/:url",urlController.fetch)

app.post("/",urlController.create)
    

app.listen(process.env.PORT,async()=>{
   console.log("listening");
   await database.connect();

})