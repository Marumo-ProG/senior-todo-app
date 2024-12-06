/*
    This is where we are going to do the routing of the user and authentication routes.
*/

const todoRouter = require("express").Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const Todo = require("../models/TodoModel");

// Todo creation
todoRouter.post("/create", async (req, res) => {
    const newTodo = new Todo({
        title: req.body.title,
        complete: req.body.complete,
    });

    // verifying user token
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ message: "Token is missing" });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        newTodo.user_email = decoded.email; // add the user email to the todo object
        const todo = await newTodo.save();
        return res.status(201).json({ todo });
    } catch (error) {
        console.log(error);
        res.status(403).json({ message: "Invalid or expired token" });
    }
});

// Get all todos for one user
todoRouter.get("/", async (req, res) => {
    // verifying user token
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ message: "Token is missing" });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const todos = await Todo.find({ user_email: decoded.email });
        return res.status(200).json({ todos });
    } catch (error) {
        console.log(error);
        res.status(403).json({ message: "Invalid or expired token" });
    }
});

// setting todo as complete
todoRouter.post("/complete", async (req, res) => {
    // verifying user token
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ message: "Token is missing" });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const todo = await Todo.findOne({ _id: req.body.id, user_email: decoded.email });
        if (!todo) return res.status(404).json({ message: "Todo not found" });

        todo.complete = true;
        await todo.save();
        return res.status(200).json({ todo });
    } catch (error) {
        console.log(error);
        res.status(403).json({ message: "Invalid or expired token" });
    }
});
// setting todo as incomplete
todoRouter.post("/incomplete", async (req, res) => {
    // verifying user token
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ message: "Token is missing" });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const todo = await Todo.findOne({ _id: req.body.id, user_email: decoded.email });
        if (!todo) return res.status(404).json({ message: "Todo not found" });

        todo.complete = false;
        await todo.save();
        return res.status(200).json({ todo });
    } catch (error) {
        console.log(error);
        res.status(403).json({ message: "Invalid or expired token" });
    }
});

// clearing all completed todos
todoRouter.post("/clear", async (req, res) => {
    // verifying user token
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ message: "Token is missing" });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        await Todo.deleteMany({ user_email: decoded.email, complete: true });
        return res.status(200).json({ message: "All todos cleared" });
    } catch (error) {
        console.log(error);
        res.status(403).json({ message: "Invalid or expired token" });
    }
});

module.exports = todoRouter;
