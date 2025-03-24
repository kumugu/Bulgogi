import { useUpdateMyProfileImage } from "@/features/user/userSettings/useUpdateMyProfileImage";
import { useState } from "react";
import { FaUpload } from "react-icons/fa"; // 아이콘 사용

// 미리 제공된 프로필 이미지 목록
const profileImageOptions = [
    "/static/images/profile/pi1.png",
    "/static/images/profile/pi2.png",
    "/static/images/profile/pi3.png",
    "/static/images/profile/pi4.png",
    "/static/images/profile/pi5.png",
    "/static/images/profile/pi6.png",
    "/static/images/profile/pi7.png",
    "/static/images/profile/pi8.png",
    "/static/images/profile/pi9.png",
    "/static/images/profile/pi10.png",
];

const ProfileImageEditForm = () => {
    const { updateMyProfileImage, loading, error, message } = useUpdateMyProfileImage();
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    // 프로필 이미지 선택 처리
    const handleImageSelect = (image: string) => {
        setSelectedImage(image); // 선택된 이미지 업데이트
    };

    // 이미지 선택 후 업로드 처리
    const handleImageUpload = async (event: React.FormEvent) => {
        event.preventDefault();
        if (!selectedImage) return;

        const formData = new FormData();
        formData.append("profileImage", selectedImage); // 선택된 이미지 보내기
        updateMyProfileImage(formData);
    };

    return (
        <div className="mb-6">
            <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                Profile Image
            </label>

            {/* 이미지 목록 표시 */}
            <div className="flex space-x-4 mb-6">
                {profileImageOptions.map((image, index) => (
                    <div key={index} className="relative">
                        <img
                            src={image}
                            alt={`Profile ${index + 1}`}
                            className={`w-24 h-24 rounded-full cursor-pointer object-cover ${selectedImage === image ? "border-4 border-blue-500" : ""}`}
                            onClick={() => handleImageSelect(image)} // 이미지 클릭 시 선택
                        />
                    </div>
                ))}
            </div>

            {/* 선택된 이미지 미리보기 */}
            {selectedImage && (
                <div className="mb-6">
                    <h3 className="text-sm text-neutral-700 dark:text-neutral-300 mb-2">Selected Image</h3>
                    <img
                        src={selectedImage}
                        alt="Selected Profile"
                        className="w-32 h-32 rounded-full object-cover border-2 border-gray-300"
                    />
                </div>
            )}

            {/* 이미지 선택 후 업로드 */}
            <form onSubmit={handleImageUpload}>
                <button
                    type="submit"
                    className="w-full px-4 py-2 bg-neutral-900 text-white rounded-md"
                    disabled={loading || !selectedImage}
                >
                    {loading ? "Saving..." : "Save Profile Image"}
                </button>
            </form>

            {/* 메시지 */}
            {message && <p className="text-green-600">{message}</p>}
            {error && <p className="text-red-600">{error}</p>}
        </div>
    );
};

export default ProfileImageEditForm;