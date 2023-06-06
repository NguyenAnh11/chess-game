import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useUser } from "../contexts/UserContext";

export default function PrivateRoute() {
  const location = useLocation();
  const { user } = useUser();

  return user ? (
    <Outlet />
  ) : (
    <Navigate to="/login" replace state={{ from: location }} />
  );
}
