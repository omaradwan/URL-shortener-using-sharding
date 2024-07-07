const {Client}=require("pg");

const clients=({
    "5432":new Client({
        "host":"localhost",
        "port":5432,
        "user":"postgres",
        "password":"postgres",
        "database":"postgres"
    }),
    "5433":new Client({
        "host":"localhost",
        "port":5433,
        "user":"postgres",
        "password":"postgres",
        "database":"postgres"
    }),
    "5434":new Client({
        "host":"localhost",
        "port":5434,
        "user":"postgres",
        "password":"postgres",
        "database":"postgres"
    }),
})

async function connect(){
    try{
    await clients["5432"].connect()
    await clients["5433"].connect()
    await clients["5434"].connect()
    }catch(err){
        console.log(err);
    }
}
module.exports={
    clients,
    connect,
}