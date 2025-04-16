import { useState, useEffect } from "react"
import Blog from "./components/Blog"
import Notification from "./components/Notification"
import ErrorNotification from "./components/ErrorNotification"
import blogService from "./services/blogs"
import loginService from "./services/login"
import "./index.css"

const App = () => {
    const [blogs, setBlogs] = useState([])
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [title, setTitle] = useState("")
    const [author, setAuthor] = useState("")
    const [url, setUrl] = useState("")
    const [user, setUser] = useState(null)
    const [errorMessage, setErrorMessage] = useState(null)
    const [notificationMessage, setNotificationMessage] = useState(null)

    const handleLogin = async (event) => {
        event.preventDefault()
        try {
            const user = await loginService.login({
                username, password,
            })
            window.localStorage.setItem(
                "loggedBlogappUser", JSON.stringify(user)
            )
            setUser(user)
            setUsername("")
            setPassword("")
            blogService.setToken(user.token)
            
        } catch (exception) {
            setErrorMessage("wrong credentials")
            setTimeout(() => {
                setErrorMessage(null)
            }, 5000)
        }
    }

    const handleLogout = async (event) => {
        event.preventDefault()
        blogService.setToken(null)
        window.localStorage.removeItem("loggedBlogappUser")
        setUser(null)
    }

    const handleBlogCreation = async (event) => {
        event.preventDefault()
        const newBlog = {
            title: title,
            author: author,
            url: url
        }
        try {
            await blogService.create(newBlog)
            setAuthor("")
            setTitle("")
            setUrl("")
            setNotificationMessage(`a new blog ${newBlog.title} by ${newBlog.author} added`)
            setTimeout(() => {
                setNotificationMessage(null)
            }, 5000)
        } catch (exception) {
            setErrorMessage("failed to create blog")
            setTimeout(() => {
                setErrorMessage(null)
            }, 5000)
        }
    }

    useEffect(() => {
        blogService.getAll().then(blogs =>
            setBlogs( blogs )
        )
    }, [])

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser")
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON)
            setUser(user)
            blogService.setToken(user.token)
        }
    }, [])

    if (user === null) {
        return (
        <div>
            <Notification message={notificationMessage}></Notification>
            <ErrorNotification message={errorMessage}></ErrorNotification>
            <h2>Log in to application</h2>
            <form onSubmit={handleLogin}>
            <div>
                username
                <input type="text" value={username} name="Username" onChange={({ target }) => setUsername(target.value)}/>
            </div>
            <div>
                password
                <input type="password" value={password} name="Password" onChange={({ target }) => setPassword(target.value)}/>
            </div>
            <button type="submit">login</button>
            </form>
        </div>
        )
    }

    return (
        <div>
        <Notification message={notificationMessage}></Notification>
        <ErrorNotification message={errorMessage}></ErrorNotification>
        <p>{user.name} logged in</p>
        <button onClick={handleLogout}>logout</button>
        <h2>create new</h2>
        <form onSubmit={handleBlogCreation}>
            <div>
                title:
                <input type="text" value={title} name="Title" onChange={({ target }) => setTitle(target.value)}/>
            </div>
            <div>
                author:
                <input type="text" value={author} name="Author" onChange={({ target }) => setAuthor(target.value)}/>
            </div>
            <div>
                url:
                <input type="text" value={url} name="Url" onChange={({ target }) => setUrl(target.value)}/>
            </div>
            <button type="submit">create</button>
        </form>
        <h2>blogs</h2>
        
        {blogs.map(blog =>
            <Blog key={blog.id} blog={blog} />
        )}
        </div>
    )
}

export default App