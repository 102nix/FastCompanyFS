import React from 'react'
import { useParams, Redirect } from 'react-router-dom'
import UserPage from '../components/page/userPage'
import UsersListPage from '../components/page/usersListPage'
import UserEdit from '../components/page/userEdit'
import { useSelector } from 'react-redux'
import { getCurrentUserId } from '../store/users'
import { UsersLoader } from '../components/ui/hoc/UsersLoader'

export const Users = () => {
  const params = useParams()
  const { userId, edit } = params
  const currentUserId = useSelector(getCurrentUserId())

  return (
    <>
      <UsersLoader>
        {userId ? (
          edit ? (
            userId === currentUserId ? (
              <UserEdit />
            ) : (
              <Redirect to={`/users/${currentUserId}/edit`} />
            )
          ) : (
            <UserPage userId={userId} />
          )
        ) : (
          <UsersListPage />
        )}
      </UsersLoader>
    </>
  )
}