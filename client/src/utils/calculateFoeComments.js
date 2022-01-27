export const getUserName = (allUsers, id) => {
  let findUser
  allUsers.forEach((user) => {
    if (user.UserId === id) {
      findUser = user.name
    }
  })
  return findUser
}