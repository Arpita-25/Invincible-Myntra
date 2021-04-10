import React,{useRef,useState,useCallback} from 'react'
import axios from 'axios'
import './WebcamCapture.css'
import Webcam from 'react-webcam'
import {useDispatch,useSelector} from 'react-redux'
import {measuresize} from '../../redux/actions/authAction'
import {USER_LOADED} from '../../redux/actions/types'

function WebcamCapture(props) {

    
    const webcamRef = useRef(null);

    // initializing the states
    let [imgSrc, setImgSrc] = useState(null);
    let [firstClickDone,setFirstClickDone] = useState(false)
    let [secondClickDone,setSecondClickDone] = useState(false)
    let [logs,setLogs] = useState([])
    let [imageToBeSent,setImageToBeSent] = useState('')
    let [bodyForRequest,setBodyForRequest] = useState('')
    let [secondImage,setSecondImage] = useState('')
    let user = useSelector(state => state.auth.user)
    var id ;

    let dispatch = useDispatch()

    const handleCapture = useCallback(() => {
        const imageSrc = webcamRef.current.getScreenshot();
        setImgSrc(imageSrc);
      }, [webcamRef, setImgSrc]);

    const handleRetake = (event)=>{
        event.preventDefault()
        setImgSrc(null)
    }

    const deviceMotionEventHandler = (event) =>{
        id = requestAnimationFrame(()=>{
            // console.log('hello')
            setLogs((prevLogs)=>[...prevLogs,
                {
                xAcceleration: event.acceleration.x,
                yAcceleration: event.acceleration.y,
                zAcceleration: event.acceleration.z,
            }])
        })
    }

    const handleSubmit = useCallback((event)=>{
        event.preventDefault();


        if(!firstClickDone && !secondClickDone){
            setFirstClickDone(true);
            setImageToBeSent(imgSrc)
            setImgSrc('')
            window.addEventListener('devicemotion',(event)=>deviceMotionEventHandler(event),)
        }
        else if(firstClickDone && !secondClickDone){
            const imageSrc = webcamRef.current.getScreenshot();
            // setImgSrc(imageSrc);
            // setSecondClickDone(true)
            // setSecondImage(imageSrc)
            window.removeEventListener('devicemotion',deviceMotionEventHandler)
            const req = {
                image: imageToBeSent,
                sensors_logs:logs,
                second_image:imgSrc
            }


            const token = localStorage.getItem('token')

            const config ={
                headers:{
                    "Content-Type" : "application/json"
                }
            }
        
            if(token){
                config.headers['x-auth-token'] = token;
            }
        
            const body = JSON.stringify(req)
            props.handleCleanUp()
            props.setDisplayLoader(true)
            cancelAnimationFrame(id)

            // axios.post('https://192.168.1.34:5000/measuresize',body,config)
            // .then(res=>{
            //     console.log(res)
            //     dispatch({
            //         type:USER_LOADED,
            //         payload:res.data.user
            //     })
            //     props.setDisplayLoader(false)
            //     props.setCaptureDone(true)
            // })
            // .catch(err=>{
            //     console.log(err)
            // })



            // // props.setTrialRoomImage('https://192.168.1.34:5000/upload/c1b89fdb-b250-44da-99ec-e2c34b13cd4f.jpg')
            // // props.handleCleanUp()
            // props.handleCleanUp()
            // // props.setCaptureDone(true)
            // props.setDisplayLoader(true)
            setTimeout(()=>{
                props.setDisplayLoader(false)
                props.setCaptureDone(true)
            },10000)
            
        }

    })

    const videoConstraints = {
        width:480,
        height:300,
        facingMode: "environment"
    };

    console.log('It is being reloaded')

    return  (
        <div className='webcam-outer-container'>
            <div className='webcam-container'>
                <Webcam
                    audio={false}
                    ref={webcamRef}
                    screenshotFormat="image/jpeg"
                    videoConstraints={videoConstraints}
                />
                <button onClick={handleCapture} className='capture-btn'></button>
                <button onClick={props.handleCaptureClose} className='cancel-btn'><i className='fas fa-times'></i></button>
                
                {imgSrc && (<img src={imgSrc}/>)}
                {imgSrc &&(<button onClick={handleRetake} className='camera-icons retake'><i  className="fas fa-reply "></i></button>)}
                {imgSrc &&(<button onClick={handleSubmit} className='camera-icons save'><i  className="fas fa-check "></i></button>)}
                
                
            </div>
        </div>
    )
}

export default WebcamCapture
