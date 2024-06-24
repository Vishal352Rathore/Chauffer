import React from "react";
import { Routes, Route} from "react-router-dom";
import Dashboard from "../Component/Dashboard/Dashboard";
import AllRides from "../Component/AllRides/AllRides";
import AllDriver from "../Component/AllDriver/AllDriver";
import AddDriver from "../Component/AddDriver/AddDriver";
import AddVehicle from "../Component/AddVehicle/AddVehicle";
import AddAgent from "../Component/AddAgent/AddAgent";
import Earnings from "../Component/Earnings/Earnings";
import Complaints from "../Component/Complaints/Complaints";
import TermsAndCondition from "../Component/TermsAndCondition/TermsAndCondition";
import Policy from "../Component/Policy/Policy";
import RideDetails from "../Component/RideDetails/RideDetails";
import ComplaintForm from "../Component/ComplaintForm/ComplaintForm";
import AllVehicle from "../Component/AllVehicle/AllVehicle";
import { Logout } from "../Component/Login/Logout";

const AppRoute = () => {
 
  return (
    <div>
            {/* <Routes>
               
                 <Route path='/dashboard' element={<Dashboard/>} />
                <Route path='/allRides' element={<AllRides/>} />
                <Route path='/rideDetails' element={<RideDetails/>} />
                <Route path='/allDriver' element={<AllDriver/>} />
                <Route path='/addDriver' element={<AddDriver/>} />
                <Route path='/allVehicle' element={<AllVehicle/>} />
                <Route path='/addVehicle' element={<AddVehicle/>} />
                <Route path='/addAgent' element={<AddAgent/>} />
                <Route path='/earnings' element={<Earnings/>} />
                <Route path='/complaints' element={<Complaints/>} />
                <Route path='/complaintForm' element={<ComplaintForm/>} />
                <Route path='/terms&Condition' element={<TermsAndCondition/>} />
                <Route path='/policy' element={<Policy/>} /> 
               

            </Routes> */}
    </div>
  );
};

export default AppRoute;
