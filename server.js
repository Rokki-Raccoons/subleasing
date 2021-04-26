// server init + mods
var express = require('express');
var app = express();
var http = require('http').Server(app);
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectID;
require('dotenv').config(); //loads connection URI from .env

const converter = require('json-2-csv');
const fs = require('fs');


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
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

app.get('/favorites', async function(req, res){
  console.log(`Get Request: ${JSON.stringify(req.query)}`)
  var user = req.query.user;
  //console.log("user: "+user);

  const uri = process.env.uri;
  const mclient = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

  // Connect the client to the server
  await mclient.connect();
  // Establish and verify connection
  const database = mclient.db("SublettyFinal");
  const favorites = database.collection("Favorites");
  //console.log("Connected successfully to Favorites");

  var query = {userId: user};
  const projection = { listingId: 1 };
  
  const cursor = favorites.find(query).project(projection);
  const count = await cursor.count();
  console.log("Found "+count+" favorite listings");

  const listings = database.collection("Listings");
  //console.log("Connected successfully to Listings");

  var results = [];

  await cursor.toArray(async function(err, fav_results) {
    for (var i = 0; i < fav_results.length; i++) {
      favId = fav_results[i]['listingId'];
      query = {"_id": ObjectId.createFromHexString(favId)};
      //console.log("querying Listings for "+query["_id"]);
      newListing = await listings.findOne(query);
      results.push(newListing);
    }

    const prettyJson = JSON.stringify(results);
    //console.log("Found fav listings: "+prettyJson);
    res.send(results);
  });
});

app.get('/searchListings', async function(req, res){
  console.log(`Get Request: ${JSON.stringify(req.query)}`)
  var searchtext = req.query.searchText;
  var page = req.query.page;
  //console.log("search: "+searchtext+" page: "+page);

  if (page == undefined){ page=0; }

  const uri = process.env.uri;
  const mclient = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

  // Connect the client to the server
  await mclient.connect();
  // Establish and verify connection
  const database = mclient.db("SublettyFinal");
  const listings = database.collection("Listings");
  //console.log("Connected successfully to Listings");

  listings.createIndex({address: "text", details: "text"});

  var query;
  var sort;
  if (searchtext == undefined || searchtext == ""){ 
    query = {}; 
    sort = {};
  }
  else { 
    query = {$text: {$search: searchtext} }; 
    sort = { score: { $meta: "textScore" } };
  }
  const limit = 4;
  const cursor = listings.find(query).sort(sort);
  const count = await cursor.count();
  await cursor.limit(limit).skip(page*limit).toArray(function(err, etl_results) {
    const prettyJson = JSON.stringify(etl_results);
    //console.log("Found data: "+prettyJson);
    console.log("Found "+count+" data documents");
    res.send({'count':count, 'limitedData':etl_results});
  });
});

app.get('/ownedListings', async function(req, res){
  console.log(`Get Request: ${JSON.stringify(req.query)}`);

  const uri = process.env.uri;
  const mclient = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

  // Connect the client to the server
  await mclient.connect();
  // Establish and verify connection
  const database = mclient.db("SublettyFinal");
  const listings = database.collection("Listings");
  //console.log("Connected successfully to Listings");

  const query = {ownerID: req.query.user};
  const cursor = listings.find(query);
  const count = await cursor.count();
  await cursor.toArray(function(err, etl_results) {
    const prettyJson = JSON.stringify(etl_results);
    console.log("Found "+count+" pieces of data");
    res.send(etl_results);
  });

});

app.post('/ownedListings', async function(req, res){
  var newData = req.body;
  delete newData._id;
  console.log(`Post Request: ${JSON.stringify(newData)}`);

  const uri = process.env.uri;
  const mclient = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

  // Connect the client to the server
  await mclient.connect();
  // Establish and verify connection
  const database = mclient.db("SublettyFinal");
  const listings = database.collection("Listings");
  //console.log("Connected successfully to Listings");

  inserted = await listings.insertOne(newData).catch(e => {
    console.log(e);
  });
  console.log("inserted document into the Listings collection");
  res.send(inserted.ops);
});

app.put('/ownedListings', async function(req, res){
  var newData = req.body;
  console.log(`Update Request: ${JSON.stringify(newData)}`);
  const query = {"_id": ObjectId.createFromHexString(newData._id)};

  const uri = process.env.uri;
  const mclient = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

  // Connect the client to the server
  await mclient.connect();
  // Establish and verify connection
  const database = mclient.db("SublettyFinal");
  const listings = database.collection("Listings");
  //console.log("Connected successfully to Listings"); 
  delete newData._id;

  const options = {
    // create a document if no documents match the query
    upsert: true,
  };
  const result = await listings.replaceOne(query, newData, options);
  res.send(result.result);
});

app.delete('/ownedListings', async function(req, res){
  const query = {"_id": ObjectId.createFromHexString(req.query._id)};
  console.log(`Delete Request: ${JSON.stringify(query)}`);

  const uri = process.env.uri;
  const mclient = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

  // Connect the client to the server
  await mclient.connect();
  // Establish and verify connection
  const database = mclient.db("SublettyFinal");
  const listings = database.collection("Listings");
  //console.log("Connected successfully to Listings");

  const result = await listings.deleteOne(query);
  res.send(result.result);
});

// start server
http.listen(3000, function(){
  console.log('Server up on *:3000');
});

app.get('/renterpage', function(req, res){
  res.sendFile(__dirname + '/subleasing/dist/subleasing/index.html');
});






//****** Things below this line are for data visulaization AKA lab 6 content ******//
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