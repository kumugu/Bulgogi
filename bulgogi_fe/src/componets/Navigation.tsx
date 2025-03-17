import { Link  } from "react-router-dom";
import { useAuthStore } from "@/store/authStore";

export default function Navigation() {
    const { isAuthenticated, auth, logout } = useAuthStore();

    return (
        <nav className="flex justify-between p-4 border-b">
            <Link to="/" className="text-lg front-bold">My Blog</Link>
            <div className="space-x-4">
                {isAuthenticated ? (
                    <>
                        <Link to="/my-blog-home/:username">My Blog</Link>
                        <Link to="/user/my-info/:username">Profile ({auth.username})</Link>
                        <button onClick={logout} className="text-red-500">Logout</button>
                    </>
                ) : (
                    <>
                        <Link to="/login">Login</Link>
                        <Link to="/register">Register</Link>
                    </>
                )}
            </div>
        </nav>
    );
}