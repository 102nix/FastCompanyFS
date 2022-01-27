import React, { useState, useEffect } from 'react'
import { TextField } from '../common/form/TextField'
import { validator } from '../../utils/validator'
import { SelectField } from '../common/form/SelectField'
import { RadioField } from '../common/form/RadioField'
import { MultiSelectField } from '../common/form/MultiSelectField'
import { CheckBoxField } from '../common/form/CheckBoxField'
import { useSelector, useDispatch } from 'react-redux'
import { getQualities } from '../../store/qualities'
import { getProfession } from '../../store/profession'
import { signUp } from '../../store/users'

export const RegisterForm = () => {
  const dispatch = useDispatch()
  const [data, setData] = useState({
    email: '',
    password: '',
    profession: '',
    sex: 'male',
    name: '',
    qualities: [],
    licence: false
  })
  const qualities = useSelector(getQualities())
  const qualitiesList = qualities.map(q => ({ label: q.name, value: q._id }))
  const professions = useSelector(getProfession())
  const professionsList = professions.map(p => ({ label: p.name, value: p._id }))
  const [errors, setErrors] = useState({})

  const handlerChange = (target) => {
    setData((prevSate) => ({
      ...prevSate,
      [target.name]: target.value
    }))
  }

  const validate = () => {
    const errors = validator(data, validatorConfig)
    setErrors(errors)
    return Object.keys(errors).length === 0
  }

  const isValid = Object.keys(errors).length === 0

  const validatorConfig = {
    email: {
      isRequired: {
        message: 'Email обязательно для заполнения'
      },
      isEmail: {
        message: 'Email введён некорректно'
      }
    },
    name: {
      isRequired: {
        message: 'Имя обязательно для заполнения'
      },
      min: {
        message: 'Имя должно состоять минимум из 3 символов',
        value: 3
      }
    },
    password: {
      isRequired: {
        message: 'Пароль обязателен для заполнения'
      },
      isCapital: {
        message: 'Пароль должен содержать хотябы 1 заглавную букву'
      },
      isContainDigit: {
        message: 'Пароль должен содержать хотябы 1 число'
      },
      min: {
        message: 'Пароль должен состоять минимум из 8 символов',
        value: 8
      }
    },
    profession: {
      isRequired: {
        message: 'Обязательно выберите вашу профессию'
      }
    },
    licence: {
      isRequired: {
        message:
          'Вы не можете использовать наш сервис без лицензионного соглашения'
      }
    }
  }

  useEffect(() => {
    validate()
  }, [data])

  const handleSubmit = (e) => {
    e.preventDefault()
    const isValid = validate()
    if (!isValid) return
    const newData = { ...data, qualities: data.qualities.map(q => q.value) }
    dispatch(signUp(newData))
  }

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        label="Электронная почта"
        name="email"
        value={data.email}
        onChange={handlerChange}
        error={errors.email}
      />
      <TextField
        label="Имя"
        name="name"
        value={data.name}
        onChange={handlerChange}
        error={errors.name}
      />
      <TextField
        label="Пароль"
        type="password"
        name="password"
        value={data.password}
        onChange={handlerChange}
        error={errors.password}
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
      />
      <CheckBoxField
        value={data.licence}
        onChange={handlerChange}
        name="licence"
        error={errors.licence}
      >
        Подтвердить <a>лицензионное соглашение</a>
      </CheckBoxField>
      <button
        type="submit"
        disabled={!isValid}
        className="btn btn-primary w-100 mx-auto "
      >
        Submit
      </button>
    </form>
  )
}