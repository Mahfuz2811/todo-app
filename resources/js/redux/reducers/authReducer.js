import {SET_AUTHORIZED_USER} from "../actions/actionTypes";
import {isEmpty} from "../../utils/helpers";

const initialState = {
    isAuthenticated: false
};

export const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_AUTHORIZED_USER:
            const user = action.user;
            const isExpired = Date.now() >= user.exp * 1000;
            return {
                ...state,
                isAuthenticated: !isEmpty(user) && !isExpired
            };
        default:
            return state;
    }
};
