export function generateAuthError (message) {
  switch (message) {
  case 'INVALID_PASSWORD':
    return 'Неверный Email или пароль'
  case 'EMAIL_EXISTS':
    return 'пользователь с таким Email уже существует'
  default:
    return 'Слишком много попыток входа. Попробуйте позднее'
  }
}