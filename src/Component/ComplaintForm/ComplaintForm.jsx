import React, { useState } from "react";
import UserComplaintForm from "../UserComplaintForm/UserComplaintForm";
import DriverComplaintForm from "../DriverComplaintForm/DriverComplaintForm";
import './ComplaintForm.css'

const ComplaintForm = () => {
  const [isTrue, setIsTrue] = useState(true);

  const handleUser = () => {
    setIsTrue(true);
  };
  const handleDriver = () =>{
    setIsTrue(false);
  }

  const tabStylesForUser = {
    backgroundColor: isTrue ? '#1A2A84' : 'white',
    color: isTrue ? 'white' : '#1A2A84'
  };
  const tabStylesForDriver ={
    backgroundColor: isTrue ?  'white' :'#1A2A84'  ,
    color: isTrue ?  '#1A2A84' :'white' 
  }
  return (
    <div className="complaint-form-container">
      <section className="container-fluid">
        <div className="row">
          <div className="col-md-12">
            <div className="form-title margin_top_4 padding_left_20">
              <h3>
                Complaint <span>Details</span>
              </h3>
            </div>
          </div>
        </div>
      </section>

      <div className="complaint-form-tab">
        <button style={tabStylesForUser} onClick={handleUser}>User</button>
        <button style={tabStylesForDriver} onClick={handleDriver}>Driver</button>
      </div>

      <div className="">
        {isTrue ? <UserComplaintForm /> : <DriverComplaintForm />}
      </div>
    </div>
  );
};

export default ComplaintForm;
