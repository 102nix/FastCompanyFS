// prepare qualities:
export const prepareQualities = (qualities, dataQualities) => {
  console.log('new func: ', qualities, dataQualities)
  const tempQualities = []
  Object.keys(qualities).forEach((optionName) => {
    dataQualities.forEach((dat) => {
      if (dataQualities.length > 0) {
        if (qualities[optionName].name === (dat.label || dat.name)) {
          tempQualities.push(qualities[optionName])
        }
      }
    })
  })
  // data.qualities=
  return [...tempQualities]
}

export const transformationQualities = (options, values) => {
  const optionsArray =
    !Array.isArray(options) && typeof options === 'object' ? (
      Object.keys(options).map((optionName) => ({
        label: options[optionName].name,
        value: options[optionName]._id
      }))
    ) : (
      options
    )

  const qualitiesValues = []

  optionsArray.forEach((options) => {
    values.forEach((value) => {
      if (options.label === (value.name || value.label)) qualitiesValues.push(options)
    })
  })

  return qualitiesValues
}

export const getProfessionById = (professions, id) => {
  for (const prof in professions) {
    const profData = professions[prof]
    if (profData._id === id) return profData
  }
}