import { gql, useQuery } from "@apollo/client"
import { useState } from "react"

const ALL_BOOKS = gql`
query {
    allBooks {
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
const Books = (props) => {
    const result = useQuery(ALL_BOOKS)
    const [genreFilter, setGenreFilter] = useState("")

    if (!props.show) {
        return null
    }

    if (result.loading) {
        return <div>Loading authors...</div>
    }

    const books = result.data ? result.data.allBooks : []

    if (!result.data) {
        return <div>Could not load list of book.</div>
    }

    const getGenres = () => {
        let genresArr = []
        books.forEach(book => {
            genresArr = genresArr.concat(book.genres)
        });
        return [... new Set(genresArr)]
    }

    const genres = getGenres()

    return (
        <div>
            <h2>books</h2>
            <p>{genreFilter === "" ? " " : "in genre: "}{genreFilter}</p>
            <table>
                <tbody>
                    <tr>
                        <th></th>
                        <th>author</th>
                        <th>published</th>
                    </tr>
                    {books
                        .filter((b) => {
                            if (genreFilter === "") return true
                            return (b.genres.includes(genreFilter)) 
                        })
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
