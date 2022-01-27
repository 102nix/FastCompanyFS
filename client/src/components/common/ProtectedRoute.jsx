import React from 'react'
import { useSelector } from 'react-redux'
import { Redirect, Route } from 'react-router-dom'
import { getIsLoggedIn } from '../../store/users'

export const ProtectedRoute = ({ component: Component, children, ...rest }) => {
  const isLoggedIn = useSelector(getIsLoggedIn())
  return (
    <Route {...rest} render={(props) => {
      if (!isLoggedIn) {
        return <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
      }
      return Component ? <Component {...props} /> : children
    }}/>
  )
}