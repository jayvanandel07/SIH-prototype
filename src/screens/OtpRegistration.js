import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";


const OtpRegistration = () => {
  const location = useLocation();
  const navigate = useNavigate();
  console.log(location.state.data)
  const onClickHandler = () => {
    navigate('/')
  }

  return (
    <div>
      <h1 className="block text-black-700 text-sm font-bold mb-2 mt-2 text-center ">Scan the qrcode on your Authenticator app</h1>
      <div className="min-h-screen flex items-center justify-center space-x-5">
        <div className="w-1/3 w-max rounded-lg shadow-xl bg-white">
          <div className="p-3">
            <img className="rounded-md  w-full " src={location.state.data} alt="qrcode" />
          </div>
          <div className="px-5">
            <p className="text-gray-500 center pb-5 text-center text-sm">{location.state.secretKey}</p>
          </div>
        </div>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold  px-2 rounded-full" onClick={onClickHandler}>continue</button>
      </div>
    </div>
  );
};

export default OtpRegistration;
