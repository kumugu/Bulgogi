import type React from "react"
import { DEFAULT_PROFILE_IMAGE } from "@/utils/constants/constants"

interface ProfileImageProps {
  imageUrl: string
  size?: number
  className?: string
}

const ProfileImage: React.FC<ProfileImageProps> = ({ imageUrl, size = 64, className = "" }) => {
  // 이미지 URL이 없거나 빈 문자열이면 기본 이미지 사용
  const src = imageUrl && imageUrl.trim() !== "" ? imageUrl : DEFAULT_PROFILE_IMAGE

  return (
    <div className={`relative rounded-full overflow-hidden ${className}`} style={{ width: size, height: size }}>
      <img
        src={src || "/placeholder.svg"}
        alt="Profile"
        width={size}
        height={size}
        className="object-cover w-full h-full"
        onError={(e) => {
          // 이미지 로드 실패 시 기본 이미지로 대체
          const target = e.target as HTMLImageElement
          target.src = DEFAULT_PROFILE_IMAGE
        }}
      />
    </div>
  )
}

export default ProfileImage



// import React from "react";
// import { DEFAULT_PROFILE_IMAGE } from "@/utils/constants/constants";

// interface ProfileImageProps {
//     imageUrl: string | null;
//     size?: number;
//     altText?: string;
// }

// const ProfileImage: React.FC<ProfileImageProps> = ({ 
//     imageUrl, 
//     size = 50, 
//     altText = "사용자 프로필" }) => {
        
//     return (
//         <img 
//             src={imageUrl || DEFAULT_PROFILE_IMAGE}
//             alt={altText}
//             className="rounded-full object-cover"
//             style={{ width: size, height: size }}
//         />
//     );
// };

// export default ProfileImage;




    