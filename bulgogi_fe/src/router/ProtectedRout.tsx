// import { ReactNode } from "react";
// import { Navigate, useParams } from "react-router-dom";
// import { useAuthStore } from "../store/authStore";

// const ProtectedRoute = ({ children }: { children: ReactNode }) => {
//   const { accessToken, username: storedUsername } = useAuthStore();
//   const { username } = useParams(); // URL에서 username 가져오기

//   if (!accessToken) return <Navigate to="/login" />;
//   if (username && username !== storedUsername) return <Navigate to={`/my-blog-home/${storedUsername}`} />; 

//   return children;
// };

// export default ProtectedRoute;
