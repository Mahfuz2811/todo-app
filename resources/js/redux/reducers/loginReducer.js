import {OPEN_LOGIN_MODAL, CLOSE_LOGIN_MODAL, LOGIN_ERROR} from "../actions/actionTypes";

const initialState = {
    loginModalShow: false,
    loginError: false,
    message: ''
};

export const loginReducer = (state = initialState, action) => {
    switch (action.type) {
        case OPEN_LOGIN_MODAL:
            return {
                ...state,
                loginModalShow: true
            };
        case CLOSE_LOGIN_MODAL:
            return {
                ...state,
                loginModalShow: false,
                loginError: false,
                message: ''
            };
        case LOGIN_ERROR:
            return {
                ...state,
                loginError: true,
                message: action.message
            }
        default:
            return state;
    }
};
