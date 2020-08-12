import React,{useReducer} from "react";
import AuthContext from "./authContext";
import authReducer from "./authReducer";
import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    CLEAR_ERRORS,
} from "../types";

const AuthState = props => {
    const initialState = {
        user:null,
        token:localStorage.getItem("token"),
        isAuthenticated:null,
        loading:true,
        error:null,
    }
    const [state, dispatch] = useReducer(authReducer, initialState);
    // load user, checks which user is actually logged in.
    // register user, signs user upp and gets a token back.
    // Login user, logs user in and gets the token.
    // logout, destorys the token.
    // clear errors, clear out any errors in the state.
    return(
        <AuthContext.Provider value={
            {
                token:state.token,
                isAuthenticated:state.isAuthenticated,
                loading:state.loading,
                user:state.user,
                error:state.error,
            }
        }>
            {props.children}
        </AuthContext.Provider>
    );
}
export default AuthState;