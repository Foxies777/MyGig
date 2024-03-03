import React from 'react'
import Navigation from '../components/Navigation'
import YMap from '../components/YMap'
import MobileNotifications from '../components/MobileNotifications'


const PageMap = () => {
  return (
    <div>
      <YMap />
      <MobileNotifications />
      <Navigation />
      
    </div>
  )
}

export default PageMap