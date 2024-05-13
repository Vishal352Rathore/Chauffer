import "./App.css";
import DefaultLayout from "./layout/DefaultLayout";
import Login from "./Component/Login/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./Component/Dashboard/Dashboard";
import AllRides from "./Component/AllRides/AllRides";
import AllDriver from "./Component/AllDriver/AllDriver";
import AddDriver from "./Component/AddDriver/AddDriver";
import AddVehicle from "./Component/AddVehicle/AddVehicle";
import AllVehicle from "./Component/AllVehicle/AllVehicle";
import AddAgent from "./Component/AddAgent/AddAgent";
import Earnings from "./Component/Earnings/Earnings";
import Complaints from "./Component/Complaints/Complaints";
import TermsAndCondition from "./Component/TermsAndCondition/TermsAndCondition";
import Policy from "./Component/Policy/Policy";
import RideDetails from "./Component/RideDetails/RideDetails";
import ComplaintForm from "./Component/ComplaintForm/ComplaintForm";
// import {ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
import Signup from "./Component/Signup/Signup";
import AllAgent from "./Component/AllAgent/AllAgent";
import AgencyDetail from "./Component/AgencyDetail/AgencyDetail";
function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route index element={<Login />} />
          <Route path="login" element={<Login />} />
          <Route path="signUp" element={<Signup/>}/>
          <Route path="/home" element={<DefaultLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="allRides" element={<AllRides />} />
            <Route path="rideDetails" element={<RideDetails />} />
            <Route path="allDriver" element={<AllDriver />} />
            <Route path="allDriver/addDriver" element={<AddDriver />} />
            <Route path="allVehicle" element={<AllVehicle />} />
            <Route path="allVehicle/addVehicle" element={<AddVehicle />} />
            <Route path="allAgent" element={<AllAgent />} /> 
            <Route path="allAgent/agencyDetail/:agencyId" element={<AgencyDetail />} /> 
            <Route path="earnings" element={<Earnings />} />
            <Route path="complaints" element={<Complaints />} />
            <Route path="complaints/complaintForm" element={<ComplaintForm />} />
            <Route path="terms&Condition" element={<TermsAndCondition />} />
            <Route path="policy" element={<Policy />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
