import { useState } from "react";
import { useUpdateMyBio } from "@/features/user/userSettings/useUpdateMyBio";

const BioEditForm = () => {
    const { updateMyBio, loading, error, message } = useUpdateMyBio();
    const [bio, setBio] = useState(""); // 상태 추가

    // 입력 값 변경 핸들러
    const handleBioChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setBio(event.target.value);
    };

    // 업데이트 함수
    const handleUpdate = () => {
        updateMyBio({ bio }); // API 요청
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
