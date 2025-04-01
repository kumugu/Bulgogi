export const validateBio = (bio: string): string | undefined => {
    if (bio && bio.length > 500) {
      return "자기소개는 500자 이하여야 합니다";
    }
    return undefined;
  };
  