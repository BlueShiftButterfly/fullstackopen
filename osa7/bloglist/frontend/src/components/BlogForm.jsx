import PropTypes from "prop-types";
import { useField } from "../hooks";
import { useDispatch } from "react-redux";
import { createBlog } from "../reducers/blogReducer";

const BlogForm = ({ formRef }) => {
    const title = useField("text");
    const author = useField("text");
    const url = useField("text");
    const dispatch = useDispatch();

    const handleBlogCreation = (event) => {
        event.preventDefault();
        const newBlog = {
            title: title.value,
            author: author.value,
            url: url.value,
        };
        title.reset();
        author.reset();
        url.reset();
        dispatch(createBlog(newBlog));
        formRef.current.toggleVisibility();
    };

    return (
        <div className="blog-create-form-div">
            <h2>Create New Blog</h2>
            <form onSubmit={handleBlogCreation}>
                <div>
                    Title:
                    <input {...title} id="title-input" reset="" />
                </div>
                <div>
                    Author:
                    <input {...author} id="author-input" reset="" />
                </div>
                <div>
                    URL:
                    <input {...url} id="url-input" reset="" />
                </div>
                <button type="submit">Create</button>
            </form>
        </div>
    );
};

BlogForm.propTypes = {
    formRef: PropTypes.object.isRequired,
};

export default BlogForm;
