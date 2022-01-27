import React, { useState, useEffect } from 'react'
import { TextField } from '../../common/form/TextField'
import { SelectField } from '../../common/form/SelectField'
import { RadioField } from '../../common/form/RadioField'
import { MultiSelectField } from '../../common/form/MultiSelectField'
// import { useHistory } from 'react-router-dom'
import * as yup from 'yup'
import { BackHistoryButton } from '../../common/form/BackButton'
import { useSelector, useDispatch } from 'react-redux'
import { getQualities, getQualitiesLoadingStatus } from '../../../store/qualities'
import { getProfession, getProfessionLoadingStatus } from '../../../store/profession'
import { getCurrentUserData, getUpdateUserData } from '../../../store/users'

export const UserEdit = () => {
  // const history = useHistory()
  const [isLoading, setIsLoading] = useState(true)
  const qualities = useSelector(getQualities())
  const qualitiesLoading = useSelector(getQualitiesLoadingStatus())
  const professions = useSelector(getProfession())
  const professionLoading = useSelector(getProfessionLoadingStatus())
  const qualitiesList = qualities.map(q => ({ label: q.name, value: q._id }))
  const professionsList = professions.map(p => ({ label: p.name, value: p._id }))
  const [errors, setErrors] = useState({})
  const currentUser = useSelector(getCurrentUserData())
  // const updateUserData = useSelector(getUpdateUserData())
  const dispatch = useDispatch()
  const [data, setData] = useState()
  console.log(currentUser, qualities)
  const handlerChange = (target) => {
    setData((prevSate) => ({
      ...prevSate,
      [target.name]: target.value
    }))
  }

  function compareQualities () {
    const resQualities = []
    for (let i = 0; i < qualities.length; i++) {
      const temp = qualities[i]
      for (let j = 0; j < currentUser.qualities.length; j++) {
        if (temp._id === currentUser.qualities[j]) {
          resQualities.push(qualities[i])
        }
      }
    }
    return resQualities.map(q => ({ label: q.name, value: q._id }))
  }

  const validateScheme = yup.object().shape({
    profession: yup.string().required('Обязательно выберите вашу профессию'),
    email: yup
      .string()
      .required('Email обязательно для заполнения')
      .email('Email введён некорректно'),
    name: yup.string().required('Это поле обязательно для заполнения')
  })

  const validate = () => {
    validateScheme
      .validate(data)
      .then(() => setErrors({}))
      .catch((err) => setErrors({ [err.path]: err.message }))
    return Object.keys(errors).length === 0
  }

  const isValid = Object.keys(errors).length === 0

  useEffect(() => {
    validate()
  }, [data])

  const handleSubmit = async (e) => {
    e.preventDefault()
    const isValid = validate()
    if (!isValid) return
    // try {
    //   await updateUserData({
    //     ...currentUser,
    //     email: data.email,
    //     name: data.name,
    //     profession: data.profession,
    //     sex: data.sex,
    //     qualities: data.qualities.map(q => q.value)
    //   })
    //   history.push(`/users/${currentUser._id}`)
    // } catch (error) {
    //   setErrors(error)
    // }
    dispatch(getUpdateUserData({
      ...currentUser,
      email: data.email,
      name: data.name,
      profession: data.profession,
      sex: data.sex,
      qualities: data.qualities.map(q => q.value)
    }))
  }
  useEffect(() => {
    if (!professionLoading && !qualitiesLoading && currentUser && !data) {
      setData({
        name: currentUser.name,
        email: currentUser.email,
        profession: currentUser.profession,
        sex: currentUser.sex,
        qualities: compareQualities()
      })
    }
  }, [professionLoading, qualitiesLoading, currentUser, data])
  useEffect(() => {
    if (data && isLoading) {
      setIsLoading(false)
    }
  }, [data])

  return (
    <div className="container mt-5">
      <BackHistoryButton />
      <div className="row">
        <div className="col-md-6 offset-md-3 shadow p-4">
          {!isLoading && Object.keys(professions).length > 0 ? (
            <form onSubmit={handleSubmit}>
              <TextField
                label="Имя"
                name="name"
                value={data.name}
                onChange={handlerChange}
                error={errors.name}
              />
              <TextField
                label="Электронная почта"
                name="email"
                value={data.email}
                onChange={handlerChange}
                error={errors.email}
              />
              <SelectField
                label="Выберите свою профессию"
                defaultOption="Choose..."
                name="profession"
                options={professionsList}
                onChange={handlerChange}
                value={data.profession}
                error={errors.profession}
              />
              <RadioField
                options={[
                  { name: 'Male', value: 'male' },
                  { name: 'Female', value: 'female' },
                  { name: 'Other', value: 'other' }
                ]}
                value={data.sex}
                name="sex"
                onChange={handlerChange}
                label="Выберите ваш пол"
              />
              <MultiSelectField
                options={qualitiesList}
                onChange={handlerChange}
                name="qualities"
                label="Выберете ваши качества"
                values={data.qualities}
              />
              <button
                type="submit"
                disabled={!isValid}
                className="btn btn-primary w-100 mx-auto "
              >
                Submit
              </button>
            </form>
          ) : (
            'Loading...'
          )}
        </div>
      </div>
    </div>
  )
}