import { useState, useEffect, useRef } from "react"

const BlogForm = ({ createBlog }) =>  {
    const [title, setTitle] = useState("")
    const [author, setAuthor] = useState("")
    const [url, setUrl] = useState("")
    
    const handleBlogCreation = async (event) => {
        event.preventDefault()
        const newBlog = {
            title: title,
            author: author,
            url: url
        }
        setAuthor("")
        setTitle("")
        setUrl("")
        await createBlog(newBlog)
    }

    return (
        <div>
            <h2>Create New Blog</h2>
            <form onSubmit={handleBlogCreation}>
                <div>
                    Title:
                    <input type="text" value={title} name="Title" onChange={({ target }) => { setTitle(target.value) }}/>
                </div>
                <div>
                    Author:
                    <input type="text" value={author} name="Author" onChange={({ target }) => { setAuthor(target.value) }}/>
                </div>
                <div>
                    URL:
                    <input type="text" value={url} name="Url" onChange={({ target }) => { setUrl(target.value) }}/>
                </div>
                <button type="submit">Create</button>
            </form>
        </div>
    )
}

export default BlogForm