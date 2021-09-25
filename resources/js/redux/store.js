import {createStore, applyMiddleware, compose} from "redux";
import thunk from "redux-thunk";
import jwtDecode from "jwt-decode";

import {APP_AUTHORIZATION_STORAGE_TOKEN} from "../config/app";
import {setCurrentUser} from "./actions/auth";

import rootReducers from "./reducers/rootReducers";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
    rootReducers,
    composeEnhancers(
        applyMiddleware(thunk)
    )
);

if (localStorage.getItem(APP_AUTHORIZATION_STORAGE_TOKEN)) {
    store.dispatch(setCurrentUser(jwtDecode(localStorage.getItem(APP_AUTHORIZATION_STORAGE_TOKEN))))
}

export default store;
