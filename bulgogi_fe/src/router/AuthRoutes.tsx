import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "@/store/user/authStore";

// 로그인된 사용자가 접근하면 홈으로 리디렉션하는 컴포넌트
export const RedirectIfAuthenticated = () => {
    const { auth } = useAuthStore();
    const isAuthenticated = !!auth.accessToken;

    // 이미 로그인된 상태라면 홈으로 리디렉션
    return isAuthenticated ? <Navigate to="/" replace /> : <Outlet />;
};

// 로그인이 필요한 페이지를 보호하는 컴포넌트
export const ProtectedRoute = () => {
    const { auth } = useAuthStore();
    const isAuthenticated = !!auth.accessToken;
    
    // 로그인되지 않은 상태라면 로그인 페이지로 리디렉션, 로그인된 상태라면 자식 컴포넌트 렌더링
    return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
  };