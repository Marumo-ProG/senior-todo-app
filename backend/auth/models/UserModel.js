// setting up the user model from mongoose
const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    theme: {
        type: String,
        default: "light",
    },
    profilePicture: {
        type: String,
        default: "",
    },
});

module.exports = mongoose.model("User", UserSchema);
