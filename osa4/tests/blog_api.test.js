const { test, after } = require("node:test")
const mongoose = require("mongoose")
const supertest = require("supertest")
const app = require("../app")
const assert = require("assert")

const api = supertest(app)

test("blogs are returned as json", async () => {
    await api
        .get("/api/blogs")
        .expect(200)
        .expect("Content-Type", /application\/json/)
})

test("correct number of blogs", async () => {
    const response = await api.get("/api/blogs")
    
    assert.strictEqual(response.body.length, 2)
})
  

after(async () => {
    await mongoose.connection.close()
})