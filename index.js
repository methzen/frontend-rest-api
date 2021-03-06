const express = require("express")
const helmet = require("helmet")
const mongoose = require("mongoose")
const dotenv= require("dotenv")
const path = require("path")

dotenv.config()

const PORT = process.env.PORT || 9000

const app = express()

//const { MongoClient } = require('mongodb');
//const uri = "mongodb+srv://diamoham:tmtcpkady9QDvr@cluster0.8jomv.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
//const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
//client.connect(err => {
//  const collection = client.db("test").collection("devices");
//  // perform actions on the collection object
//  console.log("Connected to MongoDB database")
//  client.close();
//});



const mongoString = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.8jomv.mongodb.net/Blog?retryWrites=true&w=majority`

mongoose.connect(mongoString, {useNewUrlParser: true, useUnifiedTopology: true})

mongoose.connection.on("error", function(error) {
  if (process.env.NODE_ENV === "development") {
    console.log(error)
  }
})

mongoose.connection.on("open", function() {
  console.log("Connected to MongoDB database.")
})

app.use(helmet())
app.use(require("./routes/index.js"))
app.use("/assets",express.static(path.join(__dirname, "..", "..", "assets")))

app.listen(PORT, function () {
  console.log(`Express app listening on port ${PORT}`)
})