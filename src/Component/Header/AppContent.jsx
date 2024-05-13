import React from 'react'
import AppRoute from '../../routes/AppRoute'
import { BrowserRouter  ,Outlet} from 'react-router-dom'

const AppContent = () => {
  return (
    <div >
       <Outlet/>
    </div>
  )
}

export default AppContent