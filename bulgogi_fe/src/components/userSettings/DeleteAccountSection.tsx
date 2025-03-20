import React, { useState } from "react";

interface DeleteAccountProps {
    onDelete: (PasswordData: { confirmPassword: string }) => void;
}

const DeleteAccountSection: React.FC<DeleteAccountProps> = ({ onDelete }) => {
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!confirmPassword) {
            alert("비밀번호를 입력해주세요.");
            return;
        }
        onDelete({ confirmPassword });
    };

    return (
        <div className="mt-6 border-t pt-4">
            <h2 className="text-lg font-bold text-red-600">Delete Account</h2>
            <p className="text-sm text-gray-600">
            Are you sure you want to delete your account? This action cannot be undone.
            </p>

            <form onSubmit={handleSubmit} className="mt-3">
                <input
                    type="password"
                    placeholder="비밀번호 입력"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="border p-2 w-full rounded"
                />
                <button
                    type="submit"
                    className="mt-3 bg-red-600 text-white py-2 px-4 rounded w-full hover:bg-red-700"
                >
                    Delete Account
                </button>
            </form>
        </div> 
    );
};

export default DeleteAccountSection;