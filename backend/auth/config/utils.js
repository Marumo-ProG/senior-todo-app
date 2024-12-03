// connecing to the database
const mongoose = require("mongoose");

require("dotenv").config();

// connecting to the database using mongoose
mongoose
    .connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log("Connected to the database");
    })
    .catch((err) => {
        console.log(err);
    });
