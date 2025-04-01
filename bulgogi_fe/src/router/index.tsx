import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/user/LoginPage";
import Header from "../components/user/auth/TokenMonitor";
import Register from "../pages/user/RegisterPage";
import AdminPage from "@/pages/user/AdminPage";
import MyBlogHome from "../pages/MyBlogHome";
import UserSettings from "@/pages/user/UserSettings";
import TestPage from "@/pages/TestPage";
import Navbar from "@/components/layout/Navbar";
import { RedirectIfAuthenticated } from "./AuthRoutes";
import { ProtectedRoute } from "./AuthRoutes";

const Router = () => {
    return (
    <BrowserRouter>
        <Navbar />

        <div>
            <Routes>
                {/* 로그인된 사용자는 접근 불가 (리디렉션) */}
                <Route element={<RedirectIfAuthenticated />}>
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                </Route>

                {/* 일반 접근 가능 라우트 */}
                <Route path="/" element={<Home />} />
                <Route path="/header" element={<Header />} />
                <Route path="/my-blog-home/:username" element={ <MyBlogHome />} />
                <Route path="/test-page" element={ <TestPage />} />
                
                {/* 로그인이 필요한 라우트 */}
                <Route element={<ProtectedRoute />}>
                    <Route path="/user-settings" element={<UserSettings />} />
                    <Route path="/admin" element={<AdminPage />} />
                </Route>
            </Routes>
        </div>
    </BrowserRouter>
    );
};

export default Router;