import { Navigate } from "react-router-dom";

const ProtectedUser = ({ children }) => {
  const token = localStorage.getItem("Token");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedUser;
