import { createSlice } from "@reduxjs/toolkit";
import { notifyError } from "./notificationReducer";
import { logAndFormatError } from "../services/errorFormatter";
import userService from "../services/users";

const initialState = [];

const userSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
        setUsers(state, action) {
            return action.payload;
        },
    },
});

export const initializeUsers = () => {
    return async (dispatch) => {
        try {
            const users = await userService.getAll();
            dispatch(userSlice.actions.setUsers(users));
            console.log(users);
        } catch (e) {
            dispatch(
                notifyError(logAndFormatError("Failed to fetch users", e)),
            );
        }
    };
};

export default userSlice.reducer;
