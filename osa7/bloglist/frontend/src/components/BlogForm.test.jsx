import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import BlogForm from "./BlogForm"

test("BlogForm calls createBlog with correct information", async () => {
    const user = userEvent.setup()
    const createBlog = vi.fn()
    
    const { container } = render(<BlogForm createBlog={createBlog} />)
    
    const titleInput = container.querySelector("#title-input")
    const authorInput = container.querySelector("#author-input")
    const urlInput = container.querySelector("#url-input")
    const createButton = screen.getByText("Create")

    await user.type(titleInput, "Clean Code 2")
    await user.type(authorInput, "Mr. Clean")
    await user.type(urlInput, "www.example.com")
    await user.click(createButton)

    expect(createBlog.mock.calls).toHaveLength(1)
    expect(createBlog.mock.calls[0][0].title).toBe("Clean Code 2")
    expect(createBlog.mock.calls[0][0].author).toBe("Mr. Clean")
    expect(createBlog.mock.calls[0][0].url).toBe("www.example.com")
})
