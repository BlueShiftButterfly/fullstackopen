const { ApolloServer } = require("@apollo/server")
const { expressMiddleware } = require("@apollo/server/express4")
const { ApolloServerPluginDrainHttpServer } = require("@apollo/server/plugin/drainHttpServer")
const { makeExecutableSchema } = require("@graphql-tools/schema")
const express = require("express")
const cors = require("cors")
const http = require("http")
const mongoose = require("mongoose")
const { WebSocketServer } = require("ws")
const { useServer } = require("graphql-ws/lib/use/ws")

const User = require("./models/user")

const { PORT, MONGODB_URI, JWT_SECRET } = require("./utils/config")

const jwt = require("jsonwebtoken")
const typeDefs = require("./schema")
const resolvers = require("./resolvers")

console.log(`connecting to ${MONGODB_URI}`)

mongoose
    .connect(MONGODB_URI)
    .then(() => {
        console.log("connection successful")
    })
    .catch((error) => {
        console.log(`error connecting to mongodb: ${error.message}`)
    })

const start = async () => {
    const app = express()
    const httpServer = http.createServer(app)

    const wsServer = new WebSocketServer({
        server: httpServer,
        path: "/",
    })

    const schema = makeExecutableSchema({ typeDefs: typeDefs, resolvers: resolvers })
    const serverCleanup = useServer({ schema }, wsServer)

    const server = new ApolloServer({
        schema: makeExecutableSchema({ typeDefs: typeDefs, resolvers: resolvers }),
        plugins: [
            ApolloServerPluginDrainHttpServer({ httpServer }),
            {
                async serverWillStart() {
                    return {
                        async drainServer() {
                            await serverCleanup.dispose()
                        }
                    }
                }
            }
        ],
    })

    await server.start()

    app.use(
        "/",
        cors(),
        express.json(),
        expressMiddleware(server, {
            context: async ({ req }) => {
                const auth = req ? req.headers.authorization : null
                if (auth && auth.startsWith("Bearer ")) {
                    const decodedToken = jwt.verify(
                        auth.substring(7), JWT_SECRET
                    )
                    const currentUser = await User
                        .findById(decodedToken.id).populate("favoriteGenre")
                    return { currentUser }
                }
            },
        }),
    )

    httpServer.listen(PORT, () =>
        console.log(`Server is now running on http://localhost:${PORT}`)
    )
}

start()
