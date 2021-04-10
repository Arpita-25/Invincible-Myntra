import React,{useState} from 'react'
import {useDispatch,useSelector} from 'react-redux'
import {login} from '../../redux/actions/authAction'
import './LoginForm.css'
function LoginForm() {
    
    let [email,setEmail] = useState('')
    let [password,setPassword] = useState('')

    const dispatch = useDispatch();
    const error = useSelector (state => state.error)

    
    const handleLogin = (event) => {
        event.preventDefault()
        
        const credentials = {
            email,
            password
        }
        
        dispatch(login(credentials))

        clearInputFields()
    }

    const clearInputFields = ()=>{
        setPassword('')
        setEmail('')
    }

    return (
        <div className='formContainer loginContainer'>
            <form>
                <h1>Sign In</h1>
                <input type='email' placeholder='Email' value={email} onChange={(event)=>setEmail(event.target.value)} />
                <input type='password' placeholder='Password' value={password} onChange={(event)=>setPassword(event.target.value)}/>
                <button onClick={handleLogin}>Submit</button>
            </form>
        </div>
    )
}

export default LoginForm
