import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Header from "../pages/Header";
import MyInfo from "../pages/MyInfo";
import Register from "../pages/Register";
import PostDetail from "../pages/PostDetail";
import MyBlogHome from "../pages/MyBlogHome";
import Navigation from "@/componets/Navigation";

const Router = () => {
    return (
    <BrowserRouter>
    <Navigation />
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/header" element={<Header />} />
            <Route path="/user/my-info/:username" element={<MyInfo />} />
            <Route path="/my-blog-home/:username" element={ <MyBlogHome />} />
            <Route path="/post/:id" element={<PostDetail />} />
        </Routes>
    </BrowserRouter>
    );
};

export default Router;