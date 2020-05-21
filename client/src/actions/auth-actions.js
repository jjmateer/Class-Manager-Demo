import axios from "axios";
import { returnErrors } from "../actions/error-actions";
import jwt_decode from "jwt-decode";

import {
    USER_LOADED,
    USER_LOADING,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT_SUCCESS,
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    UPDATE_CREDENTIALS,
    UPDATE_CREDENTIALS_FAIL,
    UPDATE_CREDENTIALS_SUCCESS

} from "./types";

export const loadUser = () => (dispatch) => {
    dispatch({ type: USER_LOADING });
    if (localStorage.getItem("jwtToken")) {
        const body = {
            id: jwt_decode(localStorage.getItem("jwtToken")).id,
            token: localStorage.getItem("jwtToken")
        }

        axios
            .post('http://localhost:3001/api/auth/user', body)
            .then(res => {
                dispatch({
                    type: USER_LOADED,
                    payload: res.data
                })
            })
            .catch(err => {
                dispatch(returnErrors(err.response.data, err.response.status));
                dispatch({
                    type: AUTH_ERROR
                });
            });
    } else {
        dispatch({ type: AUTH_ERROR });
    }
};
export const registerAdmin = newUser => dispatch => {
    const config = {
        headers: {
            "Content-Type": "application/json"
        }
    }
    axios.post("http://localhost:3001/api/auth/register", newUser, config)
        .then(res => {
            dispatch({
                type: REGISTER_SUCCESS,
                payload: res.data
            })
            const { token } = res.data;
            localStorage.setItem("jwtToken", token);
        })
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status, "REGISTER_FAIL"));
            dispatch({
                type: REGISTER_FAIL
            })
        })
}


export const loginAdmin = (userData) => dispatch => {
    const config = {
        headers: {
            "Content-Type": "application/json"
        }
    }

    axios.post("http://localhost:3001/api/auth/login", userData, config)
        .then(res => {
            dispatch({
                type: LOGIN_SUCCESS,
                payload: res.data
            })
            const { token } = res.data;
            localStorage.setItem("jwtToken", token);
            window.location.reload();
        })
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status, "LOGIN_FAIL"));
            dispatch({
                type: LOGIN_FAIL
            })
        })
}
export const updateCredentials = (type, id, value) => dispatch => {
    const config = {
        headers: {
            "Content-Type": "application/json"
        }
    }
    dispatch({ type: UPDATE_CREDENTIALS });
    axios.post(`http://localhost:3001/api/auth/update-credentials/${type}/${id}`, value, config)
        .then(res => {
            dispatch({
                type: UPDATE_CREDENTIALS_SUCCESS,
                payload: res.data
            })
        })
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status, "GET_ORDERS_FAIL"));
            dispatch({
                type: UPDATE_CREDENTIALS_FAIL
            })
        })

}
export const logout = () => {
    localStorage.clear();
    return {
        type: LOGOUT_SUCCESS
    }
}
