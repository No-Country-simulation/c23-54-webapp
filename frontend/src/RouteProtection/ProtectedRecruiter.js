import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";

const ProtectedRecruiter = ({ children }) => {
  const { Role } = useContext(AuthContext);

  if (Role != 2) {
    return <Navigate to="/Home" replace />;
  }

  return children;
};

export default ProtectedRecruiter;
