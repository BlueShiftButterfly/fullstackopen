import { useState, useEffect, useRef } from "react";
import Blog from "./components/Blog";
import Notification from "./components/Notification";
import blogService from "./services/blogs";
import loginService from "./services/login";
import "./index.css";
import Togglable from "./components/Togglable";
import BlogForm from "./components/BlogForm";
import { useDispatch, useSelector } from "react-redux";
import { notifyError } from "./reducers/notificationReducer";
import { createBlog, initializeBlogs } from "./reducers/blogReducer";
import loginstorage from "./services/loginstorage";

const App = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [user, setUser] = useState(null);
    const blogFormRef = useRef();

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(initializeBlogs());
    }, []);

    const blogs = useSelector((state) => state.blogs);
    useEffect(() => {
        const user = loginstorage.loadUser();
        if (user) {
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
            loginstorage.saveUser(user);
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
        loginstorage.removeUser();
        setUser(null);
    };

    const handleCreateBlog = async (blogObject) => {};

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
                <BlogForm formRef={blogFormRef}></BlogForm>
            </Togglable>
            <h2>Blogs</h2>
            {blogs.map((blog) => (
                <Blog key={blog.id} blog={blog} />
            ))}
        </div>
    );
};

export default App;
