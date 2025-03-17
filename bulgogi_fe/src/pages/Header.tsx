import { useAuth } from "@/features/auth/useAuth";
import { useTokenRemainingTime } from "@/features/auth/useTokenRemaininTime";

const Header = () => {
    const tokenRemainingTime = useTokenRemainingTime();
    const { handleLogout } = useAuth();

    let tokenStatusMessage = "토큰 정보 없음";  // 기본 메시지지

    // tokenRemainingTime이 null이 아니고 0초 이하인 경우 처리리
    if (tokenRemainingTime === null) {
        tokenStatusMessage = "토큰 정보 없음";
    } else if (tokenRemainingTime <= 0) {
        tokenStatusMessage = "토큰 만료";
    } else {
        tokenStatusMessage =`⏳ 토큰 갱신까지: ${tokenRemainingTime}초`;
    }

    return (
        <header className="p-4 bg-gray-900 text-white flex justify-between">
            <h1>My Blog</h1>
            <div className="flex items-center space-x-4">
                <span>{tokenStatusMessage}</span>
                <button onClick={handleLogout} className="bg-red-500 px-3 py-1 rounded">로그아웃</button>
            </div>
        </header>
    );
};

export default Header;
