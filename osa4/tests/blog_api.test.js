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

test("blog without like count gets likes as zero", async () => {
    const newBlog = {
        title: "Bestest Blog Ever Ever Seen",
        author: "Gary Garyson",
        url: "testurl"
    }

    await api
        .post("/api/blogs")
        .send(newBlog)
        .expect(201)
        .expect("Content-Type", /application\/json/)

    const response = await api.get("/api/blogs")
    const blog = response.body.filter(blog => blog.title === "Bestest Blog Ever Ever Seen")[0]
    assert.strictEqual(blog.likes, 0)
})

test("bad request if blog has no title", async () => {
    const newBlog = {
        author: "Gary Garyson",
        url: "testurl",
        likes: 2
    }

    await api
        .post("/api/blogs")
        .send(newBlog)
        .expect(400)
})

test("bad request if blog has no url", async () => {
    const newBlog = {
        title: "Bestest Blog Ever Ever Seen",
        author: "Gary Garyson",
        likes: 2
    }

    await api
        .post("/api/blogs")
        .send(newBlog)
        .expect(400)
})

test("bad request if blog has no title and url", async () => {
    const newBlog = {
        author: "Gary Garyson",
        likes: 2
    }

    await api
        .post("/api/blogs")
        .send(newBlog)
        .expect(400)
})

test("deleting blog returns 204 and works", async () => {
    const response = await api.get("/api/blogs")
    const blogId = response.body[0].id
    await api
        .delete(`/api/blogs/${blogId}`)
        .expect(204)
    const response2 = await api.get("/api/blogs")
    assert.strictEqual(response2.body.length, 1)
})

test("deleting nonexistent blog returns 400 and doesn't change blog count", async () => {
    const blogId = "943820"
    await api
        .delete(`/api/blogs/${blogId}`)
        .expect(400)
    const response2 = await api.get("/api/blogs")
    assert.strictEqual(response2.body.length, 2)
})

test("modifying likes on existing blog modifies correctly", async () => {
    const blogs = await api.get("/api/blogs")
    const blog = blogs.body[0]
    blog.likes += 1
    await api
        .put(`/api/blogs/${blog.id}`)
        .send({
            title: blog.title,
            author: blog.author,
            url: blog.url,
            likes: blog.likes
        })
        .expect(200)
    const blogs2 = await api.get("/api/blogs")
    assert.strictEqual(blogs2.body[0].likes, blog.likes)
})
test("modifying title on existing blog modifies correctly", async () => {
    const blogs = await api.get("/api/blogs")
    const blog = blogs.body[0]
    const newTitle = "New Blog Title"
    await api
        .put(`/api/blogs/${blog.id}`)
        .send({
            title: newTitle,
            author: blog.author,
            url: blog.url,
            likes: blog.likes
        })
        .expect(200)
    const blogs2 = await api.get("/api/blogs")
    assert.strictEqual(blogs2.body[0].title, newTitle)
})

after(async () => {
    await mongoose.connection.close()
})