import React from 'react'

export const BookMark = ({ bookmark, handlerStatus, id }) => {
  return (
    <>
      <i
        className={bookmark ? 'bi bi-bookmark-fill' : 'bi bi-bookmark'}
        onClick={() => handlerStatus(id)}
        style={{ cursor: 'pointer' }}
      ></i>
    </>
  )
}