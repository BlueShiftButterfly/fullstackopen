import { useState } from "react"

const Blog = ({ blog }) => {
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

    return (
        <div style={blogStyle}>
            {blog.title} -- {blog.author}
            <div style={hideWhenVisible}>
                <button onClick={toggleVisibility}>View</button>
            </div>
            <div style={showWhenVisible}>
                <button onClick={toggleVisibility}>Hide</button>
                <p>Link: {blog.url}</p>
                <p>Likes: {blog.likes} <button>Like</button></p>
                <p>By: {blog.user.name}</p>
            </div>
        </div>
    )
}
export default Blog