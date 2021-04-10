import React from 'react'
import Slider from '../Slider/Slider'
import {Link} from 'react-router-dom'
import {history} from '../../helpers/history'
import './HomeCategory.css'
function HomeCategorySlider(props) {
    return (
        <div className='category-products'>
            <div className='product-category-container'>
                <div className='product-category-info'>
                    <h2 className='category-name'>{props.category.name}</h2>
                    <h4 className='category-description'>{props.category.description}</h4>
                </div>
                <div className='product-category-btn-box'>
                    <span onClick={()=> {history.push(`/category/${props.category.id}/products`)}}>View All</span>
                    <Link to={`/category/${props.category.id}/products`}>
                        <button className='product-category-btn' ><i className="fas fa-arrow-right"></i></button>
                    </Link>
                </div>
            </div>
            <Slider products={props.category.products}/>
        </div>
    )
}

export default HomeCategorySlider
