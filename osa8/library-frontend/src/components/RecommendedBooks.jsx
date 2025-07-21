import { gql, useQuery } from "@apollo/client"

const ALL_BOOKS_OF_GENRE = gql`
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

const FAVORITE_GENRE = gql`
query Query {
  me {
    favoriteGenre
  }
}
`

const RecommendedBooks = (props) => {
    const { data: favoriteGenre } = useQuery(FAVORITE_GENRE)
    
    const result = useQuery(ALL_BOOKS_OF_GENRE, {
        skip: !favoriteGenre || !favoriteGenre.me,
        variables: { genre: favoriteGenre ? favoriteGenre.me.favoriteGenre : "" },
    })

    if (!props.show) {
        return null
    }

    if (result.loading) {
        return <div>Loading books...</div>
    }

    const books = result.data ? result.data.allBooks : []

    if (!result.data) {
        console.log(result)
        return <div>Could not load list of book.</div>
    }


    return (
        <div>
            <h2>recommendations</h2>
            <p>books in your favorite genre <b>{favoriteGenre ? favoriteGenre.me.favoriteGenre : ""}</b></p>
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
        </div>
    )
}

export default RecommendedBooks
