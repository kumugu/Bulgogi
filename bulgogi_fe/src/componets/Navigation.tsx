import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "@/store/authStore";
import { ChevronDown, LogOut, User, Settings, X, Menu } from "react-feather"; 
import { tokenUtils } from "@/utils/tokenUtils";
import { JwtPayload } from "jwt-decode";

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const navigate = useNavigate();
  const profileRef = useRef<HTMLDivElement>(null);

  const { auth, logout, isAuthenticated } = useAuthStore();
  const username = auth.username;
  const accessToken = tokenUtils.getToken();
  const decoded = accessToken ? tokenUtils.setToken(accessToken) : null;

  const handleLogout = async () => {
    try {
      logout();
      navigate("/");  // 로그아웃 후 홈으로 리다이렉트
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const getInitials = (name: string) => {
    const nameArray = name.split(" ");
    const initials = nameArray[0][0] + (nameArray[1] ? nameArray[1][0] : "");
    return initials.toUpperCase();
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-neutral-200 bg-white py-4">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div className="flex items-center w-[120px]">
            <Link to="/" className="flex-shrink-0">
              <span className="font-serif text-3xl font-bold tracking-tight text-neutral-900">Bulgogi</span>
            </Link>
          </div>

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

            {isAuthenticated ? (
              <div className="relative" ref={profileRef}>
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center space-x-2 text-neutral-600 hover:text-neutral-900 focus:outline-none"
                >
                  <div className="w-8 h-8 rounded-full bg-neutral-900 text-white flex items-center justify-center text-sm font-medium">
                    {username ? username[0].toUpperCase() : "?"}
                  </div>
                  <span className="text-sm font-medium">{username}</span>
                  <ChevronDown className="h-4 w-4" />
                </button>

                {/* Profile Dropdown Menu */}
                {isProfileOpen && (
                  <div className="absolute right-0 mt-2 w-48 rounded-lg bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="px-4 py-2 border-b border-neutral-100">
                      <p className="text-sm font-medium text-neutral-900">{username}</p>
                    </div>
                    <Link
                      to={decoded?.username ? `/my-blog-home/${decoded.username}` : "#"}
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
                      onClick={() => {
                        handleLogout();
                        setIsProfileOpen(false);
                      }}
                      className="flex w-full items-center px-4 py-2 text-sm text-red-600 hover:bg-neutral-50"
                    >
                      <LogOut className="mr-3 h-4 w-4" />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to="/login"
                className="inline-flex items-center justify-center px-4 py-2 border border-neutral-900 text-sm font-medium rounded-full text-neutral-900 bg-white hover:bg-neutral-50 transition-colors duration-200"
              >
                Login
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-neutral-600 hover:text-neutral-900 focus:outline-none"
            >
              <span className="sr-only">Open menu</span>
              {isMenuOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t border-neutral-200 mt-2">
            <Link
              to="/about"
              className="block px-3 py-2 text-base font-medium text-neutral-600 hover:text-neutral-900"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
            <Link
              to="/blogHome"
              className="block px-3 py-2 text-base font-medium text-neutral-600 hover:text-neutral-900"
              onClick={() => setIsMenuOpen(false)}
            >
              Blog
            </Link>
            <Link
              to="/write"
              className="block px-3 py-2 text-base font-medium text-neutral-600 hover:text-neutral-900"
              onClick={() => setIsMenuOpen(false)}
            >
              Write
            </Link>

            {username ? (
              <>
                <Link
                  to={`/myblog`}
                  className="block px-3 py-2 text-base font-medium text-neutral-600 hover:text-neutral-900"
                  onClick={() => setIsMenuOpen(false)}
                >
                  My Blog
                </Link>
                <Link
                  to="/settings"
                  className="block px-3 py-2 text-base font-medium text-neutral-600 hover:text-neutral-900"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Settings
                </Link>
                <button
                  onClick={() => {
                    handleLogout();
                    setIsMenuOpen(false);
                  }}
                  className="block w-full text-left px-3 py-2 text-base font-medium text-red-600 hover:text-red-700"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="block px-3 py-2 text-base font-medium text-neutral-900 hover:text-neutral-700"
                onClick={() => setIsMenuOpen(false)}
              >
                Login
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
