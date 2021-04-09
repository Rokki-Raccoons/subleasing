// server init + mods
var app = require('express')();
var http = require('http').Server(app);
const MongoClient = require('mongodb').MongoClient;
require('dotenv').config(); //loads connection URI from .env

//functions provided by mongodb documentation and atlas
//https://developer.mongodb.com/quickstart/node-crud-tutorial/
async function createListing(client, newListing){
    const result = await client.db("site").collection("main").insertOne(newListing);
    console.log(`New listing created with the following id: ${result.insertedId}`);
}

async function listDatabases(client){
    databasesList = await client.db().admin().listDatabases();
    console.log("Databases:");
    databasesList.databases.forEach(db => console.log(` - ${db.name}`));
};


async function findOneListingByName(client, nameOfListing) {
  
    const result = await client.db("site").collection("main").findOne({ name: nameOfListing });
    //this queries for a document where the name field = the variable passed in

    if (result) {
        console.log(`Found a listing in the collection with the name '${nameOfListing}':`);
        console.log(result);
    } else {
        console.log(`No listings found with the name '${nameOfListing}'`);
    }
}

async function main(){
    //uri is stored in .env safely
    const uri = process.env.uri
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

    try {
        // Connect to the MongoDB cluster
        await client.connect();
        // Make the appropriate DB calls
        await listDatabases(client);
        var collection = client.db("site").collection("main")

        await createListing(client,
        {
            name: "Lovely Loft",
            summary: "A charming loft in Paris",
            bedrooms: 1,
            bathrooms: 1
        }
    );

    await findOneListingByName(client, "Lovely Loft");

    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
}

main().catch(console.error);
// server route handler
app.get('/', function(req, res){
  res.sendFile(__dirname + '/subleasing/src/index.html');
});


// start server
http.listen(3000, function(){
  console.log('Server up on *:3000');
});
