import React from "react";
import { DEFAULT_PROFILE_IMAGE } from "@/utils/constants/constants";

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