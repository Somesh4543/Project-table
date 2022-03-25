import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import rootReducer from "../reducers/rootReducer";

const iState = {};
const middleware = [thunk];

const store = createStore(
    rootReducer,
    iState,
    compose(applyMiddleware(...middleware))
);

export default store;
