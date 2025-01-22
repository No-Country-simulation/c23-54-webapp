import React, { createContext, useContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const [Token, SetToken] = useState()
    
  const login = (token) => {
    localStorage.setItem("Token", token); 
    SetToken(token)
  };

  const logout = () => {
    localStorage.removeItem("Token"); 
    localStorage.removeItem("FirstLogin");
    SetToken(null)

  };

  return (
    <AuthContext.Provider value={{ login, logout, Token }}>
      {children}
    </AuthContext.Provider>
  );
};
