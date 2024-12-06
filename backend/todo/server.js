// importing express modules to use
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const todoRouter = require("./routes/totoRouter");

// importing the database connection code
require("./config/utils");

// creating the express app
const app = express();

// adding middlewares to the application
app.use(cors());
app.use(bodyParser.json());

// setting up the port
const PORT = process.env.PORT || 3031;

// setting up the routes
app.use("/api/v1/todos", todoRouter);

// starting the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
