import React,{useRef,useEffect} from 'react'
import './AuthBtnBox.css'
function AuthBtnBox() {

	let btn_color = useRef(null)
	let btn_box = useRef(null)
	const handleLoginClick = ()=>{
		// btn_color.current.style.left = '0px';
		btn_box.current.parentNode.classList.remove('right-panel-active')
	}

	const handleRegisterClick = ()=>{
		// btn_color.current.style.left= '130px';
		btn_box.current.parentNode.classList.add('right-panel-active')
	}

    return (
		<div ref={btn_box} className="btn-box">
			<div ref={btn_color} id="btn-color"></div>
			<button onClick={handleLoginClick} className="btns btn-box-btn" >Sign In</button>
			<button onClick={handleRegisterClick}  className="btns btn-box-btn" >Sign Up</button>
		</div>
    )
}

export default AuthBtnBox
