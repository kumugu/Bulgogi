import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Header from "../pages/Header";
import MyInfo from "../pages/MyInfo";
import Register from "../pages/Register";
import PostDetail from "../pages/PostDetail";
import MyBlogHome from "../pages/MyBlogHome";
import Navigation from "@/componets/Navigation";
import { useAuthStore } from "@/store/authStore";
import { Navigate, Outlet } from "react-router-dom";

// 로그인된 사용자가 접근하면 홈으로 리디렉션하는 컴포넌트
const RedirectIfAuthenticated = () => {
    const { isAuthenticated } = useAuthStore();

    return isAuthenticated ? <Navigate to="/" replace /> : <Outlet />;
};

// 로그인이 필요한 페이지를 보호하는 컴포넌트
const ProtectedRoute = () => {
    const { isAuthenticated } = useAuthStore();

    return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};


const Router = () => {
    return (
    <BrowserRouter>
    <Navigation />
        <div className="pt-16">
            <Routes>
                {/* 로그인된 사용자는 접근 불가 (리디렉션) */}
                <Route element={<RedirectIfAuthenticated />}>
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                </Route>

                {/* 일반 접근 가능 라우트 */}
                <Route path="/" element={<Home />} />
                <Route path="/post/:id" element={<PostDetail />} />
                <Route path="/header" element={<Header />} />
                <Route path="/my-blog-home/:username" element={ <MyBlogHome />} />
                
                {/* 로그인이 필요한 라우트 */}
                <Route element={<ProtectedRoute />}>
                    <Route path="/user/my-info/:username" element={<MyInfo />} />
                </Route>
            </Routes>
        </div>
    </BrowserRouter>
    );
};

export default Router;