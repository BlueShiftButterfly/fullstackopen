import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import Blog from "./Blog"

test("blog renders title with author", async () => {
    const blog = {
        author: "Author",
        title: "Component testing is done with react-testing-library",
        url: "URL",
        likes: 0,
        user: {
            id: "",
            name: "username"
        }
    }

    const updateBlog = () => {}
    const removeBlog = () => {}

    render(<Blog blog={blog} updateBlog={updateBlog} removeBlog={removeBlog} canRemove={true} />)

    const element = screen.getByText("Component testing is done with react-testing-library -- Author")
    expect(element).toBeDefined()
})

test("when user clicks view blog displays additional info", async () => {
    const blog = {
        author: "Author",
        title: "Component testing is done with react-testing-library",
        url: "www.example.com",
        likes: 15,
        user: {
            id: "",
            name: "username"
        }
    }

    const updateBlog = () => {}
    const removeBlog = () => {}

    render(<Blog blog={blog} updateBlog={updateBlog} removeBlog={removeBlog} canRemove={true} />)

    const user = userEvent.setup()
    const viewButton = screen.getByText("View")
    await user.click(viewButton)

    const urlElement = screen.getByText("Link: www.example.com")
    const likeElement = screen.getByText("Likes: 15")
    const userElement = screen.getByText("By: username")
    expect(urlElement).toBeDefined()
    expect(likeElement).toBeDefined()
    expect(userElement).toBeDefined()
})


test("when user clicks like twice, updateBlog gets called twice", async () => {
    const blog = {
        author: "Author",
        title: "Component testing is done with react-testing-library",
        url: "www.example.com",
        likes: 15,
        user: {
            id: "",
            name: "username"
        }
    }

    const updateMockHandler = vi.fn()
    const removeBlog = () => {}

    render(<Blog blog={blog} updateBlog={updateMockHandler} removeBlog={removeBlog} canRemove={true} />)

    const user = userEvent.setup()
    const viewButton = screen.getByText("View")
    await user.click(viewButton)

    const likeButton = screen.getByText("Like")
    await user.click(likeButton)
    await user.click(likeButton)

    expect(updateMockHandler.mock.calls).toHaveLength(2)
})