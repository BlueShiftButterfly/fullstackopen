import { useEffect, useRef } from "react";
import Blog from "./components/Blog";
import Notification from "./components/Notification";
import "./index.css";
import Togglable from "./components/Togglable";
import BlogForm from "./components/BlogForm";
import { useDispatch, useSelector } from "react-redux";
import { initializeBlogs } from "./reducers/blogReducer";
import LoginForm from "./components/LoginForm";
import { initializeLocalUser } from "./reducers/localUserReducer";
import LocalUser from "./components/LocalUser";

const App = () => {
    const blogs = useSelector((state) => state.blogs);
    const user = useSelector((state) => state.localUser);
    const dispatch = useDispatch();

    const blogFormRef = useRef();

    useEffect(() => {
        dispatch(initializeBlogs());
    }, [dispatch]);

    useEffect(() => {
        dispatch(initializeLocalUser());
    }, [dispatch]);

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
            <LocalUser></LocalUser>
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
