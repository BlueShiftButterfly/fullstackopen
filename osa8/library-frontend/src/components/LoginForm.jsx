import { useState } from "react"

const LoginForm = ({ show, login }) => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    if (!show) {
        return null
    }

    const submit = async (event) => {
        event.preventDefault()
        login(username, password)
        setUsername("")
        setPassword("")
    }

    return (
        <div>
            <form onSubmit={submit}>
                <div>
                Username
                    <input
                        type="text"
                        name="Username"
                        onChange={({ target }) => setUsername(target.value)}
                    />
                </div>
                <div>
                Password
                    <input
                        type="password"
                        name="Password"
                        onChange={({ target }) => setPassword(target.value)}
                    />
                </div>
                <button type="submit">Login</button>
            </form>
        </div>
    )
}

export default LoginForm