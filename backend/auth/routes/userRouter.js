/*
    This is where we are going to do the routing of the user and authentication routes.
*/

const UserRouter = require("express").Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/UserModel");

// token generation function
const generateToken = (user) => {
    return jwt.sign(
        {
            username: user.username,
            email: user.email,
        },
        process.env.JWT_SECRET,
        {
            expiresIn: "1h",
        }
    );
};

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
        const token = generateToken(newUser);

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

        if (!user) {
            return res.status(404).json("User not found");
        }

        // user.password !== req.body.password && res.status(401).json("wrong password");

        // comparing the password with the hashed password
        const validPassword = await bcrypt.compare(req.body.password, user.password);

        if (validPassword) {
            const token = generateToken(user);
            return res.status(200).json({ user, token }).end();
        } else {
            return res.status(401).json("wrong password").end();
        }
    } catch (err) {
        return res.status(500).json(err);
    }
});

// get user details
UserRouter.get("/", async (req, res) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ message: "Token is missing" });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findOne({ email: decoded.email });
        return res.json({ user });
    } catch (error) {
        console.log(error);
        res.status(403).json({ message: "Invalid or expired token" });
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
