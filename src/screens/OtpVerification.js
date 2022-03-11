import { getDocs, where } from "firebase/firestore";
import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { query, collection } from "firebase/firestore";
import { db } from "../config/firebase";

const OtpVerification = () => {
  const [otp, setOtp] = new useState();
  const location = new useLocation();
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
    <div>
      <p>Enter The OTP</p>
      <input type="number" name="otp" id="" onChange={(e) => { setOtp(e.target.value) }} maxLength="6" value={otp} />
      <button onClick={onSubmitHandler}>Submit</button>
    </div>
  );
};

export default OtpVerification;