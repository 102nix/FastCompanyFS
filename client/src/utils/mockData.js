import { useState, useEffect } from 'react'
import professions from '../api/mockData/professions.json'
import qualities from '../api/mockData/qualities.json'
import users from '../api/mockData/users.json'
import httpService from '../services/http.service'

export const useMockData = () => {
  const statusConst = {
    idle: 'Not Started',
    pending: 'In Process',
    successed: 'Ready',
    error: 'Error occured'
  }
  const [error, setError] = useState(null)
  const [status, setStatus] = useState(statusConst.idle)
  const [progress, setProgress] = useState(0)
  const [count, setCount] = useState(0)
  const summaryCount = professions.length + qualities.length + users.length

  const incrementCount = () => {
    setCount(prevState => prevState + 1)
  }

  const updateprogress = () => {
    if (count !== 0 && status === statusConst.idle) {
      setStatus(statusConst.pending)
    }
    const newProgress = Math.floor((count / summaryCount) * 100)
    if (progress < newProgress) {
      setProgress(() => newProgress)
    }
    if (newProgress === 100) {
      setStatus(statusConst.successed)
    }
  }

  useEffect(() => {
    updateprogress()
  }, [count])

  async function initialize () {
    try {
      for (const prof of professions) {
        await httpService.put('profession/' + prof._id, prof)
        incrementCount()
      }
      for (const user of users) {
        await httpService.put('user/' + user._id, user)
        incrementCount()
      }
      for (const qual of qualities) {
        await httpService.put('quality/' + qual._id, qual)
        incrementCount()
      }
    } catch (error) {
      setError(error)
      setStatus(statusConst.error)
    }
  }
  return { error, initialize, progress, status }
}