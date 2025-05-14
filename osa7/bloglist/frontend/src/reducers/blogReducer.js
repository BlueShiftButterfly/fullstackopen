import { createSlice } from "@reduxjs/toolkit";
import blogService from "../services/blogs";
import { notifyError, notifyMessage } from "./notificationReducer";
import { logAndFormatError } from "../services/errorFormatter";

const initialState = [];

const blogSlice = createSlice({
    name: "blogs",
    initialState,
    reducers: {
        appendBlog(state, action) {
            state.push(action.payload);
            state.sort((a, b) => b.likes - a.likes);
        },
        setBlogs(state, action) {
            return action.payload.sort((a, b) => b.likes - a.likes);
        },
        removeBlog(state, action) {
            const id = action.payload;
            return state
                .filter((blog) => blog.id !== id)
                .sort((a, b) => b.likes - a.likes);
        },
        modifyBlog(state, action) {
            const id = action.payload.id;
            return state
                .filter((blog) => blog.id !== id)
                .concat(action.payload)
                .sort((a, b) => b.likes - a.likes);
        },
    },
});

export const createBlog = (blog) => {
    return async (dispatch) => {
        try {
            const newBlog = await blogService.create(blog);
            dispatch(blogSlice.actions.appendBlog(newBlog));
            dispatch(
                notifyMessage(
                    `Created new blog ${newBlog.title} by ${newBlog.author}`,
                ),
            );
            console.log(
                `Created new blog ${newBlog.title} by ${newBlog.author}`,
            );
        } catch (e) {
            dispatch(
                notifyError(logAndFormatError("Failed to create blog", e)),
            );
        }
    };
};

export const initializeBlogs = () => {
    return async (dispatch) => {
        try {
            const blogs = await blogService.getAll();
            dispatch(blogSlice.actions.setBlogs(blogs));
            console.log(blogs);
        } catch (e) {
            dispatch(
                notifyError(logAndFormatError("Failed to fetch blogs", e)),
            );
        }
    };
};

export const removeBlog = (blogToRemove) => {
    return async (dispatch) => {
        try {
            await blogService.remove(blogToRemove.id);
            dispatch(blogSlice.actions.removeBlog(blogToRemove.id));
            dispatch(
                notifyMessage(
                    `Removed ${blogToRemove.title} by ${blogToRemove.author}`,
                ),
            );
            console.log(
                `Removed ${blogToRemove.title} by ${blogToRemove.author}`,
            );
        } catch (e) {
            dispatch(
                notifyError(logAndFormatError("Failed to remove blog", e)),
            );
        }
    };
};

export const likeBlog = (blogToLike) => {
    return async (dispatch) => {
        try {
            const blog = {
                ...blogToLike,
                likes: blogToLike.likes + 1,
            };
            await blogService.modify(blog);
            dispatch(blogSlice.actions.modifyBlog(blog));
            console.log(
                `Liked blog "${blog.title}". It now has ${blog.likes} likes.`,
            );
        } catch (e) {
            dispatch(notifyError(logAndFormatError("Failed to like blog", e)));
        }
    };
};

export default blogSlice.reducer;
