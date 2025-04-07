const jwt = require("jsonwebtoken")
const blogsRouter = require("express").Router()
const Blog = require("../models/blog")
const User = require("../models/user")

blogsRouter.get("", async (request, response) => {
    const blogs = await Blog.find({}).populate("user", { username: 1, name: 1, id: 1 })
    response.json(blogs)
})

blogsRouter.post("", async (request, response) => {
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if (!decodedToken.id) {
        return response.status(401).json({ error: "token invalid" }).end()
    }
    const blog = new Blog(request.body)
    if (blog.title === undefined || blog.url === undefined) {
        response.status(400).end()
    } else {
        if (blog.likes === undefined){
            blog.likes = 0
        }
        const user = await User.findById(decodedToken.id)
        if (user !== undefined) {
            blog.user = user.id
        }
        const savedBlog = await blog.save()
        user.blogs = user.blogs.concat(savedBlog.id)
        await user.save()
        response.status(201).json(blog)
    }
})

blogsRouter.delete("/:id", async (request, response) => {
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if (!decodedToken.id) {
        return response.status(401).json({ error: "token invalid" }).end()
    }
    const blog = await Blog.findById(request.params.id)
    if (blog.user.toString() === decodedToken.id.toString()) {
        await Blog.findByIdAndDelete(request.params.id)
        response.status(204).end()
    } else {
        response.status(401).json({ error: "user is not creator" }).end()
    }
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