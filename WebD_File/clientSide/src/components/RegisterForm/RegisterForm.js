import React, { useState } from 'react'
import {useDispatch,useSelector} from 'react-redux'
import {register} from '../../redux/actions/authAction'
import './RegisterForm.css'


function RegisterForm() {
    let [username,setUsername] = useState('')
    let [email,setEmail] = useState('')
    let [password,setPassword] = useState('')

    const dispatch = useDispatch()
    const err = useSelector(state => state.error)

    const handleRegister = (event)=>{
        event.preventDefault();
        const newUser = {
            username,
            email,
            password
        }

        dispatch(register(newUser))
        clearInputFields()
    }

    const clearInputFields = ()=>{
        setUsername('');
        setEmail('');
        setPassword('');
    }


    return (
        <div className='formContainer registerContainer'>
            <form>
                <h1>Create Account</h1>
                <input type='text' placeholder='Username' value={username} onChange={(event)=>setUsername(event.target.value)}/>
                <input type='email' placeholder='Email' value={email} onChange={(event)=>setEmail(event.target.value)} />
                <input type='password' placeholder='Password' value={password} onChange={(event)=>setPassword(event.target.value)}/>
                <button onClick={handleRegister}>Submit</button>
            </form>
        </div>
    )
}

export default RegisterForm
