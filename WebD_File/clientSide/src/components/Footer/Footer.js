import React from 'react'
import './Footer.css'

function Footer() {
    return (
        <div className='footer '>
            <div  className='category-info-container'>
                <div className='category-title'> 
                    <h1>Contact Us</h1>
                </div>
            </div>
            <div className='contact-container'>
                <div className='contact-container-card'>
                    <h2>Developer</h2>
                    <h3>Sayna Parida</h3>
                    <p><i className="fas fa-phone-alt"></i> - 9478987577</p>
                    <p><i className="fas fa-envelope"></i> - saynaparida33@gmail.com</p>
                </div>
                <div className='contact-container-card'>
                    <h2>Developer</h2>
                    <h3>Arpita Mohapatra</h3>
                    <p><i className="fas fa-phone-alt"></i> - 7978507290</p>
                    <p><i className="fas fa-envelope"></i> - ampops169@gmail.com</p>
                </div>
                <div className='contact-container-card'>
                    <h2>Developer</h2>
                    <h3>Aparajita Panigrahi</h3>
                    <p><i className="fas fa-phone-alt"></i> - 7605977181</p>
                    <p><i className="fas fa-envelope"></i> - panigrahi.aparajita@gmail.com</p>
                </div>
            </div>
        </div>
    )
}

export default Footer
