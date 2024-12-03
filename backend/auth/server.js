// importing express modules to use
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const UserRouter = require("./routes/userRouter");

// importing the database connection code
require("./config/utils");

// creating the express app
const app = express();

// adding middlewares to the application
app.use(cors());
app.use(bodyParser.json());

// setting up the port
const PORT = process.env.PORT || 3000;

// setting up the routes
app.use("/api/v1/user", UserRouter);

// starting the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
