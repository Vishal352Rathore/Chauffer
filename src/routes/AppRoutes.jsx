import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../components/Home";
import About from "../components/About";
import Help from "../components/Help";
import Services from "../components/Services";
import CitiesAndClasses from "../components/CitiesAndClasses";
import Signup from "../LoginSignup/Signup";
import Login from "../LoginSignup/Login";
import ChaufferServices from "../components/chaufferServices";
import OtpVerify from "../LoginSignup/OtpVerify";
import NewPassword from "../LoginSignup/NewPassword";
import ForgotPassword from "../LoginSignup/ForgotPassword";
// import ResetPassword from '../LoginSignup/ResetPassword';
import ServiceClass from '../components/ServiceClass';
import Pickup from '../components/Pickup';
import PaymentCard from '../components/Payment';
import TermsAndCondition from '../components/TermsAndCondition';
import BookRide from "../components/BookRide";
import History from "../components/History";


function AppRoutes() {
  return (
    <div>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
        <Route path="/forgotpassword/otpverify" element={<OtpVerify />} />
        <Route
          path="/forgotpassword/otpverify/newpassword"
          element={<NewPassword />}
        />
        <Route path="/about" element={<About />} />
        <Route path="/help" element={<Help />} />
        <Route path="/services" element={<Services />} />
        <Route
          path="/services/chaufferservices"
          element={<ChaufferServices />}
        />
        <Route path="/cities" element={<CitiesAndClasses />} />
        <Route path="/termsandcondition" element={<TermsAndCondition />} />
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/login' element={<Login/>}/>
        {/* <Route path='/resetpassword' element={<ResetPassword/>}/> */}
        <Route path="/" element={<Home />} />
        <Route path='/about' element={<About/>}/>
        <Route path='/help' element={<Help/>}/>
        <Route path='/services' element={<Services/>}/>
        <Route path='/services/bookride' element={<BookRide/>}/>
        <Route path='/services/serviceclass' element={<ServiceClass/>}/>
        <Route path='/services/serviceclass/pickup' element={<Pickup/>}/>
        <Route path='/services/serviceclass/pickup/payment' element={<PaymentCard/>}/>
        <Route path='/citiesandclasses' element={<CitiesAndClasses/>}/>
        <Route path='/termsandcondition' element={<TermsAndCondition/>}/>
        <Route path='/history' element={<History/>}/>

      </Routes>
    </div>
  );
}

export default AppRoutes;
