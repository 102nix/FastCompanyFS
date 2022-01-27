import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { logOut } from '../store/users'

export const LogOut = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(logOut())
    logOut()
  }, [])
  return (
    <h1>Loading</h1>
  )
}