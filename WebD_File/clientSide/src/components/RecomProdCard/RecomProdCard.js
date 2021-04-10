import React from 'react'
import './RecomProdCard.css'
function RecomProdCard(props) {

    let discountedPrice = props.product.regular_price*(1-(props.product.discount/100))

    return (
        <div className = 'product-card'>
            <img alt='product_image' src={props.product.image}
                className = 'product-card-image'
            />
            <div className='product-card-info-container'>
                <h3 className='product-brand'>{props.product.brand}</h3>
                <h4 className='product-description'>{props.product.description}</h4>
                <div className='product-price'>
                    <span>
                        <span className='product-discountedPrice'>{`Rs.${discountedPrice}`}</span>
                        <span className='product-regularPrice strike'> {`Rs.${props.product.regular_price}`}</span>
                    </span>
                    <span className='product-discountPercentage'> ({`${props.product.discount}% OFF`})</span>
                </div>
            </div>
        </div>
    )
}

export default RecomProdCard
