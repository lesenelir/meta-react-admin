import React from 'react'
import {Navigate} from "react-router-dom"

function PrivateRoute(props) {
  const {children} = props

  // 获得是否登录的变量
  const isLoggedIn = !!localStorage.getItem('token')

  return (
      <>
        {
          isLoggedIn ? (<>{ children }</>) : (<Navigate to="/login"/>)
        }
      </>
  )
}

export default PrivateRoute
