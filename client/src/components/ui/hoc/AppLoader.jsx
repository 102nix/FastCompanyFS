import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loadProfessionList } from '../../../store/profession'
import { loadQualitiesList } from '../../../store/qualities'
import { getIsLoggedIn, getUsersLoadingStatus, loadUsersList } from '../../../store/users'

export const AppLoader = ({ children }) => {
  const dispatch = useDispatch()
  const isLoggedIn = useSelector(getIsLoggedIn())
  const usersStatusLoading = useSelector(getUsersLoadingStatus())
  useEffect(() => {
    dispatch(loadQualitiesList())
    dispatch(loadProfessionList())
    if (isLoggedIn) {
      dispatch(loadUsersList())
    }
  }, [isLoggedIn])
  if (usersStatusLoading) return 'Loading...'
  return children
}