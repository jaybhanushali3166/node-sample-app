const { MongoClient, ServerApiVersion } = require("mongodb");
require("dotenv").config();
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PWD}@cluster0.pftwneu.mongodb.net/`;

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
