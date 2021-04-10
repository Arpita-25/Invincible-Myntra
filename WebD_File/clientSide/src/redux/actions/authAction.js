import axios from 'axios'
import {REGISTER_SUCCESS,REGISTER_FAIL,LOGIN_SUCCESS,LOGIN_FAIL,LOGOUT_SUCCESS,USER_LOADED,USER_LOADING,AUTH_ERROR,INPUT_FAIL,INPUT_SUCCESS} from './types'
import {history} from '../../helpers/history'
import {returnErrors} from './errorActions'


//action creator for register

export const register = ({username,email,password})=> async (dispatch,getState) =>{
    
    const registerSuccess = (data) => ({type:REGISTER_SUCCESS,payload:data})
    const registerFail = () =>({type:REGISTER_FAIL})
    //setting up header on body for register http request

    const config = {
        headers:{
            "Content-Type" : "application/json"
        }
    }

    const body = JSON.stringify({username,email,password})

    axios.post('http://127.0.0.1:5000/register',body,config)
        .then(res =>{
            dispatch(registerSuccess(res.data))
            history.push('/')
        })
        .catch(err =>{
            dispatch(returnErrors(err.response.data,err.response.status,'REGISTER_FAIL'))
            dispatch(registerFail())
        })
}


export const login = ({email,password}) => async (dispatch,getState) =>{
    const loginSuccess = (data) =>({type:LOGIN_SUCCESS,payload:data})
    const loginFail = () => ({type:REGISTER_FAIL})

    const config = {
        headers:{
            "Content-Type" : "application/json"
        }
    }

    const body = JSON.stringify({email,password})

    console.log(body)

    axios.post('http://127.0.0.1:5000/login',body,config)
        .then(res => {
            dispatch(loginSuccess(res.data))
            history.push('/')
        })
        .catch(err=>{
            dispatch(returnErrors(err.response.data,err.response.status,'LOGIN_FAIL'))
            dispatch(loginFail())
        })
}

export const loadUser = ()=>async (dispatch,getState)=>{
    
    const userLoading = () => ({type:USER_LOADING})
    dispatch(userLoading)
    const token = getState().auth.token;

    const config ={
        headers:{
            "Content-Type" : "application/json"
        }
    }

    if(token){
        config.headers['x-auth-token'] = token;
    }

    axios.get('http://127.0.0.1:5000/login/user',config)
        .then(user=>{
            dispatch({
                type:USER_LOADED,
                payload:user.data.user
            })
        })
        .catch(err=>{
            // dispatch(returnErrors(err.response.data,err.response.status))
            dispatch({
                type:AUTH_ERROR
            })
        })
}


export const logout = ()=>(dispatch) =>{

    const logoutcreator = ()=>({type:LOGOUT_SUCCESS})
    dispatch(logoutcreator())

    history.push('/login')
}

export const measuresize = (req) =>(dispatch,getState)=>{
    const token = getState().auth.token;

    const config ={
        headers:{
            "Content-Type" : "application/json"
        }
    }

    if(token){
        config.headers['x-auth-token'] = token;
    }

    const body = JSON.stringify(req)

    axios.post('http://127.0.0.1:5000/measuresize',body,config)
    .then(res=>{
        dispatch({
            type:USER_LOADED,
            payload:res.data.user
        })
    })
    .catch(err=>{
        console.log(err)
    })
}

export const tryItOn = (product_id) =>(dispatch,getState)=>{
    const token = getState().auth.token;
    const config ={
        headers:{
            "Content-type" :  "application/json"
        }
    }
    if(token){
        config.headers['x-auth-token'] = token;
    }
    console.log(`http://127.0.0.1:5000/tryiton/product/${product_id}`)


    axios.get(`http://127.0.0.1:5000/tryiton/product/${product_id}`,config)
    .then(res=>{
        // setTrialRoomImage(`https://192.168.1.34:5000/${res.data.trial_image}`)
        // window.scrollTo(0,0)
        // setDisplayLoader(false)
        console.log(res.data)
    })
    .catch(err=>{
        console.log(err)
    })
}

export const inputSize = ({chest,frontal,shoulder}) => async (dispatch,getState) =>{
    const token = getState().auth.token;

    const config ={
        headers:{
            "Content-Type" : "application/json"
        }
    }

    if(token){
        config.headers['x-auth-token'] = token;
    }

    const body = JSON.stringify({chest,frontal,shoulder})

    axios.post('http://127.0.0.1:5000/storeSize',body,config)
    .then(res=>{
        dispatch({
            type:INPUT_SUCCESS,
            payload:res.data.user
        })
        console.log(res.data);
    })
    .catch(err=>{
        console.log(err)
    })
}