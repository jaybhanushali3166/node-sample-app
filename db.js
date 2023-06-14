const { MongoClient, ServerApiVersion } = require("mongodb");
const config = require("./db.config");

const uri = `mongodb+srv://${config.dbUser || process.env.dbUser}:${
  config.dbPwd || process.env.dbPwd
}@cluster0.pftwneu.mongodb.net/`;

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
