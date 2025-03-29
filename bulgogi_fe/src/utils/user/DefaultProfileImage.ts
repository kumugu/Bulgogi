export const getDefaultProfileImage = (profileImageUrl: string | null): string => {
    return profileImageUrl?.trim() 
      ? profileImageUrl 
      : "https://bulgogoi-image.s3.ap-northeast-2.amazonaws.com/profile-images/default-profile.png";
  };
