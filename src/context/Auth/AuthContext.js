import React, { createContext, useContext, useReducer } from "react";
import { authReducer, initialState as authInitialState } from "./reducers";

const AuthContext = createContext();
const AuthDispatchContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, dispatch] = useReducer(authReducer, authInitialState);
  return (
    <AuthContext.Provider value={user}>
      <AuthDispatchContext.Provider value={dispatch}>
        {children}
      </AuthDispatchContext.Provider>
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuthContext must be used within a AuthContextProvider");
  }
  return context;
};

export const useAuthDispatchContext = () => {
  const context = useContext(AuthDispatchContext);
  if (context === undefined) {
    throw new Error(
      "useAuthDispatchContext must be used within a AuthContextProvider"
    );
  }
  return context;
};
