import { useAuth } from "@/features/auth/useAuth";
import { useTokenMonitor } from "@/hooks/auth/useTokenMonitor";

const Header = () => {
    const { tokenRemainingTime } = useTokenMonitor();
    const { handleLogout } = useAuth();

    return (
        <header className="p-4 bg-gray-900 text-white flex justify-between">
            <h1>My Blog</h1>
            <div className="flex items-center space-x-4">
                {tokenRemainingTime !== null && (
                    <span>⏳ 토큰 갱신까지: {tokenRemainingTime > 0 ? tokenRemainingTime + "초" : "갱신 중..."}</span>
                )}
                <button onClick={handleLogout} className="bg-red-500 px-3 py-1 rounded">로그아웃</button>
            </div>
        </header>
    );
};

export default Header;
