import { useTokenRemainingTime } from "@/hooks/user/auth/useTokenRemaininTime";
import { useLogout } from "@/hooks/user/auth/useLogout";
import { useManualTokenRefresh } from "@/hooks/user/auth/useTokenRefresh";

const Header = () => {
    const tokenRemainingTime = useTokenRemainingTime();
    const { logoutUser } = useLogout();
    const { refreshTokenManually } = useManualTokenRefresh(); // 수동 토큰 갱신 함수 가져오기

    let tokenStatusMessage = "토큰 정보 없음";

    if (tokenRemainingTime === null) {
        tokenStatusMessage = "토큰 정보 없음";
    } else if (tokenRemainingTime <= 0) {
        tokenStatusMessage = "토큰 만료";
    } else {
        tokenStatusMessage = `⏳ 토큰 갱신까지: ${tokenRemainingTime}초`;
    }

    return (
        <header className="p-4 bg-gray-900 text-white flex justify-between">
            <h1>My Blog</h1>
            <div className="flex items-center space-x-4">
                <span>{tokenStatusMessage}</span>
                
                {/* 토큰 수동 갱신 버튼 */}
                <button 
                    onClick={refreshTokenManually} 
                    className="bg-blue-500 px-3 py-1 rounded"
                >
                    토큰 갱신
                </button>

                <button 
                    onClick={logoutUser} 
                    className="bg-red-500 px-3 py-1 rounded"
                >
                    로그아웃
                </button>
            </div>
        </header>
    );
};

export default Header;
