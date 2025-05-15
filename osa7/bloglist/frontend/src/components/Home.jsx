import { useRef } from "react";
import { useSelector } from "react-redux";
import Blog from "./Blog";
import BlogForm from "./BlogForm";
import Togglable from "./Togglable";

const Home = () => {
    const blogs = useSelector((state) => state.blogs);

    const blogFormRef = useRef();
    return (
        <div>
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

export default Home;
