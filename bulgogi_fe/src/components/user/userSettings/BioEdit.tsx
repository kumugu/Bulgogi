import { useState, useEffect } from "react";
import { useUserStore } from "@/store/user/userStore";
import { getMyInfoService, updateMyBioService } from "@/service/user/userService";

const BioEditForm = () => {
    const { userProfile, setUserProfile } = useUserStore(); // zustand에서 userProfile 가져오기
    const [bio, setBio] = useState(userProfile.bio || ""); // 상태 초기화
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [message, setMessage] = useState<string | null>(null);

    // 사용자 정보 조회 (초기 bio 설정)
    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                const userInfo = await getMyInfoService();
                setBio(userInfo.bio); // 가져온 bio로 초기 상태 설정
                setUserProfile({ bio: userInfo.bio }); // zustand에 저장
            } catch (err) {
                setError("사용자 정보를 가져오는 데 실패했습니다.");
            }
        };
        fetchUserInfo();
    }, [setUserProfile]);

    // 입력 값 변경 핸들러
    const handleBioChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setBio(event.target.value);
    };

    // 자기소개 수정 함수
    const handleUpdate = async () => {
        setLoading(true);
        setError(null);
        setMessage(null);
        try {
            const updatedProfile = await updateMyBioService({ bio }); // API 호출
            setMessage("자기소개가 성공적으로 업데이트되었습니다.");
            setBio(updatedProfile.bio); // 업데이트된 bio로 상태 변경
            setUserProfile({ bio: updatedProfile.bio }); // zustand에 업데이트된 bio 저장
        } catch (err: any) {
            setError(err.message || "자기소개 수정에 실패했습니다.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="mb-6">
            <h2 className="text-xl font-semibold mb-6 flex items-center dark:text-white">
                Bio
            </h2>
            <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                Bio
            </label>
            <textarea
                value={bio}
                onChange={handleBioChange} // 변경 핸들러 연결
                className="w-full rounded-lg border border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-800 px-4 py-2 text-neutral-900 dark:text-white focus:border-neutral-900 dark:focus:border-white focus:ring-neutral-900 dark:focus:ring-white min-h-[100px]"
                placeholder="Write a brief introduction about yourself..."
            />
            <button 
                onClick={handleUpdate} 
                className="w-full mt-4 px-4 py-2 bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 rounded-lg text-sm font-medium hover:bg-neutral-800 dark:hover:bg-neutral-100 transition-colors duration-200 disabled:opacity-50"
                disabled={loading}
            >
                {loading ? "Saving..." : "Save Bio"}
            </button>
            {message && <p className="text-green-600">{message}</p>}
            {error && <p className="text-red-600">{error}</p>}
        </div>
    );
};

export default BioEditForm;
