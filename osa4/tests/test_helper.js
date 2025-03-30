const Blog = require("../models/blog")
const User = require("../models/user")

const initialBlogs = [
    {
        title: "New Amazing Blog",
        author: "John Johnson",
        url: "testurl",
        likes: 2
    },
    {
        title: "Another Amazing Blog",
        author: "Jane Janeson",
        url: "testurl",
        likes: 5
    }
]

const usersInDb = async () => {
    const users = await User.find({})
    return users.map(u => u.toJSON())
}

const nonExistingId = async () => {
    const blog = new Blog({  })
    await blog.save()
    await blog.deleteOne()

    return note.id.toString()
}

const blogsInDb = async () => {
    const blogs = await Blog.find({})
     return blogs.map(blog => blog.toJSON())
}

module.exports = {
    initialBlogs, nonExistingId, blogsInDb, usersInDb
}