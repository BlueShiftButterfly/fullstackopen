import { useState } from "react"
import Authors from "./components/Authors"
import Books from "./components/Books"
import NewBook from "./components/NewBook"
import LoginForm from "./components/LoginForm"
import { gql, useApolloClient, useMutation } from "@apollo/client"
import { useEffect } from "react"

const LOGIN = gql`
mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password)  {
        value
    }
}
`


const App = () => {
    const [page, setPage] = useState("authors")
    const [token, setToken] = useState(null)

    const client = useApolloClient()

    const [login, result] = useMutation(LOGIN, {
        onError: (error) => {
            console.log(error.graphQLErrors[0].message)
        }
    })

    useEffect(() => {
        if (result.data) {
            const token = result.data.login.value
            setToken(token)
            localStorage.setItem("libraryapp-user-token", token)
        }
    }, [result.data])

    useEffect(() => {
        const userToken = localStorage.getItem("libraryapp-user-token")
        if (userToken) {
            setToken(userToken)
        }
    }, [])


    const hideWhenLoggedIn = { display: (token === null) ? "" : "none" }
    const showWhenLoggedIn = { display: (token === null) ? "none" : "" }


    const logout = () => {
        setToken(null)
        localStorage.clear()
        client.resetStore()
    }

    const loginUser = (username, password) => {
        login({ variables: { username, password }  })

        setPage("authors")
    }

    return (
        <div>
            <div>
                <button onClick={() => setPage("authors")}>authors</button>
                <button onClick={() => setPage("books")}>books</button>
                <button onClick={() => setPage("add")} style={showWhenLoggedIn}>add book</button>
                <button onClick={() => setPage("login")} style={hideWhenLoggedIn}>login</button>
                <button onClick={() => logout()} style={showWhenLoggedIn}>logout</button>
            </div>

            <Authors show={page === "authors"} />

            <Books show={page === "books"} />

            <NewBook show={page === "add"} />

            <LoginForm show={page === "login"} login={loginUser}/>
        </div>
    )
}

export default App
