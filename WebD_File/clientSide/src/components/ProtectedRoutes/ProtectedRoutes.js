import React from 'react'
import {Redirect} from 'react-router-dom'
import {useSelector} from 'react-redux'


function ProtectedRoutes(props) {
    const Component = props.component
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated)
    return isAuthenticated ? (
        <Component />
    ) : (
        <Redirect to={{ pathname: '/auth' }} />
    );
}

export default ProtectedRoutes


