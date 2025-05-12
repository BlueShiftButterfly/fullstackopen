const blogsRouter = require("express").Router();
const Blog = require("../models/blog");
const middleware = require("../utils/middleware");

blogsRouter.get("", async (request, response) => {
    const blogs = await Blog.find({}).populate("user", {
        username: 1,
        name: 1,
        id: 1,
    });
    response.json(blogs);
});

blogsRouter.post("", middleware.userExtractor, async (request, response) => {
    const blog = new Blog(request.body);
    if (blog.title === undefined || blog.url === undefined) {
        return response.status(400).end();
    }
    if (blog.likes === undefined) {
        blog.likes = 0;
    }
    blog.user = request.user.id;
    const savedBlog = await blog.save();
    request.user.blogs = request.user.blogs.concat(savedBlog.id);
    await request.user.save();
    response.status(201).json(blog);
});

blogsRouter.delete(
    "/:id",
    middleware.userExtractor,
    async (request, response) => {
        if (!request.user) {
            return response.status(401).json({ error: "user not found" }).end();
        }
        const blog = await Blog.findById(request.params.id);
        if (!blog) {
            return response.status(404).end();
        }
        if (blog.user.toString() === request.user.id.toString()) {
            await Blog.findByIdAndDelete(request.params.id);
            response.status(204).end();
        } else {
            response.status(401).json({ error: "user is not creator" }).end();
        }
    },
);

blogsRouter.put("/:id", async (request, response) => {
    const { title, author, url, likes } = request.body;
    const blog = await Blog.findById(request.params.id);
    if (blog === undefined || blog === null) {
        response.status(404).end();
    } else {
        blog.title = title;
        blog.author = author;
        blog.url = url;
        blog.likes = likes;
        await blog.save();
        response.status(200).json(blog);
    }
});

module.exports = blogsRouter;
