import React, { useContext, useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import qualityService from '../services/qualityService'

const QualitiesContext = React.createContext()

export const useQualities = () => {
  return useContext(QualitiesContext)
}
export const QualitiesProvider = ({ children }) => {
  const [qualities, setQualities] = useState([])
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  useEffect(() => {
    const getQualities = async () => {
      try {
        const { content } = await qualityService.fetchAll()
        setQualities(content)
        setIsLoading(false)
      } catch (error) {
        errorCatcher(error)
      }
    }
    getQualities()
  }, [])
  const getQuality = (currentQ) => {
    const result = []
    qualities.forEach(q => {
      currentQ.forEach(qc => {
        if (q._id === qc) result.push(q)
      })
    })
    return result
  }

  function errorCatcher (error) {
    const { message } = error.response.data
    setError(message)
  }
  useEffect(() => {
    if (error !== null) {
      toast(error)
      setError(null)
    }
  }, [error])
  return <QualitiesContext.Provider value={{ qualities, getQuality }}>
    {!isLoading ? children : <h1>Qualities loading...</h1>
    }
  </QualitiesContext.Provider>
}