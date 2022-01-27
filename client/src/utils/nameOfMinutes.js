function displayDayMonthYear (ms) {
  const monthArr = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec'
  ]
  const displayDate = new Date(ms)
  const days = displayDate.getDate()
  const month = displayDate.getMonth()
  const year = displayDate.getFullYear()
  return ` ${days < 10 ? `0${days}` : days}, ${monthArr[month + 1]}, ${year}`
}
function displayDayMonth (ms) {
  const monthArr = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec'
  ]
  const displayDate = new Date(ms)
  const day = displayDate.getDate()
  const month = displayDate.getMonth()
  return ` ${day < 10 ? `0${day}` : day}, ${monthArr[month]}`
}

function displayHoursMinutes (ms) {
  const displayDate = new Date(ms)
  const hours = displayDate.getHours()
  const minutes = displayDate.getMinutes()
  return ` в ${hours < 10 ? `0${hours}` : hours}:${
    minutes < 10 ? `0${minutes}` : minutes
  }`
}

export function minutesNameVar (ms) {
  let text
  const minutes = Math.floor((ms / (1000 * 60)) % 60)

  let count = minutes % 100
  if (count >= 5 && count <= 20) {
    text = 'минут назад'
  } else {
    count = count % 10
    if (count === 1) {
      text = 'минута назад'
    } else if (count >= 2 && count <= 4) {
      text = 'минуты назад'
    } else {
      text = 'минут назад'
    }
  }
  return `${minutes}  ${text}`
}

export const getMilliseconds = (ms) => {
  const createDate = new Date(ms)
  const nowDate = new Date()
  const result = nowDate.getTime() - createDate.getTime()

  const seconds = (result / 1000).toFixed(1)
  if (seconds < 1800) return minutesNameVar(result)
  else if (seconds > 1800 && seconds < 86400) return displayHoursMinutes(ms)
  else if (seconds > 86400 && seconds < 31536000) return displayDayMonth(ms)
  else if (seconds > 31536000) return displayDayMonthYear(ms)
}