import React from "react";

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
            src={imageUrl || "https://bulgogoi-image.s3.ap-northeast-2.amazonaws.com/profile-images/default-profile.png"}
            alt={altText}
            className="rounded-full object-cover"
            style={{ width: size, height: size }}
        />
    );
};

export default ProfileImage;