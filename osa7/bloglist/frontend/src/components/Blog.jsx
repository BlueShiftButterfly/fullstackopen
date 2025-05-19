import PropTypes from "prop-types";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { likeBlog, removeBlog } from "../reducers/blogReducer";
import loginstorage from "../services/loginstorage";

const Blog = ({ blog }) => {
    const [visible, setVisible] = useState(false);

    const hideWhenVisible = { display: visible ? "none" : "" };
    const showWhenVisible = { display: visible ? "" : "none" };

    const dispatch = useDispatch();
    const canRemove = loginstorage.me() === blog.user.username;

    const toggleVisibility = () => {
        setVisible(!visible);
    };

    const handleLike = (event) => {
        event.preventDefault();
        dispatch(likeBlog(blog));
    };

    const handleRemove = (event) => {
        event.preventDefault();
        if (
            window.confirm(
                `Do you want to remove ${blog.title} by ${blog.author}?`,
            )
        ) {
            dispatch(removeBlog(blog));
        }
    };

    const getProperUrL = (baseUrl) => {
        // This is because react-router likes to read URLs
        // without http:// as internal links >:(
        if (!baseUrl) return "";
        if (baseUrl.startsWith("http://") || baseUrl.startsWith("https://"))
            return baseUrl;
        return `https://${baseUrl}`;
    };

    return (
        <div className="blog">
            <h2>
                {blog.title} -- {blog.author}
            </h2>
            <div>
                <a href={getProperUrL(blog.url)} target="_blank">
                    {blog.url}
                </a>
            </div>
            <p>
                Likes: {blog.likes} <button onClick={handleLike}>Like</button>
            </p>
            <p>By: {blog.user.name}</p>
            <button
                style={{ display: canRemove ? "" : "none" }}
                onClick={handleRemove}
            >
                Remove
            </button>
            <h3>Comments</h3>
            <ul>
                {blog.comments.map((comment) => (
                    <li key={comment.id}>{comment.content}</li>
                ))}
            </ul>
        </div>
    );
};

Blog.propTypes = {
    blog: PropTypes.object.isRequired,
};

export default Blog;
