const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const { connectDB } = require("./db");
const PORT = 5000;
const dbName = "sample_test_db";
const collectionName = "results";

// parse application/json
app.use(bodyParser.json());
// Enable CORS
app.use(cors());

// APIs
app.get("/results", async (req, res) => {
  try {
    // Establish MongoDB connection
    const client = await connectDB();

    // Access the database and collection
    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    const results = await collection.find().toArray();

    // Close the MongoDB client connection
    client.close();

    res.json(results);
  } catch (err) {
    console.log("Error retrieving results:", err);
    res.status(500).json({ error: "Failed to retrieve results" });
  }
});
app.post("/results", async (req, res) => {
  try {
    // Retrieve data from the request body
    const { num1, num2 } = req.body;
    const sum = num1 + num2;

    // Establish MongoDB connection
    const client = await connectDB();
    // Access the database and collection
    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    await collection.insertOne({ num1, num2, sum });

    // Close the MongoDB client connection
    client.close();

    res.send("Record inserted successfully");
  } catch (error) {
    console.error("Error inserting record:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.listen(PORT, () => {
  console.log("Server listening on:", PORT);
});
