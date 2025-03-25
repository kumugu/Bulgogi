import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/user/LoginPage";
import Header from "../pages/Header";
import Register from "../pages/user/RegisterPage";
import PostDetail from "../pages/PostDetail";
import MyBlogHome from "../pages/MyBlogHome";
import Navbar from "@/components/layout/Navbar";
import { RedirectIfAuthenticated } from "./AuthRoutes";
import { ProtectedRoute } from "./AuthRoutes";

const Router = () => {
    return (
    <BrowserRouter>
        <Navbar />

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
                </Route>
            </Routes>
        </div>
    </BrowserRouter>
    );
};

export default Router;