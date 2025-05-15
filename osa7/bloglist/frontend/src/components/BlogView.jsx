import { useSelector } from "react-redux";
import { useMatch } from "react-router-dom";
import Blog from "./Blog";

const BlogView = () => {
    const blogs = useSelector((state) => state.blogs);
    const match = useMatch("blogs/:id");
    const blog = match ? blogs.find((u) => u.id === match.params.id) : null;
    if (!blog) return null;
    return <Blog blog={blog}></Blog>;
};

export default BlogView;
