const blogsRouter = require("express").Router()
const Blog = require("../models/blog")

blogsRouter.get("", async (request, response) => {
    const blogs = await Blog.find({})
    response.json(blogs)
})

blogsRouter.post("", async (request, response) => {
    const blog = new Blog(request.body)
    if (blog.title === undefined || blog.url === undefined) {
        response.status(400).json(blog)
    } else {
        if (blog.likes === undefined){
            blog.likes = 0
        }
        await blog.save()
        response.status(201).json(blog)
    }
})

module.exports = blogsRouter