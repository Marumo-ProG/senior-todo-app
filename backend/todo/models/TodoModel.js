// setting up the user model from mongoose
const mongoose = require("mongoose");

const TodoSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true,
    },
    complete: {
        type: Boolean,
        required: true,
    },
    created_at: {
        type: Date,
        default: Date.now,
    },
    user_email: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model("Todo", TodoSchema);
