import React from 'react';
import { useAuthStore } from '@/store/user/authStore'; // 상태에서 프로필 이미지 가져오기
import ProfileImage from './ProfileImage'; // ProfileImage 컴포넌트 사용

const UserProfileImage: React.FC = () => {
  const { auth } = useAuthStore(); // 상태에서 인증 정보 가져오기
  const { profileImage, username } = auth;

  // 프로필 이미지가 없으면 기본 이미지를 표시하도록 처리
  const imageUrl = profileImage || 'https://bulgogoi-image.s3.ap-northeast-2.amazonaws.com/profile-images/default-image.png'; // 기본 이미지 URL 설정

  return (
    <div className="flex items-center space-x-2">
      <ProfileImage imageUrl={imageUrl} alt={username || 'User'} size={8} />
      <span className="text-sm font-medium">{username || 'Unknown User'}</span>
    </div>
  );
};

export default UserProfileImage;
