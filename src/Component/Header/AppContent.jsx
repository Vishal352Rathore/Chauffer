import React from 'react'
import { Outlet} from 'react-router-dom'

const AppContent = () => {
  return (
    <div >
       <Outlet/>
    </div>
  )
}

export default AppContent