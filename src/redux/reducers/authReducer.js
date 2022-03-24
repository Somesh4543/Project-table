
const initialState = {
    isLoggedin: false,
    user:{},
}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case "isAuth":
            return {
                ...state,
                isLoggedin: true
            }
        default:
            return state;
    }
}

export default authReducer;