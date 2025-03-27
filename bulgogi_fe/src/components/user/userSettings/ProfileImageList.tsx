import { getProfileImageListService } from "@/service/user/userService";
import { useState, useEffect } from "react";
import { ProfileImageListProps, ProfileImage } from "@/types/user/userTypes";

const ProfileImageList = ({ onSelect, selectedImage }: ProfileImageListProps) => {
    const [profileImages, setProfileImages] = useState<ProfileImage[]>([]);

    useEffect(() => {
        const fetchImages = async () => {
            try {
                // 이미지 목록을 가져오는 서비스 호출
                const images = await getProfileImageListService();

                // 이미지 목록을 ProfileImage[] 형식으로 변환
                const profileImageList: ProfileImage[] = images.map((image) => ({
                    image,      // 이미지 URL
                    file: null, // 파일 정보가 없다면 null로 설정
                }));

                setProfileImages(profileImageList);
            } catch (error) {
                console.error("프로필 이미지를 가져오는 데 실패했습니다.");
            }
        };

        fetchImages();
    }, []);

    return (
        <div className="grid grid-cols-3 gap-4 mb-4">
            {profileImages.map(({ image, file }, index) => (
                <img
                    key={index}
                    src={image}
                    alt={`Profile ${index + 1}`}
                    className={`w-24 h-24 rounded-full cursor-pointer object-cover border-2 ${
                        selectedImage === image ? "border-black" : "border-gray-300"
                    }`}
                    onClick={() => onSelect(image, file)}  // onSelect에 image, file 전달
                />
            ))}
        </div>
    );
};

export default ProfileImageList;
