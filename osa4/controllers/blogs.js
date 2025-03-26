const blogsRouter = require("express").Router()
const Blog = require("../models/blog")

blogsRouter.get("", async (request, response) => {
    const blogs = await Blog.find({})
    response.json(blogs)
})

blogsRouter.post("", async (request, response) => {
    const blog = new Blog(request.body)
    if (blog.title === undefined || blog.url === undefined) {
        response.status(400).end()
    } else {
        if (blog.likes === undefined){
            blog.likes = 0
        }
        await blog.save()
        response.status(201).json(blog)
    }
})

blogsRouter.delete("/:id", async (request, response) => {
    await Blog.findByIdAndDelete(request.params.id)
    response.status(204).end()
})

blogsRouter.put("/:id", async (request, response) => {
    const { title, author, url, likes } = request.body
    const blog = await Blog.findById(request.params.id)
    if (blog === undefined || blog === null) {
        response.status(404).end()
    } else {
        blog.title = title
        blog.author = author
        blog.url = url
        blog.likes = likes
        await blog.save()
        response.status(200).json(blog)
    }
    
})

module.exports = blogsRouter