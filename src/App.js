import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import RequireAuth from "./components/Auth/RequireAuth";
import { useAuthContext } from "./context/Auth/AuthContext";
import Home from "./screens/Home";
import Layout from "./screens/Layout";
import Login from "./screens/Login";
import Register from "./screens/Register";
import OtpRegistration from "./screens/OtpRegistration";
import OtpVerification from "./screens/OtpVerification";
import SmsLogin from "./screens/SmsLogin";


function App() {
  // const user = useAuthContext();
  // const [user] = useAuthState(auth);

  return (

    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/smsLogin" element={<SmsLogin />} />
          <Route element={<RequireAuth />}>
            <Route path="/" element={<Home />} />
            <Route path="/otpRegistration" element={<OtpRegistration />} />
            <Route path="/otpVerification" element={<OtpVerification />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
