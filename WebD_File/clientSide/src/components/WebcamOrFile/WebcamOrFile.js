import React,{useState} from 'react'
import './WebcamOrFile.css'
import axios from 'axios'
function WebcamOrFile(props) {

    let [file,setFile] = useState(null)

    const onChangeHandler = (e) => {
        setFile(e.target.files[0]);
    }


    const onFileUpload = ()=>{

        // let token = localStorage.getItem('token')
        const formData = new FormData();
        formData.append("image", file);

        console.log(formData)


        axios.post('http://127.0.0.1:5000/fileUpload', formData, {
            headers: {
            'Content-Type': 'multipart/form-data'
            }
        })
        .then((res)=>{
            console.log('file upload done')

        })
        .catch((err)=>{
            console.log(err)
        })
        props.handleCaptureClose();
    }

    console.log(file)

    return (
        <div className='image-upload-options-container-wrap'>
            <button onClick={props.handleCaptureClose} className='cancel-btn'><i className="fas fa-times"></i></button>
            <div className='image-upload-options-container'>
                <h2 style={{marginBottom:'1rem'}}>Take or upload a photo</h2>
                <div className='upload-options-btn-container'>
                    <button onClick={props.handleSwitichingOnWebCam} className='upload-options-btn'>
                        <h2 className='btn-head'>Take Photo</h2>
                        <p><i className="fas fa-camera"></i></p>
                        <p>Click</p>
                    </button>
                    <button className='upload-options-btn'>
                    <label>
                        <input onChange={(e)=>{onChangeHandler(e)}} style={{display:'none'}} type='file' />
                            <h2 className='upload-btn-head'>Upload Photo</h2>
                            <p className='upload-i'><i className="fas fa-file-upload"></i></p>
                            <button className='upload-btn' onClick={onFileUpload}>Upload</button>
                    </label>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default WebcamOrFile
