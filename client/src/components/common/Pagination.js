import React from 'react'
import PropTypes from 'prop-types'

export const Pagination = ({
  onPageChange,
  itemsCount,
  pageSize,
  currentPage
}) => {
  const pageCount = Math.ceil(itemsCount / pageSize)
  if (pageCount === 1) return null

  const pages = []

  for (let i = 1; i <= pageCount; i++) {
    pages.push(i)
  }

  return (
    <nav>
      <ul className="pagination">
        {pages.map((page) => (
          <li
            className={`page-item ${page === currentPage ? 'active' : ''}`}
            key={page}
          >
            <a className="page-link" onClick={() => onPageChange(page)}>
              {page}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}
Pagination.protoTypes = {
  onPageChange: PropTypes.func.isRequired,
  itemsCount: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired
}