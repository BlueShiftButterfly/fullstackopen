import { createSlice } from "@reduxjs/toolkit";
import blogService from "../services/blogs";
import { logAndFormatError } from "../services/errorFormatter";
import { notifyError, notifyMessage } from "./notificationReducer";
import loginstorage from "../services/loginstorage";
import loginService from "../services/login";

const initialState = {
    user: null,
    isInitialized: false,
};

const localUserSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setLocalUser(state, action) {
            return { user: action.payload, isInitialized: true };
        },
        clearLocalUser(state, action) {
            return {
                user: null,
                isInitialized: true,
            };
        },
    },
});

export const initializeLocalUser = () => {
    return async (dispatch) => {
        try {
            const user = loginstorage.loadUser();
            if (user) {
                dispatch(localUserSlice.actions.setLocalUser(user));
                blogService.setToken(user.token);
            } else {
                dispatch(localUserSlice.actions.clearLocalUser());
            }

            console.log(user);
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
            dispatch(localUserSlice.actions.setLocalUser(user));
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
            dispatch(localUserSlice.actions.clearLocalUser());
            dispatch(notifyMessage("Logged out"));
        } catch (e) {
            dispatch(notifyError(logAndFormatError("Failed to logout", e)));
        }
    };
};

export default localUserSlice.reducer;
