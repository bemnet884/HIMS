import { currentUser } from '@clerk/nextjs/server'
import React from 'react'

const Server = async () => {
  const user = await currentUser()
  return (
    <div>Welcom, {user?.firstName}</div>
  )
}

export default Server