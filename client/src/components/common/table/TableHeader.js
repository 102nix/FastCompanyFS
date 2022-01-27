import React from 'react'
import PropTypes from 'prop-types'

const TableHeader = ({ onSort, selectedSort, columns }) => {
  const handleSort = (path) => {
    if (selectedSort.path === path) {
      onSort({
        ...selectedSort,
        order: selectedSort.order === 'asc' ? 'desc' : 'asc'
      })
    } else {
      onSort({ path: path, order: 'asc' })
    }
  }

  return (
    <thead>
      <tr>
        {Object.keys(columns).map((column) => (
          <th
            key={column}
            onClick={
              columns[column].path ? () => handleSort(columns[column].path) : undefined
            }
            {...{ role: columns[column].path && 'button' }}
            scope="col"
          >
            {columns[column].path === selectedSort.path &&
              selectedSort.order === 'asc' && (
              <i className="bi bi-caret-down-fill"></i>
            )}
            {columns[column].path === selectedSort.path &&
              selectedSort.order === 'desc' && (
              <i className="bi bi-caret-up-fill"></i>
            )}
            {columns[column].name}
          </th>
        ))}
      </tr>
    </thead>
  )
}
export default TableHeader

TableHeader.propTypes = {
  onSort: PropTypes.func.isRequired,
  selectedSort: PropTypes.object.isRequired,
  columns: PropTypes.object.isRequired
}