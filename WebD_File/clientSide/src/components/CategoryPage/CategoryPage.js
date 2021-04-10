import React,{useState,useEffect,useRef} from 'react'
import {useParams} from 'react-router-dom'
import axios from 'axios'
import ProductCard from '../ProductCard/ProductCard'
import './CategoryPage.css'

function CategoryPage() {

    let {category_id} = useParams()

    let [category,setCategory] = useState(null)
    let[products,setProducts] = useState(null)
    let container = useRef(null)

    useEffect(()=>{
        const config ={
            headers:{
                "Content-type" :  "application/json"
            }
        }
        

        axios.get(`http://127.0.0.1:5000/category/${category_id}/products`,config)
            .then(res =>{
                // console.log(res.data)
                setCategory(res.data)
                setProducts(res.data.products)
            })
            .catch(err =>{
                console.log(err)
            })
    },[category_id])


    console.log(products)

    return category && products && (
        <>
            <div ref={container} className='category-info-container'>
                <div className='category-title'> 
                    <h1>{`${category.name}-${category.description}`}</h1>
                </div>
            </div>
            <div className='category-products-card-container'>
                {
                    products.map((product,index)=>{
                        return <ProductCard  product={product} key={index} />
                    })
                }
            </div>
        </>
    )
}

export default CategoryPage
