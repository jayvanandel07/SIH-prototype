import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { googleLogin, registerUser } from "../context/Auth/actions";
import { useAuthDispatchContext } from "../context/Auth/AuthContext";
import { addDoc, collection } from "firebase/firestore"
import { db } from "../config/firebase";
const Register = () => {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const dispatch = useAuthDispatchContext();
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state ? location.state.from : { pathname: "/" };

  const googleLoginHandler = (e) => {
    e.preventDefault();
    googleLogin(dispatch)
      .then((user) => {
        fetch('/Otp-Registration').then(res => res.json()).then(async (res) => {
          console.log(res.secretKey);
          console.log(user.uid)
          await addDoc(collection(db, 'users'), {
            secretKey: res.secretKey,
            uid: user.uid
          })
          navigate('/smsLogin', { state: { data: res.data, secretKey: res.secretKey } });
        })
        
      })
      .catch((error) => {
        alert(error);
      });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    registerUser(dispatch, { name, email, password })
      .then((user) => {
        fetch('/Otp-Registration').then(res => res.json()).then(async (res) => {
          console.log(res.secretKey);
          console.log(user.uid)
          await addDoc(collection(db, 'users'), {
            secretKey: res.secretKey,
            uid: user.uid
          })
          navigate('/smsLogin')
            .then(navigate('/otpRegistration', { state: { data: res.data, secretKey: res.secretKey } })
              .then(navigate("/")));
        })
      })
      .catch((error) => {
        alert(error);
      });
  };
  return (
    <div className="w-screen flex justify-center items-center mt-5 ">
      <div className=" w-full  max-w-xs  ">
        <h1 className="block text-black-700 text-sm font-bold mb-2 mt-5 text-center " >Registration</h1>
        <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={submitHandler}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" for="username">
              Username
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              placeholder="Name"
              onChange={(e) => {
                setName(e.target.value);
              }}
              value={name}
            ></input>
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" for="password">
              Email
            </label>
            <input
              className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              type="email"
              placeholder="Email"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              value={email}
            ></input>
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" for="password">
              Password
            </label>
            <input
              className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              type="password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              placeholder="Password"
              value={password}
            ></input>
          </div>
          <div className="flex items-center justify-between">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">Submit</button>

          </div>

        </form>
        <div className="flex items-center justify-between gap-x-5 m-2">
          <button className="bg-blue-500  hover:bg-blue-700 text-white  py-2 px-4 rounded focus:outline-none focus:shadow-outline" onClick={googleLoginHandler}>
            Sign in with Google
          </button>
          <Link className="text-blue hover:text-blue-700" to="/login">Already have a account</Link>
        </div>
      </div>
    </div>



  );
};

export default Register;
