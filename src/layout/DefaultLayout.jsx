import React, { useState} from "react";
import  {AppSidebar } from "../Component/index";
import "./DefaultLayout.css";

const DefaultLayout = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleSidebar = () => {
    console.log("isopen", isOpen);
    setIsOpen(!isOpen);
  };


  return (
    <div className="index-page">
      <div id="home-container">
        <AppSidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />
      </div>
    </div>
  );
};

export default DefaultLayout;
