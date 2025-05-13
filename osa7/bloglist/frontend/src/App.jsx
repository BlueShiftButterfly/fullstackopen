import { useState, useEffect, useRef } from "react";
import Blog from "./components/Blog";
import Notification from "./components/Notification";
import blogService from "./services/blogs";
import loginService from "./services/login";
import "./index.css";
import Togglable from "./components/Togglable";
import BlogForm from "./components/BlogForm";
import { useDispatch } from "react-redux";
import { notifyError, notifyMessage } from "./reducers/notificationReducer";

const App = () => {
    const [blogs, setBlogs] = useState([]);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [user, setUser] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);
    const [notificationMessage, setNotificationMessage] = useState(null);
    const blogFormRef = useRef();

    const dispatch = useDispatch();

    useEffect(() => {
        blogService.getAll().then((blogs) => setBlogs(blogs));
    }, []);

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON);
            setUser(user);
            blogService.setToken(user.token);
        }
    }, []);

    const handleLogin = async (event) => {
        event.preventDefault();
        try {
            const user = await loginService.login({
                username,
                password,
            });
            window.localStorage.setItem(
                "loggedBlogappUser",
                JSON.stringify(user),
            );
            setUser(user);
            setUsername("");
            setPassword("");
            blogService.setToken(user.token);
        } catch (exception) {
            dispatch(notifyError("Wrong credentials"));
        }
    };

    const handleLogout = async (event) => {
        event.preventDefault();
        blogService.setToken(null);
        window.localStorage.removeItem("loggedBlogappUser");
        setUser(null);
    };

    const createBlog = (blogObject) => {
        blogFormRef.current.toggleVisibility();
        blogService
            .create(blogObject)
            .then((returnedBlog) => {
                blogService.getAll().then((blogs) => setBlogs(blogs));
                dispatch(
                    notifyMessage(
                        `Created new blog ${returnedBlog.title} by ${returnedBlog.author}`,
                    ),
                );
                console.log(
                    `Created new blog ${returnedBlog.title} by ${returnedBlog.author}`,
                );
            })
            .catch((exception) => {
                console.log(
                    "Failed to create blog",
                    exception.name,
                    exception.stack,
                    exception.message,
                );
                dispatch(notifyError("Failed to create blog"));
            });
    };

    const updateBlog = (blogObject) => {
        blogService
            .modify(blogObject)
            .then((returnedBlog) => {
                blogService.getAll().then((blogs) => setBlogs(blogs));
                console.log(
                    `Liked blog "${blogObject.title}". Now it has ${blogObject.likes} likes.`,
                );
            })
            .catch((exception) => {
                console.log("Failed to like blog");
                console.log(exception);
                dispatch(notifyError("Failed to like blog"));
            });
    };

    const removeBlog = (blogObject) => {
        blogService
            .remove(blogObject)
            .then((returnedBlog) => {
                blogService.getAll().then((blogs) => setBlogs(blogs));
                dispatch(
                    notifyMessage(
                        `Removed ${blogObject.title} by ${blogObject.author}`,
                    ),
                );
                console.log(
                    `Removed ${blogObject.title} by ${blogObject.author}`,
                );
            })
            .catch((exception) => {
                console.log("Failed to remove blog");
                console.log(exception);
                dispatch(notifyError("Failed to remove blog"));
            });
    };

    if (user === null) {
        return (
            <div>
                <Notification></Notification>
                <h2>Log in to application</h2>
                <form onSubmit={handleLogin}>
                    <div>
                        Username
                        <input
                            data-testid="username"
                            type="text"
                            value={username}
                            name="Username"
                            onChange={({ target }) => setUsername(target.value)}
                        />
                    </div>
                    <div>
                        Password
                        <input
                            data-testid="password"
                            type="password"
                            value={password}
                            name="Password"
                            onChange={({ target }) => setPassword(target.value)}
                        />
                    </div>
                    <button type="submit">Login</button>
                </form>
            </div>
        );
    }

    return (
        <div>
            <Notification></Notification>
            <p>{user.name} logged in</p>
            <button onClick={handleLogout}>Logout</button>
            <Togglable buttonLabel="Create New Blog" ref={blogFormRef}>
                <BlogForm createBlog={createBlog}></BlogForm>
            </Togglable>
            <h2>Blogs</h2>
            {blogs
                .sort((a, b) => b.likes - a.likes)
                .map((blog) => (
                    <Blog
                        key={blog.id}
                        blog={blog}
                        updateBlog={updateBlog}
                        removeBlog={removeBlog}
                        canRemove={blog.user.username === user.username}
                    />
                ))}
        </div>
    );
};

export default App;
