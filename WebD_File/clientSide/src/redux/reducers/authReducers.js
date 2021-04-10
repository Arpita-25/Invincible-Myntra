import { act } from '@testing-library/react'
import {
    USER_LOADED,
    USER_LOADING,
    AUTH_ERROR,
    REGISTER_FAIL,
    REGISTER_SUCCESS,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT_SUCCESS,
    INPUT_SUCCESS,
    INPUT_FAIL
}  from '../actions/types'

const initialState ={
    token :localStorage.getItem('token'),
    isAuthenticated : null,
    user:null,
    isLoading:false
}

export default function authReducers (state= initialState,action){

    switch(action.type){
        case USER_LOADING:return {
            ...state,
            isLoading:true
        }

        case USER_LOADED : return{
            ...state,
            user:action.payload,
            isAuthenticated:true,
            isLoading:false
        }

        case INPUT_SUCCESS : return{
            ...state,
            user:action.payload
        }

        case LOGIN_SUCCESS:
        case REGISTER_SUCCESS:
            localStorage.setItem('token',action.payload.token)
            return{
                ...state,
                ...action.payload,
                isAuthenticated:true,
                isLoading:false
            }
        
        case AUTH_ERROR : 
        case REGISTER_FAIL : 
        case LOGIN_FAIL :
        case LOGOUT_SUCCESS : 
            localStorage.removeItem('token');
            return {
                isAuthenticated:false,
                isLoading:false,
                user:null,
                token: null
            }
        default : return state;
    }
}