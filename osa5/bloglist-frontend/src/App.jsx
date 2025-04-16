import { useState, useEffect, useRef } from "react"
import Blog from "./components/Blog"
import Notification from "./components/Notification"
import ErrorNotification from "./components/ErrorNotification"
import blogService from "./services/blogs"
import loginService from "./services/login"
import "./index.css"
import Togglable from "./components/Togglable"
import BlogForm from "./components/BlogForm"

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
    const blogFormRef = useRef()

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
            setErrorMessage("Wrong credentials")
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
            const result = await blogService.create(newBlog)
            setAuthor("")
            setTitle("")
            setUrl("")
            blogFormRef.current.toggleVisibility()
            setNotificationMessage(`Created new blog ${newBlog.title} by ${newBlog.author} added`)
            setTimeout(() => {
                setNotificationMessage(null)
            }, 5000)
            blogService.getAll().then(blogs =>
                setBlogs( blogs )
            )
            console.log(`Created new blog ${newBlog.title} by ${newBlog.author} added`)
            console.log(`Request response: ${JSON.stringify(result)}`)
        } catch (exception) {
            setErrorMessage("Failed to create blog")
            setTimeout(() => {
                setErrorMessage(null)
            }, 5000)
        }
    }

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
            <button type="submit">Login</button>
            </form>
        </div>
        )
    }

    return (
        <div>
        <Notification message={notificationMessage}></Notification>
        <ErrorNotification message={errorMessage}></ErrorNotification>
        <p>{user.name} logged in</p>
        <button onClick={handleLogout}>Logout</button>
        <Togglable buttonLabel="Create New Blog" ref={blogFormRef}>
            <BlogForm
                handleSubmit={handleBlogCreation}
                title={title}
                author={author}
                url={url}
                handleTitleChange={({ target }) => { setTitle(target.value) }}
                handleAuthorChange={({ target }) => { setAuthor(target.value) }}
                handleUrlChange={({ target }) => { setUrl(target.value) }}
            ></BlogForm>
        </Togglable>
        
        <h2>Blogs</h2>
        {blogs.map(blog =>
            <Blog key={blog.id} blog={blog} />
        )}
        </div>
    )
}

export default App