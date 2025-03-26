// 서버 요청 타입
export interface RegisterRequest {
    email: string;
    username: string;
    password: string;
    bio: string;              
    role: "USER" | "ADMIN";   
    profileImage?: string;    
}

// 서버 응답 타입
export interface RegisterResponse {
    id: number;
    email: string;
    username: string;
    profileImage: string;
    bio: string;
    role: "USER" | "ADMIN";
    createdAt: string;
    updatedAt: string;
}

// 클라이언트에서 사용하는 폼 데이터 타입
export interface RegisterFormData {
    email: string;
    username: string;
    password: string;
    confirmPassword: string; 
    bio?: string;            
    role?: "USER" | "ADMIN"; 
    profileImage?: string;
}

export interface RegisterFormProps {
    onSubmit: (data: RegisterFormData) => Promise<void>;
    loading: boolean;
    error?: string;
    message?: string;
}
  

// 비밀번호 변경 요청 타입
export interface ChangePasswordRequest {
    oldPassword: string;
    newPassword: string;
}

// 계정 삭제 요청 타입
export interface DeleteAccountRequest {
    confirmPassword: string;
}

// API 응답 타입
export interface AccountApiResponse<T = any> {
    success: boolean;
    message: string;
    status?: number;
    data?: T;
}
 
