export const validateOldPassword = (oldPassword: string): string | undefined => {
    if (!oldPassword) {
      return "현재 비밀번호를 입력해주세요";
    }
    return undefined;
  };
  
  export const validateNewPassword = (newPassword: string, oldPassword: string): string | undefined => {
    if (!newPassword) {
      return "새 비밀번호를 입력해주세요.";
    } else if (newPassword.length < 8 || newPassword.length > 20) {
      return "비밀번호는 8자 이상 20자 이하로 입력해주세요.";
    } else if (!/[A-Z]/.test(newPassword)) {
      return "비밀번호에는 최소한 하나의 대문자가 포함되어야 합니다.";
    } else if (!/[a-z]/.test(newPassword)) {
      return "비밀번호에는 최소한 하나의 소문자가 포함되어야 합니다.";
    } else if (!/[0-9]/.test(newPassword)) {
      return "비밀번호에는 최소한 하나의 숫자가 포함되어야 합니다.";
    } else if (!/[!@#$%^&*]/.test(newPassword)) {
      return "비밀번호에는 최소한 하나의 특수문자(!@#$%^&*)가 포함되어야 합니다.";
    } else if (newPassword === oldPassword) {
      return "새 비밀번호는 현재 비밀번호와 달라야 합니다.";
    }
    return undefined;
  };
  
  export const validateConfirmPassword = (confirmPassword: string, newPassword: string): string | undefined => {
    if (!confirmPassword) {
      return "비밀번호 확인을 입력해주세요.";
    } else if (confirmPassword !== newPassword) {
      return "새 비밀번호와 비밀번호 확인이 일치하지 않습니다.";
    }
    return undefined;
  };
  