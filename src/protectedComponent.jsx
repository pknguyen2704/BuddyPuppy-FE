import { Navigate } from "react-router-dom";

export function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token"); // hoặc lấy từ context/state
  if (!token) {
    return <Navigate to="/" replace />; // chưa login → chuyển về login
  }
  return children; // đã login → render component
}
