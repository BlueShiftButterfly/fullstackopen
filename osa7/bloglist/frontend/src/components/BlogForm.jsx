import { useState } from "react";
import PropTypes from "prop-types";

const BlogForm = ({ createBlog }) => {
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [url, setUrl] = useState("");

    const handleBlogCreation = (event) => {
        event.preventDefault();
        const newBlog = {
            title: title,
            author: author,
            url: url,
        };
        setAuthor("");
        setTitle("");
        setUrl("");
        createBlog(newBlog);
    };

    return (
        <div className="blog-create-form-div">
            <h2>Create New Blog</h2>
            <form onSubmit={handleBlogCreation}>
                <div>
                    Title:
                    <input
                        id="title-input"
                        type="text"
                        value={title}
                        name="Title"
                        onChange={({ target }) => {
                            setTitle(target.value);
                        }}
                    />
                </div>
                <div>
                    Author:
                    <input
                        id="author-input"
                        type="text"
                        value={author}
                        name="Author"
                        onChange={({ target }) => {
                            setAuthor(target.value);
                        }}
                    />
                </div>
                <div>
                    URL:
                    <input
                        id="url-input"
                        type="text"
                        value={url}
                        name="Url"
                        onChange={({ target }) => {
                            setUrl(target.value);
                        }}
                    />
                </div>
                <button type="submit">Create</button>
            </form>
        </div>
    );
};

BlogForm.propTypes = {
    createBlog: PropTypes.func.isRequired,
};

export default BlogForm;
