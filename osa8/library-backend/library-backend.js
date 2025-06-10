const { ApolloServer } = require("@apollo/server")
const { startStandaloneServer } = require("@apollo/server/standalone")
const mongoose = require("mongoose")
const Book = require("./models/book")
const Author = require("./models/author")

const { PORT, MONGODB_URI } = require("./utils/config")
const { GraphQLError } = require("graphql")

console.log(`connecting to ${MONGODB_URI}`)

mongoose.connect(MONGODB_URI)
    .then(() => {
        console.log("connection successful")
    })
    .catch((error) => {
        console.log(`error connecting to mongodb: ${error.message}`)
    })

/*
let authors = [
    {
        name: "Robert Martin",
        id: "afa51ab0-344d-11e9-a414-719c6709cf3e",
        born: 1952,
    },
    {
        name: "Martin Fowler",
        id: "afa5b6f0-344d-11e9-a414-719c6709cf3e",
        born: 1963
    },
    {
        name: "Fyodor Dostoevsky",
        id: "afa5b6f1-344d-11e9-a414-719c6709cf3e",
        born: 1821
    },
    {
        name: "Joshua Kerievsky", // birthyear not known
        id: "afa5b6f2-344d-11e9-a414-719c6709cf3e",
    },
    {
        name: "Sandi Metz", // birthyear not known
        id: "afa5b6f3-344d-11e9-a414-719c6709cf3e",
    },
]
*/

/*
 * Suomi:
 * Saattaisi olla järkevämpää assosioida kirja ja sen tekijä tallettamalla kirjan yhteyteen tekijän nimen sijaan tekijän id
 * Yksinkertaisuuden vuoksi tallennamme kuitenkin kirjan yhteyteen tekijän nimen
 *
 * English:
 * It might make more sense to associate a book with its author by storing the author's id in the context of the book instead of the author's name
 * However, for simplicity, we will store the author's name in connection with the book
 *
 * Spanish:
 * Podría tener más sentido asociar un libro con su autor almacenando la id del autor en el contexto del libro en lugar del nombre del autor
 * Sin embargo, por simplicidad, almacenaremos el nombre del autor en conexión con el libro
*/
/*
let books = [
    {
        title: "Clean Code",
        published: 2008,
        author: "Robert Martin",
        id: "afa5b6f4-344d-11e9-a414-719c6709cf3e",
        genres: ["refactoring"]
    },
    {
        title: "Agile software development",
        published: 2002,
        author: "Robert Martin",
        id: "afa5b6f5-344d-11e9-a414-719c6709cf3e",
        genres: ["agile", "patterns", "design"]
    },
    {
        title: "Refactoring, edition 2",
        published: 2018,
        author: "Martin Fowler",
        id: "afa5de00-344d-11e9-a414-719c6709cf3e",
        genres: ["refactoring"]
    },
    {
        title: "Refactoring to patterns",
        published: 2008,
        author: "Joshua Kerievsky",
        id: "afa5de01-344d-11e9-a414-719c6709cf3e",
        genres: ["refactoring", "patterns"]
    },
    {
        title: "Practical Object-Oriented Design, An Agile Primer Using Ruby",
        published: 2012,
        author: "Sandi Metz",
        id: "afa5de02-344d-11e9-a414-719c6709cf3e",
        genres: ["refactoring", "design"]
    },
    {
        title: "Crime and punishment",
        published: 1866,
        author: "Fyodor Dostoevsky",
        id: "afa5de03-344d-11e9-a414-719c6709cf3e",
        genres: ["classic", "crime"]
    },
    {
        title: "Demons",
        published: 1872,
        author: "Fyodor Dostoevsky",
        id: "afa5de04-344d-11e9-a414-719c6709cf3e",
        genres: ["classic", "revolution"]
    },
]
*/

const typeDefs = `
type Book {
    title: String!
    author: Author!
    published: Int!
    genres: [String!]!
    id: ID!
}

type Author {
    name: String!
    born: Int
    bookCount: Int
    id: ID!
}

type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
}

type Mutation {
    addBook (
        title: String!
        author: String!
        published: Int!
        genres: [String!]!
    ): Book
    editAuthor (
        name: String!
        setBornTo: Int!
    ): Author
}

`

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
                            },
                        }
                    }
                ])
                const authors = await Author.find({})
                const newAuthors = authors.map(author => {
                    const foundBookCount = bookCounts.filter((bc) => bc._id.toString() === author._id.toString()).length
                    const newAuthor = author
                    newAuthor.bookCount = foundBookCount ?? 0
                    return newAuthor
                })
                return newAuthors
            } catch (error) {
                console.log(error)
            }
        },
    },
    Mutation: {
        addBook: async (root, args) => {
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
                author.bookCount = books.length
                const savedBook = await new Book({ ...args, author: author }).save()
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
        editAuthor: async (root, args) => {
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
    }
}

const server = new ApolloServer({
    typeDefs,
    resolvers,
})

startStandaloneServer(server, {
    listen: { port: PORT },
}).then(({ url }) => {
    console.log(`Server ready at ${url}`)
})
