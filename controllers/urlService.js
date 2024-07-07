const {clients}=require("../database/db")
const crypto=require("crypto");
const hashring=require("hashring");
const hr=new hashring();

hr.add("5432");
hr.add("5433");
hr.add("5434");


exports.create=async(req,res,next)=>{
    try{
    let url=req.query.url;
    let hash=crypto.createHash("sha256").update(url).digest("base64");
    let urlId=hash.substring(0,5);
    await clients[hr.get(urlId)].query("insert into url_table (url,url_id) values ($1,$2)",[url,urlId]);
    res.send({
    "url":url,
    "urlId":urlId,
    "hash":hash,
    "server":hr.get(urlId)
    })
    }catch(err){
        console.log(err);
    }
}

exports.fetch=async(req,res,next)=>{
   try{ 
   let urlId=req.params.url;
   if(!urlId){
    return res.status("missing urlId");
   }
   let server=hr.get(urlId);
   let data=await clients[server].query("select * from url_table where url_id=$1",[urlId]);
   if(!data.rows[0]){
    return res.status("No url found")
   }
   res.json({
      id:data.rows[0].id,
      url:data.rows[0].url
   })
  }catch(err){
    console.log(err);
  }
}