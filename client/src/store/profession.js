import { createSlice } from '@reduxjs/toolkit'
import professionService from '../services/professionService'

const professionSlice = createSlice({
  name: 'profession',
  initialState: {
    entities: null,
    isLoading: true,
    error: null,
    lastFetch: null
  },
  reducers: {
    professionRequested: (state) => {
      state.isLoading = true
    },
    professionReceived: (state, action) => {
      state.entities = action.payload
      state.lastFetch = Date.now()
      state.isLoading = false
    },
    professionRequestFiled: (state, action) => {
      state.error = action.payload
      state.isLoading = false
    }
  }
})

const { reducer: professionReducer, actions } = professionSlice
const { professionRequested, professionReceived, professionRequestFiled } = actions

function isOutDated (date) {
  if (Date.now() - date > 10 * 60 * 100) {
    return true
  }
  return false
}

export const loadProfessionList = () => async (dispatch, getState) => {
  const { lastFetch } = getState().profession
  if (isOutDated(lastFetch)) {
    dispatch(professionRequested())
    try {
      const { content } = await professionService.get()
      dispatch(professionReceived(content))
    } catch (error) {
      dispatch(professionRequestFiled(error.message))
    }
  }
}

export const getProfession = () => (state) => state.profession.entities
export const getProfessionLoadingStatus = () => (state) => state.profession.isLoading
export const getProfessionByIds = (professionIds) => (state) => {
  console.log(state.profession.entities, professionIds)
  if (state.profession.entities) {
    for (const prof of state.profession.entities) {
      if (prof._id === professionIds) {
        console.log(prof._id, professionIds)
        return prof
      }
    }
  }
  return {}
}

export default professionReducer