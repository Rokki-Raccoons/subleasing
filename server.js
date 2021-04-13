// server init + mods
var express = require('express');
var app = express();
var http = require('http').Server(app);
const MongoClient = require('mongodb').MongoClient;
require('dotenv').config(); //loads connection URI from .env

const converter = require('json-2-csv');
const fs = require('fs');

app.use(express.static(__dirname + '/subleasing/dist/subleasing'));

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

//main().catch(console.error);
// server route handler
app.get('/', function(req, res){
  res.sendFile(__dirname + '/subleasing/dist/subleasing/index.html');
});


// start server
http.listen(3000, function(){
  console.log('Server up on *:3000');
});


app.get('/structures', async function(req, res){
    console.log(`Get Structures Request: ${JSON.stringify(req.query)}`)
    const uri = process.env.uri;
    const mclient = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

    // Connect the client to the server
    await mclient.connect();
    // Establish and verify connection
    const database = mclient.db("Lab6");
    const collection = database.collection("listings");
    console.log("Connected successfully to listings");

    const projection = { structstyle: 1 };
    await collection.find().project(projection).toArray(function(err, etl_results) {
        const prettyJson = JSON.stringify(etl_results, null, 4);
        console.log("Found data ");
        converter.json2csv(etl_results, (err, csv) => {
            if (err) {
                console.error(err);
            }

            // store CSV file
            try {
                fs.writeFileSync('structstyle.csv', csv);
                console.log("File has been saved.");
                res.send(prettyJson);
            } catch (error) {
                console.error(err);
            }
        });
    });
});

app.get('/structstyleCSV', function(req, res){
    console.log("downloading csv from "+__dirname+'/structstyle.csv');
   
    res.sendFile(__dirname+'/structstyle.csv', function (err) {
    if (err) {
      next(err);
    } else {
      console.log('Sent!');
    }
  });
});

app.get('/yearPrice', async function(req, res){
    console.log(`Get yearPrice Request: ${JSON.stringify(req.query)}`)
    const uri = process.env.uri;
    const mclient = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

    // Connect the client to the server
    await mclient.connect();
    // Establish and verify connection
    const database = mclient.db("Lab6");
    const collection = database.collection("listings");
    console.log("Connected successfully to listings");

    const projection = { yearbuilt: 1, full_marke: 1 };
    await collection.find().project(projection).toArray(function(err, etl_results) {
        const prettyJson = JSON.stringify(etl_results, null, 4);
        console.log("Found data ");
        converter.json2csv(etl_results, (err, csv) => {
            if (err) {
                console.error(err);
            }

            // store CSV file
            try {
                fs.writeFileSync('yearPrice.csv', csv);
                console.log("File has been saved.");
                res.send(prettyJson);
            } catch (error) {
                console.error(err);
            }
        });
    });
});

app.get('/yearPriceCSV', function(req, res){
    console.log("downloading csv from "+__dirname+'/yearPrice.csv');
   
    res.sendFile(__dirname+'/yearPrice.csv', function (err) {
    if (err) {
      next(err);
    } else {
      console.log('Sent!');
    }
  });
});