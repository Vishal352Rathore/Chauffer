import React from 'react'
import { Routes, Route } from 'react-router-dom';
import Home from '../components/Home';
import About from '../components/About';
import Help from '../components/Help';
import Services from '../components/Services';
import CitiesAndClasses from '../components/CitiesAndClasses';
import Signup from '../LoginSignup/Signup';
import Login from '../LoginSignup/Login';
import ResetPassword from '../LoginSignup/ResetPassword';
import ServiceClass from '../components/ServiceClass';
import Pickup from '../components/Pickup';
import PaymentCard from '../components/Payment';
import TermsAndCondition from '../components/TermsAndCondition';

const PrivateRoute = () => {
  return (
    <div>
      <Routes>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/resetpassword' element={<ResetPassword/>}/>
        <Route path="/" element={<Home />} />
        <Route path='/about' element={<About/>}/>
        <Route path='/help' element={<Help/>}/>
        <Route path='/services' element={<Services/>}/>
        <Route path='/services/serviceclass' element={<ServiceClass/>}/>
        <Route path='/services/serviceclass/pickup' element={<Pickup/>}/>
        <Route path='/services/serviceclass/pickup/payment' element={<PaymentCard/>}/>
        <Route path='/citiesandclasses' element={<CitiesAndClasses/>}/>
        <Route path='/termsandcondition' element={<TermsAndCondition/>}/>
    </Routes>
    </div>
  )
}

export default PrivateRoute