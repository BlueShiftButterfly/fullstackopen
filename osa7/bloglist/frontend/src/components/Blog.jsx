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

    const blogStyle = {
        border: "solid",
        borderWidth: 2,
        borderRadius: 4,
        paddingTop: 10,
        paddingLeft: 4,
        marginBottom: 5,
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

    return (
        <div style={blogStyle} className="blog">
            {blog.title} -- {blog.author}
            <div style={hideWhenVisible}>
                <button onClick={toggleVisibility}>View</button>
            </div>
            <div style={showWhenVisible}>
                <button onClick={toggleVisibility}>Hide</button>
                <p>Link: {blog.url}</p>
                <p>
                    Likes: {blog.likes}{" "}
                    <button onClick={handleLike}>Like</button>
                </p>
                <p>By: {blog.user.name}</p>
                <button
                    style={{ display: canRemove ? "" : "none" }}
                    onClick={handleRemove}
                >
                    Remove
                </button>
            </div>
        </div>
    );
};

Blog.propTypes = {
    blog: PropTypes.object.isRequired,
};

export default Blog;
