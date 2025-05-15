import { useEffect, useRef } from "react";
import Blog from "./components/Blog";
import Notification from "./components/Notification";
import "./index.css";
import Togglable from "./components/Togglable";
import BlogForm from "./components/BlogForm";
import { useDispatch, useSelector } from "react-redux";
import { initializeBlogs } from "./reducers/blogReducer";
import LoginForm from "./components/LoginForm";
import { initializeUser, logout } from "./reducers/userReducer";

const App = () => {
    const blogs = useSelector((state) => state.blogs);
    const user = useSelector((state) => state.user);
    const dispatch = useDispatch();

    const blogFormRef = useRef();

    useEffect(() => {
        dispatch(initializeBlogs());
    }, [dispatch]);

    useEffect(() => {
        dispatch(initializeUser());
    }, [dispatch]);

    const handleLogout = async (event) => {
        event.preventDefault();
        dispatch(logout());
    };

    if (!user) {
        return (
            <div>
                <Notification></Notification>
                <LoginForm></LoginForm>
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
