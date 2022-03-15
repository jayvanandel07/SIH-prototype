import React, { useState } from 'react';
import { auth } from '../config/firebase';
import { Link, useLocation, useNavigate } from "react-router-dom";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";

const Login = () => {
  // Inputs
  const [mynumber, setnumber] = useState("");
  const [otp, setotp] = useState('');
  const [show, setshow] = useState(false);
  const [final, setfinal] = useState('');
  const location = useLocation();
  const navigate = useNavigate();
  //Generate recaptcha
  const generateRecaptcha = () => {
    window.recaptchaVerifier = new RecaptchaVerifier('recaptcha-container', {
      'size': 'invisible',
      'callback': (response) => {
        // reCAPTCHA solved, allow signInWithPhoneNumber.
        // onSignInSubmit();
        console.log('reCAPTCHA solved, allow signInWithPhoneNumber.' + response);
      }
    }, auth);
  }


  // Sent OTP
  const signin = () => {

    if (mynumber === "" || mynumber.length < 10) return;
    generateRecaptcha();
    let appVerifier = window.recaptchaVerifier;
    signInWithPhoneNumber(auth, mynumber, appVerifier)
      .then(confirmationResult => {
        window.confirmationResult = confirmationResult;
        setshow(true);
        setfinal(window.confirmationResult);
      }).catch((error) => {
        console.log(error);
      })
  }


  // Validate OTP
  const ValidateOtp = () => {
    if (otp === null || final === null)
      return;
    let confirmationResult = window.confirmationResult;
    confirmationResult.confirm(otp).then((result) => {
      // success
      console.log('success');
      navigate('/otpRegistration', { state: { data: location.state.data, secretKey: location.state.secretKey } })
    }).catch((err) => {
      alert("Wrong code");
    })
  }

  return (
    <div style={{ "marginTop": "200px" }}>
      <center>
        <div style={{ display: !show ? "block" : "none" }}>
          <input type="tel" className="shadow appearance-none border rounded  py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={mynumber} onChange={(e) => {
              setnumber(e.target.value)
            }}
            placeholder="phone number" />
          <br /><br />
          <div id="recaptcha-container"></div>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" onClick={signin}>Send OTP</button>
        </div>
        <div style={{ display: show ? "block" : "none" }}>
          <input type="text" className="shadow appearance-none border rounded  py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder={"Enter your OTP"}
            onChange={(e) => { setotp(e.target.value) }}></input>
          <br /><br />
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" onClick={ValidateOtp}>Verify</button>
        </div>
      </center>
    </div>
  );
}


export default Login;
