import React,{useState} from 'react'
import ProductCard from '../ProductCard/ProductCard'
// import Carousel from 'react-elastic-carousel'
import './Slider.css'
function Slider(props) {
    let sliderArr = [1,2,3,4,5,6,7,8,9]
    let [x,setX] = useState(0)

    const goLeft = (event) =>{
        event.preventDefault();
        console.log(x)
        displayLeft()?setX(-246*(sliderArr.length-1)):setX(x+246)}

    const goRight = (event) =>{
        event.preventDefault();
        console.log(x)
        displayRight()?setX(0) : setX(x-246)
    }

    function displayLeft(){
        return x===0
    }
    function displayRight(){
        return x===-246*(sliderArr.length-1)
    }

    let products = props.products;
    


    return (
        <div className='product-slider'>
            <div className='slide' style={{transform:`translateX(${x}px)`}} >
                {products.map((item, index)=>{
                    return (<ProductCard product={item} key={index}/>)
                })}
            </div>
            {displayLeft()?<button className='carousel-btn btn-left' style={{display:'none'}} onClick={goLeft}><i className="fas fa-chevron-left"></i></button>:<button className='carousel-btn btn-left' onClick={goLeft}><i className="fas fa-chevron-left"></i></button>}
           {displayRight()?<button className='carousel-btn btn-right' style={{display:'none'}} onClick={goRight}><i className="fas fa-angle-right"></i></button>:<button className='carousel-btn btn-right' onClick={goRight}><i className="fas fa-angle-right"></i></button>}
        </div>

    )
}

export default Slider
