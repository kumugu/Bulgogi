import { useDeleteAccount } from "@/hooks/user/account/useDeleteAccount"
import React, { useState } from "react";
import { FaLock as Lock } from "react-icons/fa";


const DeleteAccountForm = () => {
    const { deleteAccount, loading, error, message } = useDeleteAccount();
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!confirmPassword) {
            alert("비밀번호가 입력되지 않았습니다. 다시 입력해 주세요.")
            return;
        }

        deleteAccount({ confirmPassword });
    };

    return (
        <div className="bg-white dark:bg-neutral-800 rounded-xl shadow-sm">
            <h2 className="text-xl font-semibold mb-6 flex items-center dark:text-white">
                <Lock className="h-5 w-5 mr-2" />
                Delete Account
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400">
            Are you sure you want to delete your account? This action cannot be undone.
            </p>

            {error && (
                <div className="mt-3 p-2 bg-red-100 text-red-600 rounded">
                    {error}
                </div>
            )}

            {message && (
                <div className="mt-3 p-2 bg-green-100 text-green-600 rounded">
                    {message}
                </div>
            )}

            <form onSubmit={handleSubmit} className="mt-3">
                <input
                    type="password"
                    placeholder="Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="border p-2 w-full rounded"
                />
                <button
                    type="submit"
                    className="w-full mt-4 px-4 py-2 bg-red-600 dark:bg-white text-white dark:text-neutral-900 
                    rounded-lg text-sm font-medium hover:bg-red-800 dark:hover:bg-neutral-100 
                    transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    Delete Account
                    {loading ? "Deleting..." : "Delete Account"}
                </button>
                <br></br>
            </form>
        </div>
    );
};

export default DeleteAccountForm;