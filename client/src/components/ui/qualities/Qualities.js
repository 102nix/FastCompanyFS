import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
// import { useQualities } from '../../../hooks/useQualities'
import { useDispatch, useSelector } from 'react-redux'
import { getQualitiesByIds, loadQualitiesList } from '../../../store/qualities'

export const Qualities = ({ qualities }) => {
  // const { getQuality } = useQualities()
  // const currentQualities = getQuality(qualities)
  const dispatch = useDispatch()
  const qualitiesList = useSelector(getQualitiesByIds(qualities))
  useEffect(() => {
    dispatch(loadQualitiesList())
  }, [])
  return (
    <>
      {qualitiesList.map(q => (
        <span className={`badge bg-${q.color}`} key={q._id}>
          {q.name}
        </span>))
      }
    </>
  )
}

Qualities.propTypes = {
  qualities: PropTypes.array
}