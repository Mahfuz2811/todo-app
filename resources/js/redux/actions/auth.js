import {SET_AUTHORIZED_USER, OPEN_LOGIN_MODAL, CLOSE_LOGIN_MODAL, LOGIN_ERROR} from "./actionTypes";
import axios from "../../utils/axios/freshAxios";
import authAxios from "../../utils/axios/authAxios";
import jwtDecode from "jwt-decode";

import {APP_AUTHORIZATION_STORAGE_TOKEN, APP_AUTHORIZED_STORAGE_USER} from "../../config/app";

export const openLoginModal = () => {
    return dispatch => {
        dispatch({type: OPEN_LOGIN_MODAL})
    }
};

export const closeLoginModal = () => {
    return dispatch => {
        dispatch({type: CLOSE_LOGIN_MODAL});
    }
};

export const setCurrentUser = (user) => {
    localStorage.setItem(APP_AUTHORIZED_STORAGE_USER, JSON.stringify(user));
    return {
        type: SET_AUTHORIZED_USER,
        user: user
    }
};

export const login = (email, password) => {
    return (dispatch) => {
        const payload = {
            email: email,
            password: password
        };
        return axios.post('/api/v1/auth/login', payload)
            .then(res => {
                const token = res?.access_token;
                localStorage.setItem(APP_AUTHORIZATION_STORAGE_TOKEN, token);
                dispatch(setCurrentUser(jwtDecode(token)));
                setTimeout(() => {
                    dispatch({type: CLOSE_LOGIN_MODAL});
                }, 1000)
            }).catch(error => {
                console.log(error);
                dispatch({
                    type: LOGIN_ERROR,
                    message: error.data.message
                })
            })
    }
};

export const logout = () => {
    return dispatch => {
        return authAxios.post('/api/v1/auth/logout')
            .then(res => {
                localStorage.clear();
                dispatch(setCurrentUser({}));
            })
            .catch(error => {
                localStorage.clear();
                dispatch(setCurrentUser({}));
            })
    }
};
