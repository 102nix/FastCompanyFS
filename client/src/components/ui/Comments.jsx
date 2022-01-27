import React, { useEffect } from 'react'
import { orderBy } from 'lodash'
import { AddCommentForm } from '../common/comments/AddCommentForm'
import { CommentsList } from '../common/comments/CommentsList'
import { useDispatch, useSelector } from 'react-redux'
import { getComments, getCommentsLoadingStatus, loadCommentsList, createComment, removeComment } from '../../store/comments'
import { useParams } from 'react-router-dom'
import { getCurrentUserId } from '../../store/users'

export const Comments = () => {
  const { userId } = useParams()
  const currentUserId = useSelector(getCurrentUserId())
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(loadCommentsList(userId))
  }, [userId])
  const isLoading = useSelector(getCommentsLoadingStatus())
  const comments = useSelector(getComments())

  const handleSubmit = (data) => {
    console.log(data)
    data.pageId = userId
    data.userId = currentUserId
    dispatch(createComment(data))
  }

  const handleRemoveComment = (id) => {
    dispatch(removeComment(id))
  }

  const sortedComments = orderBy(comments, ['created_at', 'desc'])

  return (
    <>
      <div className="card mb-2">
        <div className="card-body">
          <AddCommentForm onSubmit={handleSubmit} />
        </div>
      </div>
      {sortedComments.length > 0 && (
        <div className="card mb-3">
          <div className="card-body">
            <h2>Comments</h2>
            <hr />
            {!isLoading ? <CommentsList comments={sortedComments} onRemove={handleRemoveComment}/> : 'Loading...'}
          </div>
        </div>
      )}
    </>
  )
}