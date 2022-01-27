import { createSlice, createAction } from '@reduxjs/toolkit'
import commentService from '../services/comment.service.js'
import { nanoid } from 'nanoid'

const commentsSlice = createSlice({
  name: 'comments',
  initialState: {
    entities: null,
    isLoading: true,
    error: null
  },
  reducers: {
    commentsRequested: (state) => {
      state.isLoading = true
    },
    commentsReceived: (state, action) => {
      state.entities = action.payload
      state.isLoading = false
    },
    commentsRequestFiled: (state, action) => {
      state.error = action.payload
      state.isLoading = false
    },
    commentCreated: (state, action) => {
      state.entities.push(action.payload)
      state.isLoading = false
    },
    commentRemoved: (state, action) => {
      state.entities = [...state.entities.filter(c => c._id !== action.payload)]
      state.isLoading = false
    }
  }
})

const { reducer: commentsReducer, actions } = commentsSlice
const { commentsRequested, commentsReceived, commentsRequestFiled, commentCreated, commentRemoved } = actions

const createCommentFailed = createAction('users/createCommentFailed')
const removeCommentFailed = createAction('users/removeCommentFailed')

export const loadCommentsList = (userId) => async (dispatch) => {
  dispatch(commentsRequested())
  try {
    const { content } = await commentService.getComments(userId)
    dispatch(commentsReceived(content))
  } catch (error) {
    dispatch(commentsRequestFiled(error.message))
  }
}

export const createComment = (data) => async (dispatch) => {
  dispatch(commentsRequested())
  const comment = {
    ...data,
    _id: nanoid(),
    created_at: Date.now()
  }
  try {
    const { content } = await commentService.createComment(comment)
    dispatch(commentCreated(content))
  } catch (error) {
    dispatch(createCommentFailed(error.message))
  }
}

export const removeComment = (id) => async (dispatch) => {
  dispatch(commentsRequested())
  try {
    const { content } = await commentService.removeComment(id)
    console.log(content, id)
    if (content === null) {
      dispatch(commentRemoved(id))
    }
  } catch (error) {
    dispatch(removeCommentFailed(error.message))
  }
}

export const getComments = () => (state) => state.comments.entities
export const getCommentsLoadingStatus = () => (state) => state.comments.isLoading

export default commentsReducer