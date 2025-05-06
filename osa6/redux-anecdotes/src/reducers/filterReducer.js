const filterReducer = (state = "", action) => {
    console.log("filter state now: ", state)
    console.log("action", action)
    
    switch(action.type){
        case "set_filter":
            return action.payload
        default:
            return state
    }
}

export const setFilter = (filter) => {
    return {
        type: "set_filter",
        payload: filter
    }
}

export default filterReducer