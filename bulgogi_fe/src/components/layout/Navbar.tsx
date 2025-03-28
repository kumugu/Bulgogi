import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuthStore } from "@/store/user/authStore";
import { LogOut, User, Settings, ChevronDown } from "react-feather";
import ProfileImage from "../user/userSettings/ProfileImage";

const Navbar = () => {
  const { auth, logout } = useAuthStore();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const isAuthenticated = !!auth.accessToken;

  const handleLogout = () => {
    logout();
    setIsProfileOpen(false); // 드롭다운을 닫습니다.
  };

  const getInitials = (username: string | null) => {
    if (!username) return '';
    const nameParts = username.split(" ");
    return nameParts
      .map((part) => part[0].toUpperCase())
      .join("");
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md py-4 px-6">
      <div className="max-w-screen-xl mx-auto flex justify-between items-center">
        <Link to="/" className="flex-shrink-0">
          <span className="font-serif text-3xl font-bold tracking-tight text-neutral-900">Bulgogi</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          <Link
            to="/about"
            className="text-neutral-600 hover:text-neutral-900 text-sm font-medium transition-colors duration-200"
          >
            About
          </Link>
          <Link
            to="/blogHome"
            className="text-neutral-600 hover:text-neutral-900 text-sm font-medium transition-colors duration-200"
          >
            Blog
          </Link>
          <Link
            to="/write"
            className="text-neutral-600 hover:text-neutral-900 text-sm font-medium transition-colors duration-200"
          >
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
                {auth.profileImage ? (
                  <ProfileImage imageUrl={auth.profileImage} alt={auth.username || "User"} size={8} />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-neutral-900 text-white flex items-center justify-center text-sm font-medium">
                    {getInitials(auth.username)}
                  </div>
                )}
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
