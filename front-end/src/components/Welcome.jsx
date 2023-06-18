import React from 'react'
import { useSelector } from 'react-redux'

const Welcome = () => {
  const {user} = useSelector ((state) => state.auth);
  return (
    <div className='bg-[#1E252B]  min h-screen'>
        <p className='text-4xl text-white'>DashBoard</p>
        <h2 className='text-3xl text-white'> Welcome Back <strong className='text-white'>{user && user.name}</strong></h2>
    </div>
  )
}

export default Welcome