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

    const createBlog = async (blogObject) => {
        try {
            const result = await blogService.create(blogObject)
            blogFormRef.current.toggleVisibility()
            setNotificationMessage(`Created new blog ${blogObject.title} by ${blogObject.author} added`)
            setTimeout(() => {
                setNotificationMessage(null)
            }, 5000)
            setBlogs(await blogService.getAll())
            console.log(`Created new blog ${blogObject.title} by ${blogObject.author} added`)
            console.log(`Request response: ${JSON.stringify(result)}`)
        } catch (exception) {
            console.log("Failed to create blog")
            console.log(exception)
            setErrorMessage("Failed to create blog")
            setTimeout(() => {
                setErrorMessage(null)
            }, 5000)
        }
    }

    const updateBlog = async (blogObject) => {
        try {
            await blogService.modify(blogObject)
            console.log(`Liked blog \"${blogObject.title}\". Now it has ${blogObject.likes} likes.`)
            setBlogs(await blogService.getAll())
        } catch (exception) {
            console.log("Failed to like blog")
            console.log(exception)
            setErrorMessage("Failed to like blog")
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
                    Username 
                    <input type="text" value={username} name="Username" onChange={({ target }) => setUsername(target.value)}/>
                </div>
                <div>
                    Password 
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
                <BlogForm createBlog={createBlog}></BlogForm>
            </Togglable>
            
            <h2>Blogs</h2>
            {blogs.sort((a, b) => b.likes - a.likes).map(blog =>
                <Blog key={blog.id} blog={blog} updateBlog={updateBlog} />
            )}
        </div>
    )
}

export default App