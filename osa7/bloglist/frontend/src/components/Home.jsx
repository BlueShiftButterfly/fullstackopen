import { useRef } from "react";
import { useSelector } from "react-redux";
import BlogForm from "./BlogForm";
import Togglable from "./Togglable";
import { Link } from "react-router-dom";

const Home = () => {
    const blogs = useSelector((state) => state.blogs);

    const blogFormRef = useRef();
    const blogStyle = {
        border: "solid",
        borderWidth: 2,
        borderRadius: 4,
        paddingTop: 10,
        paddingLeft: 4,
        marginBottom: 5,
    };
    return (
        <div>
            <Togglable buttonLabel="Create New Blog" ref={blogFormRef}>
                <BlogForm formRef={blogFormRef}></BlogForm>
            </Togglable>
            <h2>Blogs</h2>
            {blogs.map((blog) => (
                <div key={blog.id} style={blogStyle}>
                    <Link to={`/blogs/${blog.id}`}>
                        {blog.title} -- {blog.author}
                    </Link>
                </div>
            ))}
        </div>
    );
};

export default Home;
