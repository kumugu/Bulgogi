import React from 'react';

interface ProfileImageProps {
  imageUrl: string;
  alt: string;
  size?: number; // 이미지 크기 (기본값 설정 가능)
}

const ProfileImage: React.FC<ProfileImageProps> = ({ imageUrl, alt, size = 8 }) => {
  return (
    <img
      src={imageUrl}
      alt={alt}
      className={`w-${size} h-${size} rounded-full object-cover`}
    />
  );
};

export default ProfileImage;
