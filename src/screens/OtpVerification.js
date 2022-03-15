import { getDocs, where } from "firebase/firestore";
import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { query, collection } from "firebase/firestore";
import { db } from "../config/firebase";

const OtpVerification = () => {
  const [otp, setOtp] = new useState();
  const location = new useLocation();
  const navigate = useNavigate();
  const docs = [];
  const { uid } = location.state;

  const fetchData = async () => {
    const queryRef = await query(
      collection(db, "users"),
      where("uid", "==", uid)
    );
    const querySnapshot = await getDocs(queryRef);
    querySnapshot.forEach(doc => {
      docs.push(doc.data());
    });
    const SecretKey = docs[0].secretKey;
    console.log(SecretKey);
    fetch('/Otp-Verification', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ secretKey: SecretKey, otp: otp })
    }).then(res => res.json()).then(res => {
      console.log(res);
      if (res.verified === true) {
        console.log("Verified");
        alert("Verified");
        navigate("/");
      } else {
        alert("Incorrect otp");
      }
    })

  }


  const onSubmitHandler = () => {
    console.log(otp);
    console.log(uid);


    fetchData();


  }

  return (
    <div className="w-screen flex justify-center items-center mt-5 ">
      <div className="w-full  max-w-xs">
        <h1 className="block text-black-700 text-sm font-bold mb-2 mt-5 text-center ">OTP Verification</h1>
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" for="username">
              Enter OTP
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="number" name="otp" id="" onChange={(e) => { setOtp(e.target.value) }} maxLength="6" value={otp} />
          </div>
          <button className="bg-blue-500  hover:bg-blue-700 text-white  py-2 px-4 rounded focus:outline-none focus:shadow-outline" onClick={onSubmitHandler}>Submit</button>
        </div>
      </div>
    </div>
  );
};

export default OtpVerification;