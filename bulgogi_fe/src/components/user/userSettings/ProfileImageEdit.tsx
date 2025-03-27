import { useUpdateMyProfileImage } from "@/features/user/userSettings/useUpdateMyProfileImage";
import React, { useState } from "react";
import ProfileImageList from "./ProfileImageList";


const ProfileImageEditForm = () => {
    const { updateMyProfileImage, loading, error, message } = useUpdateMyProfileImage();
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false); 

    // 프로필 이미지 선택
    const handleImageSelect = (image: string, file: File | null) => {
        setSelectedImage(image);    // 미리보기용 URL
        setSelectedFile(file)       // 실제 업로드할 파일
        setIsModalOpen(false);      // 선택 후 모달 닫기
    };

    // 프로필 이미지 저장
    const handleImageUpload = async (event: React.FormEvent) => {
        event.preventDefault();
        
        if (!selectedFile) {
            console.error("파일이 선택되지 않았습니다!");
            return;
        }

        const formData = new FormData();
        formData.append("profileImage", selectedFile);

        updateMyProfileImage(formData);
    };

    // 파일 선택 처리
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0] || null;
        setSelectedFile(file);
    };

    return (
        <div className="mb-6">
            <h2 className="text-xl font-semibold mb-6 flex items-center dark:text-white">
                Profile Image
            </h2>

            {/* 기존 프로필 이미지 (처음부터 표시) */}
            <div className="mb-4 flex flex-col items-center">
                <h3 className="text-sm text-neutral-700 dark:text-neutral-300 mb-2">Current Profile Image</h3>
                <img
                    src={selectedImage || "/static/images/profile/pi1.png"} // 경로 체크해봐야함함
                    alt="Profile"
                    className="w-32 h-32 rounded-full object-cover border-2 border-gray-300"
                />
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="mt-3 px-4 py-2 bg-black text-white rounded-md" 
                >
                    Change Profile Image
                </button>

                {/* 파일 선택 input */}
                <input
                    type="file"
                    onChange={handleFileChange}
                    className="mt-4"
                />
            </div>

            {/* 프로필 이미지 저장 버튼 */}
            <form onSubmit={handleImageUpload}>
                <button
                    type="submit"
                    className="w-full px-4 py-2 bg-neutral-900 text-white rounded-md"
                    disabled={loading || !selectedImage}
                >
                    {loading ? "Saving..." : "Save Profile Image"}
                </button>
            </form>

            {/* 모달 (이미지 선택) */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-[90%] max-w-md">
                        <h3 className="text-lg font-semibold mb-4">Select a Profile Image</h3>
                        <ProfileImageList onSelect={handleImageSelect} selectedImage={selectedImage} />
                        <button
                            onClick={() => setIsModalOpen(false)}
                            className="w-full px-4 py-2 bg-red-500 text-white rounded-md"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            )}

            {message && <p className="text-green-600">{message}</p>}
            {error && <p className="text-red-600">{error}</p>}
        </div>
    );
};

export default ProfileImageEditForm;
