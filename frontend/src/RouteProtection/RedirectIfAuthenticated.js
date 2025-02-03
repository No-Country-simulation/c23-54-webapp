import { Navigate } from "react-router-dom";

const RedirectIfAuthenticated = ({ children }) => {
  const token = localStorage.getItem("Token");

  if (token) {
    return <Navigate to="/Home" replace />;
  }

  return children;
};

export default RedirectIfAuthenticated;
