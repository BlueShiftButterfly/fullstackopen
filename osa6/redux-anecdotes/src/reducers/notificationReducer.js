import { createSlice } from "@reduxjs/toolkit"

const initialState = null

const notificationSlice = createSlice({
    name: "notification",
    initialState,
    reducers: {
        setNotification(state, action) {
            return action.payload
        },
        removeNotification(state, action) {
            return null
        }
    }
})

export const setNotification = (message, secondsToDisplay) => {
    return async dispatch => {
        dispatch(notificationSlice.actions.setNotification(message))
        setTimeout(() => {
            dispatch(notificationSlice.actions.removeNotification())
        }, secondsToDisplay * 1000)
    }
}

export default notificationSlice.reducer