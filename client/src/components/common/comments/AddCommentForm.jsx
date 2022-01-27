import React, { useState, useEffect } from 'react'
import { TextAreaField } from '../form/TextAreaField'
import * as yup from 'yup'

export const AddCommentForm = ({ onSubmit }) => {
  const [data, setData] = useState({})
  const [errors, setErrors] = useState({})

  useEffect(() => {
    validate()
  }, [data])

  const handlerChange = (target) => {
    console.log(target)
    setData((prevSate) => ({
      ...prevSate,
      [target.name]: target.value
    }))
  }

  const validateScheme = yup.object().shape({
    content: yup.string().required('Необходимо заполнить комментарий')
  })

  const validate = () => {
    validateScheme
      .validate(data)
      .then(() => setErrors({}))
      .catch((err) => setErrors({ [err.path]: err.message }))
    return Object.keys(errors).length === 0
  }

  const isValid = Object.keys(errors).length === 0

  const clearForm = () => {
    setData({})
    setErrors({})
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const isValid = validate()
    if (!isValid) return
    onSubmit(data)
    clearForm()
  }

  return (
    <div>
      <h2>New comment</h2>
      <form onSubmit={handleSubmit}>
        <TextAreaField
          label="Сообщение"
          name="content"
          value={data.content || ''}
          onChange={handlerChange}
          error={errors.content}
        />
        <button className="btn btn-primary" type="submit" disabled={!isValid}>
          Опубликовать
        </button>
      </form>
    </div>
  )
}