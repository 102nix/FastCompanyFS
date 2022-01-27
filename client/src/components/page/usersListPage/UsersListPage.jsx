import React, { useState } from 'react'
import { Pagination } from '../../common/Pagination'
import { SearchStatus } from '../../ui/SearchStatus'
import { paginate } from '../../../utils/paginate'
import { GroupList } from '../../common/GroupList'
import { UsersTable } from '../../ui/UsersTable'
import _ from 'lodash'
import { useSelector } from 'react-redux'
import { getProfession, getProfessionLoadingStatus } from '../../../store/profession'
import { getCurrentUserData, getUsersList } from '../../../store/users'

export const UsersListPage = () => {
  const users = useSelector(getUsersList())
  const currentUser = useSelector(getCurrentUserData())
  const professions = useSelector(getProfession())
  const professionsLoading = useSelector(getProfessionLoadingStatus())
  const [selectedProf, setSelectedProf] = useState()
  const [sortBy, setSortBy] = useState({ path: 'name', order: 'asc' })

  const [searchName, setSearchName] = useState('') // for input search
  const [findUsersArr, setFindUsersArr] = useState(null)

  const handlerSearchName = (e) => {
    setSearchName(e.target.value)
    const findUsers = []
    users.forEach((user) => {
      if (
        user.name.toLowerCase().indexOf(e.target.value.toLowerCase()) !== -1
      ) {
        findUsers.push(user)
      }
    })
    setFindUsersArr(findUsers)
  }

  const handlerDelete = (userId) => {
    // const newUser = allUsers.filter((user) => user._id !== userId)
    // setUsers(newUser)
    console.log(userId)
  }

  const handlerStatusBookmark = (userId) => {
    const newUsers = users.map((user) => {
      if (user._id === userId) {
        user.bookmark = !user.bookmark
      }
      return user
    })
    // setUsers(newUsers)
    console.log(newUsers)
  }

  // pagination
  const pageSize = 4
  const [currentPage, setCurrentPage] = useState(1)

  const handlePageChange = (pageIndex) => {
    setCurrentPage(pageIndex)
  }

  function filterUsers (data) {
    const filteredUsers = selectedProf ? (
      data.filter((user) => JSON.stringify(user.profession) === JSON.stringify(selectedProf))
    ) : (
      data
    )
    console.log('??', filteredUsers)
    return filteredUsers.filter(u => u._id !== currentUser._id)
  }

  const filteredUsers = filterUsers(users)
  const count = filteredUsers.length

  const sortedUsers = _.orderBy(findUsersArr || filteredUsers, [sortBy.path], [sortBy.order]) // findUsersArr ? findUsersArr : filteredUsers

  const usersPaginate = paginate(sortedUsers, currentPage, pageSize)

  // pagination

  const handleProfessionalSelect = (item) => {
    setCurrentPage(1)
    setSelectedProf(item)
    setFindUsersArr(null)
    setSearchName('')
  }

  const clearFilter = () => {
    setSelectedProf()
    setFindUsersArr(null)
    setSearchName('')
  }

  const handleSort = (item) => {
    setSortBy(item)
  }

  return (
    <div className="d-flex">
      {professions && !professionsLoading && (
        <div className="d-flex flex-column flex-shrink-0 p-3">
          <GroupList
            selectedItem={selectedProf}
            items={professions}
            onItemSelect={handleProfessionalSelect}
          />
          <button className="btn btn-secondary mt-2" onClick={clearFilter}>
            Очистить
          </button>
        </div>
      )}
      <div className="d-flex flex-column">
        {users.length === 0 ? (
          <h2>Loading...</h2>
        ) : (
          <SearchStatus length={count} />
        )}
        <input
          type="text"
          placeholder="Search..."
          value={searchName}
          onChange={(e) => handlerSearchName(e)}
        />
        {count > 0 && (
          <UsersTable
            users={usersPaginate}
            selectedSort={sortBy}
            onStatus={handlerStatusBookmark}
            onDelete={handlerDelete}
            onSort={handleSort}
          />
        )}
        <div className="d-flex justify-content-center">
          <Pagination
            itemsCount={count}
            pageSize={pageSize}
            onPageChange={handlePageChange}
            currentPage={currentPage}
          />
        </div>
      </div>
    </div>
  )
}