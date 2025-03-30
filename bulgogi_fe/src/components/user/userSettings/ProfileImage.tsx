import React from "react";

const DEFAULT_PROFILE_IMAGE = "https://bulgogoi-image.s3.ap-northeast-2.amazonaws.com/profile-images/default-profile.png";

interface ProfileImageProps {
    imageUrl: string | null;
    size?: number;
    altText?: string;
}


const ProfileImage: React.FC<ProfileImageProps> = ({ 
    imageUrl, 
    size = 50, 
    altText = "사용자 프로필" }) => {
        
    return (
        <img 
            src={imageUrl || DEFAULT_PROFILE_IMAGE}
            alt={altText}
            className="rounded-full object-cover"
            style={{ width: size, height: size }}
        />
    );
};

export default ProfileImage;