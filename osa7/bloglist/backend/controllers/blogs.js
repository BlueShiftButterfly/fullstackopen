const blogsRouter = require("express").Router();
const Blog = require("../models/blog");
const middleware = require("../utils/middleware");
const Comment = require("../models/comment");

blogsRouter.get("", async (request, response) => {
    const blogs = await Blog.find({})
        .populate("user", {
            username: 1,
            name: 1,
            id: 1,
        })
        .populate("comments", {
            content: 1,
            id: 1,
        });
    response.json(blogs);
});

blogsRouter.post("", middleware.userExtractor, async (request, response) => {
    const blog = new Blog(request.body);
    if (!blog.title || !blog.url) {
        return response
            .status(400)
            .json({ error: "Blog is missing a title or URL" })
            .end();
    }
    if (!request.user) {
        return response.status(400).json({ error: "User is missing" }).end();
    }
    if (!blog.likes) {
        blog.likes = 0;
    }
    blog.user = request.user;
    blog.comments = [];
    const savedBlog = await blog.save();
    request.user.blogs = request.user.blogs.concat(savedBlog.id);
    await request.user.save();
    return response.status(201).json(blog);
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

blogsRouter.put(
    "/:id/comments",
    middleware.userExtractor,
    async (request, response) => {
        console.log(request.body.content);
        const comment = request.body;
        const blog = await Blog.findById(request.params.id);
        if (blog === undefined || blog === null) {
            return response.status(404).json({ error: "blog not found" });
        }
        if (!comment.content) {
            return response
                .status(400)
                .json({ error: "comment cannot be empty" });
        }
        const newComment = new Comment(comment);
        newComment.blog = blog.id;
        await newComment.save();
        blog.comments = blog.comments.concat(newComment.id);
        await blog.save();
        const returnedBlog = await Blog.findById(blog.id)
            .populate("user", {
                username: 1,
                name: 1,
                id: 1,
            })
            .populate("comments", {
                content: 1,
                id: 1,
            });
        return response.status(200).json(returnedBlog);
    },
);

module.exports = blogsRouter;
