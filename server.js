// server init + mods
var express = require('express');
var app = express();
var http = require('http').Server(app);
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectID;
const bcrypt = require('bcrypt');
require('dotenv').config(); //loads connection URI from .env

const converter = require('json-2-csv');
const fs = require('fs');

const multer = require('multer');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './subleasing/src/assets/images')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})
const storage2 = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './subleasing/dist/subleasing/assets/images')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})
const upload = multer({
    storage: storage
});
const upload2 = multer({
    storage: storage2
});
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/subleasing/dist/subleasing'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.raw());

var loggedIn = false;
var loggedInUser = "";

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

app.get("/addfav/:favid", async function(req,res){
  // console.log(req)
  var favId = req.params["favid"];
  if(loggedIn){
  const uri = process.env.uri;
  const mclient = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

  // Connect the client to the server
  await mclient.connect();

  const dbresult = await mclient.db("SublettyFinal").collection("Favorites").insertOne({ listingId: favId,  userId: loggedInUser});
  console.log("fav added to db: " + favId + " for user: " + loggedInUser);

  }
  // console.log("username: " + un + " pass: " + pw);
});

app.post("/savemsg", async function(req,res){
  // console.log(req)
  console.log('savemsg hit');
  var favId = req.params["favid"];
  var msgForDb = req.body.msgToSave;
  if(loggedIn){
  const uri = process.env.uri;
  const mclient = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

  // Connect the client to the server
  await mclient.connect();

  // const dbresult = await mclient.db("SublettyFinal").collection("messages").One({ listingId: favId,  userId: loggedInUser});
  const result = await mclient.db("SublettyFinal").collection("messages").updateOne({ userId: loggedInUser },{msg: msgForDb },{ upsert: true });
  console.log("msg added to db: " + msgForDb + " for user: " + loggedInUser);

  }
  // console.log("username: " + un + " pass: " + pw);
});

app.get("/removefav/:favid", async function(req,res){
  // console.log(req)
  var favId = req.params["favid"];
  if(loggedIn){
  const uri = process.env.uri;
  const mclient = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

  // Connect the client to the server
  await mclient.connect();

  const dbresult = await mclient.db("SublettyFinal").collection("Favorites").deleteOne({ listingId: favId,  userId: loggedInUser});
  console.log("fav removed from db: " + favId + " for user: " + loggedInUser);

  }
  // console.log("username: " + un + " pass: " + pw);
});



app.get("/login/:un/:pw", async function(req,res){
  // console.log(req)
  var un = req.params["un"];
  var pw = req.params["pw"];

  console.log("username: " + un + " pass: " + pw);

  bcrypt.hash(pw, 10, async function(err, hash) {
    // Store hash in your password DB.
    const uri = process.env.uri;
    const mclient = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

    // Connect the client to the server
    await mclient.connect();

    const dbresult = await mclient.db("site").collection("users").findOne({ username: un });
    console.log(hash)
    console.log(dbresult)

    if(dbresult){
      bcrypt.compare(pw, dbresult.hash, function(err, result) {
        if(result){
          console.log("login succ")
          loggedIn = true;
          loggedInUser = dbresult._id;
          console.log("logged in as " + un + loggedInUser)
          res.send({statusCode:200});
        }else{
            console.log("login fail")
            res.send({statusCode:401});
            loggedIn = false;
            loggedInUser = "";
          }
      });
    }else{
      console.log("user not found")
      res.send({statusCode:404});
      loggedIn = false;
      loggedInUser = "";
    }


  });

});

app.get("/register/:un/:pw", async function(req,res){

  console.log("register endpoint");
  var un = req.params["un"];
  var pw = req.params["pw"];

  console.log("username: " + un + " pass: " + pw);

  const uri = process.env.uri;
  const mclient = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

  // Connect the client to the server
  await mclient.connect();

  const result = await mclient.db("site").collection("users").findOne({ username: un });

  if(result){
    res.send({statusCode:422})
  }
  else{
    bcrypt.hash(pw, 10, async function(err, hash) {
      const result2 = await mclient.db("site").collection("users").insertOne({ username: un, hash:hash });
    });
    res.send({statusCode:201})
    loggedInUser = result._id;
    console.log("logged in as " + un + loggedInUser)
    loggedIn = true;

  }

});

app.get("/authenticate", function(req,res){
  console.log("auth endpoint hit");
  res.status(200).json({"statusCode" : 200 ,"authenticated" : loggedIn});
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


app.post('/fileUpload', upload.single('image'), function(req, res){
  console.log(`Pinged the /fileUpload endpoint`);
  res.send();
});

app.post('/fileUpload2', upload2.single('image'), function (req, res, next) {
  console.log("Pinged the /fileUpload2 endpoint");
  res.send();
});

// start server
http.listen(3000, function(){
  console.log('Server up on *:3000');
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

app.get('/listings', function(req, res){
  res.sendFile(__dirname + '/subleasing/dist/subleasing/index.html');
});

app.get('/renterpage', function(req, res){
  res.sendFile(__dirname + '/subleasing/dist/subleasing/index.html');
});
