import { configureStore } from "@reduxjs/toolkit";
import notificationReducer from "./reducers/notificationReducer";
import blogReducer from "./reducers/blogReducer";
import localUserReducer from "./reducers/localUserReducer";
import userReducer from "./reducers/userReducer";

const store = configureStore({
    reducer: {
        notification: notificationReducer,
        blogs: blogReducer,
        localUser: localUserReducer,
        users: userReducer,
    },
});

export default store;
