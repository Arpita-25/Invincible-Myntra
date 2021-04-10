import React from 'react'
import Loader from 'react-loader-spinner'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"

function LoaderCustom() {
    return (
        <div className='loader-container'>
            <Loader
                type="Bars"
                color="#ff416c"
                height={100}
                width={100}
                //3 sec
            />
            <div className='loader-text'>Loading</div>
        </div>
    )
}

export default LoaderCustom
