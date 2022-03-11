import React from "react";
import { AuthContextProvider } from "./Auth/AuthContext";

export const ContextProvider = ({ children }) => {
  return <AuthContextProvider>{children}</AuthContextProvider>;
};
