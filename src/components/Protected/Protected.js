import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import Loading from "../../sharied/Loading/Loading";

function Protected({ children }) {
  const location = useLocation();
  const { user, isLoading } = useSelector((state) => state.auth);
  if (isLoading) {
    return <Loading></Loading>;
  }

  //   const token = localStorage.getItem("auth");
  //   console.log("token", user?.token);

  if (!user?.token) {
    return <Navigate to="/login" state={{ from: location }} />;
  }
  return children;
}
export default Protected;
