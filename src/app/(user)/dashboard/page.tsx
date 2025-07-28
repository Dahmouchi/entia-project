"use client"
import { signOut } from 'next-auth/react'
import React from 'react'

const UserPage = () => {
  return (
    <div onClick={()=>signOut()} >UserPage</div>
  )
}

export default UserPage