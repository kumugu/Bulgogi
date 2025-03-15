// import { useState } from "react";
// import { useAuth } from "../auth/useAuth"
// import { useAuthStore } from "../../store/authStore";

// export const useTokenRenewal = () => {
//     const { setAuth } = useAuthStore();
//     const { refreshAccessToken } = useAuth();
//     const [isLoading, setIsLoading] = useState(false);
//     const [error, setError] = useState<String | null>(null);

//     const handleTokenRenew = async () => {
//         setIsLoading(true);
//         setError(null);

//         try {
//             const newAccessToken = await refreshAccessToken();

//             // 갱신된 accessToken 을 상태에 반영
//             setAuth({
//                 accessToken: newAccessToken,
//                 refreshToken: sessionStorage.getItem("refreshToken") ?? "", 
//                 username: sessionStorage.getItem("username") ?? ""
//             });
//             await refreshAccessToken();
            
//         } catch (error) {
//             console.error("토큰 갱신 실패", error);
//             setError("토큰 갱신에 실패했습니다.");
//         } finally {
//             setIsLoading(false);
//         }
//     };

//     return { isLoading, error, handleTokenRenew }
// }