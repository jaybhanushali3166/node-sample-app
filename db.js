const { MongoClient, ServerApiVersion } = require("mongodb");
const fs = require("fs");

const filePath = "./db.config.js";

if (fs.existsSync(filePath)) {
  console.log("File exists");
} else {
  console.log("File does not exist");
}
const config = require("./db.config");
console.log("config", config, process.env);
const uri = `mongodb+srv://${config.DB_USER}:${config.DB_PWD}@cluster0.pftwneu.mongodb.net/`;

// Function to establish MongoDB connection
async function connectDB() {
  // Create a MongoClient with a MongoClientOptions object to set the Stable API version
  const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    },
  });
  try {
    if (client) {
      await client.connect();
      // Return the MongoDB client and the desired collection
      return client;
    }
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    throw error;
  }
}

module.exports = { connectDB };
