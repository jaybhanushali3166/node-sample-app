const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const PORT = 80;

// parse application/json
app.use(bodyParser.json());
// Enable CORS
app.use(cors());

// APIs
app.get("/", (req, res) => {
    res.send('<h1>My Node test App</h1>')
});

app.listen(PORT, () => {
  console.log("Server listening on:", PORT);
});
