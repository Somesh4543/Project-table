import { GET_ALL_GROUPS } from "../actions/actionTypes";

const initialState = {
    groups:[],
}

const GroupReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_GROUPS:
            return {
                ...state,
                groups: action.payload
            }
        default:
            return state;
    }
}

export default GroupReducer;