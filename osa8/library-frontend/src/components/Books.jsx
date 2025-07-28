import { gql, useQuery } from "@apollo/client"
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

const LIST_GENRES = gql`
query AllBooks {
    allBooks {
        genres
    }
}
`

const Books = (props) => {
    const [genreFilter, setGenreFilter] = useState("")
    
    const genres_result = useQuery(LIST_GENRES)
    
    const books_result = useQuery(BOOKS_BY_GENRE, {
        variables: { genre: (genreFilter === "") ? null : genreFilter}
    })

    if (!props.show) {
        return null
    }

    if (books_result.loading || genres_result.loading) {
        return <div>Loading books...</div>
    }

    const books = books_result.data ? books_result.data.allBooks : []

    if (!books_result.data) {
        return <div>Could not load list of book.</div>
    }

    const getGenres = () => {
        let genresArr = []
        genres_result.data.allBooks.forEach(g => {
            genresArr = genresArr.concat(g.genres)
        });
        return [... new Set(genresArr)]
    }

    const genres = getGenres()

    return (
        <div>
            <h2>books</h2>
            <p>{genreFilter === "" ? " " : "in genre: "}<b>{genreFilter}</b></p>
            <table>
                <tbody>
                    <tr>
                        <th></th>
                        <th>author</th>
                        <th>published</th>
                    </tr>
                    {books
                        .map((a) => (
                            <tr key={a.title}>
                                <td>{a.title}</td>
                                <td>{a.author.name}</td>
                                <td>{a.published}</td>
                            </tr>
                    ))}
                </tbody>
            </table>
            <div>
                {genres.map((a) => (
                    <button key={a} onClick={() => setGenreFilter(a)}>{a}</button>
                ))}
                <button onClick={() => setGenreFilter("")}>all genres</button>
            </div>
        </div>
    )
}

export default Books
