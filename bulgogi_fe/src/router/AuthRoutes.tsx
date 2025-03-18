import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "@/store/authStore";

// 로그인된 사용자가 접근하면 홈으로 리디렉션하는 컴포넌트
export const RedirectIfAuthenticated = () => {
    const { isAuthenticated } = useAuthStore();

    // 이미 로그인된 상태라면 홈으로 리디렉션
    if (isAuthenticated) {
        return <Navigate to="/" replace />;
    }

    // 로그인되지 않은 상태라면 자식 컴포넌트 랜더링
    return <Outlet />;
};

// 로그인이 필요한 페이지를 보호하는 컴포넌트
export const ProtectedRoute = () => {
    const { isAuthenticated } = useAuthStore();
    
    // 로그인되지 않은 상태라면 로그인 페이지로 리디렉션
    if (!isAuthenticated) {
      return <Navigate to="/login" replace />;
    }
    
    // 로그인된 상태라면 자식 컴포넌트 렌더링
    return <Outlet />;
  };