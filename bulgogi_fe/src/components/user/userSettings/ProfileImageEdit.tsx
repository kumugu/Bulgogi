import { useUpdateMyProfileImage } from "@/features/user/userSettings/useUpdateMyProfileImage";
import React, { useState } from "react";

const ProfileImageUpload: React.FC = () => {
    const { updateMyProfileImage, loading, error } = useUpdateMyProfileImage();
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setSelectedFile(file);
            setPreviewUrl(URL.createObjectURL(file));
        }
    };

    const handleUpload = () => {
        if (selectedFile) {
            updateMyProfileImage(selectedFile);
            setSelectedFile(null);
            setPreviewUrl(null);
        }
    };

    return (
        <div className="flex flex-col items-center space-y-4 p-4 border rounded-lg">
            <h2 className="text-lg font-semibold">프로필 이미지 변경</h2>

            {/* 미리보기 */}
            {previewUrl ? (
                <img src={previewUrl} alt="미리보기" className="w-32 h-32 rounded-full object-cover" />
            ) : (
                <div className="w-32 h-32 flex items-center justify-center border rounded-full bg-gray-100">
                    <span className="text-gray-500 text-sm">이미지 없음</span>
                </div>
            )}

            {/* 파일 선택 */}
            <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" id="file-upload" />
            <label htmlFor="file-upload" className="cursor-pointer px-4 py-2 bg-blue-500 text-white rounded-lg">
                파일 선택
            </label>

            {/* 업로드 버튼 */}
            <button
                onClick={handleUpload}
                disabled={!selectedFile || loading}
                className={`px-4 py-2 rounded-lg ${
                    selectedFile ? "bg-green-500 text-white" : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
            >
                {loading ? "업로드 중..." : "업로드"}
            </button>

            {/* 오류 메시지 */}
            {error && <p className="text-red-500 text-sm">{error}</p>}
        </div>
    );
};

export default ProfileImageUpload;
