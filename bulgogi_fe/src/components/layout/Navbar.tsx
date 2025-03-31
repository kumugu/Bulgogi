import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuthStore } from "@/store/user/authStore";
import { LogOut, User, Settings, ChevronDown } from "react-feather";
import ProfileImage from "../user/userSettings/ProfileImageRead";
import { DEFAULT_PROFILE_IMAGE } from "@/utils/constants/constants";

const Navbar = () => {
  const { auth, logout } = useAuthStore(); // 인증 상태와 로그아웃 함수
  const [isProfileOpen, setIsProfileOpen] = useState(false); // 프로필 드롭다운 메뉴 상태
  const isAuthenticated = !!auth.accessToken; // 로그인 여부 확인

  const handleLogout = () => {
    logout(); // 로그아웃 처리
    setIsProfileOpen(false); // 드롭다운 메뉴 닫기
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md py-4 px-6">
      <div className="max-w-screen-xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex-shrink-0">
          <span className="font-serif text-3xl font-bold tracking-tight text-neutral-900">Bulgogi</span>
        </Link>

        {/* 네비게이션 링크 */}
        <div className="hidden md:flex items-center space-x-8">
          <Link to="/about" className="text-neutral-600 hover:text-neutral-900 text-sm font-medium transition-colors duration-200">
            About
          </Link>
          <Link to="/blogHome" className="text-neutral-600 hover:text-neutral-900 text-sm font-medium transition-colors duration-200">
            Blog
          </Link>
          <Link to="/write" className="text-neutral-600 hover:text-neutral-900 text-sm font-medium transition-colors duration-200">
            Write
          </Link>

          {/* 로그인 여부에 따른 네비게이션 */}
          {isAuthenticated ? (
            <div className="relative">
              <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center space-x-2 text-neutral-600 hover:text-neutral-900 focus:outline-none"
              >
                {/* 프로필 이미지 표시 */}
                <ProfileImage imageUrl={auth.profileImage || DEFAULT_PROFILE_IMAGE} />

                <span className="text-sm font-medium">{auth.username}</span>
                <ChevronDown className="h-4 w-4" />
              </button>

              {/* 드롭다운 메뉴 */}
              {isProfileOpen && (
                <div className="absolute right-0 mt-2 w-48 rounded-lg bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <div className="px-4 py-2 border-b border-neutral-100">
                    <p className="text-sm font-medium text-neutral-900">{auth.username}</p>
                  </div>
                  <Link
                    to={`/my-blog-home/${auth.username}`}
                    className="flex items-center px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-50"
                    onClick={() => setIsProfileOpen(false)}
                  >
                    <User className="mr-3 h-4 w-4" />
                    My Blog
                  </Link>
                  <Link
                    to="/user-settings"
                    className="flex items-center px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-50"
                    onClick={() => setIsProfileOpen(false)}
                  >
                    <Settings className="mr-3 h-4 w-4" />
                    Settings
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="flex w-full items-center px-4 py-2 text-sm text-red-600 hover:bg-neutral-50"
                  >
                    <LogOut className="mr-3 h-4 w-4" />
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link
              to="/login"
              className="inline-flex items-center justify-center px-4 py-2 border border-neutral-900 text-white bg-black text-sm font-medium rounded-full hover:text-black hover:bg-white transition-colors duration-200"
            >
              Get Started
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;