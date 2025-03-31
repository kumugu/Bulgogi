import { getMyInfoService } from "@/service/user/userService";
import { MyProfile } from "@/types/user/userTypes";
import { useEffect, useState } from "react";

export const useMyInfo = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [message, setMessage] = useState<string | null>(null);
    const [myInfo, setMyInfo] = useState<MyProfile | null>(null);

    const getMyInfo = async () => {
        setLoading(true);
        setError(null);
        setMessage(null);

        try {
            const myProfile = await getMyInfoService();
            setMyInfo(myProfile);
            setMessage("사용자 정보를 성공적으로 가져왔습니다.");
        } catch (error: any) {
            const errorMessage = error instanceof Error ? error.message : "알 수 없는 오류 발생";
            setError(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getMyInfo();
    }, []);

    return { getMyInfo, loading, error, message, myInfo };
};