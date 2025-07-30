const Book = require("./models/book")
const Author = require("./models/author")
const User = require("./models/user")

const { JWT_SECRET } = require("./utils/config")
const { GraphQLError } = require("graphql")

const { PubSub } = require("graphql-subscriptions")
const pubsub = new PubSub()

const jwt = require("jsonwebtoken")

const resolvers = {
    Query: {
        bookCount: async () => Book.collection.countDocuments(),
        authorCount: async () => Author.collection.countDocuments(),
        allBooks: async (root, args) => {
            let criteria = {}
            if (args.author) {
                try {
                    const author = await Author.findOne({ name: args.author })
                    criteria = { ...criteria, author: author }
                } catch (error) {
                    throw new GraphQLError("Error when fetching author.")
                }
            }
            if (args.genre) {
                criteria = { ...criteria, genres: args.genre }
            }
            try {
                const books = await Book.find(criteria).populate("author")
                return books
            } catch (error) {
                throw new GraphQLError("Error finding books.")
            }
        },
        allAuthors: async () => {
            try {
                const bookCounts = await Book.aggregate([
                    {
                        $lookup: {
                            from: "authors",
                            localField: "author",
                            foreignField: "_id",
                            as: "authorObj"
                        }
                    },
                    {
                        $unwind: "$authorObj"
                    },
                    {
                        $group: {
                            _id: "$author",
                            bookCount: {
                                $count: {}
                            }
                        }
                    }
                ])
                const authors = await Author.find({})
                const newAuthors = authors.map(author => {
                    const foundBookCount = bookCounts.filter((bc) => bc._id.toString() === author._id.toString())[0]
                    if (!foundBookCount) return author
                    const newAuthor = author
                    newAuthor.bookCount = foundBookCount.bookCount ?? 0
                    return newAuthor
                })
                return newAuthors
            } catch (error) {
                console.log(error)
            }
        },
        me: (root, args, context) => {
            console.log(context)
            return context.currentUser
        }

    },
    Mutation: {
        addBook: async (root, args, context) => {
            const currentUser = context.currentUser
            if (!currentUser) {
                throw new GraphQLError("not authenticated", {
                    extensions: {
                        code: "BAD_USER_INPUT",
                    }
                })
            }
            let author = await Author.findOne({ name: args.author })
            if (!author) {
                try {
                    const newAuthor = new Author({ name: args.author, born: null })
                    author = await newAuthor.save()
                } catch (error) {
                    console.log(error)
                    if (error.name === "ValidationError") {
                        throw new GraphQLError("Failed create new author from book.", {
                            extensions: {
                                code: "BAD_USER_INPUT",
                                invalidArgs: args.author,
                                error
                            }
                        })
                    }
                }

            }
            try {
                const books = await Book.find({ author: author._id }) ?? 0
                author.bookCount = books.length + 1 // previous query does not include current book
                const savedBook = await new Book({ ...args, author: author }).save()
                pubsub.publish("BOOK_ADDED", { bookAdded: savedBook })
                return savedBook
            } catch (error) {
                console.log(error)
                if (error.name === "ValidationError") {
                    throw new GraphQLError("Failed to create book.", {
                        extensions: {
                            code: "BAD_USER_INPUT",
                            error
                        }
                    })
                }
            }
        },
        editAuthor: async (root, args, context) => {
            const currentUser = context.currentUser
            if (!currentUser) {
                throw new GraphQLError("not authenticated", {
                    extensions: {
                        code: "BAD_USER_INPUT",
                    }
                })
            }
            const author = await Author.findOne({ name: args.name })
            if (!author) {
                throw new GraphQLError("Author with specified name doesn't exist.", {
                    extensions: {
                        code: "BAD_USER_INPUT",
                        invalidArgs: args.name,
                        error
                    }
                })
            }
            try {
                author.born = args.setBornTo
                const savedAuthor = await author.save()
                const books = await Book.find({ author: author._id }) ?? 0
                savedAuthor.bookCount = books.length
                return savedAuthor
            } catch(error) {
                console.log(error)
                if (error.name === "ValidationError") {
                    throw new GraphQLError("Failed edit author.", {
                        extensions: {
                            code: "BAD_USER_INPUT",
                            error
                        }
                    })
                }
            }
        },
        createUser: async (root, args) => {
            const user = new User({
                username: args.username,
                favoriteGenre: args.favoriteGenre
            })

            return user.save()
                .catch(error => {
                    throw new GraphQLError("Creating the user failed", {
                        extensions: {
                            code: "BAD_USER_INPUT",
                            error
                        }
                    })
                })
        },
        login: async (root, args) => {
            const user = await User.findOne({ username: args.username })

            if ( !user || args.password !== "secret" ) {
                throw new GraphQLError("wrong credentials", {
                    extensions: {
                        code: "BAD_USER_INPUT",
                        error
                    }
                })
            }

            const userForToken = {
                username: user.username,
                id: user._id,
            }

            return { value: jwt.sign(userForToken, JWT_SECRET) }
        },
    },
    Subscription: {
        bookAdded: {
            subscribe: () => pubsub.asyncIterator("BOOK_ADDED")
        }
    }
}

module.exports = resolvers