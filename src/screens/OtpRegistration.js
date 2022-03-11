import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";


const OtpRegistration = () => {
  const location = useLocation()
  console.log(location.state.data)
  return (
    <div>
      <p>Authenticator registration page</p>
      <img src={location.state.data} alt="qrcode" />
      <p>{location.state.secretKey}</p>
    </div>
  );
};

export default OtpRegistration;
