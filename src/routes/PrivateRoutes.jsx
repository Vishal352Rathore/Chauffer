import React from 'react'
import ServiceClass from '../components/ServiceClass';
import Pickup from '../components/Pickup';
import PaymentCard from '../components/Payment';
import {Route,Routes} from "react-router-dom";

const PrivateRoutes = () => {
   
  return (
    <>
      <Routes>
        <Route path='/services/serviceclass' element={<ServiceClass/>}/>
        <Route path='/services/serviceclass/pickup' element={<Pickup/>}/>
        <Route path='/services/serviceclass/pickup/payment' element={<PaymentCard/>}/>
      </Routes>
  </>
  )
}

export default PrivateRoutes