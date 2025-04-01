import type React from "react";
import { useState, useEffect } from "react";
import { useUpdateBio } from "@/hooks/user/userSettings/useBio";
import { FaUserAlt } from "react-icons/fa";
import { validateBio } from "@/utils/validation/bioValidation";
import { getUserBio } from "@/api/user/userApi"; // API 호출 함수 import

const BioUpdate = () => {
  const { isLoading, message, updateBio } = useUpdateBio();
  const [bio, setBio] = useState<string>("");
  const [editedBio, setEditedBio] = useState<string>("");
  const [bioError, setBioError] = useState<string | null>(null);

  // 자기소개를 불러오는 useEffect
  useEffect(() => {
    const fetchBio = async () => {
      try {
        const response = await getUserBio();
        setBio(response.bio); // 불러온 자기소개를 상태에 저장
        setEditedBio(response.bio); // 편집할 자기소개도 설정
      } catch (err) {
        console.error("자기소개를 불러오는 데 실패했습니다.", err);
        setBioError("자기소개를 불러올 수 없습니다.");
      }
    };

    fetchBio();
  }, []); // 컴포넌트가 처음 렌더링될 때 한 번만 실행

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const bioValidationError = validateBio(editedBio);
    if (bioValidationError) {
      setBioError(bioValidationError);
      return;
    }

    await updateBio(editedBio); // 훅에서 처리하도록 함
  };

  return (
    <form onSubmit={handleSubmit} className="mb-8">
      <h2 className="text-xl font-semibold mb-6 flex items-center dark:text-white">
        <FaUserAlt className="h-5 w-5 mr-2" />
        Edit Bio
      </h2>
      <div className="space-y-4">
        <div>
          <textarea
            value={editedBio}
            onChange={(e) => setEditedBio(e.target.value)}
            className="w-full h-40 rounded-lg border border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-800 px-4 py-2 text-neutral-900 dark:text-white focus:border-neutral-900 dark:focus:border-white focus:ring-neutral-900 dark:focus:ring-white resize-none"
            placeholder="자기소개 입력..."
          />
        </div>
        {bioError && <p className="text-red-500 text-sm">{bioError}</p>} {/* 에러 메시지를 추가 */}
        {message && (
          <p className={`text-sm ${message.type === "success" ? "text-green-600" : "text-red-500"}`}>
            {message.text}
          </p>
        )}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full mt-4 px-4 py-2 bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 rounded-lg text-sm font-medium hover:bg-neutral-800 dark:hover:bg-neutral-100 transition-colors duration-200 disabled:opacity-50"
        >
          {isLoading ? "Updating..." : "Update Bio"}
        </button>
      </div>
    </form>
  );
};

export default BioUpdate;