import { createSlice } from "@reduxjs/toolkit";
import blogService from "../services/blogs";
import { logAndFormatError } from "../services/errorFormatter";
import { notifyError, notifyMessage } from "./notificationReducer";
import loginstorage from "../services/loginstorage";
import loginService from "../services/login";

const initialState = null;

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser(state, action) {
            return action.payload;
        },
        clearUser(state, action) {
            return null;
        },
    },
});

export const initializeUser = () => {
    return async (dispatch) => {
        try {
            const user = loginstorage.loadUser();
            if (user) {
                dispatch(userSlice.actions.setUser(user));
                blogService.setToken(user.token);
            }
        } catch (e) {
            logAndFormatError("Failed to fetch user credentials", e);
        }
    };
};

export const login = (username, password) => {
    return async (dispatch) => {
        try {
            const user = await loginService.login({
                username,
                password,
            });
            console.log(user);
            loginstorage.saveUser(user);
            blogService.setToken(user.token);
            dispatch(userSlice.actions.setUser(user));
            dispatch(notifyMessage(`Logged in as ${user.username}`));
        } catch (e) {
            dispatch(notifyError(logAndFormatError("Wrong credentials", e)));
        }
    };
};

export const logout = () => {
    return async (dispatch) => {
        try {
            blogService.setToken(null);
            loginstorage.removeUser();
            dispatch(userSlice.actions.clearUser());
            dispatch(notifyMessage("Logged out"));
        } catch (e) {
            dispatch(notifyError(logAndFormatError("Failed to logout", e)));
        }
    };
};

export default userSlice.reducer;
