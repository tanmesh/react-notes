import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchUser } from './userSlice'

const UserView = () => {
  const user = useSelector((state) => state.user)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchUser())
  }, [])

  return (
    <div>
      <h4>List of Users</h4>
      {user.loading ? <h4>Loading...</h4> : null}
      {!user.loading && user.error ? <h4>{user.error}</h4> : null}
      {user.user.map((user) => (
        <p key={user.id}>{user.name}</p>))}
      {user.users}
    </div>
  )
}

export default UserView
