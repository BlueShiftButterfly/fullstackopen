const { test, after, beforeEach } = require("node:test")
const mongoose = require("mongoose")
const supertest = require("supertest")
const app = require("../app")
const assert = require("assert")
const helper = require("./test_helper")
const Blog = require("../models/blog")

const api = supertest(app)

beforeEach(async () => {
    await Blog.deleteMany({})

    let blogObject = new Blog(helper.initialBlogs[0])
    await blogObject.save()

    blogObject = new Blog(helper.initialBlogs[1])
    await blogObject.save()
})

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

test("identification field is named id", async() => {
    const response = await api.get("/api/blogs")
    assert.notEqual(response.body[0].id, undefined)
    assert.strictEqual(response.body[0]._id, undefined)
})

test("blog can be added", async () => {
    const newBlog = {
        title: "Best Blog Ever",
        author: "Gary Garyson",
        url: "testurl",
        likes: 20
    }

    await api
        .post("/api/blogs")
        .send(newBlog)
        .expect(201)
        .expect("Content-Type", /application\/json/)

    const response = await api.get("/api/blogs")
    const titles = response.body.map(r => r.title)
    const authors = response.body.map(r => r.author)
    const urls = response.body.map(r => r.url)
    const likes = response.body.map(r => r.likes)

    assert.strictEqual(response.body.length, helper.initialBlogs.length + 1)
    assert(titles.includes("Best Blog Ever"))
    assert(authors.includes("Gary Garyson"))
    assert(urls.includes("testurl"))
    assert(likes.includes(20))
})
  

after(async () => {
    await mongoose.connection.close()
})