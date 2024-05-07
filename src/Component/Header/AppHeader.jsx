import React from "react";
import Images from "../Images";
import "./AppHeader.css";

const AppHeader = ({ toggleSidebar }) => {

  return (
  
      <div className="header-container">
        <div onClick={() => toggleSidebar()} className="humberger">
          <i className="fa-solid fa-bars"></i>
        </div>
        <div className="">
          <img src={Images("admin_profile")} alt="hello" />
        </div>
      </div>

  );
};

export default AppHeader;
