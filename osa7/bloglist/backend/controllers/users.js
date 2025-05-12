const bcrypt = require("bcrypt")
const usersRouter = require("express").Router()
const User = require("../models/user")

const minUsernameLength = 3
const minPasswordLength = 3

usersRouter.post("/", async (request, response) => {
    const { username, name, password } = request.body
    // username uniqueness checked in model
    if (!username) {
        response.status(400).json({ error: "error registering user: missing username" }).end()
    }
    else if (username.length < minUsernameLength) {
        response.status(400).json({ error: `error registering user: username too short, minimum ${minUsernameLength}` }).end()
    }
    else if (!password) {
        response.status(400).json({ error: "error registering user: missing password" }).end()
    }
    else if (password.length < minUsernameLength) {
        response.status(400).json({ error: `error registering user: password too short, minimum ${minPasswordLength}` }).end()
    }

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)

    const user = new User({
        username,
        name,
        passwordHash
    })
    const savedUser = await user.save()

    response.status(201).json(savedUser)
})

usersRouter.get("/", async (request, response) => {
    const users = await User.find({}).populate("blogs", { url: 1, title: 1, author: 1, id: 1 })
    response.json(users)
})


module.exports = usersRouter
