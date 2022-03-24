import { LOADING } from "../actions/actionTypes";

const loadingReducer = (state = {loading: false}, action) => {
    switch (action.type) {
        case LOADING:
            return {
                ...state,
                loading: action.status
            }
        default:
            return state;
    }
}

export default loadingReducer;