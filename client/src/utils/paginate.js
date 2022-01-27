export function paginate (users, currentPage, pageSize) {
  const startIndex = (currentPage - 1) * pageSize
  return users.slice(startIndex, pageSize + startIndex)
}