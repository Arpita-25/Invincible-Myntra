import React,{useRef,useEffect} from 'react'
import RegisterForm from '../RegisterForm/RegisterForm'
import LoginForm from '../LoginForm/LoginForm'
import AuthBtnBox from '../AuthBtnBox/AuthBtnBox'

import './Auth.css'


function Auth() {

    let authContainer = useRef(null)

    const handleClickSiginIn = ()=>{
        authContainer.current.classList.remove('right-panel-active')
        console.log(authContainer.current)
    }

    const handleClickSignUp = ()=>{
        authContainer.current.classList.add('right-panel-active')
    }

    return (
        <>
            <div ref={authContainer} className='authContainer'>
            <AuthBtnBox/>
            <LoginForm/>
            <RegisterForm/>
            <div className="overlay-container">
                <div className="overlay">
                    <div className="overlay-panel overlay-left">
                        <h1>Welcome Back!</h1>
                        <p>
                            To keep connected with us please login with your personal info
                        </p>
                        <button onClick={handleClickSiginIn} className="ghost" id="signIn">Sign In</button>
                    </div>
                    <div className="overlay-panel overlay-right">
                        <h1>Hello, Friend!</h1>
                        <p>Enter your personal details and start journey with us</p>
                        <button onClick={handleClickSignUp} className="ghost" id="signUp">Sign Up</button>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}

export default Auth
