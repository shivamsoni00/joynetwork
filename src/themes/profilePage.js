import React from 'react'
import Header from '../components/header/header'
import ProfileComponent from '../components/profile/profileComponent'

function ProfilePage() {
  return (
    <div className='h-screen w-screen bg-blue'>
        <Header/>
        <ProfileComponent/>
    </div>
  )
}

export default ProfilePage
