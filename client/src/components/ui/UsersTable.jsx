import React from 'react'
import PropTypes from 'prop-types'
// import { TableHeader } from "./TableHeader"
// import { TableBody } from "./TableBody"
import { BookMark } from '../common/BookMark'
import { Qualities } from './qualities/Qualities'
import Table from '../common/table'
import { Link } from 'react-router-dom'
import { Profession } from './Profession'

export const UsersTable = ({
  users,
  onSort,
  onStatus,
  selectedSort
}) => {
  const columns = {
    // name: {path:'name', name:'Имя'},
    name: {
      path: 'name',
      name: 'Имя',
      component: (user) => <Link to={`/users/${user._id}`}>{user.name}</Link>
    },
    qualities: {
      name: 'Качество',
      component: (user) => <Qualities qualities={user.qualities} />
    },
    profession: { name: 'Профессия', component: (user) => <Profession id={user.profession}/> },
    completedMeetings: { path: 'completedMeetings', name: 'Встретился раз' },
    rate: { path: 'rate', name: 'Оценка' },
    bookmark: {
      path: 'bookmark',
      name: 'Избранное',
      component: (user) => (
        <BookMark
          bookmark={user.bookmark}
          handlerStatus={onStatus}
          id={user._id}
        />
      )
    }
  }

  return (
    <Table
      onSort={onSort}
      selectedSort={selectedSort}
      columns={columns}
      data={users}
    />
  )
}

UsersTable.protoTypes = {
  users: PropTypes.array.isRequired,
  onSort: PropTypes.func.isRequired,
  currentSort: PropTypes.object.isRequired
}