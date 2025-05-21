import React from 'react'
import { useNavigate, useLocation } from "react-router-dom";

// Inside App function


const AddButton = ({setActiveTab}) => {
  
  const navigate = useNavigate();
  const location = useLocation();

  if (location.pathname === "/new") return null;

  function takeAway() {
    setActiveTab(null)
    navigate("/new")
  }

  return (
    <div onClick={takeAway} className="w-[48px] h-[48px] bg-[#335CFF] rounded-full flex justify-center items-center fixed bottom-18 right-4 z-20">
          <img src="../src/assets/images/icon-plus.svg" alt="" />
        </div>
  )
}

export default AddButton