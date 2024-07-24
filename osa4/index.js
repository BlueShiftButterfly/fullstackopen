require("dotenv").config()
const express = require("express")
const app = express()
const cors = require("cors")
const mongoose = require("mongoose")
const config = require("./utils/config")
const logger = require("./utils/logger")
const blogsRouter = require("./controllers/blogs")

logger.info(`connecting to ${config.MONGODB_URI}`)
mongoose.connect(config.MONGODB_URI)
    .then(() => {
        logger.info("connected to MongoDB")
    })
    .catch((error) => {
        logger.error("error connecting to MongoDB:", error.message)
    })
mongoose.set("strictQuery", false)

app.use(cors())
app.use(express.json())

app.use("/api/blogs", blogsRouter)

app.listen(config.PORT, () => {
    logger.info(`Server running on port ${config.PORT}`)
})