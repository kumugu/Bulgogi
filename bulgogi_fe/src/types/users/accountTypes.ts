export interface ChangePasswordRequest {
    oldPassword: string;
    newPassword: string;
}

export interface DeleteUserRequest {
    confirmPassword: string;
}