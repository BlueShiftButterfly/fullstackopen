require("dotenv").config()
const express = require("express")
const app = express()
const cors = require("cors")
const mongoose = require("mongoose")
const config = require("./utils/config")

console.log("connecting to", config.MONGODB_URI)
mongoose.connect(config.MONGODB_URI)
    .then(() => {
        console.log("connected to MongoDB")
    })
    .catch((error) => {
        console.log("error connecting to MongoDB:", error.message)
    })
mongoose.set("strictQuery", false)

const Blog = require("./models/blog")

app.use(cors())
app.use(express.json())

app.get("/api/blogs", (request, response) => {
    Blog
        .find({})
        .then(blogs => {
            response.json(blogs)
        })
})

app.post("/api/blogs", (request, response) => {
    const blog = new Blog(request.body)

    blog
        .save()
        .then(result => {
            response.status(201).json(result)
        })
})

app.listen(config.PORT, () => {
    console.log(`Server running on port ${config.PORT}`)
})