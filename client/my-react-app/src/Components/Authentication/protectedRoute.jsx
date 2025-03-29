import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../../Context/authContext";

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  const location = useLocation();


   return user ? children : <Navigate to="/" />;
};

export default ProtectedRoute;
