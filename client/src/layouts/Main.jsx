import React from 'react'
import { useMockData } from '../utils/mockData'

export const Main = () => {
  const { error, initialize, progress, status } = useMockData()
  const handleClick = () => {
    initialize()
  }
  return <div className="container mt-5"><h1>Main Page</h1>
    <h3>Иницифлизация данных в FireBase</h3>
    <ul>
      <li>Status: {status}</li>
      <li>Progress: {progress}%</li>
      { error && <li>Error: {error}</li> }
    </ul>
    <button className="btn btn-primary" onClick={handleClick}>Инициализировать</button>
  </div>
}