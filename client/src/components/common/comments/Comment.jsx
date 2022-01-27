import React from 'react'
import { displayDate } from '../../../utils/displayDate'
import { getCurrentUserId, getUserById } from '../../../store/users'
import { useSelector } from 'react-redux'

export const Comment = ({
  content,
  created_at: created,
  _id: id,
  userId,
  onRemove
}) => {
  const currentUserId = useSelector(getCurrentUserId())
  const user = useSelector(getUserById(userId))

  return (
    <div className="bg-ligth card-body mb-3">
      <div className="row">
        <div className="col">
          <div className="d-flex flex-start">
            <img
              src={user.image}
              className="rounded-circle shadow-1-strong me-3"
              alt="avatar"
              width="65"
              height="65"
            />
            <div className="flex-grow-1 flex-shrink-1">
              <div className="mb-4">
                <div className="d-flex justify-content-between align-items-center">
                  <p className="mb-1">
                    {user && user.name}{' '}
                    <span className="small">- {displayDate(created)}</span>
                  </p>
                  {currentUserId === userId &&
                    <button
                      className="btn btn-sm text-primary d-flex align-items-center"
                      onClick={() => onRemove(id)}
                    >
                      <i className="bi bi-x-lg"></i>
                    </button>
                  }
                </div>
                <p className="small">{content}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}