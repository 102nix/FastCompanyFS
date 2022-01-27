import React from 'react'
import PropTypes from 'prop-types'
import Select from 'react-select'

export const MultiSelectField = ({
  options,
  onChange,
  name,
  label,
  values
}) => {
  const optionsArray = !Array.isArray(options) && typeof options === 'object' ? (
    Object.keys(options).map((optionName) => ({
      label: options[optionName].name,
      value: options[optionName]._id
    }))
  ) : (
    options
  )

  const handleChange = (value) => {
    console.log(value)
    onChange({ name: name, value: value })
  }

  const adaptDefaultValues = (arr) => {
    if (arr) return [...arr]
    return []
  }

  return (
    <div className="mb-4">
      <label className="form-label">{label}</label>
      <Select
        isMulti
        closeMenuOnSelect={false}
        options={optionsArray}
        className="basic-multi-select"
        classNamePrefix="select"
        onChange={handleChange}
        name={name}
        defaultValue={adaptDefaultValues(values)}
      />
    </div>
  )
}

MultiSelectField.propTypes = {
  options: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  onChange: PropTypes.func,
  name: PropTypes.string,
  label: PropTypes.string,
  calculateQualities: PropTypes.func
}