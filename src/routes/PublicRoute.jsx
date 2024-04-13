import React from "react";
import { Routes, Route } from "react-router-dom";
import TermsAndCondition from "../components/TermsAndCondition";
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

function PublicRoute() {

  return (
    <div>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />
        <Route path="/forgotpassword" element={<ForgotPassword/>} />
        <Route path="/forgotpassword/otpverify" element={<OtpVerify/>}/>
        <Route path="/forgotpassword/otpverify/newpassword" element={<NewPassword/>}/>
        <Route path="/about" element={<About />} />
        <Route path="/help" element={<Help />} />
        <Route path="/services" element={<Services />} />
        <Route path='/services/chaufferservices' element={<ChaufferServices/>}/>
        <Route path="/cities" element={<CitiesAndClasses />} />
        <Route path="/termsandcondition" element={<TermsAndCondition />} />     
      </Routes>
    </div>
  );
}
export default PublicRoute;


// import React from "react";
// import { Routes, Route, Navigate } from "react-router-dom";
// import ResetPassword from "../LoginSignup/ResetPassword";
// import TermsAndCondition from "../components/TermsAndCondition";
// import Home from "../components/Home";
// import About from "../components/About";
// import Help from "../components/Help";
// import Services from "../components/Services";
// import CitiesAndClasses from "../components/CitiesAndClasses";
// import Signup from "../LoginSignup/Signup";
// import Login from "../LoginSignup/Login";
// import ChaufferServices from "../components/chaufferServices";
// import ServiceClass from '../components/ServiceClass';
// import Pickup from '../components/Pickup';
// import PaymentCard from '../components/Payment';
// import { toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// function PublicRoute() {
//   const token = localStorage.getItem('token');
//   const email = localStorage.getItem('email');
//   const user_id = localStorage.getItem('user_id');
//   console.log("Token for private Route :",token);
//   console.log("email",email);
//   console.log("user_Id",user_id);
//   // Show toast message if user is not logged in
//   if (!(token && email && user_id)) {
//     toast.success("Please Login first !");
//     return <Navigate to="/" />;
//   }
//   return (
//     <div>
//       <Routes>
//         <Route path="/signup" element={<Signup />} />
//         <Route path="/login" element={<Login />} />
//         <Route path="/" element={<Home />} />
//         <Route path="/resetpassword" element={<ResetPassword />} />
//         <Route path="/about" element={<About />} />
//         <Route path="/help" element={<Help />} />
//         <Route path="/services" element={<Services />} />
//         {
//           (token && email && user_id) &&
//           <>
//             <Route path='/services/chaufferservices' element={<ChaufferServices/>}/>
//             <Route path='/services/serviceclass' element={<ServiceClass/>}/>
//             <Route path='/services/serviceclass/pickup' element={<Pickup/>}/>
//             <Route path='/services/serviceclass/pickup/payment' element={<PaymentCard/>}/>
//           </>
//         }
//         <Route path="/cities" element={<CitiesAndClasses />} />
//         <Route path="/termsandcondition" element={<TermsAndCondition />} />
//       </Routes>
//     </div>
//   );
// }
// export default PublicRoute;