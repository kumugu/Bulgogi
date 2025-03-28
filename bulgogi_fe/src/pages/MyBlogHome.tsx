import React, { useEffect, useState } from "react";
import { useAuthStore } from "@/store/user/authStore";
import ProfileImage from "@/components/user/userSettings/ProfileImage";

const MyBlogHome = () => {
  const { auth } = useAuthStore();
  const [profileImage, setProfileImage] = useState(auth.profileImage);

  useEffect(() => {
    console.log("Current auth.profileImage:", auth.profileImage);
    console.log("Current state profileImage:", profileImage);
    
    if (auth.profileImage !== profileImage) {
      setProfileImage(auth.profileImage);
    }
  }, [auth.profileImage, profileImage]);

  return (
    <div className="min-h-screen bg-neutral-100 py-8 px-4">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-neutral-900">My Blog</h1>
        </div>

        {/* 사용자 정보 */}
        <div className="bg-white shadow-md rounded-lg p-6 mt-8">
          <h2 className="text-xl font-semibold text-neutral-800 mb-4">User Information</h2>
          <div className="flex items-center space-x-4">
            <ProfileImage 
              imageUrl={profileImage || 'https://bulgogoi-image.s3.ap-northeast-2.amazonaws.com/profile-images/default-image.png'} 
              alt={auth.username || "사용자"} 
              size={12}
              key={profileImage} // 강제 리렌더링
            />
            <p className="text-sm text-neutral-600">{auth.username || "Username not set"}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyBlogHome;