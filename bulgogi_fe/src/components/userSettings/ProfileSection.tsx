import React, { useRef } from "react";
import { FaUpload } from "react-icons/fa";

interface ProfileSectionProps {
    bio: string;
    onBioChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    onSubmit: () => void;
}

const ProfileSection = ({ bio, onBioChange, onSubmit }: ProfileSectionProps) => {
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log("선택된 파일:", e.target.files?.[0]);
    };

    const handleButtonClick = () => {
        fileInputRef.current?.click();
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit();
    };

    return (
        <div className="bg-white dark:bg-neutral-800 rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-semibold mb-6 flex items-center dark:text-white">
                    <FaUpload className="h-5 w-5 mr-2" />
                    Profile Settings
                </h2>

                <form onSubmit={handleSubmit}>
                    {/* Profile Photo */}
                    <div className="mb-6 flex items-center space-x-4">
                        <button type="button" className="text-neutral-700 dark:text-neutral-300 flex items-center">
                            Change Photo
                        </button>
                        <input
                            ref={fileInputRef}
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={handleImageUpload}
                        />

                        <button
                            type="button"
                            onClick={handleButtonClick}
                            className="text-neutral-700 dark:text-neutral-300 flex items-center"
                        >
                            <FaUpload className="h-4 w-4 mr-2" />
                        </button>
                    </div>

                    {/* Bio */}
                    <div className="mb-6">
                        <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                            Bio
                        </label>
                        <textarea
                            value={bio}
                            onChange={onBioChange}
                            className="w-full rounded-lg border border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-800 px-4 py-2 text-neutral-900 dark:text-white focus:border-neutral-900 dark:focus:border-white focus:ring-neutral-900 dark:focus:ring-white min-h-[100px]"
                            placeholder="Write a brief introduction about yourself..."
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full px-4 py-2 bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 rounded-lg text-sm font-medium hover:bg-neutral-800 dark:hover:bg-neutral-100 transition-colors duration-200"
                    >
                        Save Profile
                    </button>
                </form>
            </div>
    );
};

export default ProfileSection;