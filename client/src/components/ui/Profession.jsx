import React from 'react'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'
import { getProfessionByIds, getProfessionLoadingStatus } from '../../store/profession'

export const Profession = ({ id }) => {
  console.log(id)
  const isLoading = useSelector(getProfessionLoadingStatus())
  const prof = useSelector(getProfessionByIds(id))
  console.log(prof)
  if (!isLoading) {
    return <p>{prof.name}</p>
  }
  return 'Loading...'
}

Profession.propTypes = {
  id: PropTypes.string
}