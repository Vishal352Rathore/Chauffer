import React, { useState } from "react";
import  {AppSidebar } from "../Component/index";
import "./DefaultLayout.css";

const DefaultLayout = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleSidebar = () => {
    console.log("isopen", isOpen);
    setIsOpen(!isOpen);
  };

  return (
    <div>
        <AppSidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />
    </div>
  );
};

export default DefaultLayout;

// element.style {
//   position: absloute;
//   right: -15px;
//   z-index: 999999;
// }
