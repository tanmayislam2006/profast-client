import { Navigate, useLocation } from "react-router";
import useProfastAuth from "../Hook/useProfastAuth";

const PrivateRouter = ({ children }) => {
  const { firebaseUser, loading } = useProfastAuth();
  const location = useLocation();
  if (loading) {
    return <p className="text-center">Data is loading</p>;
  }
  if (!firebaseUser) {
    return <Navigate to={"/login"} state={location.pathname} />;
  }
  return children;
};

export default PrivateRouter;
