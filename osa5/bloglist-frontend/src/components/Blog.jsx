import { useState } from "react"
import blogService from "../services/blogs"

const Blog = ({ blog, updateBlog }) => {
    const [visible, setVisible] = useState(false)
    
    const hideWhenVisible = { display: visible ? "none" : "" }
    const showWhenVisible = { display: visible ? "" : "none" }

    const toggleVisibility = () => {
        setVisible(!visible)
    }

    const blogStyle = {
        border: "solid",
        borderWidth: 2,
        borderRadius: 4,
        paddingTop: 10,
        paddingLeft: 4,
        marginBottom: 5
    }

    const likeBlog = async (event) => {
        event.preventDefault()
        const modifiedBlog = {
            title: blog.title,
            author: blog.author,
            url: blog.url,
            user: blog.user,
            id: blog.id,
            likes: blog.likes + 1
        }
        await updateBlog(modifiedBlog)
    }

    return (
        <div style={blogStyle}>
            {blog.title} -- {blog.author}
            <div style={hideWhenVisible}>
                <button onClick={toggleVisibility}>View</button>
            </div>
            <div style={showWhenVisible}>
                <button onClick={toggleVisibility}>Hide</button>
                <p>Link: {blog.url}</p>
                <p>Likes: {blog.likes} <button onClick={likeBlog}>Like</button></p>
                <p>By: {blog.user.name}</p>
            </div>
        </div>
    )
}
export default Blog