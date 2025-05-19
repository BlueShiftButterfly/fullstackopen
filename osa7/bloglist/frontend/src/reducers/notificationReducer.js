import { createSlice } from "@reduxjs/toolkit";

const initialState = { message: null, error: null };

const notificationSlice = createSlice({
    name: "notification",
    initialState,
    reducers: {
        setNotification(state, action) {
            switch (action.payload.type) {
                case "MESSAGE":
                    return { ...state, message: action.payload.message };
                case "ERROR":
                    return { ...state, error: action.payload.error };
                default:
                    return state;
            }
        },
        clearNotification(state, action) {
            switch (action.payload.type) {
                case "MESSAGE":
                    return { ...state, message: null };
                case "ERROR":
                    return { ...state, error: null };
                default:
                    return state;
            }
        },
    },
});

export const notifyMessage = (message, secondsToDisplay = 5) => {
    return async (dispatch) => {
        dispatch(
            notificationSlice.actions.setNotification({
                message: message,
                type: "MESSAGE",
            }),
        );
        setTimeout(() => {
            dispatch(
                notificationSlice.actions.clearNotification({
                    type: "MESSAGE",
                }),
            );
        }, secondsToDisplay * 1000);
    };
};

export const notifyError = (errorMessage, secondsToDisplay = 5) => {
    return async (dispatch) => {
        dispatch(
            notificationSlice.actions.setNotification({
                error: errorMessage,
                type: "ERROR",
            }),
        );
        setTimeout(() => {
            dispatch(
                notificationSlice.actions.clearNotification({
                    type: "ERROR",
                }),
            );
        }, secondsToDisplay * 1000);
    };
};

export const clearMessage = () => {
    return async (dispatch) => {
        dispatch(
            notificationSlice.actions.clearNotification({
                type: "MESSAGE",
            }),
        );
    };
};
export const clearError = () => {
    return async (dispatch) => {
        dispatch(
            notificationSlice.actions.clearNotification({
                type: "ERROR",
            }),
        );
    };
};

export default notificationSlice.reducer;
