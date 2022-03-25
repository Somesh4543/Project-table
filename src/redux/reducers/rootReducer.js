import { combineReducers } from "redux";
import GroupReducer from "./GroupReducer";


const rootReducer = combineReducers({
    groupReducer: GroupReducer,
});

export default rootReducer;