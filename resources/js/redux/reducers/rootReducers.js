import {combineReducers} from "redux";
import {authReducer} from "./authReducer";
import {loginReducer} from "./loginReducer";

const rootReducers = combineReducers({
    login: loginReducer,
    auth: authReducer
});

export default rootReducers;
