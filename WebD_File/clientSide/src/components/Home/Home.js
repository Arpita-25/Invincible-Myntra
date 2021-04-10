import React,{useState,useEffect} from 'react'
import axios from 'axios'
import './Home.css'
import HomeCategorySlider from '../HomeCategorySlider/HomeCategorySlider'
import LandingPage from '../LandingPage/LandingPage'

function Home() {

    let [categories,setCategories] = useState([])

    useEffect(() => {
        const config ={
            headers:{
                "Content-type" :  "application/json"
            }
        }
       
        axios.get(`http://127.0.0.1:5000/category/all`,config)
            .then(res => {
                console.log(res.data.categories)
                setCategories(res.data.categories)
            })
            .catch(err=>{
                console.log()
            })
    },[])

    return categories && (
        <>  
            <LandingPage/>
            <div style={{background:'#f7f7f7'}}>
                <div style={{background:'#f7f7f7',marginBottom:'1rem'}} className='category-info-container'>
                    <div style={{border:'5px solid transparent'}} className='category-title'> 
                        <h1 style={{background:'#f7f7f7', color: 'black'}}>Categories</h1>
                    </div>
                </div>
                {categories.map((category,item)=>{
                return <HomeCategorySlider key={item} category={category} />
                })}
            </div>
        </>
    )
}

export default Home
