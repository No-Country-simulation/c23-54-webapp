import React, { createContext, useContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  
  const [Token, SetToken] = useState()
  const [Name, SetName] = useState()
  const [idUser, SetIdUser] = useState()
  const login = (token) => {
    localStorage.setItem("Token", token); 
    SetToken(token)
  };
  

  const logout = () => {
    localStorage.removeItem("Token"); 
    localStorage.removeItem("FirstLogin");
    SetToken(null)
    window.location.href = '/'
  };

  return (
    <AuthContext.Provider value={{ login, logout, Token, SetName, Name, idUser, SetIdUser}}>
      {children}
    </AuthContext.Provider>
  );
};
