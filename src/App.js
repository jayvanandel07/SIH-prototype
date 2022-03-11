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

function App() {
  const user = useAuthContext();

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Register />} />
          <Route index path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route element={<RequireAuth />}>
            <Route path="/otpRegistration" element={<OtpRegistration />} />
            <Route path="/otpVerification" element={<OtpVerification />} />
          </Route>

        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
