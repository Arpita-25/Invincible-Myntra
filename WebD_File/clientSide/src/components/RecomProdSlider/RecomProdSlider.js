import React,{useState} from 'react'
import axios from 'axios'
import SliderRecom from '../SliderRecom/SliderRecom'
import dark_products from '../skintoneclothes/dark';
import fair_products from '../skintoneclothes/fair';
import medium_products from '../skintoneclothes/medium';

import './RecomProdSlider.css'
function RecomProdSlider() {
  let [skinTone, setSkinTone] = useState('')


  const config ={
      headers:{
          "Content-type" :  "application/json"
      }
  }

  axios.get(`http://127.0.0.1:5000/skinTone`,config)
      .then(res =>{
          // console.log(res.data)
          setSkinTone(res.data.skinTone)
      })
      .catch(err =>{
          console.log(err)
      })

  console.log(skinTone);

  let prod = []

  if (skinTone==='fair')
  {
    prod = dark_products;
  }
  else if (skinTone==='medium' || skinTone==='avg')
  {
   prod = medium_products;
  }
  else if (skinTone==='dark') {
   prod = fair_products;
  }


    return (
            <SliderRecom products={prod}/>
    )
}

export default RecomProdSlider;
