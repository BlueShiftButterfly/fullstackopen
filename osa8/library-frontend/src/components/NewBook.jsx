import { gql, useMutation } from "@apollo/client"
import { useState } from "react"

const BOOKS_BY_GENRE = gql`
query AllBooks($genre: String) {
    allBooks(genre: $genre) {
        author {
            bookCount
            born
            id
            name
        }
        genres
        id
        published
        title
    }
}
`

const ALL_BOOKS = gql`
query {
    allBooks {
        title
        author
        published
    }
}
`

const ALL_AUTHORS = gql`
query {
    allAuthors {
        name
        born
        bookCount
    }
}
`

const CREATE_BOOK = gql`
mutation createBook($title: String!, $author: String!, $published: Int! $genres: [String!]!) {
    addBook(
        title: $title,
        author: $author,
        published: $published,
        genres: $genres,
    ) {
        title
        published
        genres
      author {
        bookCount
        born
        id
        name
      }
      id
    }
}
`

const NewBook = (props) => {
    const [title, setTitle] = useState("")
    const [author, setAuthor] = useState("")
    const [published, setPublished] = useState("")
    const [genre, setGenre] = useState("")
    const [genres, setGenres] = useState([])

    const [ createBook ] = useMutation(CREATE_BOOK, {
        refetchQueries: [ { query: ALL_BOOKS }, { query: ALL_AUTHORS }],
        onError: (error) => {
            console.log(error)
            //console.log(error.graphQLErrors[0].message)
        },
        /*update: (cache, response) => {
            console.log(response.data)
            cache.updateQuery({query: BOOKS_BY_GENRE}, ({ allBooks }) => {
                return {
                    allBooks: allBooks.concat(response.data.addBook)
                }
            })
            cache.updateQuery({query: ALL_AUTHORS}, ({ allAuthors }) => {
                return {
                    allAuthors: allAuthors.concat({
                        name: response.data.addBook.author.name,
                        born: response.data.addBook.author.born,
                        bookCount: response.data.addBook.author.bookCount,
                    })
                }
            })
            console.log("updateing cache")
            */
        //},
    })

    if (!props.show) {
        return null
    }

    const submit = async (event) => {
        event.preventDefault()

        createBook({ variables: { title, author, published: Number(published), genres } })

        setTitle("")
        setPublished("")
        setAuthor("")
        setGenres([])
        setGenre("")
    }

    const addGenre = () => {
        setGenres(genres.concat([genre]))
        setGenre("")
    }

    return (
        <div>
            <form onSubmit={submit}>
                <div>
          title
                    <input
                        value={title}
                        onChange={({ target }) => setTitle(target.value)}
                    />
                </div>
                <div>
          author
                    <input
                        value={author}
                        onChange={({ target }) => setAuthor(target.value)}
                    />
                </div>
                <div>
          published
                    <input
                        type="number"
                        value={published}
                        onChange={({ target }) => setPublished(target.value)}
                    />
                </div>
                <div>
                    <input
                        value={genre}
                        onChange={({ target }) => setGenre(target.value)}
                    />
                    <button onClick={addGenre} type="button">
            add genre
                    </button>
                </div>
                <div>genres: {genres.join(" ")}</div>
                <button type="submit">create book</button>
            </form>
        </div>
    )
}

export default NewBook