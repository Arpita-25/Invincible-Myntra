import React,{useEffect} from 'react';
import {Router,Route,Redirect,Switch} from 'react-router-dom'
import {history} from './helpers/history'
import {useSelector,useDispatch} from 'react-redux'
import './App.css';
import {clearErrors} from './redux/actions/errorActions'
import {loadUser} from './redux/actions/authAction'
import Auth from './components/Auth/Auth'
import ProtectedRoute from './components/ProtectedRoutes/ProtectedRoutes'
import Navbar from './components/Navbar/Navbar'
import Prpage from './components/Prpage/Prpage'
import Home from './components/Home/Home'
import ProductPage from './components/ProductPage/ProductPage'
import CategoryPage from './components/CategoryPage/CategoryPage'
import Footer from './components/Footer/Footer'
import { useState } from 'react';


function App() {

  

  const dispatch = useDispatch()

  history.listen((location, action) => {
    // clear alert on location change
    dispatch(clearErrors())
  });

  useEffect(()=>{
    dispatch(loadUser())
  },[])

  console.log("rerendering")
 
  return (
    <div className='app'>
        <Navbar/>
        <div className='main-body'>
          <Switch>
                <Route exact path="/" >
                    <Home/>
                    <Footer/>
                </Route>
                <Route path="/auth">
                    <Auth/>
                </Route>
                <Route path='/protected'>
                  <ProtectedRoute to='/' component={Prpage}/>
                </Route>
                <Route path='/category/:category_id/products'>
                    <CategoryPage/>
                    <Footer/>
                </Route>
                <Route path='/category/:category_id/product/:product_id'>
                  <ProductPage/>
                  <Footer/>
                </Route>
            </Switch>
            
        </div>
    </div>
  );
}

export default App;
