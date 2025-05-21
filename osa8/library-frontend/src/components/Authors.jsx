import { gql, useMutation, useQuery } from "@apollo/client"
import { useState } from "react"

const ALL_AUTHORS = gql`
query {
    allAuthors {
        name
        born
        bookCount
    }
}
`

const EDIT_AUTHOR = gql`
mutation ($name: String! $setBornTo: Int!){
    editAuthor(
        name: $name,
        setBornTo: $setBornTo
    ) {
        name
        born
  }
}
`

const Authors = (props) => {
    const [ authorName, setAuthorName ] = useState("")
    const [ birthday, setBirthday ] = useState("")

    const result = useQuery(ALL_AUTHORS)

    const [ editAuthor ] = useMutation(EDIT_AUTHOR, { refetchQueries: [ { query: ALL_AUTHORS } ] })

    if (!props.show) {
        return null
    }


    if (result.loading) {
        return <div>Loading authors...</div>
    }

    const authors = result.data.allAuthors

    const updateBirthyear = (event) => {
        event.preventDefault()
        editAuthor({ variables: { name: authorName, setBornTo: Number(birthday) } })
            .then((response) => console.log(response.data))
        setBirthday("")
        setAuthorName("")
    }

    return (
        <div>
            <h2>authors</h2>
            <table>
                <tbody>
                    <tr>
                        <th></th>
                        <th>born</th>
                        <th>books</th>
                    </tr>
                    {authors.map((a) => (
                        <tr key={a.name}>
                            <td>{a.name}</td>
                            <td>{a.born}</td>
                            <td>{a.bookCount}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <h2>Set birthyear</h2>
            <form onSubmit={updateBirthyear}>
                <label>
                    name
                    <select value={authorName} onChange={({ target }) => setAuthorName(target.value)}>
                        {authors.map((a) => (
                            <option key={a.name} value={a.name}>{a.name}</option>
                        ))}
                    </select>
                </label>
                <div>
                    born
                    <input value={birthday} onChange={({ target }) => setBirthday(target.value)}></input>
                </div>

                <button type="submit">Update Author</button>
            </form>
        </div>
    )
}

export default Authors
