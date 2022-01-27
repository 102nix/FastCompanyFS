import React from 'react'

export const SearchStatus = ({ length }) => {
  return (
    <h2>
      {length > 0 ? (
        <span className="badge bg-primary">{`${length} человек тусанут с тобой сегодня`}</span>
      ) : (
        <span className="badge bg-danger">Никто с тобой не тусанёт!</span>
      )}
    </h2>
  )
}