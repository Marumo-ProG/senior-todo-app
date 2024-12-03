/*
    This is where we are going to do the routing of the user and authentication routes.
*/

const UserRouter = require("express").Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/UserModel");

// User creation
UserRouter.post("/create", async (req, res) => {
    try {
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
            theme: req.body.theme,
            profilePicture: req.body.picture_url ? req.body.picture_url : "",
        });

        // hashing the password
        const salt = await bcrypt.genSalt(10);
        newUser.password = await bcrypt.hash(newUser.password, salt);

        // generating a jwt
        const token = jwt.sign(
            {
                username: newUser.username,
                email: newUser.email,
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "1h",
            }
        );

        const user = await newUser.save();
        res.status(201).json({ user, token });
    } catch (err) {
        res.status(500).json(err);
    }
});

// User login
UserRouter.post("/login", async (req, res) => {
    try {
        const user = await User.findOne({
            email: req.body.email,
        });

        !user && res.status(404).json("user not found");

        user.password !== req.body.password && res.status(401).json("wrong password");

        res.status(200).json(user);
    } catch (err) {
        res.status(500).json(err);
    }
});

// User update
UserRouter.put("/:id", async (req, res) => {
    try {
        const user = await User.findById(req.params.id);

        if (user.username === req.body.username) {
            const updatedUser = await User.findByIdAndUpdate(req.params.id, {
                $set: req.body,
            });
            res.status(200).json(updatedUser);
        }
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = UserRouter;
