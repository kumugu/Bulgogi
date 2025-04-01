import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useAuthStore } from "@/store/user/authStore";
import { LogOut, User, Settings, ChevronDown } from "react-feather";
import ProfileImage from "../user/userSettings/ProfileImageRead";
import { DEFAULT_PROFILE_IMAGE } from "@/utils/constants/constants";

const Navbar = () => {
  const { auth, logout } = useAuthStore();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const isAuthenticated = !!auth.accessToken;
  const dropdownRef = useRef<HTMLDivElement>(null); // 드롭다운을 감지할 ref

  useEffect(() => {
    // 드롭다운 바깥 클릭 시 닫기
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    logout();
    setIsProfileOpen(false);
  };

  return (
    <>
      {/* Fixed height placeholder */}
      <div className="h-16 w-full flex-shrink-0"></div>
      
      {/* Fixed navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md h-16 flex items-center">
        <div className="max-w-screen-xl mx-auto flex justify-between items-center h-full px-6 w-full">
          {/* Logo */}
          <Link to="/" className="flex-shrink-0">
            <span className="font-serif text-3xl font-bold tracking-tight text-neutral-900">Bulgogi</span>
          </Link>

          {/* Navigation links */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/about" className="text-neutral-600 hover:text-neutral-900 text-sm font-medium">About</Link>
            <Link to="/blog-home" className="text-neutral-600 hover:text-neutral-900 text-sm font-medium">Blog</Link>
            <Link to="/write" className="text-neutral-600 hover:text-neutral-900 text-sm font-medium">Write</Link>

            {/* Conditional navigation */}
            {isAuthenticated ? (
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center space-x-2 text-neutral-600 hover:text-neutral-900"
                >
                  <ProfileImage imageUrl={auth.profileImage || DEFAULT_PROFILE_IMAGE} size={40} />
                  <span className="text-sm font-medium">{auth.username}</span>
                  <ChevronDown className="h-4 w-4" />
                </button>

                {/* Dropdown menu */}
                {isProfileOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 rounded-lg">
                    <div className="px-4 py-2 border-b border-neutral-100">
                      <p className="text-sm font-medium">{auth.username}</p>
                    </div>
                    <Link to={`/my-blog-home/${auth.username}`} className="flex items-center px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-50">
                      <User className="mr-3 h-4 w-4" />
                      My Blog
                    </Link>
                    <Link to={"/my-blog-home-dev"} className="flex items-center px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-50">
                      <User className="mr-3 h-4 w-4" />
                      My Blog(Dev)
                    </Link>
                    <Link to="/user-settings" className="flex items-center px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-50">
                      <Settings className="mr-3 h-4 w-4" />
                      Settings
                    </Link>
                    <button onClick={handleLogout} className="flex w-full items-center px-4 py-2 text-sm text-red-600 hover:bg-neutral-50">
                      <LogOut className="mr-3 h-4 w-4" />
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link to="/login" className="px-4 py-2 border border-neutral-900 text-white bg-black text-sm font-medium rounded-full">
                Get Started
              </Link>
            )}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
