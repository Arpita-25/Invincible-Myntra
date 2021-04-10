import React,{useEffect} from 'react'
import {Link, NavLink} from 'react-router-dom'
import './Navbar.css'
import {useSelector} from 'react-redux'
import {history} from '../../helpers/history'

function Navbar() {



    let user = useSelector((state)=> state.auth.user)

    useEffect(() => {
        let menuBtn = document.getElementById('menu-btn')
        let controlBar = document.getElementById('control-bar')
        menuBtn.addEventListener('click',()=>{
            menuBtn.classList.toggle('open')
            controlBar.classList.toggle('on-screen')
        })
        return () => {
            menuBtn.removeEventListener('click')
        }
    }, [])

    history.listen((location,action)=>{
        let menuBtn = document.getElementById('menu-btn')
        let controlBar = document.getElementById('control-bar')
        menuBtn.classList.remove('open')
        controlBar.classList.remove('on-screen')
    })


    // console.log(user)

    return (
        <>
            <div className='navbar'>
                <div className='nav'>
                    <div id="menu-btn" className="menu-btn">
                        <div className="menu-btn-burger diagonal-part-1"></div>
                        <div className="menu-btn-burger horizontal"></div>
                        <div className="menu-btn-burger diagonal-part-2"></div>
                    </div>
                    <div>
                        <Link className='navbar-brand ' to='/'>Fit Trend</Link>
                    </div>
                    <div className='nav-link-container stoke'>
                        <NavLink
                        activeStyle={{fontWeight: "bold",color: "#ff614c"}}
                        className='nav-link stroke'
                        to='/category/1/products' >
                            T-Shirts
                        </NavLink>
                        <NavLink
                        activeStyle={{fontWeight: "bold",color: "#ff614c"}}
                        className='nav-link'
                        to='/category/2/products' >
                            Tops
                        </NavLink>
                    </div>
                </div>
            </div>
            <div id='control-bar' className='control-bar'>
                <div className='control-bar-home'>
                    {/* {user?
                    <Link to='/' className='control-bar-link'>Hello, Ishaan</Link>:
                    <Link to='/auth' className='control-bar-link'>Hi, Sign In</Link>
                } */}
                    <Link to='/auth' className='control-bar-link'>Hello, Sign In</Link>
                </div>
                <div className='control-bar-category-container'>
                    <Link className='control-bar-link' to='/'>Home</Link>
                    <Link className='control-bar-link control-bar-category' to='/category/1/products'>Women's T-Shirts</Link>
                    <Link className='control-bar-link control-bar-category' to='/category/2/products'>Men's T-Shirts</Link>
                </div>
            </div>
        </>
    )
}

export default Navbar
