import React from 'react'
import { UserCard } from '../../ui/UserCard'
import { QualitiesCard } from '../../ui/QualitiesCard'
import { MeetingsCard } from '../../ui/MeetingsCard'
import { Comments } from '../../ui/Comments'
import { useSelector } from 'react-redux'
import { getUserById } from '../../../store/users'

export const UserPage = ({ userId }) => {
  const user = useSelector(getUserById(userId))
  console.log('UserPage:', user)
  return (
    <>
      {user ? (
        <div className="container">
          <div className="row gutters-sm">
            <div className="col-md-4 mb-3">
              <UserCard user={user} />
              <QualitiesCard data={user.qualities} />
              <MeetingsCard value={user.completedMeetings} />
            </div>
            <div className="col-md-8">
              <Comments />
            </div>
          </div>
        </div>
      ) : (
        <h2>Loading...</h2>
      )}
    </>
  )
}