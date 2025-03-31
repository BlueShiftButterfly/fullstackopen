const { test, after, beforeEach, describe } = require("node:test")
const mongoose = require("mongoose")

const supertest = require("supertest")
const app = require("../app")
const assert = require("assert")
const bcrypt = require("bcrypt")
const User = require("../models/user")
const helper = require("./test_helper")

const api = supertest(app)


describe("when there is initially one user at db", () => {
    beforeEach(async () => {
        await User.deleteMany({})

        const passwordHash = await bcrypt.hash("sekret", 10)
        const user = new User({ username: "root", passwordHash })

        await user.save()
    })

    test("creation succeeds with a fresh username", async () => {
        const usersAtStart = await helper.usersInDb()
    
        const newUser = {
            username: "newuser",
            name: "User Newton",
            password: "supersecretpassword",
        }
    
        await api
            .post("/api/users")
            .send(newUser)
            .expect(201)
            .expect("Content-Type", /application\/json/)
    
        const usersAtEnd = await helper.usersInDb()
        assert.strictEqual(usersAtEnd.length, usersAtStart.length + 1)
    
        const usernames = usersAtEnd.map(u => u.username)
        assert(usernames.includes(newUser.username))
    })
    test("creation fails with proper statuscode and message if username already taken", async () => {
        const usersAtStart = await helper.usersInDb()
    
        const newUser = {
            username: "root",
            name: "Superuser",
            password: "salainen",
        }
    
        const result = await api
            .post("/api/users")
            .send(newUser)
            .expect(400)
            .expect("Content-Type", /application\/json/)
    
        const usersAtEnd = await helper.usersInDb()
        assert(result.body.error.includes("expected `username` to be unique"))
    
        assert.strictEqual(usersAtEnd.length, usersAtStart.length)
    })
    test("creation fails with if no username provided", async () => {
        const usersAtStart = await helper.usersInDb()
    
        const newUser = {
            name: "New User",
            password: "password",
        }
    
        const result = await api
            .post("/api/users")
            .send(newUser)
            .expect(400)
            .expect("Content-Type", /application\/json/)
    
        const usersAtEnd = await helper.usersInDb()
        assert(result.body.error.includes("missing username"))
    
        assert.strictEqual(usersAtEnd.length, usersAtStart.length)
    })
    test("creation fails with if username is too short", async () => {
        const usersAtStart = await helper.usersInDb()
    
        const newUser = {
            username: "aa",
            name: "New User",
            password: "password",
        }
    
        const result = await api
            .post("/api/users")
            .send(newUser)
            .expect(400)
            .expect("Content-Type", /application\/json/)
    
        const usersAtEnd = await helper.usersInDb()
        assert(result.body.error.includes("username too short"))
    
        assert.strictEqual(usersAtEnd.length, usersAtStart.length)
    })
    test("creation fails with if no password is provided", async () => {
        const usersAtStart = await helper.usersInDb()
    
        const newUser = {
            username: "newuser",
            name: "New User",
        }
    
        const result = await api
            .post("/api/users")
            .send(newUser)
            .expect(400)
            .expect("Content-Type", /application\/json/)
    
        const usersAtEnd = await helper.usersInDb()
        assert(result.body.error.includes("missing password"))
    
        assert.strictEqual(usersAtEnd.length, usersAtStart.length)
    })
    test("creation fails with if password is too short", async () => {
        const usersAtStart = await helper.usersInDb()
    
        const newUser = {
            username: "newuser",
            name: "New User",
            password: "aa"
        }
    
        const result = await api
            .post("/api/users")
            .send(newUser)
            .expect(400)
            .expect("Content-Type", /application\/json/)
    
        const usersAtEnd = await helper.usersInDb()
        assert(result.body.error.includes("password too short"))
    
        assert.strictEqual(usersAtEnd.length, usersAtStart.length)
    })
    after(async () => {
        await mongoose.connection.close()
    })
})